"use server"

import { UserSkillSchema } from "@/schemas/user-skills"
import { User, UserSkill } from "@prisma/client"

// Server actions
import validateSession from "@/actions/auth/validateSession";
import prisma from "@/lib/db";
import Skills from "@/app/(pages)/user/[slug]/components/main/Skills";
import { ServerResponse } from "@/lib/types/ServerResponse";

export default async function updateSkills({
    oldValues,
    newValues,
    userAgent
} : {
    oldValues: UserSkill[] | undefined,
    newValues: UserSkill[],
    userAgent: string | null
}) : Promise<ServerResponse<{ user: { Skills: UserSkill[] } }>> {

    try {
    
        /**
         * Return if no changes have been made
         */
        if (JSON.stringify(oldValues) === JSON.stringify(newValues)) return { success: true, msg: "No changes made", status: 304, data : { user: { Skills: newValues } } }

        /** 
         * Validate list lengths (old and new) 
        */
        if (oldValues && oldValues.length > 60) return { success: false, msg: "Too many old skills", status: 400 }
        if (newValues.length > 60) return { success: false, msg: "Too many new skills", status: 400 }
        
        /** 
         * Validate data (old and new) 
        */
        if (oldValues) {
            oldValues.map(skill => {
                const test = UserSkillSchema.safeParse(skill)
                if (!test.success) return { success: false, msg: `Old skill ${skill.name} is invalid due to ${test.error}` }
            })
        }
        newValues.map(skill => {
            const test = UserSkillSchema.safeParse(skill)
            if (!test.success) return { success: false, msg: `New skill ${skill.name} is invalid due to ${test.error}` }
        })

        /**
         * Authenticate user
         */
        const sessionResult = await validateSession(userAgent);
        if (!sessionResult.success || !sessionResult.data?.user) return { success: false, msg: sessionResult.msg, status: sessionResult.status }
            
        const user = sessionResult.data.user

        /**
         * Check if the user provided `oldValues` is identical to the database
         */

        user.Skills.forEach((skill : UserSkill, index : number) => {
            if (oldValues && skill.name !== oldValues[index].name) return { success: false, msg: "Old value does not match database", status: 400 }
            if (oldValues && skill.color !== oldValues[index].color) return { success: false, msg: "Old value does not match database", status: 400 }
            if (oldValues && skill.parentId !== oldValues[index].parentId) return { success: false, msg: "Old value does not match database", status: 400 }
            if (oldValues && skill.order !== oldValues[index].order) return { success: false, msg: "Old value does not match database", status: 400 }
        })

        /**
         * Delete all UserSkills
        */
       await prisma.userSkill.deleteMany({
            where: {
                userId: user.id
            }
       })

        // Store createdAt
       const createdAt = Math.floor(new Date().getTime() / 1000)

       /**
         * Separate parent and children skills
        */
        const parentSkills = newValues.filter(skill => skill.parentId === null )
        const createParentsResult = await prisma.userSkill.createManyAndReturn({
            data: [
                ...parentSkills.map(skill => {
                    return {
                        name: skill.name.trim(),
                        color: skill.color.trim(),
                        order: skill.order,
                        parentId: skill.parentId,
                        userId: user.id,
                        createdAt
                    }
                })
            ]
       })

        if (!createParentsResult) throw new Error(`Database internal error`)
        
        /** 
         * Once parents are created, replace all frontend randomly generated ID with database provided ID
         * Then, assign children's parentIds (which used the frontend random generatedID) with the new database provided ones
         */
        // 1. Map frontend -> real DB parent ids
        const parentIdMap = new Map<number, number>(); // key: frontendId, value: dbId
        parentSkills.forEach((parent, index) => {
            parentIdMap.set(parent.id, createParentsResult[index].id);
        });


        // 4. Prepare and insert child skills with updated parentId
        const childSkills = newValues.filter(skill => skill.parentId !== null);
        const createChildrenResult = await prisma.userSkill.createManyAndReturn({
            data: childSkills.map(skill => ({
                name: skill.name.trim(),
                color: skill.color.trim(),
                order: skill.order,
                parentId: parentIdMap.get(skill.parentId as number) ?? null,
                userId: user.id,
                createdAt
            }))
        });

        if (!createChildrenResult) throw new Error(`Database internal error when creating children`)
        
        return {
            success: true, 
            msg: "User skills updated successfully",
            status: 200,
            data: {
                user: {
                    Skills: [...createParentsResult, ...createChildrenResult].map(skill => { return {
                        id: skill.id,
                        name: skill.name,
                        createdAt: skill.createdAt,
                        order: skill.order,
                        color: skill.color,
                        userId: skill.userId,
                        parentId: skill.parentId,
                    } })
                }
            }
        }

    } catch (error : any) {

        if (error.code === "P2003") {
            return {
                success: false,
                msg: "Invalid parentId - it does not exist in the database.",
                status: 400
            };
        }

        if (error.code === "P2002") {
            return {
                success: false,
                msg: "Duplicate skill - a skill with this name and parent already exists for this user.",
                status: 400
            };
        }

        return { success: false, msg: typeof error == "string" ? error : "Internal error occurred", status: 500 }

    }
}

/* 
let unChanged : number[] = [];
newValues.map((skill, index) => {
    if (
        skill.name.trim() === oldValues[index].name.trim() &&
        skill.color.trim().toUpperCase() === oldValues[index].color.trim().toUpperCase() &&
        skill.parentId === oldValues[index].parentId 
    ) {
        unChanged = [ ...unChanged, index ]
    }
})

let changed : number[] = newValues
    .map(skill => { return skill.id })
    .filter(id => !unChanged.includes(id))

let changedSkills = newValues.map(skill => changed.includes(skill.id))

*/
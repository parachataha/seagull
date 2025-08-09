/**
 * Used to order an array of skills into the correct order
 * Where children follow their parents in their order and parents are ordered in that order
 * @param skills 
 */

import { UserSkill } from "@prisma/client";

export default function sortSkills(skills: UserSkill[]): UserSkill[] {
    
    /**
     * Get parent skills and order them by column `order`
     */
    const parents = skills
        .filter(skill => skill.parentId === null)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const childrenMap = new Map<number, UserSkill[]>();

    /** 
     * List all (child) skills and check if 
     */
    for (const skill of skills) {
        if (skill.parentId !== null) {
            if (!childrenMap.has(skill.parentId)) {
                childrenMap.set(skill.parentId, []);
            }
            childrenMap.get(skill.parentId)!.push(skill);
        }
    }
    
    const result: UserSkill[] = [];

    for (const parent of parents) {
    result.push(parent);

    const children = childrenMap.get(parent.id) ?? [];
        children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        result.push(...children);
    }

    return result;
}

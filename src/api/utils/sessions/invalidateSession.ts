import prisma from "../db";

export async function invalidateSession(session_id : string) {
    await prisma.session.delete({ where: { id: session_id } });
}

export async function invalidateAllSession(user_id: number) {
    await prisma.session.deleteMany({
        where: { user_id: user_id }
    })
}
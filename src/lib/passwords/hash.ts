import bcrypt from 'bcrypt';

export default async function hash(text: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
    return bcrypt.hash(text, saltRounds);
}

import { User } from "@/generated/prisma";

interface UserType extends Omit<User, 'password' | 'email'> {

}

export default function Header(user : UserType) {
    
    

}
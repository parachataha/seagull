import { User } from "@/generated/prisma";
import Widget from "../../UI/Widget/Widget";
import Image from "next/image";
import Avatar from "../Avatar/Avatar";

interface UserType {
    user: Omit<User, 'password' | 'email'>
}

export default function Header({user} : UserType) {

    return ( <div>

        <Widget>

            <div className="flex gap-3 items-center">

                <Avatar />

                <div className="flex flex-col justify-center">
                    <h1 className='text-xl font-bold'> {user.firstName} {user.lastName} </h1>
                    {user.label && <p className='text-lg text-grey'> {user.label} </p>}
                </div>

            </div>

            <p className='pt-3'> {user.bio && user.bio} </p>

        </Widget>

    </div> )

}
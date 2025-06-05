
"use client"

import createUser from "@/api/auth/createUser";

export function SignupForm() {

    async function handleSubmit(e : any) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        console.log(formValues)

        const data : {first_name: string, last_name: string, password: string, email: string} = {
            first_name: `${formValues.first_name}`.trim(), 
            last_name: `${formValues.last_name}`.trim(),
            password: `${formValues.password}`.trim(), 
            email: `${formValues.email}`.trim()
        }
        
        const result = await createUser(data)
        console.log(result)

    }

    return ( <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-4'>

        <div className="grid grid-cols-2 w-full gap-4">
            <div className='flex flex-col'>
                <label className='pb-1' htmlFor="first_name">First Name</label>
                <input required name='first_name' className="grow " type="text" placeholder="John"/>
            </div>
            <div className='flex flex-col'>
                <label className='pb-1' htmlFor="last_name">Last Name</label>
                <input required name='last_name' className="grow " type="text" placeholder="Doe"/>
            </div>
        </div>

        <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input required name='email' type="text" placeholder="example@example.com"/>
        </div>

        <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input required name='password' type="password" placeholder="•••••••••••"/>
        </div>  

        <button type='submit' className='mt-4 button !bg-white text-black'> Signup </button>

    </form> )
}
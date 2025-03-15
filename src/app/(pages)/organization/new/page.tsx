import Form from "./Form";

export default function NewOrganizationPage() {


    return ( <div className='wrapper'>
        <div className="container mt-6 max-w-[550px_!important]">

            <div className="flex flex-col items-center">
                <h3 className="text-[16px] font-semibold grey"> Change the world with Seagull </h3>
                <h1 className='text-[32px]'> Create New Organization </h1>
            </div>

            <Form/>

        </div>
    </div> )
}
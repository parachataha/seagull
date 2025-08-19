import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import SignupForm from "@/components/forms/auth/SignupForm";

import { metadata } from "@/lib/page-metadata/signup";
export { metadata }

export default function SignupPage() {


    return ( <Page>

        <Container className="!max-w-200">

            <div className="grid sm:grid-cols-2 gap-5 h-full items-center">
                <div>
                    <h1 className="text-2xl font-semibold mb-3"> Signup to Seagull </h1>
                    <SignupForm/>   
                </div>
                <div className="h-full max-h-100 rounded-lg bg-gradient-yellow-pink">  </div>
            </div>

        </Container>

    </Page> )
}


// Components
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import LoginForm from "@/components/forms/auth/LoginForm";

import { metadata } from "@/lib/page-metadata/login"

export { metadata };

export default function LoginPage() {


    return ( <Page>

        <Container className="!max-w-200">

            <div className="grid sm:grid-cols-2 gap-5 h-full items-center">
                <div>
                    <h1 className="text-2xl font-semibold mb-3"> Welcome back </h1>
                    <LoginForm/>
                </div>
                <div className="h-full max-h-100 rounded-lg bg-gradient-yellow-pink">  </div>
            </div>

        </Container>

    </Page> )
}
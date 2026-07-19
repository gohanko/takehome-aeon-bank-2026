import * as React from "react";
import { AuthLayout } from "../templates/auth-layout";
import { LoginForm } from "../organisms/login-form";

export const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};

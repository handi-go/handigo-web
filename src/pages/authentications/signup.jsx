import AuthForm from "../../components/authentications/authForm"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../layouts/authLayout';


function SignUp(){
    const { setText } = useContext(AuthContext);

    useEffect(() => {
        setText("Join the Community of Trusted Professionals and Satisfied Customers");
      }, [setText]);

    const signupData = {
        pageTexts: {
            heading: "Create an Account",
            paragraph: "Become a Handigo member, you’ll get exclusive experiences from us.",
            pageLinkText: "Already have an account? ",
            pageLink: "Log In",
            class: "text-left"

        },
        fields: [
            {
                label: "Full Name",
                type: "text",
                name: "fullName",
                placeholder: "Full name",
                required: true
            },
            {
                label: "Email",
                type: "email",
                name: "email",
                placeholder: "Email address",
                required: true
            },
            {
                label: "Password",
                type: "password",
                name: "password",
                placeholder: "Password",
                required: true
            },
            {
                label: "Artisan",
                type: "radio",
                name: "artisan",
                placeholder: "",
                required: true
            },
            {
                label: "Customer",
                type: "radio",
                name: "customer",
                placeholder: "",
                required: true
            }
        ],
        buttons: [
            {
                text: "Create an account",
                type: "submit",
                btnType: "primary"
            },
            {
                text: "Sign up with Google",
                type: "social",
                btnType: "social"
            }
        ]
    };
    return (
        <>
            <AuthForm pageTexts={signupData.pageTexts} fields={signupData.fields} buttons={signupData.buttons} />
        </>
    )
}

export default SignUp
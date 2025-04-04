import AuthForm from "../../components/authentications/authForm"
import AuthLayout from "../../components/authentications/authLayout"
import { ButtonPrimary, GoogleButton } from "../../components/authentications/buttons";


function LogIn(){
    const leftText = "Welcome Back! Your Next Connection Awaits"
    const loginData = {
        pageTexts: {
            heading: "Welcome",
            paragraph: "Log in now and get back to enjoying seamless service connections tailored to your needs.",
            pageLinkText: "Does'nt have an account yet? ",
            pageLink: "Sign Up"
        },
        fields: [
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
            }
        ],
        buttons: [
            {
                text: "Login",
                type: "submit",
                btnType: "primary"
            },
            {
                text: "Login with google",
                type: "social",
                btnType: "social"
            }
        ]
    };


    return (
        <>
            <AuthLayout text={leftText}>

                <AuthForm pageTexts={loginData.pageTexts} fields={loginData.fields} buttons={loginData.buttons} />
            </AuthLayout>
        </>
    )
}

export default LogIn
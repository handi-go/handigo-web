import AuthForm from "../../components/authentications/authForm"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../layouts/authLayout';


function LogIn(){
    const { setText } = useContext(AuthContext);

    useEffect(() => {
        setText("Welcome Back! Your Next Connection Awaits");
      }, [setText]);

    const loginData = {
        pageTexts: {
            heading: "Welcome",
            paragraph: "Log in now and get back to enjoying seamless service connections tailored to your needs.",
            pageLinkText: "Does'nt have an account yet? ",
            pageLink: "Sign Up",
            class: "text-left"
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
            <AuthForm pageTexts={loginData.pageTexts} fields={loginData.fields} buttons={loginData.buttons} />
        </>
    )
}

export default LogIn
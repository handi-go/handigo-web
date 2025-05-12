import AuthForm from "../../components/authentications/authForm"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../layouts/authLayout';


function ForgorPassword(){
    const { setText } = useContext(AuthContext);

    useEffect(() => {
        setText("Welcome Back! Your Next Connection Awaits");
      }, [setText]);

    const forgotPasswordData = {
        pageTexts: {
            heading: "Reset your password",
            paragraph: "Enter the email address associated with your account, and we'll send you a code to reset your password",
            class: "text-center"

        },
        fields: [
            {
                label: "Email",
                type: "email",
                name: "email",
                placeholder: "Email address",
                required: true
            }
        ],
        buttons: [
            {
                text: "Send code",
                type: "submit",
                btnType: "primary"
            }
        ]
    };


    return (
        <>
            <AuthForm pageTexts={forgotPasswordData.pageTexts} fields={forgotPasswordData.fields} buttons={forgotPasswordData.buttons} />
        </>
    )
}

export default ForgorPassword
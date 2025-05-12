import AuthForm from "../../components/authentications/authForm"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../layouts/authLayout';


function EmailVerification(){
    const { setText } = useContext(AuthContext);

    useEffect(() => {
        setText("Welcome Back! Your Next Connection Awaits");
      }, [setText]);

    const emailVerificationData = {
        pageTexts: {
            heading: "Verification code",
            paragraph: "We sent a 4 digits verification code, please enter it below. can’t find? check spam.",
            class: "text-center"
        },
        fields: [],
        buttons: [
            {
                text: "Continue",
                type: "submit",
                btnType: "primary"
            }
        ]
    };


    return (
        <>
            <AuthForm pageTexts={emailVerificationData.pageTexts} fields={emailVerificationData.fields} buttons={emailVerificationData.buttons} />
        </>
    )
}

export default EmailVerification
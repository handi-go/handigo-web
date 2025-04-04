import AuthForm from "../../components/authentications/authForm"
import AuthLayout from "../../components/authentications/authLayout"


function EmailVerification(){
    const leftText = "Welcome Back! Your Next Connection Awaits"
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
            <AuthLayout text={leftText}>

                <AuthForm pageTexts={emailVerificationData.pageTexts} fields={emailVerificationData.fields} buttons={emailVerificationData.buttons} />
            </AuthLayout>
        </>
    )
}

export default EmailVerification
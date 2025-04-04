import AuthForm from "../../components/authentications/authForm"
import AuthLayout from "../../components/authentications/authLayout"


function ForgorPassword(){
    const leftText = "Welcome Back! Your Next Connection Awaits"
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
            <AuthLayout text={leftText}>

                <AuthForm pageTexts={forgotPasswordData.pageTexts} fields={forgotPasswordData.fields} buttons={forgotPasswordData.buttons} />
            </AuthLayout>
        </>
    )
}

export default ForgorPassword
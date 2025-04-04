// AuthForm.tsx
import Input from "./input";
import { ButtonPrimary, GoogleButton } from "./buttons";
import { Link } from "react-router-dom";
import { LogIn, Mail } from "lucide-react";


function AuthForm ({ pageTexts, fields, buttons}) {
    return (
      <div className="w-full max-w-4/5"> {/* max-w-md */}
        <div className={`${pageTexts.class} mb-8`}>
            <h2 className="text-xl md:text-3xl text-[#212121] font-semibold">{pageTexts.heading}</h2>
                { pageTexts.heading === "Verification code" ? (
                    <div className="flex justify-center my-6">
                         <Mail strokeWidth={1} width={36} height={36} />
                    </div>
                ): ("")}
            <p className="text-base md:text-lg text-[#949494] font-light mt-4">{pageTexts.paragraph}</p>
        </div>

        <form className="space-y-2"> {/* onSubmit={onSubmit} */}

            {fields.length < 1 ? (
                <div className="flex flex-col gap-8">
                   <div className="flex justify-center items-center gap-8">
                        <input type="tel" maxLength="1" className="w-16 h-16 text-center border border-[#124096]" />
                        <input type="tel" maxLength="1" className="w-16 h-16 text-center border border-[#124096]" />
                        <input type="tel" maxLength="1" className="w-16 h-16 text-center border border-[#124096]" />
                        <input type="tel" maxLength="1" className="w-16 h-16 text-center border border-[#124096]" />
                    </div>


                    <div className="flex justify-center gap-3">
                        <Link to={""} className="text-xl font-medium underline text-[#124096]">Click to send new code</Link>
                    </div>

                    <div className="flex justify-center gap-3 mb-10">
                        <p className="text-xl font-normal text-[#181717] ">Noticed a typo?</p>
                        <Link to={"/"}
                            className="text-xl font-medium underline text-[#124096]">
                            Change your email address
                        </Link>
                    </div>
                </div>
            ) :
                (
                    fields.map((field) => (
                        <Input key={field.name} {...field} />
                    ))
                )
            }

            <div>
                { pageTexts.pageLink === "Sign Up"? (
                    <Link to={"/forgot-password"} className="text-sm font-semibold text-[#CFCFCF]"> Forget password? </Link>
                ) :
                ( "" )
                }

            </div>

            <div className="flex flex-col gap-4 mt-6">
                { buttons.length > 1 ? (
                    buttons.map((button, index) => {
                    if (button.btnType === "primary") {
                        return <ButtonPrimary key={index} name={button.text} />;
                    } else {
                        return <GoogleButton key={index} name={button.text} />;
                    }
                })

                ) : (
                    <>
                    {buttons[0].btnType === "primary" ? (
                        <ButtonPrimary name={buttons[0].text} />
                    ) : (
                        <GoogleButton name={buttons[0].text} />
                    )}
                    </>
                )}
            </div>

        </form>

        {
            pageTexts.pageLink ? (
                <div className="flex justify-center gap-3 mt-8">
                    <p className="text-lg font-light ">{pageTexts.pageLinkText}</p>
                    <Link to={`/${pageTexts.pageLink.replace(' ', '').toLowerCase()}`}
                        className="text-lg font-medium underline text-[#124096]">
                        {pageTexts.pageLink}
                    </Link>
                </div>
            ) :
            ( "" )
        }

      </div>
    );
  };

  export default AuthForm;

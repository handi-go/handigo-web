// AuthForm.tsx
import Input from "./input";
import { ButtonPrimary, GoogleButton } from "./buttons";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";


function AuthForm ({ pageTexts, fields, buttons}) {
    return (
      <div className="w-full max-w-4/5"> {/* max-w-md */}
        <h2 className="text-xl md:text-3xl text-[#212121] font-semibold mb-6">{pageTexts.heading}</h2>
        <p className="text-base md:text-lg text-[#949494] font-light mb-6">{pageTexts.paragraph}</p>
        <form className="space-y-2"> {/* onSubmit={onSubmit} */}

            {fields.map((field) => (
                <Input key={field.name} {...field} />
            ))}

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

        <div className="flex justify-center gap-3 mt-8">
            <p className="text-lg font-light ">{pageTexts.pageLinkText}</p>
            <Link to={`/${pageTexts.pageLink.replace(' ', '').toLowerCase()}`}
                className="text-lg font-medium underline text-[#124096]">
                {pageTexts.pageLink}
            </Link>
        </div>
      </div>
    );
  };

  export default AuthForm;

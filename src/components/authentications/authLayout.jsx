// AuthLayout.tsx
import handigoWhite from '../../assets/handigo-brand/Asshandigo-white-color.png'
import handigoMobileMockup from '../../assets/auths/handigo-mobile-mockup.png'
import EllipseTopRight from '../../assets/auths/Ellipse-top-right.png'
import EllipseBottomLeft from '../../assets/auths/Ellipse-bottom-left-rotate.png'



function AuthLayout ({ children, text }) {
    return (
      <div className="flex min-h-screen">
        {/* Left column (Static) */}
        <div className="w-1/2 hidden md:flex relative flex-col gap-20 bg-[#124096] overflow-hidden px-30 py-20">

          <div className="logo-brand w-40">
            <img src={handigoWhite} alt="Company Logo"/>
          </div>

          <div className="content-center text-center">
            <h4 className="text-4xl font-bold  text-white mb-4">Handigo.</h4>
            <p className="text-2xl text-white">{text}</p>
          </div>

          <div className="w-full absolute top-0 left-0">
            <img src={EllipseTopRight} alt="Ellipse background top" className="w-full block" />
          </div>

          <div className="w-3/4 absolute right-0 bottom-0">
              <img src={handigoMobileMockup} alt="Handigo Mobile Mockup" />
          </div>

          <div className="w-full absolute -bottom-[28rem] -left-[25rem] rotate-45">
            <img src={EllipseBottomLeft} alt="Ellipse background bottom" className="w-full" />
          </div>
        </div>

        {/* Right column (Dynamic) */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-2 md:px-10">
          {children}
        </div>
      </div>
    );
  };

  export default AuthLayout;

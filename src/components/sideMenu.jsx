import { Link, NavLink } from "react-router-dom";
import logo from '../assets/handigo-brand/Asshandigo-white-color.png'
import cn from "../utils/cn";

export default function SideMenu({menuItems}){

    return (
        <aside className="bg-[#0A224E] w-fit h-full md:h-screen px-3 md:px-6 pt-10 md:pt-16 lg:pt-20 pb-4 md:10 lg:pb-14">
            <div className="h-full flex flex-col justify-between">
                <div className="space-y-5">
                    <div className="navbar-brand">
                        <Link to="/dashboard" className="flex justify-start">
                            <img className='w-18 md:w-25 pl-5' src={logo} alt="Handigo-Logo" />
                        </Link>
                    </div>
                    <nav className="flex flex-col items-center md:items-start gap-3 md:gap-4">
                        {
                            menuItems.slice(0, -2).map((item) => (
                                <NavLink key={item.label} to={item.path} className={({ isActive }) =>
                                    cn("w-fit md:w-50 flex items-center gap-3 text-base font-medium rounded-lg hover:text-[#0A224E] hover:bg-white transition-all pl-4 py-2 pr-4 md:pr-16",
                                        isActive ? "bg-white text-[#0A224E]" : "text-white/90"
                                    )
                                }>
                                {item.icon && <item.icon className="w-6 h-6" />}
                                    <span className="hidden md:block">{item.label}</span>
                                </NavLink>
                            ))
                        }
                    </nav>
                </div>
                <div>
                    <nav className="flex flex-col items-center md:items-start gap-3 md:gap-4">
                        {
                            menuItems.slice(-2).map((item) => (
                                <NavLink key={item.label} to={item.path} className={({ isActive }) =>
                                    cn(
                                    "w-fit md:w-50 flex items-center gap-3 text-base font-medium rounded-lg hover:text-[#0A224E] hover:bg-white transition-all pl-4 py-2 pr-4 md:pr-16",
                                    isActive ? "bg-white text-[#0A224E] font-medium" : "text-white/90"
                                    )
                                }>
                                {item.icon && <item.icon className="w-6 h-6" />}
                                    <span className="hidden md:block">{item.label}</span>
                                </NavLink>
                            ))
                        }
                    </nav>
                </div>
            </div>
        </aside>
    )
}
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/handigo-brand/Asshandigo-white-color.png'
import cn from "../utils/cn";


export default function SideMenu({menuItems}){

    return (
        <div>
            <aside className="bg-[#0A224E] w-fit h-screen px-6 pt-10 md:pt-16 lg:pt-20 pb-4 md:10 lg:pb-14 hidden md:block">
            <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="navbar-brand flex justify-start ml-5">
                        <Link to="/dashboard">
                            <img className='w-24' src={logo} alt="Handigo-Logo" />
                        </Link>
                    </div>

                    <nav className="flex flex-col gap-3 md:gap-4">
                        {
                            menuItems.slice(0, -2).map((item) => (
                                <NavLink key={item.label} to={item.path} className={({ isActive }) =>
                                    cn("flex items-center gap-3 text-base font-medium rounded-lg hover:text-[#0A224E] hover:bg-white transition-all pl-4 py-2 pr-4 md:pr-16",
                                        isActive ? "bg-white text-[#0A224E]" : "text-white/90"
                                    )
                                }>
                                {item.icon && <item.icon className="w-6 h-6" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))
                        }
                    </nav>
                </div>

                <div>
                    <nav className="flex flex-col gap-3 md:gap-4">
                        {
                            menuItems.slice(-2).map((item) => (
                                <NavLink key={item.label} to={item.path} className={({ isActive }) =>
                                    cn(
                                      "flex items-center gap-3 text-base font-medium rounded-lg hover:text-[#0A224E] hover:bg-white transition-all pl-4 py-2 pr-4 md:pr-16",
                                      isActive ? "bg-white text-[#0A224E] font-medium" : "text-white/90"
                                    )
                                }>
                                {item.icon && <item.icon className="w-6 h-6" />}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))
                        }
                    </nav>
                </div>
            </div>
            </aside>

            <div className="">

            </div>
        </div>
    )
}
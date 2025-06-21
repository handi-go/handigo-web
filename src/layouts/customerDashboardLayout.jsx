import SideMenu from "../components/sideMenu";
import GlobalSearch from "../components/dashboard/gobalSearch";
import DashboardProfile from "../components/dashboard/dasboardProfile";
import Filter from "../components/dashboard/filter";
// Icons
import { RiWallet3Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import { BsInfoLg } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import MobileSideMenu from "../components/mobileSideMenu";
import { useState } from "react";

export default function CustomerDashboard() {
    const [toggle, settoggle] = useState(false);

    const menuItems = [
      { label: "Dashboard", path: "/cdashboard", icon: AiFillHome },
      { label: "Services", path: "/services", icon: FaUsers },
      { label: "Messages", path: "/messages", icon: BiSolidMessageRounded },
      { label: "Wallet", path: "/cwallet", icon: RiWallet3Fill },
      { label: "Settings", path: "/settings/profile", icon: IoMdSettings },
      { label: `FAQ's`, path: "/faq", icon: BsInfoLg },
      { label: "Support", path: "/support", icon: TbUserQuestion }
    ];

    return (
      <>
        <div className="sticky md:hidden top-0 h-[50px] z-10 block">
            <MobileSideMenu toggle={toggle} settoggle={settoggle} />
        </div>

        <div className="flex h-[93vh] md:h-screen bg-[#eeeeee]">
            <div className="hidden md:block">
                <SideMenu menuItems={menuItems} />
            </div>

            <div className={`block md:hidden ${toggle ? 'h-[93vh] absolute z-5 bg-black/20 w-full': ''}`}>
                {
                    toggle ? <SideMenu menuItems={menuItems} /> : null
                }
            </div>

            {/* Main area with scrollable content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="shrink-0 hidden md:block md:sticky top-0 z-10 bg-[#eeeeee] md:px-4 md:py-4 border-b border-gray-200">
                        <div className="hidden md:flex justify-between items-center gap-x-4">
                        <div className="w-6/12 flex items-center gap-2 md:gap-4">
                            <GlobalSearch />
                            <Filter />
                        </div>
                        <DashboardProfile />
                        </div>
                    </div>

                    <main className="flex-1 min-h-0 overflow-y-auto px-[0px] md:px-4 md:py-6 py-2 space-y-4 md:space-y-8">
                        <Outlet />
                    </main>
            </div>
        </div>
        </>
    );
}


import SideMenu from "../components/sideMenu";
import GlobalSearch from "../components/dashboard/gobalSearch";
import DashboardProfile from "../components/dashboard/dasboardProfile";
import Filter from "../components/dashboard/filter";
// Icons
import { RiWallet3Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineBalance } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { BsInfoLg } from "react-icons/bs";
import { Outlet } from "react-router-dom";

export default function Dashboard(){
     const menuItems = [
            { label: "Dashboard", path: "/dashboard", icon: AiFillHome },
            { label: "Jobs", path: "/job", icon: MdOutlineBalance },
            { label: "Messages", path: "/messages", icon: BiSolidMessageRounded },
            {label: "Wallet", path: "/wallet", icon: RiWallet3Fill},
            {label: "Settings", path: "/settings", icon: IoMdSettings},
            {label: `FAQ's`, path: "/faq", icon: BsInfoLg},
            {label: "Support", path: "/support", icon: TbUserQuestion}
    ];

    return (
        <div className="bg-[#eeeeee]">
            <div className="flex">
                <SideMenu menuItems={menuItems}/>

                <main className="w-full py-8">
                    <div className="w-15/16 container mx-auto space-y-8">
                        <div className="flex justify-between items-center gap-x-4">
                            <div className="w-6/12 flex items-center gap-4">
                                <GlobalSearch />
                                <Filter />
                            </div>
                            <DashboardProfile />
                        </div>

                        {/* Renders the page content */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
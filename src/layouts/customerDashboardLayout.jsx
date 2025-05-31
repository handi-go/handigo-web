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

export default function CustomerDashboard() {
    const menuItems = [
      { label: "Dashboard", path: "/cdashboard", icon: AiFillHome },
      { label: "Services", path: "/services", icon: FaUsers },
      { label: "Messages", path: "/messages", icon: BiSolidMessageRounded },
      { label: "Wallet", path: "/cwallet", icon: RiWallet3Fill },
      { label: "Settings", path: "/settings", icon: IoMdSettings },
      { label: `FAQ's`, path: "/faq", icon: BsInfoLg },
      { label: "Support", path: "/support", icon: TbUserQuestion }
    ];

    return (
      <div className="flex h-screen bg-[#eeeeee]">
        {/* Sidebar (fixed height) */}
        <SideMenu menuItems={menuItems} />

        {/* Main area with scrollable content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Top Bar */}
          <div className="shrink-0 sticky top-0 z-10 bg-[#eeeeee] px-4 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center gap-x-4">
              <div className="w-6/12 flex items-center gap-4">
                <GlobalSearch />
                <Filter />
              </div>
              <DashboardProfile />
            </div>
          </div>

          {/* Scrollable main content below */}
          <main className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-8">
            <Outlet />
          </main>
        </div>
      </div>
    );
}


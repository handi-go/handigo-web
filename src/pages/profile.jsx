

import { RiMapPinRangeFill, RiProfileFill } from 'react-icons/ri';
import ProfileImage from '../../src/assets/messageprofile.png'
import { CiEdit } from 'react-icons/ci';
import { BiSolidUser } from 'react-icons/bi';

export default function Profile() {


  return (
  <div className="space-y-4 md:space-y-8 px-4 py-6">

    <div className="flex justify-between gap-2">
        <div className="text-base md:text-2xl font-medium text-[#1C1C1C] px-2 mt-4 md:mt-0">
            My profile
        </div>

        <button className="text-[13px] text-white hover:bg-[#124096]/90 rounded-lg font-medium bg-[#124096] px-6 py-3">
            View Profile
        </button>
    </div>

    <div className="flex justify-between flex-wrap gap-4 md:gap-2 items-center border rounded-2xl border-[#12409680] px-4 py-3">
        <div className="flex items-center gap-2">
            <div className="w-16 h-16 md:w-22 md:h-22 rounded-full border-4 border-[#124096CC]">
                <img src={ProfileImage} alt="User profile" className="w-full h-full rounded-full" />
            </div>
            <div className="space-y-2">
                <div className="text-xl font-medium text-[#1C1C1C]">
                    Ajayi Jesutofunmi
                </div>
                <div className="flex items-center gap-0.5">
                    <BiSolidUser className="w-4 h-4 md:w-5 md:h-5 fill-[#858585]"/>
                    <span className="text-[13px] tex-[#1C1C1C]">Carpenter</span>
                </div>

                <div className="flex items-center gap-0.5">
                    <RiMapPinRangeFill className="w-4 h-4 md:w-5 md:h-5 fill-[#858585]"/>
                    <span className="text-[13px] tex-[#1C1C1C]">Carpenter</span>
                </div>
            </div>
        </div>

        <div>
            <button className="flex items-center gap-1.5 text-[13px] text-nowrap font-medium  text-[#124096] border border-[#124096] rounded-lg px-3 py-2">
                Request to edit <CiEdit className="w-6 h-6 text-[#124096]" />
            </button>
        </div>
    </div>

    <div className="space-y-4 border rounded-2xl border-[#12409680] px-4 py-3">
        <div>
            <h4 className="text-xl font-medium text-[#1C1C1C]">Personal Information</h4>
        </div>

        <div className="flex">
            <div className="space-y-4">
                <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
                    <div className="text-base text-[#1C1C1C]/60">
                        First Name
                        <p className="text-sm text-black mt-1">Jesutofunmi</p>
                    </div>
                    <div className="text-base text-[#1C1C1C]/60">
                        Last Name
                        <p className="text-sm text-black mt-1">Ajayi</p>
                    </div>
                    <div className="text-base text-[#1C1C1C]/60">
                        Email address
                        <p className="text-sm text-black mt-1">Jesutofunmi@gmail.com</p>
                    </div>
                    <div className="text-base text-[#1C1C1C]/60">
                        Phone Number
                        <p className="text-sm text-black mt-1">2347056338127</p>
                    </div>
                </div>
                <div className="text-base text-[#1C1C1C]/60">
                    Bio
                    <p className="text-sm text-black mt-1">Ajayi Jesutofunmi is a skilled carpenter known for his exceptional craftsmanship and attention to detail. Specializing in custom woodwork, he creates high-quality furniture and structures tailored to clients' needs. With years of experience, Ajayi combines functionality and aesthetics in every project. His passion for the craft continues to inspire and elevate the carpentry profession.</p>
                </div>
            </div>

            <div>
                <button className="flex items-center gap-1.5 text-nowrap text-[13px] font-medium  text-[#124096] border border-[#124096] rounded-lg px-3 py-2">
                    Request to edit <CiEdit className="w-6 h-6 text-[#124096]" />
                </button>
            </div>
        </div>
    </div>

    <div className="space-y-4 border rounded-2xl border-[#12409680] px-4 py-3">
        <div>
            <h4 className="text-xl font-medium text-[#1C1C1C]">Personal Information</h4>
        </div>

        <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="text-base text-[#1C1C1C]/60">
                    Street
                    <p className="text-sm text-black mt-1">Jesutofunmi</p>
                </div>

                <div className="text-base text-[#1C1C1C]/60">
                    City
                    <p className="text-sm text-black mt-1">Ajah</p>
                </div>

                <div className="text-base text-[#1C1C1C]/60">
                    State
                    <p className="text-sm text-black mt-1">Lagos</p>
                </div>

                <div className="text-base text-[#1C1C1C]/60">
                    Postal code
                    <p className="text-sm text-black mt-1">100011</p>
                </div>
            </div>

            <div>
                <button className="flex items-center gap-1.5 text-nowrap text-[13px] font-medium  text-[#124096] border border-[#124096] rounded-lg px-3 py-2">
                    Request to edit <CiEdit className="w-6 h-6 text-[#124096]" />
                </button>
            </div>
        </div>
    </div>

    <div className="space-y-4 border rounded-2xl border-[#12409680] px-4 py-3">
        <div>
            <h4 className="text-xl font-medium text-[#1C1C1C]">Bank Information</h4>
        </div>

        <div className="w-full flex justify-between">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="text-base text-[#1C1C1C]/60">
                    Bank name
                    <p className="text-sm text-black mt-1">UBA</p>
                </div>
                <div className="text-base text-[#1C1C1C]/60">
                    Bank account name
                    <p className="text-sm text-black mt-1">Eniola Daniel</p>
                </div>
                <div className="text-base text-[#1C1C1C]/60">
                    Bank account number
                    <p className="text-sm text-black mt-1">2061195451</p>
                </div>
            </div>

            <div>
                <button className="flex items-center gap-1.5 text-nowrap text-[13px] font-medium  text-[#124096] border border-[#124096] rounded-lg px-3 py-2">
                    Request to edit <CiEdit className="w-6 h-6 text-[#124096]" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

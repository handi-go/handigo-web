import cardImage from "../assets/dashboard/customerCardImage.png"
import hotDealImage from "../assets/dashboard/hotDeal.png"
import CustomerCard from "../components/customer/customerCard"

export default function Customer() {
  return (
    <div className="max-h-screen overflow-y-auto space-y-8 px-4 py-6 mb-200">
      <div>
        <div className="text-2xl font-semibold text-[#1C1C1C]">Hi Jack</div>
        <div className="text-lg font-light text-[#1C1C1C] mt-2">
          What would you like us to handle for you?
        </div>
      </div>

      {/* grid sm:grid-cols-2 lg:grid-cols-3 */}

      <div className="flex md:grid md:grid-cols-3 overflow-x-auto gap-2 md:gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-[#D8E0F0] rounded-lg shadow min-w-11/12 md:min-w-full px-2 md:px-5 pt-2 md:pt-5"
          >
            <div className="flex gap-5">
              <div>
                <img src={hotDealImage} alt="Hot Deal" />
                <div className="mt-4 text-center">
                  <h4 className="text-xs sm:text-lg md:text-[22px] text-[#124096] font-bold">
                    Get 35% OFF
                  </h4>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-[#2A3448] font-medium">
                    On our first Cleaning service
                  </p>
                </div>
              </div>
              <img src={cardImage} alt="Card Visual" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-4">
            <h2 className="text-base md:text-xl text-[#1C1C1C] font-semibold">Popular Artisans</h2>
            <span className="text-sm text-[#1C1C1C99] cursor-pointer">See More</span>
        </div>

        <div className="flex md:overflow-x-auto w-full">
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 w-max">
                {[...Array(4)].map((_, i) => (
                <CustomerCard key={i} />
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react";
import OngoingCard from "../components/jobs/ongoingCard";
import PendingCard from "../components/jobs/pendingCard";
import RequestCard from "../components/jobs/requestCard";
import cn from "../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import JobStatusModal from "../components/jobs/pendingCardStatusModal";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const jobsTabs = [
    {
      name: "Job Request"
    },
    {
      name: "Pending Jobs"
    },
    {
      name: "Ongoing Jobs"
    },
    {
      name: "Completed Jobs"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-2xl font-semibold text-[#1C1C1C]">
        Hi Jesutofunmi
      </div>

      <div>
        <div className="flex gap-4">
          {jobsTabs.map((tab, index) => (
            <button
              key={tab.name}
              className={cn(
                "relative text-base font-medium px-4 py-2 hover:text-[#124096] transition ease-in-out duration-200 group",
                activeTab === index
                  ? "text-[#124096]"
                  : "text-[#858585]"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}

              <div className={cn("absolute left-0 right-0 bottom-0 w-full h-[3px] bg-[#124096] opacity-0 group-hover:opacity-100", activeTab === index ? "opacity-100" : "opacity-0")}></div>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-25">

        <AnimatePresence mode="wait">
            {activeTab === 0 &&
                <div className="grid grid-cols-3 gap-6">
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                </div>
            }
        </AnimatePresence>

        <AnimatePresence mode="wait">
            {activeTab === 1 &&
                <motion.div
                    key="tab-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}

                className="space-y-2">
                    <PendingCard onClick={() => handleCardClick()} />
                    <PendingCard />
                    <PendingCard />
                </motion.div>
            }

        </AnimatePresence>

        <AnimatePresence mode="wait">
            {activeTab === 2 &&
                <motion.div
                key="tab-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-6">
                    <OngoingCard />
                    <OngoingCard />
                    <OngoingCard />
                    <OngoingCard />
                    <OngoingCard />
                    <OngoingCard />
                </motion.div>
            }
        </AnimatePresence>

        <AnimatePresence mode="wait">
            {activeTab === 3 &&
                <motion.div
                    key="tab-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                className="space-y-2">
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                    <PendingCard />
                </motion.div>
            }
        </AnimatePresence>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
            <JobStatusModal onClose={closeModal} />
        </div>
      )}
    </div>
  );
}

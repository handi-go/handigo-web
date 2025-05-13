import { useState } from "react"
import { BsHourglass } from "react-icons/bs"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import JobCompletionLayout from "../../layouts/jobCompletionLayout"
import { RiCameraAiLine } from "react-icons/ri"
import { PiVideoLight } from "react-icons/pi"

export default function JobStatusModal({ onClose }){
    const [step, setStep] = useState(1)

    return (
        <JobCompletionLayout onClose={onClose}>
            {step === 1 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span><IoIosInformationCircleOutline className="text-[#FF0000] w-6 h-6 rotate-180" strokeWidth={6}/></span><h3 className="text-2xl font-bold">Revision Requested</h3>
                    </div>

                    <div className="text-base text-[#1C1C1C] bg-[#F59E9E] rounded-xl p-4">
                        <h4 className="font-medium mb-2">Customer Feedback</h4>
                        <p>The paint color doesn't match what we discussed. Could you fix the bedroom wall and ensure it's the eggshell white we agreed on?</p>
                    </div>

                    <form className="space-y-6">
                        <div className="flex flex-col w-full lg:w-1/2">
                            <label htmlFor="respone" className="text-base mb-2">Your response </label>
                            <textarea className="min-h-[153px] text-base text-[#C8BCCE] border-[1.5px] rounded-lg bord-[#E0DEE0] p-4" name="respone" id="respone" required placeholder="Respond to customer’s feedback"></textarea>
                        </div>

                        <div>
                            <label htmlFor="respone" className="text-base font-medium mb-2">Attach New Evidence </label>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-4 text-base font-medium border rounded-md border-[#7878784D] px-4 py-3">
                                    <RiCameraAiLine className="h-6 w-6" />Add Photos
                                </button>

                                <button className="flex items-center gap-4 text-base font-medium border rounded-md border-[#7878784D] px-4 py-3">
                                    <PiVideoLight className="h-6 w-6" strokeWidth={4}/>Add Videos
                                </button>
                            </div>

                            <div className="flex justify-center gap-5 mt-8">
                                <button onClick={onClose} className="text-[13px] font-medium text-[#124096] border border-[#124096] rounded-lg px-4 py-3">Back to Job</button>
                                <button onClick={() => setStep(2)} className="text-[13px] font-medium text-white bg-[#124096] hover:bg-[#124096]/90 rounded-lg px-4 py-3">Mark as fixed</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            { step === 2 && (
                <div>
                    <div className="flex items-center gap-1">
                    <span><IoCheckmarkCircleOutline className="text-[#4CAF50] w-6 h-6" strokeWidth={2} /></span><h3 className="text-2xl font-semibold text-[#124096]">Are you sure you want to mark this job as completed?</h3>
                    </div>

                    <div className="mt-2">
                    <p className="text-base text-center text-[#124096]">This will notify the customer to review and confirm the job completion. You won't receive payment until the customer confirms.</p>
                    </div>

                    <div className="flex justify-center gap-5 mt-8">
                        <button type="button" onClick={() => setStep(1)} className="text-[13px] font-medium text-[#124096] border border-[#124096] rounded-lg px-4 py-3">Cancel</button>
                        <button type="button" onClick={() => setStep(3)} className="text-[13px] font-medium text-white bg-[#124096] hover:bg-[#124096]/90 rounded-lg px-4 py-3">Confirm</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <div className="flex flex-col items-center text-center justify-center gap-1">
                    <span><BsHourglass className="text-[#124096] w-8 h-8" /></span><h3 className="text-2xl font-semibold text-[#124096]">Awaiting Customer Confirmation</h3>
                    </div>

                    <div className="mt-1">
                      <p className="text-base text-center text-[#124096]">You have marked this job as completed. Waiting for the customer to confirm.</p>
                    </div>

                    <div className="text-center text-base text-[#124096] bg-[#7791C2CC] rounded-lg py-2 px-2 mt-3">
                      The customer will be notified to review and confirm the job completion.
                    </div>
                </div>
            )}
        </JobCompletionLayout>
    )
}
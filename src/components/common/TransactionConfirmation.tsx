import { useWaitForTransactionReceipt } from "wagmi";
import { FiLoader, FiCheckCircle, FiXCircle, FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import CopiableText from "./CopiableText";

export default function TransactionConfirmation(
    { hash, onConfirmation }: 
    { hash: `0x${string}` | undefined, onConfirmation?: ()=> {} }) {
    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        isError,
        failureReason,
        error,
        status
    } = useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (isConfirmed && onConfirmation) {
            onConfirmation();
        }
    }, [isConfirmed]);
    return (
        hash && (
            <div className="mt-5 p-4 border border-gray-600 rounded-lg max-w-full overflow-hidden relative">
                <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-lg  flex items-center">
                        Transaction Status
                    </div>
                </div>

                <CopiableText title="Hash" text={hash} />

                {isConfirming && (
                    <div className="mt-3 flex items-center text-yellow-400 font-medium">
                        <BiLoaderAlt className="animate-spin mr-2" size={22} />
                        Waiting for transaction confirmation...
                    </div>
                )}

                {isConfirmed && (
                    <div className="mt-3 flex items-center text-green-600 font-medium">
                        <FaCheckCircle size={20} className="mr-2" />
                        Transaction confirmed successfully!
                    </div>
                )}

                {isError && (
                    <div className="mt-3 flex items-center font-medium">
                        <div>
                            <div className="text-red-500 font-semibold">Transaction Failed</div>
                            <div className="text-red-400">
                                {failureReason
                                    ? `Reason: ${failureReason}`
                                    : error?.message || "An unknown error occurred."}
                            </div>
                        </div>
                    </div>
                )}

                {status && (
                    <div className="mt-4  text-sm">
                        <strong>Status:</strong> {status}
                    </div>
                )}
            </div>
        )
    );
}

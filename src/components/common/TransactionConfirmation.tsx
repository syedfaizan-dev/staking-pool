import { useWaitForTransactionReceipt } from "wagmi";
import { FiLoader, FiCheckCircle, FiXCircle, FiCopy } from "react-icons/fi";
import { useState } from "react";

export default function TransactionConfirmation({ hash }: { hash: `0x${string}` | undefined }) {
    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        isError,
        failureReason,
        error,
        status
    } = useWaitForTransactionReceipt({ hash });

    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        if (hash) {
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        hash && (
            <div className="mt-5 p-4 border rounded-lg max-w-full overflow-hidden relative">
                <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-lg text-gray-700 flex items-center">
                        Transaction Status
                    </div>
                    <div className="flex flex-row space-x-4">
                        <button
                            onClick={copyToClipboard}
                            className="text-gray-600 hover:text-blue-500 flex items-center"
                            title="Copy to clipboard"
                        >
                            <FiCopy className="mr-1" />
                            {copied ? "Copied!" : "Copy Hash"}
                        </button>
                    </div>
                </div>

                <div className="p-3 bg-gray-50 border rounded break-words text-sm text-gray-800">
                    <strong>Transaction Hash:</strong> {hash}
                </div>

                {isConfirming && (
                    <div className="mt-3 flex items-center text-blue-500 font-medium">
                        <FiLoader className="animate-spin mr-2" size={20} />
                        Waiting for transaction confirmation...
                    </div>
                )}

                {isConfirmed && (
                    <div className="mt-3 flex items-center text-green-600 font-medium">
                        <FiCheckCircle size={20} className="mr-2" />
                        Transaction confirmed successfully!
                    </div>
                )}

                {isError && (
                    <div className="mt-3 p-3 bg-red-100 border-l-4 border-red-500 rounded flex items-start">
                        <FiXCircle size={20} className="text-red-600 mr-2" />
                        <div>
                            <div className="text-red-600 font-semibold">Transaction Failed</div>
                            <div className="text-gray-700">
                                {failureReason
                                    ? `Reason: ${failureReason}`
                                    : error?.message || "An unknown error occurred."}
                            </div>
                        </div>
                    </div>
                )}

                {status && (
                    <div className="mt-4 text-gray-600 text-sm">
                        <strong>Status:</strong> {status}
                    </div>
                )}
            </div>
        )
    );
}

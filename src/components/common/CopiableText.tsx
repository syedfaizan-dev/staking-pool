import { useState } from "react";
import { FiCopy } from "react-icons/fi";

export default function CopiableText({
    title,
    text,
}: {
    title?: string | undefined;
    text: string | undefined;
}) {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        if (text) {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    if (!text) {
        return null;
    }

    return (
        <div className="flex flex-col space-y-0 p-2 bg-zinc-800 rounded break-words text-sm">
            <div className="flex justify-between">
                {title && <p className="font-bold whitespace-nowrap">{title}:</p>}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center"
                    title="Copy to clipboard"
                >
                    <FiCopy className="mr-1" />
                    {copied && "Copied!"}
                </button>
            </div>
            <p
                className="break-words whitespace-normal overflow-hidden"
            >
                {text}
            </p>
        </div>
    );
}

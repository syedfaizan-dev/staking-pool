"use client"
import { Account } from "@/components/Account";
import ConnectWallet from "@/components/ConnectWallet";

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-8 p-8">
            <div className="flex justify-center">
                <ConnectWallet />
            </div>
            <Account />
        </div>
    );
}
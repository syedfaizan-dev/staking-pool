"use client";
import { Account } from "@/components/Account";
import ConnectWallet from "@/components/ConnectWallet";

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <ConnectWallet />
        </div>
        <Account />
      </div>
    </div>
  );
}

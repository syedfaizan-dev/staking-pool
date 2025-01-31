"use client";
import { Account } from "@/components/Account";
import ConnectWallet from "@/components/ConnectWallet";

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Account />
        <div className="flex justify-center mt-4">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}

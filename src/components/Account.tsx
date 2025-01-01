"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { FaQrcode } from "react-icons/fa";
import Button from "./common/Button";
import Card from "./common/Card";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";

export function Account() {
  const { address, isConnected, connector, chain, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  if (!isConnected) {
    return (
      <Card>
        <div className="text-center ">
          <p className="text-lg font-semibold">You are not connected</p>
          <p>Click "Connect Wallet" to get started!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center space-x-6">
        <img
          src={ensAvatar || "default-avatar.jpg"}
          alt="ENS Avatar"
          className="w-20 h-20 rounded-full border border-black"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {ensName || "Unnamed Account"}
          </h2>
          <div className="flex flex-row space-x-4">
            <p>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <button
              onClick={copyToClipboard}
              className="flex items-center"
              title="Copy to clipboard"
            >
              <FiCopy className="mr-1" />
              {copied && "Copied!"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="font-medium">
          <b>Connector: </b> {connector?.name}
        </p>
        <p className="font-medium">
          <b>Status: </b> {status}
        </p>
        <div>
          <b>{chain?.testnet ? "Testnet:" : "Mainnet:"}</b> {chain?.name}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 hover:text-gray-300"
            onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
          >
            <FaQrcode />
            <span>View on Explorer</span>
          </button>
        </div>
      </div>

      <Button onClick={() => disconnect()} variant="danger">
        Disconnect
      </Button>
    </Card>
  );
}

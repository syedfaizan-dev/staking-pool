"use client";

import { useEffect, useState } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { poolConfig } from "@/config/poolConfig";
import Error from "./common/Error";
import TransactionConfirmation from "./common/TransactionConfirmation";
import { BaseError } from "viem";
import { tokenConfig } from "@/config/tokenConfig";
import Modal from "./common/Modal";
import ApproveToken from "./token/ApproveToken";
import Link from "next/link";
import { TbRefresh } from "react-icons/tb";
import WalletNotConnect from "./common/WalletNotConnect";

export default function StakingPool({
  title,
  desc,
  contractFunction,
}: {
  title: string;
  desc: string;
  contractFunction: string;
}) {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [allowance, setAllowance] = useState<string>("0");
  const [balance, setBalance] = useState<string>("0"); // State for balance

  const { address } = useAccount();
  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract();

  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    isRefetching: isAllowanceRefetching,
    refetch: allowanceRefetch
  } = useReadContract({
    ...tokenConfig,
    functionName: "allowance",
    args: [address!, poolConfig.address],
    query: {
      enabled: !!address, // Only enable query if address is available
    },
  });

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
    isRefetching: isBalanceRefetching,
    refetch: balanceRefetch
  } = useReadContract({
    ...tokenConfig,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address, // Only enable query if address is available
    },
  });

  // Update allowance when data changes
  useEffect(() => {
    if (allowanceData) {
      setAllowance(allowanceData.toString());
    }
  }, [allowanceData]);

  // Update balance when data changes
  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.toString());
    }
  }, [balanceData]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // Handle staking
  async function onStake() {
    if (parseFloat(amount) > parseFloat(balance)) {
      alert("You cannot stake more than your balance.");
      return;
    }
    if (parseFloat(amount) > parseFloat(allowance)) {
      alert("You cannot stake more than your allowance.");
      return;
    }

    try {
      writeContract({
        ...poolConfig,
        functionName: contractFunction,
        args: [amount],
      });
    } catch (error) {
      console.error("Error during stake transaction:", error);
    }
  }

  // Toggle modal visibility
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const onRefreshClick = async () => {
    await allowanceRefetch();
    await balanceRefetch();
  };
  return (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mb-6">{desc}</p>

      {address ? <div>
        <div className="mb-4">
        <Input
          type="number"
          placeholder="Enter staking amount"
          onChange={handleChange}
          value={amount}
        />
      </div>
      <div className="flex justify-between mb-6">
        <Button
          variant="primary"
          onClick={onStake}
          disabled={
            !amount ||
            !address ||
            isBalanceLoading ||
            isAllowanceLoading ||
            parseFloat(amount) > parseFloat(balance) ||
            parseFloat(amount) > parseFloat(allowance)
          }
          isLoading={isPending}
        >
          Stake
        </Button>
        <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={onRefreshClick}>
          <TbRefresh
            size={24}
            className={`${isAllowanceRefetching || isBalanceRefetching || isBalanceLoading || isAllowanceLoading ? "animate-spin" : ""
              }`}
          />
          <span>Refresh</span>
        </div>
      </div>
      {parseFloat(amount) > parseFloat(balance) && (
          <p className="text-red-500">
            You cannot stake more than your balance.
          </p>
        )}
        {parseFloat(amount) > parseFloat(allowance) && (
          <p className="text-red-500">
            You cannot stake more than your allowance.
          </p>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 border border-zinc-500 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Allowance</h3>
          <p className="font-mono text-xl">{allowance}</p>
          <div
            className="text-blue-500 underline cursor-pointer"
            onClick={toggle}
          >
            Approve more
          </div>
        </div>

        <div className="p-4 border border-zinc-500 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Balance</h3>
          <p className="font-mono text-xl">{balance}</p>
          <Link href="/token" className="text-blue-500 mt-2 underline">
            Buy more
          </Link>
        </div>
      </div>

      {error && (
        <Error error={(error as BaseError)?.shortMessage || error?.message} />
      )}
      <TransactionConfirmation hash={hash} />
      <Modal isOpen={isOpen} onClose={toggle}>
        <ApproveToken spenderProp={poolConfig.address} />
      </Modal>
      </div> : <WalletNotConnect/>}
    </>
  );
}
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

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-6">{desc}</p>
      <Input
        type="number"
        placeholder="Staking Amount"
        onChange={handleChange}
        value={amount}
      />
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
      {parseFloat(amount) > parseFloat(balance) && (
        <p className="text-red-500 mt-2">
          You cannot stake more than your balance.
        </p>
      )}
      {parseFloat(amount) > parseFloat(allowance) && (
        <p className="text-red-500 mt-2">
          You cannot stake more than your allowance.
        </p>
      )}
      {/* New sections for Allowance and Balance */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Allowance Section */}
        <div className="p-4 border border-zinc-600 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Your Allowance For Pool</h3>
          <p className="text-gray-600">
            <strong>{allowance}</strong>
          </p>
          <p
            className="text-cyan-400 cursor-pointer underline mt-2"
            onClick={toggle}
          >
            Approve more to stake more
          </p>
        </div>

        {/* Balance Section */}
        <div className="p-4 border border-zinc-600 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Your Balance For PYRO Token</h3>
          <p className="text-gray-600">
            <strong>{balance}</strong>
          </p>
          <Link
            href="/token"
            className="text-cyan-400 cursor-pointer underline mt-2"
          >
            Buy more to stake more
          </Link>
        </div>
      </div>

      {/* Existing error and modal */}
      {error && (
        <Error error={(error as BaseError)?.shortMessage || error?.message} />
      )}
      <TransactionConfirmation hash={hash} />
      <Modal isOpen={isOpen} onClose={toggle}>
        <ApproveToken spenderProp={poolConfig.address} />
      </Modal>
    </div>
  );

}

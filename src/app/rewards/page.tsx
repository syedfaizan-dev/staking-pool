"use client";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Error from "@/components/common/Error";
import TransactionConfirmation from "@/components/common/TransactionConfirmation";
import { poolConfig } from "@/config/poolConfig";
import { FaStar } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { BaseError } from "viem";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";

export default function Page() {
    const { address } = useAccount();

    const {
        data,
        isError,
        error,
        refetch,
        isRefetching,
    } = useReadContracts({
        contracts: [
            {
                ...poolConfig,
                functionName: 'isRewardFixed',
                args: [address!]
            },
            {
                ...poolConfig,
                functionName: 'isRewardFlexible',
                args: [address!]
            },
            {
                ...poolConfig,
                functionName: 'getRankInFlexible',
                args: [address!]
            },
        ]
    });

    const [isRewardFixed, isRewardFlexible, rank] = data || [];
    const {
        data: hash,
        error: claimError,
        isPending: isClaimPending,
        writeContract
    } = useWriteContract();

    // Helper function to determine eligibility
    const getRewardStatus = (reward: any) => {
        if (reward?.error) {
            if (reward.error.cause?.reason === '!staked') {
                return 'Stake some amount first'
            }
            return reward.error.cause?.reason || "Unknown error";
        }

        if (reward?.result) {
            return "Reward Available";
        } else {
            return "Reward Not Available";
        }
    };

    async function submitForFixed() {
        writeContract({
            ...poolConfig,
            functionName: 'getRewardFixed',
            args: [],
        });
    }

    async function submitForFlexible() {
        writeContract({
            ...poolConfig,
            functionName: 'getRewardFlexible',
            args: [],
        });
    }
    const onRefreshClick = async () => {
        await refetch();
    };
    const getRankIcon = () => {
        switch (rank?.result) {
            case BigInt(1):
                return (
                    <div className="flex items-center gap-2">
                        <MdWorkspacePremium size={20} className="text-yellow-500" title="Gold Rank" />
                        <span>Gold Rank</span>
                    </div>
                );
            case BigInt(2):
                return (
                    <div className="flex items-center gap-2">
                        <IoDiamondSharp className="text-blue-500" title="Diamond Rank" />
                        <span>Diamond Rank</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2">
                        <FaStar className="text-gray-500" title="Basic Rank" />
                        <span>Basic Rank</span>
                    </div>
                );
        }
    };
    return (
        <div className="flex justify-center p-8">
            <Card>
                <div>
                    <h2 className="mt-2 text-center text-2xl font-bold">Your Rewards</h2>
                    <p className="mt-2 text-center text-sm">
                        Check and claim your rewards below.
                    </p>
                </div>
                <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={onRefreshClick}>
                    <TbRefresh
                        size={30}
                        className={`${isRefetching ? 'animate-spin' : ''}`}
                        title="Refresh"
                    />
                    <span>Refresh Rewards</span>
                </div>
                <div className="flex space-x-20 py-7">
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={submitForFixed}
                            disabled={isClaimPending || !isRewardFixed?.result || isError || !!hash}
                            variant="cool"
                            notificationCount={isRewardFixed?.result ? 1 : undefined}
                        >
                            Claim Fixed Reward
                        </Button>
                        {getRewardStatus(isRewardFixed)}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={submitForFlexible}
                            disabled={isClaimPending || !isRewardFlexible?.result || isError || !!hash}
                            variant="pastel"
                            notificationCount={isRewardFlexible?.result ? 1 : undefined}
                        >
                            Claim Flexible Reward
                        </Button>
                        <div className="flex flex-col items-center gap-2">
                            {getRewardStatus(isRewardFlexible)}
                            {getRankIcon()}
                        </div>
                    </div>
                </div>
                <Error error={(error as BaseError)?.shortMessage || error?.message} />
                <Error error={(claimError as BaseError)?.shortMessage || claimError?.message} />
                <TransactionConfirmation hash={hash} onConfirmation={onRefreshClick} />
            </Card>
        </div>
    );
}

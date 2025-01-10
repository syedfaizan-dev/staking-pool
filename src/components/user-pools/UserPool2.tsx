import { poolConfig } from "@/config/poolConfig";
import { TbLoader2 } from "react-icons/tb";
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { BaseError } from "viem";
import Error from "../common/Error";
import Card from "../common/Card";
import Button from "../common/Button";
import TransactionConfirmation from "../common/TransactionConfirmation";
import RankCard from "./RankCard";

export default function UserPool({ poolNo, isFixed }: { poolNo: string; isFixed: boolean }) {
    const { address } = useAccount();

    type ContractResult = {
        result: boolean;
        error?: any; // Adjust this type if you know the structure of `error`
    };
    
    type UseReadContractsData = [ContractResult | undefined, ContractResult | undefined];    
    // Fetch pool activity and reward status
    const { data, isError, error, isPending } = useReadContracts({
        contracts: [
            {
                ...poolConfig,
                functionName: isFixed ? "isActiveFixedPool" : "isActiveFlexiblePool",
                args: [poolNo, address!],
            },
            {
                ...poolConfig,
                functionName: isFixed ? "isRewardFixed" : "isRewardFlexible",
                args: [address!, poolNo],
            },
        ],
    });

    const [isActive, isReward] = (data || []) as UseReadContractsData;

    // Fetch rank data for flexible pools
    const { data: rankData, isError: isRankError, error: rankError } = useReadContract({
        ...poolConfig,
        functionName: "getRankInFlexible",
        args: [address!, poolNo],
        query: {
            enabled: !isFixed && !!isActive?.result, // Fetch rank only for active flexible pools
        },
    });

    // Get reward functionality
    const {
        data: hash,
        error: getRewardError,
        isPending: isGetRewardPending,
        writeContract,
    } = useWriteContract();

    async function onGetReward() {
        writeContract({
            ...poolConfig,
            functionName: isFixed ? "getRewardFixed" : "getRewardFlexible",
            args: [poolNo],
        });
    }

    return (
        <Card>
            {/* Loader */}
            {isPending ? (
                <div className="flex items-center justify-center py-4">
                    <TbLoader2 className="animate-spin text-blue-500" size={30} />
                </div>
            ) : (
                <>
                    {/* Pool Activity Status */}
                    {isActive?.result === true ? (
                        <div className="mb-4 text-green-600 font-bold">
                            Pool #{poolNo} is <span className="text-green-800">Active</span>.
                        </div>
                    ) : isActive?.result === false ? (
                        <div className="mb-4 text-red-600 font-bold">
                            Pool #{poolNo} is <span className="text-red-800">Inactive</span>.
                        </div>
                    ) : null}

                    {/* Show reward status only if the pool is active */}
                    {isActive?.result && (
                        <div className="mb-4">
                            {isReward?.result === true ? (
                                <div className="text-green-600">Reward is available for this pool.</div>
                            ) : isReward?.result === false ? (
                                <div className="text-gray-600">No reward available currently.</div>
                            ) : null}
                        </div>
                    )}

                    {/* Rank Card for Flexible Pools */}
                    {!isFixed && isActive?.result && (
                        <div className="mb-4">
                            {isRankError ? (
                                <Error error={(rankError as BaseError)?.shortMessage || rankError?.message} />
                            ) : (
                                <RankCard rankNo={rankData} />
                            )}
                        </div>
                    )}

                    {/* Get Reward Button */}
                    {isActive?.result && isReward?.result && (
                        <div className="mb-4">
                            <Button
                                onClick={onGetReward}
                                isLoading={isGetRewardPending}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Claim Reward
                            </Button>
                        </div>
                    )}

                    {/* Transaction Confirmation */}
                    {hash && (
                        <TransactionConfirmation hash={hash} />
                    )}
                </>
            )}

            {/* Error Handling */}
            {isError && (
                <Error error={(error as BaseError)?.shortMessage || error?.message} />
            )}
            {getRewardError && (
                <Error error={(getRewardError as BaseError)?.shortMessage || getRewardError?.message} />
            )}
        </Card>
    );
}

import { useAccount, useReadContract } from "wagmi";
import { poolConfig } from "@/config/poolConfig";
import Error from "../common/Error";
import { BaseError } from "viem";
import CopiableText from "../common/CopiableText";

export default function UserPoolInfo({ poolNo, isFixed }: { poolNo: string; isFixed: boolean }) {
    const { address } = useAccount();

    // Fetch Pool ID
    const { data: poolID, isError: isPoolIdError, error: poolIdError } = useReadContract({
        ...poolConfig,
        functionName: isFixed ? "userFixedPoolIds" : "userFlexiblePoolIds",
        args: [address!, poolNo],
    });

    // Define the expected type for pool data
    type PoolData = [BigInt, BigInt] | undefined;
    // Fetch Pool Details
    const { data, isError, error } = useReadContract({
        ...poolConfig,
        functionName: isFixed ? "fixedPool" : "flexiblePool",
        args: [poolID, address!],
        query: {
            enabled: !!poolID, // Only fetch if poolID is defined
        },
    });

    // Destructure data as an array
    const poolData = data as PoolData;
    const stakeAmount = poolData ? poolData[0] : null;
    const stakeTime = poolData ? poolData[1] : null;

    return (
        <div className="space-y-3">
            {/* Pool ID Section */}
            <div>
                {poolID ? (
                    <p className="overflow-hidden">
                        <CopiableText title="Pool ID" text={poolID.toString()} />
                    </p>
                ) : isPoolIdError ? (
                    <Error error={(poolIdError as BaseError)?.shortMessage || poolIdError?.message} />
                ) : (
                    <p>Loading Pool ID...</p>
                )}
            </div>

            {/* Pool Details Section */}
            <div>
                {data ? (
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Stake Amount:</span>{" "}
                            {stakeAmount ? `${stakeAmount.toString()} tokens` : "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold">Stake Time:</span>{" "}
                            {stakeTime
                                ? new Date(Number(stakeTime) * 1000).toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                ) : isError ? (
                    <Error error={(error as BaseError)?.shortMessage || error?.message} />
                ) : (
                    <p>Loading Pool Details...</p>
                )}
            </div>
        </div>
    );
}

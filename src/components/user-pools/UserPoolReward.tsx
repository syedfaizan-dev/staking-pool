import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Button from "../common/Button";
import TransactionConfirmation from "../common/TransactionConfirmation";
import RankCard from "./RankCard";
import { poolConfig } from "@/config/poolConfig";
import Error from "../common/Error";
import { BaseError } from "viem";

export default function UserPoolReward({ poolNo, isFixed }: { poolNo: string; isFixed: boolean }) {
    const { address } = useAccount();    
    const { data: isReward, isError: isRewardError, error: rewardError } = useReadContract({
        ...poolConfig,
        functionName: isFixed ? "isRewardFixed" : "isRewardFlexible",
        args: [address!, poolNo],
    });
    const { data: rankData, isError: isRankError, error: rankError } = useReadContract({
        ...poolConfig,
        functionName: "getRankInFlexible",
        args: [address!, poolNo],
        query: {
            enabled: !isFixed
        }
    })
    const {
        data: hash,
        error: getRewardError,
        isPending: isGetRewardPending,
        writeContract
    } = useWriteContract()
    async function onGetReward() {
        writeContract({
            ...poolConfig,
            functionName: isFixed ? 'getRewardFixed' : 'getRewardFlexible',
            args: [poolNo],
        })
    }
    return (
        <div className="space-y-3">
            {isReward === false ? (
                <div>No reward for now</div>
            ) : null}
            <Error error={(rewardError as BaseError)?.shortMessage || rewardError?.message} />
            <Button
                disabled={!isReward}
                notificationCount={isReward ? 1 : undefined}
                onClick={onGetReward}
                isLoading={isGetRewardPending}
                variant="forest"
            >
                Get Reward
            </Button>
            <TransactionConfirmation hash={hash} />
            <Error error={(getRewardError as BaseError)?.shortMessage || getRewardError?.message} />
            {!isFixed && <RankCard rankNo={rankData} />}
            <Error error={(rankError as BaseError)?.shortMessage || rankError?.message} />
        </div>
    );
}
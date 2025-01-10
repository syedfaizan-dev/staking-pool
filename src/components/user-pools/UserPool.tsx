import { poolConfig } from "@/config/poolConfig";
import { TbLoader2 } from "react-icons/tb";
import { useAccount, useReadContract } from "wagmi";
import { BaseError } from "viem";
import Error from "../common/Error";
import Card from "../common/Card";
import UserPoolReward from "./UserPoolReward";
import UserPoolInfo from "./UserPoolInfo";


export default function UserPool({ poolNo, isFixed }: { poolNo: string; isFixed: boolean }) {
    const { address } = useAccount();
    const { data: isActive, isError, error, isPending } = useReadContract({
        ...poolConfig,
        functionName: isFixed ? "isActiveFixedPool" : "isActiveFlexiblePool",
        args: [poolNo, address!],
    });
    if(isActive === false) {
        return <></>
    }
    return (
        <Card>
            {isPending ? (
                <TbLoader2 className="animate-spin" size={25} />
            ) : (
                <>
                    {isActive === true ? (
                        <>
                            <UserPoolInfo isFixed={isFixed} poolNo={poolNo} />
                            <UserPoolReward isFixed={isFixed} poolNo={poolNo} />
                        </>
                    ) : null}
                </>
            )}

            {isError && (
                <Error error={(error as BaseError)?.shortMessage || error?.message} />
            )}
        </Card>
    );
}

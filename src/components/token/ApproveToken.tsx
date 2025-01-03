import * as React from "react";
import { type BaseError, useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { tokenConfig } from "@/config/tokenConfig";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import Error from "../common/Error";
import TransactionConfirmation from "../common/TransactionConfirmation";

const ApproveToken = ({spenderProp}: {spenderProp?: string}) => {
    const { address } = useAccount();

    const [spender, setSpender] = React.useState<string>(spenderProp ? spenderProp : "");
    const [amount, setAmount] = React.useState<string>("");

    const {
        data: hash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    async function submit() {
        try {
            writeContract({
                ...tokenConfig,
                functionName: "approve",
                args: [spender, amount],
            });
        } catch (error) {
            console.error("Error during approve transaction:", error);
        }
    }

    return (
        <Card>
            <h2 className="text-2xl font-semibold mb-4">Approve Token Spending</h2>
            <Input
                type="text"
                placeholder="Spender Address"
                value={spender}
                onChange={(e) => setSpender(e.target.value)}
                disabled={!!spenderProp}
            />
            <Input
                type="number"
                placeholder="Token Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
            />
            <Button
                disabled={isPending || !address || !spender || !amount || !address}
                onClick={submit}
                isLoading={isPending}
            >
                Approve
            </Button>
            <Error error={(error as BaseError)?.shortMessage || error?.message}/>
            <TransactionConfirmation hash={hash}/>
        </Card>
    );
};

export default ApproveToken;

import * as React from "react";
import { type BaseError, useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { tokenConfig } from "@/config/tokenConfig";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import Error from "../common/Error";
import TransactionConfirmation from "../common/TransactionConfirmation";

const TransferToken = () => {
    const { address } = useAccount();

    const [recipient, setRecipient] = React.useState<string>("");
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
                functionName: "transfer",
                args: [recipient, amount],
            });
        } catch (error) {
            console.error("Error during transfer transaction:", error);
        }
    }

    return (
        <Card>
            <h2 className="text-2xl font-semibold mb-4">Transfer Tokens</h2>
            <Input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Token Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
            />
            <Button
                disabled={isPending || !address || !recipient || !amount}
                onClick={submit}
                isLoading={isPending}
            >
                Transfer
            </Button>
            <Error error={(error as BaseError)?.shortMessage || error?.message} />
            <TransactionConfirmation hash={hash} />
        </Card>
    );
};

export default TransferToken;

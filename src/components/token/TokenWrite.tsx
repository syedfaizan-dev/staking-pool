import * as React from 'react'
import {
    useAccount,
    useWriteContract
} from 'wagmi'
import { BaseError, parseEther } from 'viem'
import { tokenConfig } from '@/config/tokenConfig';
import Card from '../common/Card';
import Button from '../common/Button';
import Error from '../common/Error';
import TransactionConfirmation from '../common/TransactionConfirmation';
import Input from '../common/Input';

export default function TokenWrite() {
    const [amount, setAmount] = React.useState('')
    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()
    const { address } = useAccount();
    async function submit() {
        writeContract({
            ...tokenConfig,
            functionName: 'mint',
            args: [address!, amount],
        })
    }

    return (
        <Card>
            <h2 className="text-2xl font-semibold mb-4">Mint PYRO Token</h2>
            <Input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button
                disabled={isPending || !address || !amount}
                onClick={submit}
                isLoading={isPending}
            >
                Mint
            </Button>
            <Error error={(error as BaseError)?.shortMessage || error?.message}/>
            
            <TransactionConfirmation hash={hash}/>
        </Card>
    )
}
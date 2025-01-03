import { type BaseError, useAccount, useReadContracts } from 'wagmi';
import Card from '../common/Card';
import Error from '../common/Error';
import { tokenConfig } from '@/config/tokenConfig';
import { TbRefresh } from 'react-icons/tb';

export default function TokenRead() {
    const { address } = useAccount();

    const {
        data,
        isError,
        error,
        isPending,
        refetch,
        isRefetching,
        isRefetchError
    } = useReadContracts({
        contracts: [
            {
                ...tokenConfig,
                functionName: 'balanceOf',
                args: [address!]
            },
            {
                ...tokenConfig,
                functionName: 'totalSupply'
            }
        ]
    });

    const onRefreshClick = async () => {
        await refetch();
    };

    const [balance, totalSupply] = data || [];

    const renderContent = () => {
        if (!address) {
            return <span>Please connect your wallet first.</span>;
        }

        return (
            <div className="flex flex-col gap-4">
                <div className='flex gap-2 items-center'>
                    <TbRefresh
                        size={30}
                        onClick={onRefreshClick}
                        className={`cursor-pointer ${isRefetching ? 'animate-spin' : ''}`}
                        title="Refresh"
                    />
                    Refresh
                </div>
                <span className='flex items-center gap-2'>Your Balance: {balance?.result?.toString() || 'N/A'}</span>
                <span className='flex items-center gap-2'>Total Supply: {totalSupply?.result?.toString() || 'N/A'}</span>
            </div>
        );
    };

    return (
        <Card>
            <h2 className="text-2xl font-semibold mb-4">PYRO Token</h2>
            {isError || isRefetchError && <Error error={(error as BaseError)?.shortMessage || 'An error occurred.'} />}
            {renderContent()}
        </Card>
    );
}

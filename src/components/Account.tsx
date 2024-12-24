import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import Card from './common/Card';
import Button from './common/Button';

export function Account() {
  const { address, isConnected, connector, chain, status } = useAccount();
  const { disconnect, } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  if (!isConnected) {
    return (
      <Card>
        <div className="text-center text-gray-600">
          You are not connected
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center space-x-4 mb-4">
        {ensAvatar && (
          <img
            className="w-16 h-16 rounded-full"
            alt="ENS Avatar"
            src={ensAvatar}
          />
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {ensName ? `${ensName}` : ''}
          </h2>
          <p className="text-gray-500 break-words">
            <b>Address:</b> {address}
          </p>
          <p className="text-gray-500 break-words">
            <b>Connector: </b>{connector?.name}
          </p>
          <p className="text-gray-500 break-words">
            <b>{chain?.testnet ? "Testnet:" : "Mainnet:"} </b>{chain?.name}
          </p>
          <p className="text-gray-500 break-words">
            <b>Status: </b>{status}
          </p>
        </div>
      </div>

      <Button
        onClick={() => disconnect()}
        variant='danger'
      >
        Disconnect
      </Button>
    </Card>
  );
}

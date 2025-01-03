import Card from "./Card";
import { GiWallet } from "react-icons/gi";

export default function WalletNotConnect() {
    return (
        <Card className="flex flex-col items-center">
            <GiWallet size={50} className="text-zinc-500 mb-2" />
            <h2 className="text-2xl font-semibold mb-2">
                Wallet Not Connected
            </h2>
            <p className="mb-4">
                Please connect your wallet to access this feature.
            </p>
        </Card>
    );
}
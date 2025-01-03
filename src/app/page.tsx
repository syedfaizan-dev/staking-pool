import Button from "@/components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <h1 className="text-5xl font-bold mt-10"> Welcome to Syed Faaiz Pools</h1>
      <div className="flex gap-8 justify-center">
        <Link href='/staking-pools'>
          <Button variant="info" shape="circle" className="text-2xl py-5 px-7 hover:scale-125">
            Stake in Pools
          </Button>
        </Link>
        <Link href='/rewards'>
          <Button variant="royal" shape="circle" className="text-2xl py-5 px-7 hover:scale-125">
            Get Rewards
          </Button>
        </Link>
        <Link href='/rewards'>
          <Button variant="neon" shape="circle" className="text-2xl py-5 px-7 hover:scale-125">
            Buy PYROs
          </Button>
        </Link>

      </div>
      <p className="text-lg mb-6">
        Secure and simple staking pools to maximize your rewards. Stake your tokens and earn with ease!
      </p>
    </div>
  );
}

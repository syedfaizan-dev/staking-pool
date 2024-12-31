"use client"
import { useState } from "react";
import Input from "./common/Input";
import Button from "./common/Button";

export default function StakingPool({
  title,
  desc,
  onStake,
}: {
  title: string;
  desc: string;
  onStake: (amount: string) => void;
}) {
  const [amount, setAmount] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleClick = () => {
    onStake(amount); // Pass the amount when the button is clicked
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className=" mb-6">{desc}</p>
      <Input placeholder="Staking Amount" onChange={handleChange} value={amount} />
      <Button variant="primary" onClick={handleClick} >
        Stake
      </Button>
    </div>
  );
}

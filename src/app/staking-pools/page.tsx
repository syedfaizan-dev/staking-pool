"use client"
import { useState } from "react";
import Modal from "@/components/common/Modal";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import StakingPool from "@/components/StakingPool";

export default function Page() {
    const [isFlex, setIsFlex] = useState(false);
    const [isFix, setIsFix] = useState(false);

    const openFlexModal = () => setIsFlex(true);
    const closeFlexModal = () => setIsFlex(false);

    const openFixModal = () => setIsFix(true);
    const closeFixModal = () => setIsFix(false);
    
    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-semibold text-center mb-6">Staking Pools</h1>
                <p className="text-center  mb-8">Choose a pool to stake your tokens and earn rewards based on your staking duration.</p>
                <div className="flex gap-5 justify-center">
                    <Card className="flex flex-col justify-between">                        
                        <div className="mb-6">
                            <h3 className="text-3xl font-semibold mb-4">Fixed Pool</h3>
                            <p className="">
                                Stake any amount greater than 0 tokens.<br />
                                After 2 days, you can claim your staked amount.<br />
                                Reward is 2 Tokens.<br />
                            </p>
                        </div>
                        <Button onClick={openFixModal} variant="forest">
                            Stake in Fixed Pool
                        </Button>
                    </Card>
                    <Card className="flex flex-col justify-between">
                        <div className="mb-6">
                            <h3 className="text-3xl font-semibold mb-4">Flexible Pool</h3>
                            <p className="">
                                Stake between 2 and 50 tokens.<br />
                                Only one stake is allowed at a time.<br />
                                The reward depends on the duration of the stake:<br />
                                &nbsp;&nbsp;&nbsp;• After 3-5 days: Receive a reward of 3 tokens.<br />
                                &nbsp;&nbsp;&nbsp;• After 6-10 days: Receive a reward of 5 tokens.<br />
                                &nbsp;&nbsp;&nbsp;• After 10+ days: Receive a reward of 7 tokens.<br />
                            </p>
                        </div>
                        <Button onClick={openFlexModal} variant="sun">
                            Stake in Flexible Pool
                        </Button>
                    </Card>
                </div>
            </div>

            <Modal isOpen={isFix} onClose={closeFixModal}>
                <StakingPool
                    title="Fixed Pool Staking"
                    desc="Here you can stake your tokens in a fixed pool with guaranteed returns."
                    contractFunction="stakeFixed"
                />
            </Modal>
            <Modal isOpen={isFlex} onClose={closeFlexModal}>
                <StakingPool
                    title="Flexible Pool Staking"
                    desc="Here you can stake tokens in a flexible pool with variable returns."
                    contractFunction="stakeFlexible"
                />
            </Modal>
        </>
    );
}

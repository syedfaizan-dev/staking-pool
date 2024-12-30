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
            <div className="flex justify-center py-8">
                <Card>
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Staking Pools</h1>
                    <p className="text-center text-gray-600 mb-8">Choose a pool to stake your tokens and earn rewards based on your staking duration.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Button
                            onClick={openFixModal}
                            variant="primary"
                        >
                            Fixed Pool
                        </Button>
                        <Button
                            onClick={openFlexModal}
                            variant="success"
                        >
                            Flexible Pool
                        </Button>
                    </div>

                    {/* Instructions Section */}
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Staking Instructions</h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-700">Fixed Pool:</h3>
                            <p className="text-gray-600">
                                - Stake any amount greater than 0 tokens.<br />
                                - After 2 days, you can claim your staked amount.<br />
                                - Reward is 2 Tokens.<br />
                                - Use <b>Get Reward</b> after 2 days to receive your reward.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-700">Flexible Pool:</h3>
                            <p className="text-gray-600">
                                - Stake between 2 and 50 tokens.<br />
                                - Only one stake is allowed at a time.<br />
                                - The reward depends on the duration of the stake:<br />
                                &nbsp;&nbsp;&nbsp;• After 3-5 days: Receive a reward of 3 tokens.<br />
                                &nbsp;&nbsp;&nbsp;• After 6-10 days: Receive a reward of 5 tokens.<br />
                                &nbsp;&nbsp;&nbsp;• After 10+ days: Receive a reward of 7 tokens.<br />
                                - Use <b>Get Reward</b> after the staking period to claim your tokens and rewards.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <Modal isOpen={isFix} onClose={closeFixModal}>
                <StakingPool
                    title="Fixed Pool Staking"
                    desc="Here you can stake your tokens in a fixed pool with guaranteed returns."
                    onStake={(amount: string) => { console.log(amount) }}
                />
            </Modal>
            <Modal isOpen={isFlex} onClose={closeFlexModal}>
                <StakingPool
                    title="Flexible Pool Staking"
                    desc="Here you can stake tokens in a flexible pool with variable returns."
                    onStake={(amount: string) => { console.log(amount) }}
                />
            </Modal>
        </>
    );
}

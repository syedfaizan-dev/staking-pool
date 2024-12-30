"use client"
import { useState } from "react";
import Modal from "@/components/common/Modal";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import StakingPool from "@/components/StakingPool";

export default function StakingPools() {
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={openFixModal} variant="primary">
                            Fixed Pool
                        </Button>
                        <Button onClick={openFlexModal} variant="success">
                            Flexible Pool
                        </Button>
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

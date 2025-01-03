"use client"
import React from 'react';
import { modal } from '@/context';
import Button from './common/Button';
import { useAccount } from 'wagmi';

const ConnectWallet = () => {
  const { address } = useAccount()
  return (
    <Button variant='forest' shape='circle' onClick={() => modal.open()}>
      {address ? 'Wallet Connected' : 'Connect Wallet'}
    </Button>
  )
};

export default ConnectWallet;

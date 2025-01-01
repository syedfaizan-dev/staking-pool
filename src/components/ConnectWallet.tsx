"use client"
import React from 'react';
import { modal } from '@/context';
import Button from './common/Button';

const ConnectWallet = () => {
  return (
    <Button variant='forest' onClick={() => modal.open()}>
      Connect Wallet
    </Button>
  )
};

export default ConnectWallet;

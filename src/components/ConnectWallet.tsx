"use client"
import React from 'react';
import { modal } from '@/context';

const ConnectWallet = () => {
  return (
    <div className='cursor-pointer bg-gray-300 px-4 py-3 rounded-2xl' onClick={() => modal.open()}>
      Connect Wallet
    </div>
  )
};

export default ConnectWallet;

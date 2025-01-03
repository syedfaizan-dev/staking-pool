'use client'
import ApproveToken from '@/components/token/ApproveToken';
import CheckAllowance from '@/components/token/CheckAllowance';
import TokenRead from '@/components/token/TokenRead';
import TokenWrite from '@/components/token/TokenWrite';
import TransferToken from '@/components/token/TransferToken';
import React from 'react';

const TokenPage = () => {
    return (
        <div className="grid grid-cols-3 gap-8 p-8">
            <TokenRead />
            <TokenWrite />
            <TransferToken/>
            <ApproveToken/>
            <CheckAllowance/>
        </div>
    );
};

export default TokenPage;

"use client"
import { poolConfig } from '@/config/poolConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { BsCoin, BsWalletFill } from 'react-icons/bs';
import { FaCoins, FaGift } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { useAccount, useBlockNumber, useReadContracts } from 'wagmi';

interface MenuItem {
  label: string;
  href: string;
  Icon: React.ComponentType;
  hasNotification?: boolean;
  notificationCount?: number;
}

const Sidebar: React.FC = () => {
  const { address } = useAccount();
  const {
    data,
    isError,
    refetch,
  } = useReadContracts({
    contracts: [
      {
        ...poolConfig,
        functionName: 'isRewardFixed',
        args: [address!],
      },
      {
        ...poolConfig,
        functionName: 'isRewardFlexible',
        args: [address!],
      },
    ],
  });
  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    refetch()
  }, [blockNumber])
  const [isRewardFixed, isRewardFlexible] = data || [];
  const rewardCount = (isRewardFixed?.result ? 1 : 0) + (isRewardFlexible?.result ? 1 : 0)

  const menuItems: MenuItem[] = [
    { label: 'My Wallet', href: '/wallet', Icon: BsWalletFill },
    { label: 'Staking Pools', href: '/staking-pools', Icon: FaCoins },
    { label: 'Tokens', href: '/token', Icon: BsCoin },
    {
      label: 'Rewards',
      href: '/rewards',
      Icon: FaGift,
      hasNotification: rewardCount > 0 && !isError,
      notificationCount: rewardCount,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-auto bg-zinc-900 text-white p-5">
      <Link href="/" className="text-lg font-bold flex gap-2 items-center"><span>Faaiz Pools</span><IoIosArrowForward size={24} color="white"/></Link>
      <ul className="space-y-2 mt-8">
        {menuItems.map(({ label, href, Icon, hasNotification, notificationCount }) => (
            <Link href={href}
              key={label}
              className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${pathname === href ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-700'
                }`}
            >
              <div className="flex items-center space-x-3">
                <Icon />
                <span>{label}</span>
              </div>
              {hasNotification && (
                <span className="flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full">
                  {notificationCount}
                </span>
              )}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
import Link from 'next/link';
import React from 'react';
import { BsCoin, BsWalletFill } from 'react-icons/bs';
import { FaCoins, FaGift } from 'react-icons/fa';

interface MenuItem {
  label: string;
  href: string;
  Icon: React.ComponentType;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { label: "My Wallet", href: "/wallet", Icon: BsWalletFill },
    { label: "Staking Pools", href: "/staking-pools", Icon: FaCoins },
    { label: "Tokens", href: "/token", Icon: BsCoin },
    { label: "Rewards", href: "/rewards", Icon: FaGift },
  ];

  return (
    <div className="min-h-screen w-auto bg-zinc-900 text-white p-5">
      <div className="text-lg font-bold mb-6">Staking Pool</div>
      <ul className="space-y-4">
        {menuItems.map(({ label, href, Icon }) => (
          <li key={label} className="flex items-center space-x-3">
            <Icon />
            <Link href={href} className="hover:text-gray-300">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

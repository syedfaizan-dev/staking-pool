import React from 'react';
import { FaCoins, FaGift, FaWallet, FaHistory, FaEnvelope, FaTachometerAlt } from 'react-icons/fa';

interface MenuItem {
  label: string;
  href: string;
  Icon: React.ComponentType;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { label: "Staking Pools", href: "/staking-pools", Icon: FaCoins },
    { label: "Rewards", href: "/rewards", Icon: FaGift },
    { label: "My Staking", href: "/my-staking", Icon: FaWallet },
    { label: "Transactions", href: "/transactions", Icon: FaHistory },
    { label: "Contact", href: "/contact", Icon: FaEnvelope },
    { label: "Dashboard", href: "/dashboard", Icon: FaTachometerAlt }
  ];

  return (
    <div className="min-h-screen w-auto bg-gray-800 text-white p-5">
      <div className="text-lg font-bold mb-6">Staking Pool</div>
      <ul className="space-y-4">
        {menuItems.map(({ label, href, Icon }) => (
          <li key={label} className="flex items-center space-x-3">
            <Icon />
            <a href={href} className="hover:text-gray-300">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

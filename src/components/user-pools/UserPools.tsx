"use client";
import { useAccount, useReadContracts } from "wagmi";
import UserPool from "./UserPool";
import { poolConfig } from "@/config/poolConfig";
import { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

export default function UserPools() {
  const { address } = useAccount();
  const [noOfFixedPools, setNoOfFixedPools] = useState<number>(0);
  const [noOfFlexiblePools, setNoOfFlexiblePools] = useState<number>(0);

  const { data, isError, isPending } = useReadContracts({
    contracts: [
      {
        ...poolConfig,
        functionName: "getNoOfFixedPools",
        args: [address!],
      },
      {
        ...poolConfig,
        functionName: "getNoOfFlexiblePools",
        args: [address!],
      },
    ],
  });

  // Update pool counts when data changes
  useEffect(() => {
    if (data) {
      setNoOfFixedPools(Number(data[0]?.result || 0));
      setNoOfFlexiblePools(Number(data[1]?.result || 0));
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <TbLoader2 className="animate-spin text-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching pool data:</p>
        <pre>{JSON.stringify(isError, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Fixed Pools */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Fixed Pools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: noOfFixedPools }, (_, index) => (
            <UserPool key={`fixed-${index}`} poolNo={String(index + 1)} isFixed />
          ))}
        </div>
      </section>

      {/* Flexible Pools */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Flexible Pools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: noOfFlexiblePools }, (_, index) => (
            <UserPool key={`flexible-${index}`} poolNo={String(index + 1)} isFixed={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

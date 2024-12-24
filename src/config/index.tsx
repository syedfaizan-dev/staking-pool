import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia , mainnet, solana, optimism, polygonZkEvm, arbitrum, base, avalanche } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = 'fcdad581759242d26b545a46c5856ba3'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Define custom transports (RPC URLs)
const transports = {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [solana.id]: http('https://solana-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [optimism.id]: http('https://opt-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [polygonZkEvm.id]: http('https://polygonzkevm-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [arbitrum.id]: http('https://arb-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [base.id]: http('https://base-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey'),
    [avalanche.id]: http('https://avax-mainnet.g.alchemy.com/v2/lsUmQ2p2NqlCGzT_jTKvdR9JYB3fU2ey')
}

// Configure networks
export const networks = [mainnet, sepolia, solana, optimism, polygonZkEvm, arbitrum, base, avalanche]

// Set up the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks,
    transports,
})

export const config = wagmiAdapter.wagmiConfig
import { ChainId } from '@0x590fab/sdk-core'

const GQL_CHAINS = [ChainId.MAINNET, ChainId.OPTIMISM, ChainId.POLYGON, ChainId.ARBITRUM_ONE, ChainId.CELO] as const
type GqlChainsType = (typeof GQL_CHAINS)[number]

export function isGqlSupportedChain(chainId: number | undefined): chainId is GqlChainsType {
  return !!chainId && GQL_CHAINS.includes(chainId)
}

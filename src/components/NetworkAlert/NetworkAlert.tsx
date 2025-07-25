import { Trans } from '@lingui/macro'
import { ChainId } from '@0x590fab/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { getChainInfo } from 'constants/chainInfo'
import { ArrowUpRight } from 'react-feather'
import styled from 'styled-components'
import { colors } from 'theme/colors'
import { ExternalLink, HideSmall } from 'theme/components'
import { useDarkModeManager } from 'theme/components/ThemeToggle'

import Column from '../Column'

const L2Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`

const BodyText = styled.div`
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 8px;
  font-size: 14px;
  line-height: 20px;
`
const RootWrapper = styled.div`
  margin-top: 16px;
`

const SHOULD_SHOW_ALERT = {
  [ChainId.OPTIMISM]: true,
  [ChainId.OPTIMISM_GOERLI]: true,
  [ChainId.ARBITRUM_ONE]: true,
  [ChainId.ARBITRUM_GOERLI]: true,
  [ChainId.POLYGON]: true,
  [ChainId.POLYGON_MUMBAI]: true,
  [ChainId.CELO]: true,
  [ChainId.CELO_ALFAJORES]: true,
  [ChainId.BNB]: true,
  [ChainId.PLUME]: true,
  [ChainId.BASE]: true,
}

type NetworkAlertChains = keyof typeof SHOULD_SHOW_ALERT

const BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID: {
  [darkMode in 'dark' | 'light']: { [chainId in NetworkAlertChains]: string }
} = {
  dark: {
    [ChainId.POLYGON]:
      'radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)',
    [ChainId.POLYGON_MUMBAI]:
      'radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)',
    [ChainId.CELO]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)',
    [ChainId.CELO_ALFAJORES]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)',
    [ChainId.BNB]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)',
    [ChainId.OPTIMISM]:
      'radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)',
    [ChainId.OPTIMISM_GOERLI]:
      'radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.04) 0%, rgba(235, 0, 255, 0.01 96%)',
    [ChainId.ARBITRUM_ONE]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.01) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.05) 100%), hsla(0, 0%, 100%, 0.05)',
    [ChainId.ARBITRUM_GOERLI]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.05) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.1) 100%), hsla(0, 0%, 100%, 0.05)',
    [ChainId.PLUME]:
      'radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)',
    [ChainId.BASE]:
      'radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(0, 82, 255, .1) 40%, rgba(0, 82, 255, 0) 100%), rgb(13, 14, 14);',
  },
  light: {
    [ChainId.POLYGON]:
      'radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)',
    [ChainId.POLYGON_MUMBAI]:
      'radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)',
    [ChainId.CELO]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)',
    [ChainId.CELO_ALFAJORES]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)',
    [ChainId.BNB]:
      'radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)',
    [ChainId.OPTIMISM]:
      'radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)',
    [ChainId.OPTIMISM_GOERLI]:
      'radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)',
    [ChainId.ARBITRUM_ONE]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)',
    [ChainId.ARBITRUM_GOERLI]:
      'radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)',
    [ChainId.PLUME]:
      'radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)',
    [ChainId.BASE]:
      'radial-gradient(100% 100% at 50% 0%, rgba(0, 82, 255, 0.20) 0%, rgba(0, 82, 255, 0.08) 40.0%, rgba(252, 255, 82, 0.00) 100%), rgb(255, 255, 255)',
  },
}

const ContentWrapper = styled.div<{ chainId: NetworkAlertChains; darkMode: boolean; logoUrl: string }>`
  background: ${({ chainId, darkMode }) => BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID[darkMode ? 'dark' : 'light'][chainId]};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  width: 100%;

  :before {
    background-image: url(${({ logoUrl }) => logoUrl});
    background-repeat: no-repeat;
    background-size: 300px;
    content: '';
    height: 300px;
    opacity: 0.1;
    position: absolute;
    transform: rotate(25deg) translate(-90px, -40px);
    width: 300px;
    pointer-events: none;
  }
`
const Header = styled.h2`
  font-weight: 535;
  font-size: 16px;
  margin: 0;
`

const LinkOutToBridge = styled(ExternalLink)`
  align-items: center;
  border-radius: 8px;
  color: white;
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  padding: 6px 8px;
  text-decoration: none !important;
  width: 100%;
`

const StyledArrowUpRight = styled(ArrowUpRight)`
  margin-left: 12px;
  width: 24px;
  height: 24px;
`

const TEXT_COLORS: { [chainId in NetworkAlertChains]: string } = {
  [ChainId.POLYGON]: 'rgba(130, 71, 229)',
  [ChainId.POLYGON_MUMBAI]: 'rgba(130, 71, 229)',
  [ChainId.CELO]: 'rgba(53, 178, 97)',
  [ChainId.CELO_ALFAJORES]: 'rgba(53, 178, 97)',
  [ChainId.OPTIMISM]: '#ff3856',
  [ChainId.OPTIMISM_GOERLI]: '#ff3856',
  [ChainId.ARBITRUM_ONE]: '#0490ed',
  [ChainId.BNB]: colors.gold400,
  [ChainId.ARBITRUM_GOERLI]: '#0490ed',
  [ChainId.PLUME]: '#ff3856',
  [ChainId.BASE]: colors.networkBase,
}

function shouldShowAlert(chainId: number | undefined): chainId is NetworkAlertChains {
  return Boolean(chainId && SHOULD_SHOW_ALERT[chainId as unknown as NetworkAlertChains])
}

export function NetworkAlert() {
  const { chainId } = useWeb3React()
  const [darkMode] = useDarkModeManager()

  if (!shouldShowAlert(chainId)) {
    return null
  }

  const chainInfo = getChainInfo(chainId)

  if (!chainInfo) return null

  const { label, logoUrl, bridge } = chainInfo
  const textColor = TEXT_COLORS[chainId]

  return bridge ? (
    <RootWrapper>
      <ContentWrapper chainId={chainId} darkMode={darkMode} logoUrl={logoUrl}>
        <LinkOutToBridge href={bridge}>
          <BodyText color={textColor}>
            <L2Icon src={logoUrl} />
            <Column>
              <Header>
                <Trans>{label} token bridge</Trans>
              </Header>
              <HideSmall>
                <Trans>Deposit tokens to the {label} network.</Trans>
              </HideSmall>
            </Column>
          </BodyText>
          <StyledArrowUpRight color={textColor} />
        </LinkOutToBridge>
      </ContentWrapper>
    </RootWrapper>
  ) : null
}

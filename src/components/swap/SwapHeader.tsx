import { Trans } from '@lingui/macro'
import { Percent } from '@0x590fab/sdk-core'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

import { RowBetween, RowFixed } from '../Row'
import SettingsTab from '../Settings'

const StyledSwapHeader = styled(RowBetween)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.neutral2};
`

const HeaderButtonContainer = styled(RowFixed)`
  padding: 0 12px;
  gap: 16px;
`

export default function SwapHeader({ autoSlippage, chainId }: { autoSlippage: Percent; chainId?: number }) {
  return (
    <StyledSwapHeader>
      <HeaderButtonContainer>
        <ThemedText.SubHeader>
          <Trans>Swap</Trans>
        </ThemedText.SubHeader>
      </HeaderButtonContainer>
      <RowFixed>
        <SettingsTab autoSlippage={autoSlippage} chainId={chainId} />
      </RowFixed>
    </StyledSwapHeader>
  )
}

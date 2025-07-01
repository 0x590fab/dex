import { Trans } from '@lingui/macro'
import { Currency } from '@0x590fab/sdk-core'
import { AutoColumn } from 'components/Column'
import Row from 'components/Row'
import { nativeOnChain } from 'constants/tokens'
import { ReactNode } from 'react'
import { InterfaceTrade } from 'state/routing/types'
import { isPreviewTrade } from 'state/routing/utils'
import styled from 'styled-components'
import { Divider, ExternalLink, ThemedText } from 'theme/components'
import { NumberType, useFormatter } from 'utils/formatNumbers'

const Container = styled(AutoColumn)`
  padding: 4px;
`

type GasCostItemProps = { title: ReactNode; itemValue?: React.ReactNode; amount?: number }

const GasCostItem = ({ title, amount, itemValue }: GasCostItemProps) => {
  const { formatNumber } = useFormatter()

  if (!amount && !itemValue) return null

  const value = itemValue ?? formatNumber({ input: amount, type: NumberType.FiatGasPrice })
  return (
    <Row justify="space-between">
      <ThemedText.SubHeaderSmall>{title}</ThemedText.SubHeaderSmall>
      <ThemedText.SubHeaderSmall color="neutral1">{value}</ThemedText.SubHeaderSmall>
    </Row>
  )
}

type GasBreakdownTooltipProps = { trade: InterfaceTrade }

export function GasBreakdownTooltip({ trade }: GasBreakdownTooltipProps) {
  const inputCurrency = trade.inputAmount.currency
  const native = nativeOnChain(inputCurrency.chainId)

  if (isPreviewTrade(trade)) return <NetworkFeesDescription native={native} />

  const swapEstimate = trade.gasUseEstimateUSD
  const approvalEstimate = trade.approveInfo.needsApprove ? trade.approveInfo.approveGasEstimateUSD : undefined
  const wrapEstimate = undefined
  const showEstimateDetails = Boolean(wrapEstimate || approvalEstimate)

  const description = <NetworkFeesDescription native={native} />

  if (!showEstimateDetails) return description

  return (
    <Container gap="md">
      <AutoColumn gap="sm">
        <GasCostItem title={<Trans>Wrap {native.symbol}</Trans>} amount={wrapEstimate} />
        <GasCostItem title={<Trans>Allow {inputCurrency.symbol} (one time)</Trans>} amount={approvalEstimate} />
        <GasCostItem title={<Trans>Swap</Trans>} amount={swapEstimate} />
      </AutoColumn>
      <Divider />
      {description}
    </Container>
  )
}

function NetworkFeesDescription({ native }: { native: Currency }) {
  return (
    <ThemedText.LabelMicro>
      <Trans>
        The fee paid to the Ethereum network to process your transaction. This must be paid in {native.symbol}.
      </Trans>{' '}
      <ExternalLink href="https://support.uniswap.org/hc/en-us/articles/8370337377805-What-is-a-network-fee-">
        <Trans>Learn more</Trans>
      </ExternalLink>
    </ThemedText.LabelMicro>
  )
}

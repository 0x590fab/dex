import { Currency, CurrencyAmount, Price } from '@0x590fab/sdk-core'
import { Position } from '@uniswap/v3-sdk'
import { AutoColumn } from 'components/Column'
import { PositionPreview } from 'components/PositionPreview'
import styled from 'styled-components'

import { Bound, Field } from '../../state/mint/v3/actions'

const Wrapper = styled.div`
  padding-top: 12px;
`

export function Review({
  position,
  outOfRange,
  ticksAtLimit,
}: {
  position?: Position
  existingPosition?: Position
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  priceLower?: Price<Currency, Currency>
  priceUpper?: Price<Currency, Currency>
  outOfRange: boolean
  ticksAtLimit: { [bound in Bound]?: boolean | undefined }
}) {
  return (
    <Wrapper>
      <AutoColumn gap="lg">
        {position ? (
          <PositionPreview
            position={position}
            inRange={!outOfRange}
            ticksAtLimit={ticksAtLimit}
            title="Selected Range"
          />
        ) : null}
      </AutoColumn>
    </Wrapper>
  )
}

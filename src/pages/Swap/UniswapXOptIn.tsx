import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import UniswapXBrandMark from 'components/Logo/UniswapXBrandMark'
import { Arrow } from 'components/Popover'
import UniswapXRouterLabel from 'components/RouterLabel/UniswapXRouterLabel'
import Row from 'components/Row'
import {
  SwapMustache,
  SwapMustacheShadow,
  SwapOptInSmallContainer,
  UniswapPopoverContainer,
  UniswapXOptInLargeContainer,
  UniswapXOptInLargeContainerPositioner,
  UniswapXShine,
} from 'components/swap/styled'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { X } from 'react-feather'
import { Text } from 'rebass'
import { useAppDispatch } from 'state/hooks'
import { isClassicTrade } from 'state/routing/utils'
import { SwapInfo } from 'state/swap/hooks'
import { useUserDisabledUniswapX } from 'state/user/hooks'
import { updateDisabledUniswapX } from 'state/user/reducer'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

export const UniswapXOptIn = (props: { swapInfo: SwapInfo; isSmall: boolean }) => {
  const {
    trade: { trade },
  } = props.swapInfo
  const userDisabledUniswapX = useUserDisabledUniswapX()
  const isOnClassic = Boolean(trade && isClassicTrade(trade) && trade.isUniswapXBetter && !userDisabledUniswapX)
  const [hasEverShown, setHasEverShown] = useState(false)

  if (isOnClassic && !hasEverShown) {
    setHasEverShown(true)
  }

  // avoid some work if never needed to show
  if (!hasEverShown) {
    return null
  }

  return <OptInContents isOnClassic={isOnClassic} {...props} />
}

const OptInContents = ({
  swapInfo,
  isOnClassic,
  isSmall,
}: {
  swapInfo: SwapInfo
  isOnClassic: boolean
  isSmall: boolean
}) => {
  const {
    trade: { trade },
  } = swapInfo
  const dispatch = useAppDispatch()
  const [showYoureIn, setShowYoureIn] = useState(false)
  const isVisible = isOnClassic

  // adding this as we need to mount and then set shouldAnimate = true after it mounts to avoid a flicker on initial mount
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (!isVisible || shouldAnimate) return
    // delay visible animation a bit
    const tm = setTimeout(() => setShouldAnimate(true), 350)
    return () => clearTimeout(tm)
  }, [isVisible, shouldAnimate])

  const tryItNowElement = (
    <ThemedText.BodySecondary
      color="accent1"
      fontSize={14}
      fontWeight="500"
      onClick={() => {
        // slight delay before hiding
        setTimeout(() => {
          setShowYoureIn(true)
          setTimeout(() => {
            setShowYoureIn(false)
          }, 5000)
        }, 200)

        return
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      Try it now
    </ThemedText.BodySecondary>
  )

  const containerRef = useRef<HTMLDivElement>()

  if (isSmall) {
    return (
      <SwapOptInSmallContainer ref={containerRef as any} visible={isVisible} shouldAnimate={shouldAnimate}>
        <SwapMustache>
          <UniswapXShine />
          <SwapMustacheShadow />
          <Row justify="space-between" align="center" flexWrap="wrap">
            <Text fontSize={14} fontWeight={485} lineHeight="20px">
              <Trans>Try gas free swaps with the</Trans>
              <br />
              <UniswapXBrandMark fontWeight="bold" style={{ transform: `translateY(1px)`, margin: '0 2px' }} />{' '}
              <Trans>Beta</Trans>
            </Text>
            {tryItNowElement}
          </Row>
        </SwapMustache>
      </SwapOptInSmallContainer>
    )
  }

  return (
    <>
      {/* first popover: intro */}
      <UniswapXOptInPopover shiny visible={isVisible && !showYoureIn}>
        <CloseIcon
          size={18}
          onClick={() => {
            if (!trade) return
            dispatch(updateDisabledUniswapX({ disabledUniswapX: true }))
          }}
        />

        <Column>
          <Text fontSize={14} fontWeight={485} lineHeight="20px">
            <Trans>Try the</Trans>{' '}
            <UniswapXBrandMark fontWeight="bold" style={{ transform: `translateY(2px)`, margin: '0 1px' }} />{' '}
            <Trans>Beta</Trans>
            <ul style={{ margin: '5px 0 12px 24px', lineHeight: '24px', padding: 0 }}>
              <li>
                <Trans>Gas free swaps</Trans>
              </li>
              <li>
                <Trans>MEV protection</Trans>
              </li>
              <li>
                <Trans>Better prices and more liquidity</Trans>
              </li>
            </ul>
          </Text>
        </Column>

        {tryItNowElement}
      </UniswapXOptInPopover>

      {/* second popover: you're in! */}
      <UniswapXOptInPopover visible={showYoureIn}>
        <UniswapXRouterLabel disableTextGradient>
          <Text fontSize={14} fontWeight={535} lineHeight="20px">
            <Trans>You&apos;re in!</Trans>
          </Text>
        </UniswapXRouterLabel>

        <ThemedText.BodySecondary style={{ marginTop: 8 }} fontSize={14}>
          <Trans>You can turn it off at anytime in settings</Trans>
        </ThemedText.BodySecondary>
      </UniswapXOptInPopover>
    </>
  )
}

const UniswapXOptInPopover = (props: PropsWithChildren<{ visible: boolean; shiny?: boolean }>) => {
  return (
    // positioner ensures no matter the height of the inner content
    // it sits at the same position from the top of the swap area
    <UniswapXOptInLargeContainerPositioner>
      <UniswapXOptInLargeContainer visible={props.visible}>
        <Arrow className="arrow-right" style={{ position: 'absolute', bottom: '50%', left: -3.5, zIndex: 100 }} />
        <UniswapPopoverContainer>
          {props.shiny && <UniswapXShine style={{ zIndex: 0 }} />}
          {props.children}
        </UniswapPopoverContainer>
      </UniswapXOptInLargeContainer>
    </UniswapXOptInLargeContainerPositioner>
  )
}

const CloseIcon = styled(X)`
  color: ${({ theme }) => theme.neutral3};
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
`

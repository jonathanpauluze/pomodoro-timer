import { FunctionComponent, useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, Separator } from './styles'

export const Countdown: FunctionComponent = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsPassed,
    updateSecondsPassed
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let cycleInterval: number

    if (activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          updateSecondsPassed(totalSeconds)
          clearInterval(cycleInterval)
        } else {
          updateSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(cycleInterval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    updateSecondsPassed
  ])

  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}

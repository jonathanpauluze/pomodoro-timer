import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useState
} from 'react'
import { ulid } from 'ulid'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedData?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  secondsPassed: number
  updateSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = ulid()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((oldCycles) => [...oldCycles, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0)

    // newCycleForm.reset()
  }

  function interruptCurrentCycle() {
    setCycles((oldCycles) => {
      return oldCycles.map((oldCycle) => {
        if (oldCycle.id === activeCycleId) {
          return {
            ...oldCycle,
            interruptedDate: new Date()
          }
        }

        return oldCycle
      })
    })

    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((oldCycles) => {
      return oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date()
          }
        }

        return cycle
      })
    })
  }

  function updateSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        secondsPassed,
        updateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

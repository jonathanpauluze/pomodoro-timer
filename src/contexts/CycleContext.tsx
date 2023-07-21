import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { differenceInSeconds } from 'date-fns'
import { ulid } from 'ulid'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../reducers/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
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

const STORAGE_CYCLES = '@pomodoro-timer:cycles-state-1.0.0'

export const CyclesContextProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    (initialState) => {
      const storedStateAsString = localStorage.getItem(STORAGE_CYCLES)

      if (storedStateAsString) {
        return JSON.parse(storedStateAsString)
      }

      return initialState
    }
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassed, setSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function createNewCycle(data: CreateCycleData) {
    const id = ulid()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function updateSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(STORAGE_CYCLES, stateJSON)
  }, [cyclesState])

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

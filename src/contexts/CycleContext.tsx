import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useReducer,
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
  finishedDate?: Date
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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContextProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const [cyclesState, dispatchCycles] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date()
                }
              }

              return cycle
            }),
            activeCycleId: null
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date()
                }
              }

              return cycle
            }),
            activeCycleId: null
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null
    }
  )

  const [secondsPassed, setSecondsPassed] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = ulid()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatchCycles({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle }
    })
    setSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatchCycles({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: { activeCycleId }
    })
  }

  function markCurrentCycleAsFinished() {
    dispatchCycles({
      type: 'MARK_CURRENT_CYCLE_AS_FINISED',
      payload: { activeCycleId }
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

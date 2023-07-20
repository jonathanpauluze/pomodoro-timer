import { FunctionComponent, useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { FormContainer, TaskInput, MinuteAmountInput } from './styles'
import { useFormContext } from 'react-hook-form'

export const NewCycleForm: FunctionComponent = () => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto ALPHA" />
        <option value="Projeto BETA" />
        <option value="Projeto DELTA" />
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinuteAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

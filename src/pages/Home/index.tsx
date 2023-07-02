import { Play } from '@phosphor-icons/react'
import { FunctionComponent } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator
} from './styles'

export const Home: FunctionComponent = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minutesAmount">Durante</label>
          <input type="number" id="minutesAmount" />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}

import { styled } from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseCountdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 8px;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['pomodoro-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['pomodoro-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

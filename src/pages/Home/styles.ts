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

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background: ${(props) => props.theme['gray-700']};
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;
  color: ${(props) => props.theme['pomodoro-500']};
  overflow: hidden;
`

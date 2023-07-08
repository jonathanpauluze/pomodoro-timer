import { styled } from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    min-width: 600px;
    width: 100%;
    border-collapse: collapse;

    th {
      padding: 1rem;
      background-color: ${(props) => props.theme['gray-600']};
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;
      color: ${(props) => props.theme['gray-100']};

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    td {
      padding: 1rem;
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      background-color: ${(props) => props.theme['gray-700']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const colorByStatus = {
  warning: 'yellow-500',
  danger: 'red-500',
  success: 'green-500'
} as const

interface StatusProps {
  variant: keyof typeof colorByStatus
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme[colorByStatus[props.variant]]};
  }
`

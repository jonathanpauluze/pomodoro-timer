import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export const DefaultLayout: FunctionComponent = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}

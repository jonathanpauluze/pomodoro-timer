import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const DefaultLayout: FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

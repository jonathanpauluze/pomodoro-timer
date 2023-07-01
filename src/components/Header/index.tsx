import { FunctionComponent } from 'react'
import { Timer, Scroll } from '@phosphor-icons/react'
import { HeaderContainer } from './styles'

import logo from '../../assets/pomodoro.svg'
import { NavLink } from 'react-router-dom'

export const Header: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <img src={logo} width={40} height={40} alt="" />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

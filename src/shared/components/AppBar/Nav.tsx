import { Link } from 'react-router-dom'
import { Box, Divider, Link as MUILink } from '@mui/material'
import { GitHub } from '@mui/icons-material'
import { useNav } from './useNav'
import * as S from './style'

export const Nav: React.FC= () => {
  const navItems = useNav()
  return (
    <Box component="nav" sx={S.Nav}>
      <Box>
        {navItems.map(({ name, icon: Icon, to, handleClick, divider: Divider }) => (
          <Box key={name}>
            {Divider && <Divider />}
            <Link to={to} onClick={handleClick} > 
              <Icon />
              {name}
            </Link>
          </Box>
        ))}
      </Box>
      <Divider />
      <MUILink href="https://github.com/diasjoaovitor" target="_blank">
        <GitHub />
        Criado por João Vitor
      </MUILink>
    </Box>
  )
}

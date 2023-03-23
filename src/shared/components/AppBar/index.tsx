import { useEffect, useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu, MenuOpen } from '@mui/icons-material'
import { ComeBack, Title } from '..'
import { Nav } from './Nav'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  page: string
  md: boolean
  color: TMUIColor
}

export const AppBar: React.FC<Props> = ({ page, md, color }) => {
  const [ open, setOpen ] = useState(md)

  useEffect(() => {
    setOpen(md)
  }, [md])
  
  const handleOpen = () => setOpen(open => !open)

  const MenuIcon = !open ? Menu : MenuOpen

  return (
    <>
    {open && !md && (
      <>
      <Toolbar />
      <Divider />
      </>
    )}
    <MUIAppBar sx={S.AppBar(open)}>
      <Toolbar sx={S.Toolbar}>
        <Box>
          <IconButton 
            className="icon-button" size="large" edge="start" role="menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          {!md ? 
            <Typography component="h1" variant="h6">
              {page}
            </Typography> :
            <Title fontSize="medium" variant="h6" />
          }
        </Box>
        {page !== 'Dashboard' && !md && <ComeBack color={color} />}
      </Toolbar>
      <Divider />
      {open && <Nav />}
    </MUIAppBar>
    </>

  )
}

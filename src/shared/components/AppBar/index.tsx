import { useEffect, useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, IconButton, SxProps, Theme, Toolbar, Typography } from '@mui/material'
import { Menu, MenuOpen } from '@mui/icons-material'
import { Title } from '..'
import { Nav } from './Nav'
import * as S from './style'

type Props = {
  page: string
  md: boolean
}

export const AppBar: React.FC<Props> = ({ page, md }) => {
  const [ open, setOpen ] = useState(md)

  useEffect(() => {
    setOpen(md)
  }, [md])
  
  const handleOpen = () => setOpen(open => !open)

  const { MenuIcon, style } = !open ? {
    MenuIcon: Menu,
    style: { 
      ...S.AppBar,
      backgroundColor: '#121212',
      backgroundImage: 'none'
    } as SxProps<Theme>
  } : {
    MenuIcon: MenuOpen,
    style: {
      ...S.AppBar,
      height: '100vh',
      width: 260,
      position: {
        md: 'static',
        xs: 'absolute'
      }, 
      left: 0
    } as SxProps<Theme>
  }

  return (
    <>
    {open && !md && (
      <>
      <Toolbar />
      <Divider />
      </>
    )}
    <MUIAppBar sx={style}>
      <Toolbar>
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
      </Toolbar>
      <Divider />
      {open && <Nav />}
    </MUIAppBar>
    </>

  )
}

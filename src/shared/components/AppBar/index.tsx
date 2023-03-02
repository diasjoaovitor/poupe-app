import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar as MUIAppBar, Box, Divider, IconButton, SxProps, Theme, Toolbar, Typography } from '@mui/material'
import { ArrowBack, Menu, MenuOpen } from '@mui/icons-material'
import { Title } from '..'
import { Nav } from './Nav'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  page: string
  md: boolean
  comeBackColor?: TMUIColor
}

export const AppBar: React.FC<Props> = ({ page, md, comeBackColor }) => {
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
      width: 280,
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
        {comeBackColor && !md && (
          <Link to="/">
            <ArrowBack color={comeBackColor} fontSize="large" />
          </Link>
        )}
      </Toolbar>
      <Divider />
      {open && <Nav />}
    </MUIAppBar>
    </>

  )
}

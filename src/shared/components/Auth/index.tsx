import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, FormControl, Paper, Stack, TextField, Typography } from '@mui/material'
import { AttachMoney } from '@mui/icons-material'
import { useThemeContext } from '../../contexts'
import * as S from './style'

type Props = {
  title: string
  inputs: {
    label: string
    name: string
    type: string
  }[]
  buttonText: string
  link: {
    text: string
    to: string
  }
  handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
}

export const Auth: React.FC<Props> = ({ 
  title, inputs, buttonText, link, handleSubmit 
}) => {
  const { theme } = useThemeContext()
  const backgroundColor = theme.palette.primary.main
  const color = theme.palette.primary.light

  return (
    <Stack sx={{ ...S.auth, '& a': { color } }}>
      <Box>
        <Box component="header">
          <Box className="svg-container" sx={{ backgroundColor }}>
            <AttachMoney fontSize="large" /> 
          </Box>
          <Typography component="h1" variant="h5">
            Poupe App
          </Typography>
        </Box>
        <Paper component="form" onSubmit={handleSubmit}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <FormControl fullWidth>
            {inputs.map(({ label, name, type }, index) => (
              <TextField 
                key={index} label={label} name={name} type={type} required
              />
            ))}
            <Button type="submit" variant="contained">
              {buttonText}
            </Button>
          </FormControl>
        </Paper>
        <Link to={link.to}>
          {link.text}
        </Link>
      </Box>
    </Stack>
  )
}

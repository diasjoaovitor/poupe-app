import { Box, Button, FormControl, Link, Paper, TextField, Typography } from '@mui/material'
import { Loader, Notification, Title } from '../../shared/components'
import { useAuth } from './useAuth'
import * as S from './style'

export const Auth: React.FC = () => {
  const {
    state: { title, inputs, button, link }, handleState,
    isLoading, notificationMessage, handleSubmit 
  } = useAuth()

  return (
    <Box sx={S.Auth}>
      <Box>
        <Box component="header">
          <Title fontSize="large" variant="h5" />
        </Box>
        <Paper component="form" sx={S.Form} onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <FormControl fullWidth>
            {inputs.map(({ label, name, type }, index) => (
              <TextField 
                key={index} label={label} name={name} type={type} required
              />
            ))}
            <Button type="submit" variant="contained">
              {button}
            </Button>
          </FormControl>
        </Paper>
        <Link role="link" sx={S.Link} onClick={handleState}>
          {link}
        </Link>
      </Box>
      <Loader open={isLoading} />
      <Notification message={notificationMessage} />
    </Box>
  )
}

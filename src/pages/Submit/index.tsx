import { Box, Button, Divider, FormControl } from '@mui/material'
import { Category, FormTextField, Header, Loader, Notification, Recorrency, Type } from '../../shared/components'
import { useSubmit } from '../../shared/hooks'
import * as S from './style'

export const Submit: React.FC = () => {
  const {
    state, handleSubmit, 
    type, handleTypeChange, 
    loader, message, handleClose
  } = useSubmit()

  return (
    <Box sx={S.submit}>
      <Header title={state.title} color={state.color.mui} />
      <Divider />
      <Box 
        component="form" borderColor={`${state.color.hex} !important`}
        onSubmit={handleSubmit}
      >
        <Type type={type} handleTypeChange={handleTypeChange} />
        <Divider />
        <Category 
          category={state.transaction.category} categories={state.categories} color={state.color} 
        />
        <Divider />
        <FormTextField 
          transaction={state.transaction} color={state.color.mui} 
        />
        <Divider />
        <Recorrency recorrency={state.transaction.recorrency} color={state.color.mui} />
        <Divider />
        <FormControl fullWidth>
          <Button type="submit" variant="contained" color={state.color.mui}>
            Salvar
          </Button>
        </FormControl>
      </Box>
      <Loader open={loader} color={state.color.mui} />
      <Notification message={message} handleClose={handleClose} />
    </Box>
  )
}

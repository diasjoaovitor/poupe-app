import { Box, Button, Divider, FormControl } from '@mui/material'
import { Category, FormTextField, Layout, Recurrence, Type } from '../../shared/components'
import { useSubmit } from './useSubmit'
import * as S from './style'

export const Submit: React.FC = () => {
  const {
    state, handleSubmit, 
    type, handleTypeChange, 
    loader, message
  } = useSubmit()

  return (
    <Layout 
      page={state.title} isLoading={loader} notificationMessage={message} 
      color={state.color.hex} comeBackColor={state.color.mui}
    >
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
        <Recurrence recurrence={state.transaction.recurrence} color={state.color.mui} />
        <Divider />
        <FormControl fullWidth>
          <Button type="submit" variant="contained" color={state.color.mui}>
            Salvar
          </Button>
        </FormControl>
      </Box>
    </Layout>
  )
}

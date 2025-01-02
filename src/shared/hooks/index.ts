import { useAppContext } from '../contexts'

export const useApp = () => {
  const { appContext, saveContext } = useAppContext()

  const handleNewTransaction = () => {
    saveContext({ ...appContext, transaction: undefined })
  }

  return { handleNewTransaction }
}

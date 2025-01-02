import { useState } from 'react'
import { defaultAppState } from '../../states'
import { TAppData } from '../../types'

export const useAppContextHook = () => {
  const [appContext, setAppContext] = useState(defaultAppState)
  const [fetchEnabledContext, setFetchEnabledContext] = useState(true)

  const saveContext = (data: TAppData) => {
    setAppContext(data)
    setFetchEnabledContext(false)
  }

  const clearContext = () => {
    setAppContext(defaultAppState)
    setFetchEnabledContext(true)
  }

  return {
    appContext,
    fetchEnabledContext,
    setFetchEnabledContext,
    saveContext,
    clearContext
  }
}

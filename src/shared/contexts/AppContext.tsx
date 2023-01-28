import { createContext, ReactNode, useContext, useState } from 'react'
import { defaultAppState } from '../states'
import { TAppData } from '../types'

type TAppContext = {
  appContext: TAppData
  fetchEnabledContext: boolean
  setFetchEnabledContext(enabled: boolean): void
  saveContext(appContext: TAppData): void
  clearContext(): void
}

const AppContext = createContext({} as TAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [ appContext, setAppContext ] = useState(defaultAppState)
  const [ fetchEnabledContext, setFetchEnabledContext ] = useState(true)

  const saveContext = (data: TAppData) => {
    setAppContext(data)
    setFetchEnabledContext(false)
  }

  const clearContext = () => {
    setAppContext(defaultAppState)
    setFetchEnabledContext(true)
  }

  return (
    <AppContext.Provider 
      value={{ 
        appContext, fetchEnabledContext, setFetchEnabledContext, saveContext, clearContext 
      }}
    >
     {children}
    </AppContext.Provider>
  )
}

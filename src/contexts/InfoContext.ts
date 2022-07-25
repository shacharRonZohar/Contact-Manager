import { createContext } from 'react'

type InfoContextProps = {
  btnsInfo: Array<string>
}

export const InfoContext = createContext<InfoContextProps>({ btnsInfo: [] })
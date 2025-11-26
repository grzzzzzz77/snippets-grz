import { DataType } from '@renderer/data'
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import { codes } from '@renderer/data'

interface ContextProps {
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
}

interface Props {
  children: ReactNode
}

export const CodeContext = createContext<ContextProps | undefined>(undefined)

export const CodeProvider = ({ children }: Props) => {
  const [data, setData] = useState<DataType[]>(codes)
  return <CodeContext.Provider value={{ data, setData }}>{children}</CodeContext.Provider>
}

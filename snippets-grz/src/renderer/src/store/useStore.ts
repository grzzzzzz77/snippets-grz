import { create, StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { DataType } from '@renderer/data'
import { codes } from '@renderer/data'

interface State {
  data: DataType[]
  setData: (data: DataType[]) => void
  value: string
  setValue: (value: string) => void
}

const useStore = create<State>()(
  immer((set) => ({
    data: codes,
    setData: (data: DataType[]) => set((state) => ({ data: data })),
    value: '',
    setValue: (value: string) => set((state) => ({ value: value }))
  })) as unknown as StateCreator<State>
)

export default useStore

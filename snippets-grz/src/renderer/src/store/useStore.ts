import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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
  persist(
    immer((set) => ({
      data: [],
      setData: (data: DataType[]) => set((state) => ({ data: data })),
      value: '',
      setValue: (value: string) => set((state) => ({ value: value }))
    })),
    {
      name: 'snippets-grz',
      storage: createJSONStorage(() => localStorage)
    }
  ) as unknown as StateCreator<State>
)

export default useStore

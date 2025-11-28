import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
// import useCode from './useCode'
import useStore from '../store/useStore'
import { codes } from '@renderer/data'

export default function useCodeSelect() {
  // const { data } = useCode() //这是context共享数据的方式
  const { data, setData, setValue } = useStore(
    useShallow((state) => ({
      data: state.data,
      setData: state.setData,
      setValue: state.setValue
    }))
  )
  const [id, setId] = useState<number>(0)
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        {
          const index = data.findIndex((item) => item.id == id)
          setId(data[index - 1]?.id || data[data.length - 1].id)
        }
        break
      case 'ArrowDown':
        {
          const index = data.findIndex((item) => item.id == id)
          setId(data[index + 1]?.id || data[0].id)
        }
        break
      case 'Enter':
        {
          selectCode(id)
        }
        break
      default:
        break
    }
  }

  const selectCode = async (id: number) => {
    const content = data.find((item) => item.id == id)?.content
    if (content) {
      await navigator.clipboard.writeText(content)
      window.api.hideWindow()
      setData([])
      setValue('')
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [data, id])
  useEffect(() => {
    setId(1)
  }, [data])

  return {
    id,
    data,
    selectCode
  }
}

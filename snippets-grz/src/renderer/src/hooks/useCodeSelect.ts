import { useEffect, useState } from 'react'
import useCode from './useCode'

export default function useCodeSelect() {
  const { data } = useCode()
  const [id, setId] = useState<number>(1)
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

  const selectCode = (id: number) => {
    const content = data.find((item) => item.id == id)?.content
    if (content) {
      navigator.clipboard.writeText(content)
      window.api.hideWindow()
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

import { useState } from 'react'

import useCode from '@renderer/hooks/useCode'
import { codes } from '@renderer/data'

const Search: React.FC = () => {
  const { setData } = useCode()
  const [value, setValue] = useState('')
  const changeData = (value: string) => {
    setValue(value)
    value.trim()
      ? setData(codes.filter((item) => item.content.toLowerCase().includes(value.toLowerCase())))
      : setData([])
  }
  return (
    <>
      <div className="bg-slate-50 p-3 rounded-lg drag">
        <section className="bg-slate-200 p-3 rounded-lg">
          <input
            className="w-full outline-none text-2xl text-slate-600 bg-slate-200"
            value={value}
            onChange={(e) => changeData(e.target.value)}
          />
        </section>
        <section className="text-center select-none text-slate-600 text-xs mt-2 nodrag">
          停售今日心情
        </section>
      </div>
    </>
  )
}

export default Search

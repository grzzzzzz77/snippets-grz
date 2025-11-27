// import useCode from '@renderer/hooks/useCode'
import { useShallow } from 'zustand/react/shallow'

import { codes } from '@renderer/data'
import useStore from '@renderer/store/useStore'
import { SettingOne } from '@icon-park/react'

const Search: React.FC = () => {
  const { setData, setValue, value } = useStore(
    useShallow((state) => ({
      setData: state.setData,
      setValue: state.setValue,
      value: state.value
    }))
  )
  const changeData = (value: string) => {
    setValue(value)
    setData(codes.filter((item) => item.content.toLowerCase().includes(value.trim().toLowerCase())))
  }
  return (
    <>
      <div className="bg-slate-50 p-3 rounded-lg drag">
        <section className="bg-slate-200 p-3 rounded-lg flex items-center gap-1 nodrag">
          <SettingOne
            theme="outline"
            size="22"
            fill="#333"
            strokeWidth={4}
            className="cursor-pointer"
          />
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

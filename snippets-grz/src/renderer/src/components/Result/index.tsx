import useCodeSelect from '@renderer/hooks/useCodeSelect'

const Result: React.FC = () => {
  const { data, id, selectCode } = useCodeSelect()
  return (
    <>
      <main className="bg-slate-50 px-3 rounded-bl-lg rounded-br-lg -mt-[8px] pb-2">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => selectCode(item.id)}
            className={`text-slate-700 rounded-lg truncate mb-2 ${id === item.id ? 'bg-purple-500 text-white' : ''}`}
          >
            {item.content}
          </div>
        ))}
      </main>
    </>
  )
}

export default Result

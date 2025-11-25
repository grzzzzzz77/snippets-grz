import useCode from '@renderer/hooks/useCode'

const Result: React.FC = () => {
  const { data } = useCode()
  return (
    <>
      <main className="bg-slate-50 px-3 rounded-bl-lg rounded-br-lg -mt-[8px] pb-2">
        {data.map((item) => (
          <div key={item.id} className="text-slate-700 truncate mb-2">
            {item.content}
          </div>
        ))}
      </main>
    </>
  )
}

export default Result

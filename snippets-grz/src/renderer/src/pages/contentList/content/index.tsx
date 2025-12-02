export default function Content(props) {
  console.log(props.content)
  return (
    <>
      <main className="p-2">
        <h1 className="text-base font-bold text-slate-600 opacity-95">{props.content?.title}</h1>
        <div className="text-sm text-slate-500 opacity-95 mt-2 leading-relaxed">
          {props.content?.content}
        </div>
      </main>
    </>
  )
}

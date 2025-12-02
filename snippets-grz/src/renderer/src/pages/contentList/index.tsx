import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import './content.less'
import Content from './content'

export default function ContentList() {
  const contents = useLoaderData()
  const [currentId, setCurrentId] = useState()
  useEffect(() => {
    if (contents.length > 0) {
      setCurrentId(contents[0].id)
    }
  }, [contents])
  return (
    <main className="content-page">
      <div className="list bg-slate-50 mt-2  text-slate-700 overflow-y-auto">
        {contents.map((content: any) => (
          <a
            className={` px-1 py-1 cursor-pointer flex items-center gap-1 ${currentId === content.id ? 'bg-blue-300! text-white! mx-1 rounded-md' : ''}`}
            key={content.id}
            onClick={() => setCurrentId(content.id)}
          >
            <div className="truncate">{content.title}</div>
          </a>
        ))}
      </div>
      <div className="content  text-slate-700 overflow-y-auto">
        <Content content={contents.find((content: any) => content.id === currentId)} />
      </div>
    </main>
  )
}

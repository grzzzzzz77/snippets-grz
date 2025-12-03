import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './content.less'
import Content from './content'

interface IContent {
  id: string | number
  title: string
  content: string
}

export default function ContentList() {
  const params = useParams()
  const [currentId, setCurrentId] = useState<string | number>()
  const [contents, setContents] = useState<IContent[]>([])
  useEffect(() => {
    getContents()
  }, [params.cid])

  const getContents = async () => {
    const res: IContent[] = await window.api.sql(
      `select * from contents where category_id = ${params.cid}`,
      'findAll'
    )
    setContents(res)
  }

  return (
    <main className="content-page">
      <div className="list bg-slate-50 mt-2  text-slate-700 overflow-y-auto">
        {contents.map((content: IContent) => (
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
        <Content
          content={contents.find((content: IContent) => content.id === currentId)}
          getContents={getContents}
        />
      </div>
    </main>
  )
}

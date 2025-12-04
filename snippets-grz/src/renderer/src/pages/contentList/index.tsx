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
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    getContents()
  }, [params.cid])

  const getContents = async () => {
    let sql = `select * from contents `
    if (params.cid) {
      sql += `where category_id = ${params.cid}`
    }
    sql += ` order by id desc`
    const res: IContent[] = await window.api.sql(sql, 'findAll')
    setContents(res)
  }

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    let sql = `select * from contents `
    search && (sql += `where title like '%${search}%'`)
    sql += ` order by id desc`
    const res: IContent[] = await window.api.sql(sql, 'findAll')
    setContents(res)
  }

  return (
    <main className="content-page">
      <div className="list bg-slate-50 mt-2  text-slate-700 overflow-y-auto">
        <div>
          <input
            type="text"
            placeholder="搜索..."
            className="outline-none font-bold py-2 px-1 w-full"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e)}
          />
        </div>
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

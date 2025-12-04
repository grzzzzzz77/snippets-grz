import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Add, Delete } from '@icon-park/react'
import { useContextMenu } from 'mantine-contextmenu'

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

  const { showContextMenu } = useContextMenu()

  const getContents = async () => {
    let sql = `select * from contents `
    if (params.cid) {
      sql += `where category_id = ${params.cid}`
    }
    sql += ` order by id desc`
    const res: IContent[] = await window.api.sql(sql, 'findAll')
    setContents(res)
    return res
  }

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    let sql = `select * from contents `
    search && (sql += `where title like '%${e.target.value}%'`)
    if (params.cid) {
      sql += `and category_id = ${params.cid}`
    }
    sql += ` order by id desc`
    const res: IContent[] = await window.api.sql(sql, 'findAll')
    setContents(res)
  }

  const addClick = async () => {
    await window.api.sql(
      `insert into contents (title, content,category_id,created_at) values ('未命名片段', '', ${params.cid}, datetime())`,
      'insert'
    )
    const res = await getContents()
    // 选中新添加的第一项
    if (res.length > 0) {
      setCurrentId(res[0].id)
    }
  }

  const deleteContent = async () => {
    await window.api.sql(`delete from contents where id = ${currentId}`, 'del')
    await getContents()
  }

  return (
    <main className="content-page">
      <div className="list bg-slate-50 mt-2  text-slate-700 overflow-y-auto">
        <div className="flex items-center justify-between px-2">
          <input
            type="text"
            placeholder="搜索..."
            className="outline-none font-bold py-2  w-full"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e)}
          />
          {params.cid && (
            <Add
              theme="outline"
              size="20"
              strokeWidth={2}
              className="cursor-pointer"
              onClick={() => addClick()}
            />
          )}
        </div>
        {contents.map((content: IContent) => (
          <a
            className={` px-1 py-1 cursor-pointer flex items-center gap-1 ${currentId === content.id ? 'bg-blue-300! text-white! mx-1 rounded-md' : ''}`}
            key={content.id}
            onClick={() => setCurrentId(content.id)}
            onContextMenu={showContextMenu(
              [
                {
                  key: 'remove',
                  title: '删除片段',
                  icon: <Delete theme="outline" size="18" strokeWidth={2} />,
                  onClick: () => {
                    deleteContent()
                  }
                }
              ],
              { className: 'contextMenu' }
            )}
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

import { useEffect, useState } from 'react'

interface IContent {
  title: string
  content: string
  id: string
  category_id: string
}

export default function Content(props: any) {
  const [content, setContent] = useState<Partial<IContent>>({})
  useEffect(() => {
    if (props.content) {
      setContent(props.content)
    } else {
      setContent({})
    }
  }, [props])

  const save = async (currentContent: IContent) => {
    await window.api.sql('update contents set title = ?, content = ? where id = ?', 'update', [
      currentContent.title,
      currentContent.content,
      currentContent.id
    ])
    props.getContents()
  }

  const changeContent = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const newContent = { ...content, [type]: e.target.value }
    setContent(newContent)
    await save(newContent as IContent)
  }

  return (
    <>
      <main className="p-2 flex flex-col h-screen gap-4">
        {props.content && (
          <>
            <input
              className="font-bold outline-none"
              value={content?.title || ''}
              onChange={(e) => changeContent(e, 'title')}
            />
            <textarea
              className="flex-1 outline-none opacity-90"
              value={content?.content || ''}
              placeholder="请输入内容"
              onChange={(e) => changeContent(e, 'content')}
            />
          </>
        )}
      </main>
    </>
  )
}

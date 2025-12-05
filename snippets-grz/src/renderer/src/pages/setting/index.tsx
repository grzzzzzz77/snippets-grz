import { Form, useSubmit, useLoaderData } from 'react-router'
import { useState } from 'react'
export default function Setting() {
  const submit = useSubmit()
  const data = useLoaderData()
  const content = JSON.parse(data.content)
  const [shortCut, setShortCut] = useState(content.shortCut)
  const [databaseDirectory, setDatabaseDirectory] = useState(content.databaseDirectory)

  return (
    <Form method="POST">
      <div className="bg-slate-100 h-screen p-5">
        <h1 className="text-center">软件配置</h1>
        <section className="border p-3 rounded-md bg-white my-5">
          <h5 className="text-xs font-bold mb-2 text-slate-700 opacity-90">快捷键定义</h5>
          <input
            className="w-full outline-none"
            type="text"
            name="shortCut"
            value={shortCut}
            onChange={(e) => {
              setShortCut(e.target.value)
              submit(e.currentTarget.form, { method: 'POST' })
            }}
          />
        </section>
        <section className="border p-3 rounded-md bg-white my-5">
          <h5 className="text-xs font-bold mb-2 text-slate-700 opacity-90">数据库</h5>
          <input
            className="w-full outline-none"
            type="text"
            name="databaseDirectory"
            value={databaseDirectory}
            onChange={(e) => {
              setDatabaseDirectory(e.target.value)
              submit(e.currentTarget.form, { method: 'POST' })
            }}
          />
        </section>
      </div>
    </Form>
  )
}

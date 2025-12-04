import { NavLink, Outlet, useLoaderData, useRevalidator } from 'react-router'
import { useState } from 'react'
import './category.less'
import { Add, DatabaseSetting, FolderClose, AllApplication, Edit } from '@icon-park/react'
import { useContextMenu } from 'mantine-contextmenu'
import { Input, Modal } from 'antd'

export default function Category() {
  const [current, setCurrent] = useState<string | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const categories = useLoaderData()
  const revalidator = useRevalidator()
  const { showContextMenu } = useContextMenu()

  const addCategory = async () => {
    await window.api.sql(
      `insert into categories (name,created_at) values ('未命名文件夹', datetime())`,
      'insert'
    )
    revalidator.revalidate()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setName('')
  }

  const handleOk = async () => {
    if (name) {
      await window.api.sql(`update categories set name = ? where id = ?`, 'update', [name, current])
      revalidator.revalidate()
      handleCancel()
    }
  }

  return (
    <>
      <main className="category-page">
        <div className="categories bg-slate-100 mt-2 text-slate-700 overflow-y-auto">
          <div className="px-2 mt-2 opacity-90 mb-1">快捷操作</div>
          <NavLink
            to={`/config/category/content`}
            end
            className={`font-bold block ${current === undefined ? 'bg-blue-300! text-white! mx-1 rounded-md' : ''}`}
            onClick={() => setCurrent(undefined)}
          >
            <div className="flex items-center gap-1 mb-1 pl-1">
              <AllApplication theme="outline" size="16" strokeWidth={5} />
              <div className="truncate">所有片段</div>
            </div>
          </NavLink>
          {categories.map((category: any) => (
            <NavLink
              to={`/config/category/content/${category.id}`}
              className={` p-1 truncate cursor-pointer block ${current === category.id ? 'bg-blue-300! text-white! mx-1 rounded-md' : ''}`}
              key={category.id}
              onClick={() => setCurrent(category.id)}
              onContextMenu={showContextMenu(
                [
                  {
                    key: 'rename',
                    title: '重命名',
                    icon: <Edit theme="outline" size="18" strokeWidth={2} />,
                    onClick: () => {
                      setIsModalOpen(true)
                      setName(category.name)
                    }
                  }
                ],
                { className: 'contextMenu' }
              )}
            >
              <div className="flex items-center gap-1">
                <FolderClose theme="outline" size="12" strokeWidth={3} />
                <div className="truncate">{category.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="nav bg-slate-100 flex justify-around items-center">
          <Add
            theme="outline"
            size="20"
            strokeWidth={2}
            className="cursor-pointer"
            onClick={() => addCategory()}
          />
          <DatabaseSetting theme="outline" size="20" strokeWidth={2} className="cursor-pointer" />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>

      <Modal
        title="重命名文件夹"
        width={300}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Modal>
    </>
  )
}

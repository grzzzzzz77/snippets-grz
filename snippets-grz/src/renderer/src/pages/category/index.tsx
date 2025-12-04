import { NavLink, Outlet, useLoaderData } from 'react-router'
import { useState } from 'react'
import './category.less'
import { Add, DatabaseSetting, FolderClose, AllApplication } from '@icon-park/react'

export default function Category() {
  const [current, setCurrent] = useState<string | undefined>(undefined)
  const categories = useLoaderData()

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
            >
              <div className="flex items-center gap-1">
                <FolderClose theme="outline" size="12" strokeWidth={3} />
                <div className="truncate">{category.name}</div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="nav bg-slate-100 flex justify-around items-center">
          <Add theme="outline" size="20" strokeWidth={2} />
          <DatabaseSetting theme="outline" size="20" strokeWidth={2} />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </>
  )
}

import { Outlet } from 'react-router'
import './category.less'
import { Add, DatabaseSetting } from '@icon-park/react'

export default function Category() {
  return (
    <>
      <main className="category-page">
        <div className="categories bg-slate-100 text-xs text-slate-700">categories</div>
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

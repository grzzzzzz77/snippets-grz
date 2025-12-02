import { Link, Outlet, useLoaderData, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import './category.less'
import { Add, DatabaseSetting, FolderClose } from '@icon-park/react'

export default function Category() {
  const [current, setCurrent] = useState()
  const navigate = useNavigate()
  const categories = useLoaderData()

  useEffect(() => {
    if (categories.length > 0) {
      setCurrent(categories[0].id)
      navigate(`/config/category/content/${categories[0].id}`)
    }
  }, [categories])
  return (
    <>
      <main className="category-page">
        <div className="categories bg-slate-100 mt-2 text-slate-700 overflow-y-auto">
          {categories.map((category: any) => (
            <Link
              to={`/config/category/content/${category.id}`}
              className={`p-1 truncate cursor-pointer block ${current === category.id ? 'bg-amber-500! text-white! mx-1 rounded-md' : ''}`}
              key={category.id}
              onClick={() => setCurrent(category.id)}
            >
              <div className="flex items-center gap-1">
                <FolderClose theme="outline" size="12" strokeWidth={3} />
                <div className="truncate">{category.name}</div>
              </div>
            </Link>
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

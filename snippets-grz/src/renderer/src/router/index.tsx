import { createHashRouter } from 'react-router'
import { lazyLoad } from './lazyLoad'
import Home from '@renderer/pages/home'
import { lazy } from 'react'
import categoryLoader from '@renderer/pages/category/categoryLoader'
import settingAction from '@renderer/pages/setting/settingAction'
import settingLoader from '@renderer/pages/setting/settingLoader'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/config',
    element: lazyLoad(lazy(() => import('@renderer/pages/config'))),
    children: [
      {
        index: true,
        element: lazyLoad(lazy(() => import('@renderer/pages/setting'))),
        action: settingAction,
        loader: settingLoader
      },
      {
        path: 'category',
        element: lazyLoad(lazy(() => import('@renderer/pages/category'))),
        loader: categoryLoader,
        children: [
          {
            path: 'content/:cid?',
            element: lazyLoad(lazy(() => import('@renderer/pages/contentList')))
          }
        ]
      }
    ]
  }
])

export default router

import { createHashRouter } from 'react-router'
import { lazyLoad } from './lazyLoad'
import Home from '@renderer/pages/home'
import { lazy } from 'react'
import categoryLoader from '@renderer/pages/category/categoryLoader'
import contentLoader from '@renderer/pages/contentList/contentLoader'

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
        path: 'category',
        element: lazyLoad(lazy(() => import('@renderer/pages/category'))),
        loader: categoryLoader,
        children: [
          {
            path: 'content/:cid',
            element: lazyLoad(lazy(() => import('@renderer/pages/contentList'))),
            loader: contentLoader
          }
        ]
      }
    ]
  }
])

export default router

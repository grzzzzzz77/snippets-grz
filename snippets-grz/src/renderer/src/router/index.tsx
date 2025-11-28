import { createBrowserRouter, createHashRouter } from 'react-router'
import { lazyLoad } from './lazyLoad'
import Home from '@renderer/pages/home'
import { lazy } from 'react'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/config',
    element: lazyLoad(lazy(() => import('@renderer/pages/config')))
  }
])

export default router

import { RouterProvider } from 'react-router'
import router from './router'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ContextMenuProvider } from 'mantine-contextmenu'

// import '@mantine/core/styles.layer.css'
import 'mantine-contextmenu/styles.layer.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <MantineProvider defaultColorScheme="auto">
        <ColorSchemeScript />
        <ContextMenuProvider>
          <RouterProvider router={router} />
        </ContextMenuProvider>
      </MantineProvider>
    </ConfigProvider>
  )
}

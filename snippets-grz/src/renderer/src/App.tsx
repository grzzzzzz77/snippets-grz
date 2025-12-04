import { RouterProvider } from 'react-router'
import router from './router'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ContextMenuProvider } from 'mantine-contextmenu'

// import '@mantine/core/styles.layer.css'
import 'mantine-contextmenu/styles.layer.css'
export default function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <ColorSchemeScript />
      <ContextMenuProvider>
        <RouterProvider router={router} />
      </ContextMenuProvider>
    </MantineProvider>
  )
}

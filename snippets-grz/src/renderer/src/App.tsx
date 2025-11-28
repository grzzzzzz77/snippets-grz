import React, { useEffect, useRef } from 'react'
import Search from './components/Search'
import Result from './components/Result'
// import { CodeProvider } from './context/CodeContext'ddddadsadasdasd

window.api.shortCut('search', 'CommandOrControl+shift+e')
function App(): React.JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.addEventListener('mouseover', () => {
      window.api.setIgnoreMouseEvents(false)
    })
    document.body.addEventListener('mouseover', (e: MouseEvent) => {
      console.log(e.target)

      if (e.target === document.body) {
        window.api.setIgnoreMouseEvents(true, { forward: true })
      }
    })
  }, [])

  return (
    // <CodeProvider>
    <main ref={mainRef} className="relative p-3">
      <Search />
      <Result />
    </main>
    // </CodeProvider>
  )
}

export default App

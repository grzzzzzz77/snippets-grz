import React, { useEffect, useRef } from 'react'
import Search from '@renderer/components/Search'
import Result from '@renderer/components/Result'

window.api.shortCut('search', 'CommandOrControl+shift+e')
function Home(): React.JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.addEventListener('mouseover', () => {
      window.api.setIgnoreMouseEvents(false)
    })
    document.body.addEventListener('mouseover', (e: MouseEvent) => {
      if (e.target === document.body) {
        window.api.setIgnoreMouseEvents(true, { forward: true })
      }
    })
    window.api.openConfigWindow()
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

export default Home

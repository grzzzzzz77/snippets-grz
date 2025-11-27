import React from 'react'
import Search from './components/Search'
import Result from './components/Result'
// import { CodeProvider } from './context/CodeContext'

window.api.shortCut('search', 'CommandOrControl+shift+e')
function App(): React.JSX.Element {
  return (
    // <CodeProvider>
    <>
      <Search />
      <Result />
    </>
    // </CodeProvider>
  )
}

export default App

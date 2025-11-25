import React from 'react'
import Search from './components/Search'
import Result from './components/Result'
import { CodeProvider } from './context/CodeContext'

function App(): React.JSX.Element {
  return (
    <CodeProvider>
      <Search />
      <Result />
    </CodeProvider>
  )
}

export default App

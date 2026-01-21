import Child from './assets/Child'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Practice</h1>
      <Child parent={'app'} count={count} setCount={setCount}></Child>
      <div>The count is...  {count}</div>
    </>
  )
}

export default App

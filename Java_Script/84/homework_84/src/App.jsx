import './App.css'
import Address from './address'
function App() {

  return (
    <>
      <Address street='123 Main st.' city='Boston'
        state='MA' zip='02135' />
      <div>
        {new Date().toDateString()}
      </div>
    </>
  )
}

export default App

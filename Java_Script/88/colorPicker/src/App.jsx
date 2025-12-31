import { useState } from 'react';
import ColorPickers from './colorPickers'
import Colors from './colors'
import './App.css'

function App() {

  const [colors, setColors] = useState([]);
  const { color, bgColor } = colors;

  return (
    <>
      <div id='page'>
        <Colors color={color} bgColor={bgColor} />
        <ColorPickers setColors={setColors} colors={colors} />
      </div>
    </>
  )
}

export default App

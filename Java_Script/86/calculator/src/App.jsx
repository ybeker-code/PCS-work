import './App.css'
import { Component } from 'react';

class App extends Component {
  state = {
    number1: 0,
    number2: 0,
    operation: '',
    active: 1,
    answer: 0
  }

  handleClick(button) {
    if (typeof button === 'number') {
      if (this.state.active === 1) {
        this.setState({
          number1: +`${this.state.number1}${button}`,
          answer: 0
        })
      } else {
        this.setState({
          number2: +`${this.state.number2}${button}`,
          answer: 0
        })
      }

    } else if (button !== '=' && button !== 'c') {
      if (this.state.answer) {
        this.setState({
          number1: this.state.answer
        })
      }
      this.setState({
        active: 2,
        operation: button
      })

    }
    else if (button === '=') {
      this.setState({
        number1: 0,
        number2: 0,
        operation: '',
        active: 1,
        answer: eval(`${this.state.number1}${this.state.operation}${this.state.number2}`)
      })
    } else {
      console.log('clear');

      this.setState({
        number1: 0,
        number2: 0,
        operation: '',
        active: 1,
        answer: 0
      })
    }
  }

  render() {
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '=', 'c']
    let display;
    if (this.state.active === 1) {
      display = this.state.number1
    } else {
      display = this.state.number2
    }
    if (this.state.answer) {
      display = this.state.answer
    }
    return (
      <>
        <div id='calculator'>
          <div id='display'>{display}</div>
          <button id='n1' onClick={() => this.handleClick(buttons[0])}>{buttons[0]}</button>
          <button id='n2' onClick={() => this.handleClick(buttons[1])}>{buttons[1]}</button>
          <button id='n3' onClick={() => this.handleClick(buttons[2])}>{buttons[2]}</button>
          <button id='n4' onClick={() => this.handleClick(buttons[3])}>{buttons[3]}</button>
          <button id='n5' onClick={() => this.handleClick(buttons[4])}>{buttons[4]}</button>
          <button id='n6' onClick={() => this.handleClick(buttons[5])}>{buttons[5]}</button>
          <button id='n7' onClick={() => this.handleClick(buttons[6])}>{buttons[6]}</button>
          <button id='n8' onClick={() => this.handleClick(buttons[7])}>{buttons[7]}</button>
          <button id='n9' onClick={() => this.handleClick(buttons[8])}>{buttons[8]}</button>
          <button id='n0' onClick={() => this.handleClick(buttons[9])}>{buttons[9]}</button>
          <button id='plus' onClick={() => this.handleClick(buttons[10])}>{buttons[10]}</button>
          <button id='minus' onClick={() => this.handleClick(buttons[11])}>{buttons[11]}</button>
          <button id='mult' onClick={() => this.handleClick(buttons[12])}>{buttons[12]}</button>
          <button id='devide' onClick={() => this.handleClick(buttons[13])}>{buttons[13]}</button>
          <button id='eq' onClick={() => this.handleClick(buttons[14])}>{buttons[14]}</button>
          <button id='clr' onClick={() => this.handleClick(buttons[15])}>{buttons[15]}</button>
        </div>
      </>
    );
  }
}
export default App

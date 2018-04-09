import React, { Component } from 'react';
import './App.css';
import DisplayInput from './components/DisplayInput/DisplayInput'
import Key from './components/CalculatorKey/CalculatorKey'

class App extends Component {
  state={
    keys: ['C','()','%','/','7','8','9','*','4','5','6','-','1','2','3','+','(-)','0','.','='],
    display:'',
    equation:'',
    errorMsg: ''
  }



  keyClickHandler = (e) => {
    console.log(this.state.errorMsg)
    console.log(this.state.equation)
    const negativeInt = this.state.display.split('')
    if(negativeInt.indexOf('(') !== -1 && this.state.display.substr(-1) !== ')' && (e === '+' || e === '-' || e === '*' || e === '/' || e==='=')){
      this.setState({errorMsg: "Please close the parentheses"})
      return
    }else if(e === '='){
      if(this.state.equation === ''){
        return
      }
      const ans = eval(this.state.equation+this.state.display)
      this.setState({display:ans.toString(), equation: ''})
    }else if (e === 'C') {
      if(this.state.display===''){
        this.setState({equation:''})
      }else{
        this.setState({display:''})
      }
    }else if(e==='()'){
      if(this.state.display.split('').indexOf('(') === -1){
        this.setState((prevState,props)=>({display: "("+prevState.display}))
      }else{
        this.setState((prevState,props)=>({display: prevState.display+")"}))
      }
    }else if(e==='%'){
      const percentage = eval(this.state.display+"/100").toString()
      this.setState({display: percentage})
    }
    else if (e === '(-)') {
      this.setState((prevState,props)=>({display: '(-' + prevState.display}))
    }else if (e === '+' || e === '-' || e === '*' || e === '/') {
      this.setState((prevState,props)=>({equation: prevState.equation + prevState.display + e}))
    }else{
      const lastInput = this.state.equation.substr(-1)
      if(lastInput === '+' || lastInput === '-' || lastInput === '*' || lastInput === '/'){
        this.setState((prevState,props)=>({display: e}))
      }else{
        this.setState((prevState, props) => ({display: prevState.display+e}))
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.errorMsg}</div>
        <DisplayInput input={this.state.display}/>
        {this.state.keys.map((calKey)=>{
          return <Key clicked={()=>this.keyClickHandler(calKey)} key={calKey} calKey={calKey} />
        })}
      </div>
    );
  }
}

export default App;

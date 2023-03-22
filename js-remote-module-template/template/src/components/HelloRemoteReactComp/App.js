import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = React.forwardRef(function App(props, ref) {
  React.useImperativeHandle(ref, () => ({
    sayHello() {
      alert('Hello hel-micro');
    }
  }));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <%= helloInfomation %>
      </header>
    </div>
  );
});

export default App;

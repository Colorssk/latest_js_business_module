import React from 'react';
import './App.css';

interface IProps {
  onHeaderClick?: (label: string) => void;
}


const App = React.forwardRef(function App(props: IProps, ref: any) {
  React.useImperativeHandle(ref, () => ({
    sayHello() {
      alert('Hello');
    }
  }));
  return (
    <div className="App">
      <header className="App-header" onClick={() => props.onHeaderClick?.('header click')}>
        <%= helloInfomation %>
      </header>
    </div>
  );
})

export default App;

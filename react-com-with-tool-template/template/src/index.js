import React from 'react';
import ReactDOM from 'react-dom';
import './utils/stomp-websocket/stomp-websocket';
import App from './App';
import { default as theme } from './utils/theme';

ReactDOM.render(<App />, document.getElementById('root'));
theme();
import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom';

import Chat from './components/chat/Chat';
import Join from './components/join/Join';

function App() {
  return (
    
    <BrowserRouter>
        <Route exact path='/' component={Join}/>
        <Route exact path='/chat' component={Chat}/>
    </BrowserRouter>

  )
}

export default App;

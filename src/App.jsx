import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import EditMsgs from './pages/EditMsgs';
import { Home } from './pages/Home';

function App() {
  return (
    <section className="App">
      <AppHeader />
      <main className="">
        <Switch>
          <Route component={Home} path='/' exact/>
          <Route component={EditMsgs} to='/editMsg' />
        </Switch>
      </main>
    </section>
  );
}

export default App;

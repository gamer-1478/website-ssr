import * as React from 'react'
import routes from './routes'
import { Route, Switch } from 'react-router-dom'
import NavigationBar from './Component/navigation/NavigationBar';
import Fourzerofour from "./Component/404/404";
import './App.css'
import Footer from './Component/footer/Footer'
export default function App () {
  return (
      <div className='container'>
        <NavigationBar />
        <Switch>
          {routes.map(({ path, exact, fetchInitialData, component: C }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <C fetchInitialData={fetchInitialData} {...props} />
            )} />
          ))}
          <Route path='*'>
            <Fourzerofour/>
          </Route>
        </Switch>
        <Footer/>
      </div>
  )
}

import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Header from './components/Header/Header'

function App() {


  return (
    <div className='app'>
      <NavBar />
      <div className='painel'>
        <Header />
        <Outlet />
      </div>

    </div >

  )
}

export default App

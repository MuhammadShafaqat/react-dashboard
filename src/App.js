import { useState } from 'react'
import './App.css'
import Header from './dashboard/Header'
import Sidebar from './dashboard/Sidebar'
import Home12 from './dashboard/Home12'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home12 />
    </div>
  )
}

export default App


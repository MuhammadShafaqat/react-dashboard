import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import CustomPopover from '../customPopover/CustomPopover';
// import Dashboard from './mainDashboard/Dashboard';

function Home12() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards text-white'>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='text-color'>Tickets Bought</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1 className='text-white text-color'>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='text-white text-color'>Revenue</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1 className='text-white text-color'>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='text-white text-color'>Customers</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1 className='text-white text-color'>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='text-white text-color' >Temperature</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1 className='text-white text-color'>42</h1>
            </div>
        </div>



<div className="charts">
  <CustomPopover />
</div>   

    </main>
  )
}

export default Home12
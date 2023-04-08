import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import onLed from '../src/assets/on.png'
import offLed from '../src/assets/off.jpg'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [ledOn, setLedOn] = useState(false);

  // handle turning the LED on
  const on = { state: true, timestamp: new Date() };
  function handleLedOn() {
    fetch('http://localhost:5000/led/on', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(on)
    })
      .then(response => {
        toast.success('LED turned on');
        setLedOn(true);
        refetch();
      })
      .catch(error => {
        console.error('Error turning on LED:', error);
      });
  }

  // handle turning the LED off
  const off = { state: false, timestamp: new Date() };
  function handleLedOff() {
    fetch('http://localhost:5000/led/off', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(off)
    })
      .then(response => {
        toast.info('LED turned off');
        setLedOn(false)
        refetch();
      })
      .catch(error => {
        console.error('Error turning off LED:', error);
      });
  }
  // fetch

  // the LED history when the component mounts
  const { data: ledHistory = [], refetch } = useQuery({
    queryKey: ['ledHistory'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/led/history');
      const data = await res.json();
      console.log(data)
      return data;
    }
  });



  const handleDelete = () => {
    fetch('http://localhost:5000/led/history/delete', {
      method: 'Delete',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {
          toast.error('Successfully deleted the history.')
          refetch();

        }
      })
  }
  const handleDeleteState = id => {
    fetch(`http://localhost:5000/led/history/delete/${id}`, {
        method: 'Delete',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
                
              toast.error('Deleted the state.');
              refetch();
            }
        })
}

  return (
    <div className='mx-auto container'>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="hero min-h-screen bg-base-200 text-center">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={ledOn ? onLed : offLed} className="max-w-xl rounded-lg shadow-xl" />
          <div>
            <h1 className='text-4xl'>Welcome to the <br /><span className={`text-6xl font-bold ${ledOn ? 'text-success' : 'text-info'}`}>Smart Light Controlling System</span></h1>
            <p className="py-6">Your home is in your hand</p>
            <button className='btn  btn-success btn-wide' onClick={handleLedOn} disabled={ledOn}>Turn On</button>
            <button className='btn  btn-info btn-wide' onClick={handleLedOff} disabled={!ledOn}>Turn Off</button>
          </div>
        </div>
      </div>

      <div className="text-center bg-base-300 rounded-xl mt-32">
        <h1 className='text-5xl font-bold mx-auto p-6'>History</h1>
        
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>No.</th>
              <th>Time</th>
              <th>Led State</th>
              <th><button className='btn  btn-error' onClick={handleDelete} disabled={ledHistory.length === 0}>Delete all</button></th>
            </tr>
          </thead>
          <tbody>
            {ledHistory.map((led, index) => (

              <tr key={index} className='hover'>
                <th>{index + 1}</th>
                <td>{new Date(led.timestamp).toLocaleString()}</td>
                <td>{led.state ? 'On' : 'Off'}</td>
                <td><button onClick={() => handleDeleteState(led._id)} className='btn btn-xs btn-error'>Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}


export default App;
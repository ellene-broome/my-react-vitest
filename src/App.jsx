// App.jsx

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'

import Greeting from './components/Greeting'
import CounterButton from './components/CounterButton'


export default function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <Header title="Welcome to My React + Vite App"/>

    <main style={{ padding: 24}}>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h2>My React + Vite App</h2>

      {/* Component with a prop */}
      <Greeting name="Professor Basham" />

      {/* The Vite starter counter */}
      <div className="card" style={{ marginTop: 16 }}>
        <button onClick={() => setCount(c => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR -</p>
          <p> It Works, 
          it really does!
        </p>
      </div>

      {/* Counter component from CounterButton */}
      <CounterButton />


      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>

    <Footer brand="My React + Vite App" />
    </>
  );
}
      
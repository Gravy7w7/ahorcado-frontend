import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { UserOutlined } from '@ant-design/icons'
import { Flex, Input } from 'antd';

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Bienvenido a ahorcado!</h1>
          <p>
            Proyecto de sistemas distribuidos hecho por: <code>Pedro Bacab, Anahi Dzul y Raúl Palomo</code>
          </p>
          <div>
            <h2>Ingresa tu nombre</h2>
          </div>
          <div>
          <Flex vertical gap="medium">
              <Input size="large" placeholder='Usuario' prefix={<UserOutlined />} />
          </Flex>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Información del proyecto</h2>
          <p>Si necesitas más información, consulta nuestro github:</p>
          <ul>
            <li>
              <p>Front end</p>
              <a href="" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <p>Back end</p>
              <a href="https://github.com/Gravy7w7/ahorcado-backend.git" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

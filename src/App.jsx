import Header from './components/Header.jsx'
import './App.css'
import { Outlet } from 'react-router'
import './styles/Button.css'
import Footer from './components/footer.jsx'

function App() {


  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App

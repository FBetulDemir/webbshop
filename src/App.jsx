import Header from './components/Header.jsx'
import './App.css'
import { Outlet } from 'react-router'
import './styles/Button.css'
import Footer from './components/footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App

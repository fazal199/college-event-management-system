import { Outlet } from 'react-router-dom'
import Header from "../components/shared/Header"
import FetchUserData from '@/pages/NoUiComponents/FetchUserData'
import { useSelector } from 'react-redux'
import Footer from '@/components/shared/Footer'

const RootLayout = () => {


  return (
    <>
      <Header />
      <main className='min-h-[83vh] h-auto'>
        <FetchUserData />
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default RootLayout

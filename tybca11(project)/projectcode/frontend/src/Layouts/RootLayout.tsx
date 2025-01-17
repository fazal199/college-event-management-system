import { Outlet } from 'react-router-dom'
import Header from "../components/shared/Header"
import FetchUserData from '@/pages/NoUiComponents/FetchUserData'
import { useSelector } from 'react-redux'

const RootLayout = () => {


  return (
    <>
      <Header />
      <main className='min-h-[83vh] h-auto'>
        <FetchUserData />
        <Outlet />
      </main>
      <footer className='shadow-md shadow-secondary-foreground static'>
        <p className='text-foreground text-center text-lg font-semibold py-2'>All Rights Reserved &copy; 2024</p>
      </footer>
    </>
  )
}

export default RootLayout

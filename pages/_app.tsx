import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from '../components/login_page';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import LoginModal from '../components/login_modal';

function MyApp({ Component, pageProps }: AppProps) {

  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    // re-renders the navbar to change the navbar options.
  }, [loginModal])

  return (
    <div className='min-h-screen bg-primary text-primaryHeading mx-auto w-full text-center'>
      <Navbar 
      onLogin={() => {
        setLoginModal(true);
      }}
      />
      <div className='pt-16'>
        <Component {...pageProps} />
      </div>

      <LoginModal 
        open={loginModal} 
        setOpen={(value) => {setLoginModal(value)}}
      ></LoginModal>
    </div>
  );
}

export default MyApp

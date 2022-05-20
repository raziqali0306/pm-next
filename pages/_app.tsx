import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from '../components/login_page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='min-h-screen bg-primary text-primaryHeading mx-auto w-full text-center'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp

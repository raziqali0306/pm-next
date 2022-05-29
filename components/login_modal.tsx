import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { CgCopyright } from 'react-icons/cg';
import { ImEnter } from 'react-icons/im';
import { IoCreate } from 'react-icons/io5'

interface loginUser {
    username: string,
    password: string,
}

function LoginModal() {

    const [username, setUsername] = useState<string | null>(null);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
            remail: { value: string };
          };
        const user:loginUser = {
            username: target.username.value,
            password: target.password.value,
        }
        await axios.post('http://localhost:3000/auth/login', user)
        .then((res) => {
            if(res.status === 200) {
                if(target.remail.value === "on") {
                    localStorage.setItem('vault', res.data.username);
                }
                sessionStorage.setItem("token_details", res.data.accesstoken);
                Router.replace('/app');
            }
            else {
                alert("Something went wrong.! Please check your credentials and try again.!")
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(localStorage.getItem('vault') !== null) {
            const username:string | null = localStorage.getItem('vault');
            setUsername(username);
        }
    }, [])

    return (
        <div className="select-none max-w-lg mx-auto">
            <div className="py-2 bg-secondary_light text-center">
                <p className="text-2xl capitalize font-semibold tracking-wide text-secondaryHeading">Log in</p>
            </div>

            <div className="px-4 py-6 text-left text-base">
                <form onSubmit={(event) => handleLogin(event)}>
                    {username !== null && username !== ''? 
                    <div className='text-center text-base'>
                        <input className="hidden" value={username || ""} type="text" name='username' onChange={() => {null}} required/>
                        <p>Hey <span className='font-bold text-xl'>{username}</span>! </p>
                        <p className='text-xs'>(Enter your password to access vault.)</p>
                        <div className='cursor-pointer text-xs'>Login to another account? <span className='font-semibold text-sm' onClick={() => {
                            setUsername(null);
                        }}>Click here.!</span></div>
                    </div>
                    :
                    <>
                        <label className='px-1 font-semibold tracking-wide mb-1' htmlFor="username">Username</label>
                        <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-primary focus:outline-none focus:border-secondary" type="text" name="username" id="username" placeholder='Eg: John Doe' required/>
                    </>
                    }
                    <label className='px-1 font-semibold tracking-wide mb-1' htmlFor="password">Password</label>
                    <input className="h-8 px-2 w-full rounded-md border-2 border-primary focus:outline-none focus:border-secondary" type="password" name="password" id="password" placeholder='Eg: Password' required/>
                    <div className="flex items-center gap-1 mt-4 mb-2">
                        <input className="border-primary" type="checkbox" id="remail" name="remail" onChange={(val) => {
                            val.target.value = val.target.value === "on" ? "off" : "on"
                        }} defaultChecked/>
                        <label htmlFor="remail" className="text-highlight">
                            Remember me
                        </label>
                    </div>
                    <div className="inline-flex items-center gap-2 w-full justify-around font-semibold mx-auto">
                        <div className="cursor-pointer w-1/2 inline-flex gap-1 items-center justify-center text-center py-1 rounded-md bg-secondary border-2 border-secondary transition hover:scale-105 duration-300">
                            <ImEnter color="white" />
                            <input type="submit" value="Log in" className='cursor-pointer text-secondaryParagraph'/>
                        </div>
                        <div className={`${username === null ? 'w-1/2' : 'hidden'}`}>
                            <Link href='/register' passHref >
                                <div className="cursor-pointer inline-flex w-full gap-1 items-center justify-center text-center py-1 rounded-md border-secondary border-2">
                                    <IoCreate />
                                    <p>Create Account</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
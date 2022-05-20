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

function LoginPage() {

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
                    localStorage.setItem('pm', JSON.stringify({
                        username: res.data.username,
                        accesstoken: res.data.accesstoken,
                    }));
                }
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
        if(localStorage.getItem('pm') !== null) {
            const pm = JSON.parse(localStorage.getItem('pm') || "");
            setUsername(pm.username);
        }
    }, [])

    return (
        <div className="pt-10 px-12 select-none max-w-lg mx-auto">
            <div className="px-4">
                <p className="text-4xl uppercase pb-4 font-bold tracking-widest text-primaryHeading">vault</p>
                <p className="text-lg pb-10 tracking-wide text-primaryParagraph">Log in or Create a new account to access your vault</p>
            </div>

            <div className="px-4 py-6 mb-20 rounded-sm bg-secondary text-primary text-left text-base">
                <form onSubmit={(event) => handleLogin(event)}>
                    {username !== null && username !== ''? 
                    <div className='text-center my-4 text-base'>
                        <input className="hidden" value={username || ""} type="text" name='username' onChange={() => {null}} required/>
                        <p>Hey <span className='font-bold text-xl'>{username}</span>! <br/> (Enter your password to access vault.)</p>
                        <div className='cursor-pointer'>Login to another account? <span className='font-semibold text-lg' onClick={() => {
                            setUsername(null);
                        }}>Click here.!</span></div>
                    </div>
                    :
                    <>
                        <label className='font-semibold tracking-wide mb-1' htmlFor="username">Username</label>
                        <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="username" id="username" placeholder='Eg: John Doe' required/>
                    </>
                    }
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password">Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password" id="password" placeholder='Eg: Password' required/>
                    <div className="flex items-center gap-1 mt-4 mb-2">
                        <input className="border-primary" type="checkbox" id="remail" name="remail" onChange={(val) => {
                            val.target.value = val.target.value === "on" ? "off" : "on"
                        }} defaultChecked/>
                        <label htmlFor="remail" className="text-highlight">
                            Remember me
                        </label>
                    </div>
                    <div className="inline-flex items-center gap-2 w-full justify-around font-semibold">
                        <div className="cursor-pointer w-full inline-flex gap-1 items-center justify-center text-secondaryParagraph text-center py-1 rounded-md bg-primary border-2 border-primary">
                            <ImEnter color="white" />
                            <input type="submit" value="Log in" className='cursor-pointer text-primaryParagraph'/>
                        </div>
                        <Link href='/register' passHref>
                            <div className="cursor-pointer w-full inline-flex gap-1 items-center justify-center text-center py-1 rounded-md border-primary border-2">
                                <IoCreate />
                                <p>Create Account</p>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>

            <div className="text-sm">
                <div className="mb-1 inline-flex items-center gap-1">
                    <CgCopyright />
                    <p>2022, Vault Inc.</p>
                </div>
                <p>Version 1.0.0</p>
            </div>

        </div>
    );
}

export default LoginPage;
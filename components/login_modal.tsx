import axios from 'axios';
import {useRouter} from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { ImEnter } from 'react-icons/im';
import { IoCreate } from 'react-icons/io5'
import BaseModal from './base_modal';

interface loginUser {
    username: string,
    password: string,
}

export default function LoginModal(
{   open,
    setOpen
} : {
    open: boolean,
    setOpen: (value: boolean) => void,
}) {

    const [login, setLogin] = useState<boolean>(true);

    return (
        <BaseModal open={open} setOpen={setOpen}>
            {
                login === true ? 
                    <LoginContent setOpen={(value) => setOpen(value)} setLogin={(value: boolean) => setLogin(value)}/>
                :
                    <RegisterContent setLogin={(value: boolean) => setLogin(value)}/>
            }
        </BaseModal>
    );
}

function LoginContent({
    setOpen,
    setLogin,
}:{
    setOpen: (value: boolean) => void,
    setLogin: (value: boolean) => void,
}) {

    
    const Router = useRouter();

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
                setOpen(false);
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
        <div className="select-none">
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
                        <div className='cursor-pointer text-xs'>Login to another account or Create one? <span className='font-semibold text-sm' onClick={() => {
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
                        <div className="cursor-pointer w-1/2 inline-flex gap-1 items-center justify-center text-center py-1 rounded-md bg-secondary border-2 border-secondary transition hover:scale-105 duration-300" >
                            <ImEnter color="white" />
                            <input type="submit" value="Log in" className='cursor-pointer text-secondaryParagraph'/>
                        </div>
                        <div className={`${username === null ? 'w-1/2' : 'hidden'}`}>
                            <div onClick={() => {
                                setLogin(false);
                            }}>
                                <div className="cursor-pointer inline-flex w-full gap-1 items-center justify-center text-center py-1 rounded-md border-secondary border-2">
                                    <IoCreate />
                                    <p>Create Account</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


function RegisterContent({
    setLogin,
}:{
    setLogin: (value: boolean) => void,
}) {

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            name: { value: string };
            username: { value: string };
            password1: { value: string };
            password2: { value: string };
          };
        const password2 = target.password2.value;
        const user: User = {
            name: target.name.value,
            email: target.email.value,
            username: target.username.value,
            password: target.password1.value
        }
        if(password2 === user.password) {
            await axios.post('http://localhost:3000/auth/register', user)
            .then((res) => {
                if(res.status === 200) {
                    localStorage.setItem('vault', user.username);
                    alert('account created. Login to your account');
                    setLogin(true);
                }
            })
            .catch((err) => {
                alert("Username already exist!");
            })
        }
        else {
            alert("passwords and confirm_password did not match.!");
        }
    }

    return (
        <div className="select-none">
            <div className="py-2 bg-secondary_light text-center">
                <p className="text-2xl capitalize font-semibold tracking-wide text-secondaryHeading">Sign up</p>
            </div>

            <div className="px-4 py-6 text-left text-base">
                <form onSubmit={(event) => {register(event)}} className="text-secondary">
                    <label className='font-semibold tracking-wide mb-1' htmlFor="email">Email Address</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="email" id="email" placeholder='Eg: JohnDoe@example.com' required/>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="name">Your Name</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="name" id="name" placeholder='Eg: John Doe' required/>
                    <p className='text-xs opacity-80 mb-2'>What should we call you?</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="username">Username</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="username" id="username" placeholder='Eg: Username' required/>
                    <p className='text-xs opacity-80 mb-2'>You will use username to login.</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password1">Master Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password1" id="password1" placeholder='Enter password' required/>
                    <p className='text-xs opacity-80 mb-2'>Master password is used to Log In and keep it strong. Do not share your Master password and forget since, there is no way to recover it.</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password2">Re-enter Master Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password2" id="password2" placeholder='Enter password again' required/>
                    <p className='text-xs opacity-80 mb-2'>Re-enter your master password here.</p>
                    <div className="flex items-center gap-1 mt-4 mb-6">
                        <input className="border-primary" type="checkbox" name='check' id="check" checked />
                        <label htmlFor="check" className="text-highlight text-sm">
                            By checking this box you agree our Terms of Service and Privacy Policy.
                        </label>
                    </div>
                    <div className="inline-flex items-center gap-2 w-full justify-around font-semibold">
                        <div className="w-full text-center py-1 rounded-md border-2 text-primaryHeading hover:text-secondaryHeading border-secondary cursor-pointer transition ease-in duration-150 hover:bg-secondary hover:scale-95 shadow-sm shadow-secondary hover:shadow-none">
                            <input type="submit" value="Submit" className='font-semibold cursor-pointer focus:opacity-50 w-full'/>
                        </div>
                        <div className="cursor-pointer bg-secondary text-secondaryHeading w-full text-center py-1 rounded-md border-secondary border-2 hover:scale-95 transition duration-150"
                         onClick={() => {
                            setLogin(true);
                         }}>
                            Cancel
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
import { CgCopyright } from 'react-icons/cg';
import { useRouter } from 'next/router'
import { FormEvent } from 'react';
import { User } from '../core/entites';
import axios from 'axios';

function RegisterPage() {
    const Router = useRouter();

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
                    localStorage.setItem('pm-username', user.username);
                    Router.push('/');
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
        <div className="py-10 px-12 select-none max-w-lg mx-auto"> 
            <div className="px-4">
                <p className="text-4xl uppercase pb-4 font-bold tracking-widest text-primaryHeading">vault</p>
                <p className="text-2xl pb-4 tracking-wider text-primaryParagraph">Create Account</p>
            </div>

            <div className="px-4 py-6 mb-20 rounded-sm bg-secondary text-primary text-left text-base">
                <form onSubmit={(event) => {register(event)}}>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="email">Email Address</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="email" id="email" required/>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="name">Your Name</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="name" id="name" required/>
                    <p className='text-xs opacity-80 mb-2'>What should we call you?</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="username">Username</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="username" id="username" required/>
                    <p className='text-xs opacity-80 mb-2'>You will use username to login.</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password1">Master Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-1 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password1" id="password1" required/>
                    <p className='text-xs opacity-80 mb-2'>Master password is used to Log In and keep it strong. Do not share your Master password and forget since, there is no way to recover it.</p>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password2">Re-enter Master Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password2" id="password2" required/>
                    <p className='text-xs opacity-80 mb-2'>Re-enter your master password here.</p>
                    <div className="flex items-center gap-1 mt-4 mb-2">
                        <input className="border-primary" type="checkbox" name='check' id="check" checked />
                        <label htmlFor="check" className="text-highlight text-sm">
                            By checking this box you agree our Terms of Service and Privacy Policy.
                        </label>
                    </div>
                    <div className="inline-flex items-center gap-2 w-full justify-around font-semibold">
                        <div className="w-full text-secondaryParagraph text-center py-1 rounded-md bg-primary border-2 border-primary cursor-pointer">
                            <input type="submit" value="Submit" className='font-semibold cursor-pointer focus:opacity-50 w-full'/>
                        </div>
                        <div className="cursor-pointer w-full text-center py-1 rounded-md border-primary border-2" onClick={() => Router.back()}>
                            Cancel
                        </div>
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

export default RegisterPage;
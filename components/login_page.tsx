import Link from 'next/link';
import { CgCopyright } from 'react-icons/cg';
import { ImEnter } from 'react-icons/im';
import { IoCreate } from 'react-icons/io5'


function LoginPage() {
    return (
        <div className="pt-10 px-12 select-none max-w-lg mx-auto"> 
            <div className="px-4">
                <p className="text-4xl uppercase pb-4 font-bold tracking-widest text-primaryHeading">vault</p>
                <p className="text-lg pb-10 tracking-wide text-primaryParagraph">Log in or Create a new account to access your vault</p>
            </div>

            <div className="px-4 py-6 mb-20 rounded-sm bg-secondary text-primary text-left text-base">
                <form>
                    <label className='font-semibold tracking-wide mb-1' htmlFor="username">Username</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="text" name="username" id="username" />
                    <label className='font-semibold tracking-wide mb-1' htmlFor="password">Password</label>
                    <input className="h-8 px-2 w-full rounded-md mb-2 border-2 border-secondary focus:outline-none focus:border-primary" type="password" name="password" id="password" />
                    <div className="flex items-center gap-1 mt-4 mb-2">
                        <input className="border-primary" type="checkbox" value="" id="remail" checked />
                        <label htmlFor="remail" className="text-highlight">
                            Remember me
                        </label>
                    </div>
                    <div className="inline-flex items-center gap-2 w-full justify-around font-semibold">
                        <div className="cursor-pointer w-full inline-flex gap-1 items-center justify-center text-secondaryParagraph text-center py-1 rounded-md bg-primary border-2 border-primary">
                            <ImEnter />
                            <p>Log In</p>
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
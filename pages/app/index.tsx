import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
import { BsViewList } from 'react-icons/bs';
import axios from "axios";
import { CredItemType } from '../../core/entites'
import { FormEvent, useEffect, useState } from "react";
import CredItem from "../../components/credItem";
import BaseModal from '../../components/base_modal';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSave } from 'react-icons/ai';

function App() {

    const [credItems, setCredItems] = useState<CredItemType[] | []>([]);
    const [open, setOpen] = useState<boolean>(false);
    
    const fetchCredItems = async() => {
        const token:string | null = sessionStorage.getItem('token_details');
        const salt:string = process.env.AES_CRYPT_PASS_PHRASE || "";
        if(token !== null) {
            await axios.get('http://localhost:3000/pm/credentials', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                console.log(res.data);
                let items = res.data;
                items.forEach((item:CredItemType)=> {
                    item.password = AES.decrypt(item.password, salt).toString(enc.Utf8);
                });
                setCredItems(items);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            // do-something
        }
    }
    
    const addItem = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token:string | null = sessionStorage.getItem('token_details');
        const salt:string = process.env.AES_CRYPT_PASS_PHRASE || "";
        if(token !== null) {
            const target = event.target as typeof event.target & {
                name: { value: string };
                username: { value: string };
                password: { value: string };
                url: {value: string}
            };
            let pass = AES.encrypt(target.password.value, salt).toString();
            console.log(pass);
            let data:any = {
                name: target.name.value,
                username: target.username.value,
                password: pass,
            }
            if(target.url.value && target.url.value !== '' && target.url.value !== undefined) {
                data['url'] = target.url.value;
            }
            axios.post('http://localhost:3000/pm/add', data, {
                headers: {
                    'Authorization' : 'Bearer ' + token,
                }
            })
            .then((res) => {
                setOpen(false);
                fetchCredItems();
            })
            .catch((err) => {
                console.log(err)
            })

        }
        else {
            //do something
        }
    }


    const deleteItem = async (id: string) => {
        let c = confirm('Confirm Delete ?');
        const token:string | null = sessionStorage.getItem('token_details');
        if(c && token !== null) {
            await axios.delete(`http://localhost:3000/pm/delete/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + token,
                }
            }).then((res) => {
                fetchCredItems();
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            // do-something
        }
    }

    useEffect(() => {
        fetchCredItems();
    }, [])

    return (
        <>
            {/* Content-Layout */}
            <div className="min-h-screen grid grid-cols-10 grid-rows-1 pt-16">
                <div className="col-span-1 bg-secondary_light inline-flex py-4 px-2 justify-center">
                    <BsViewList className="bg-secondary w-8 h-8 p-1 rounded-md cursor-pointer" color='white'/>
                </div>
                <div className="col-span-9 overflow-auto h-full">
                    <div className="w-full px-6 inline-flex justify-between items-center py-2 border-b-2 border-secondary"> 
                        <p className="text-xs text-primaryHeading font-semibold" >Items: <span className="font-bold">{credItems.length}</span></p>
                        <div className="cursor-pointer border-2 border-secondary bg-secondary text-secondaryHeading font-semibold py-1 px-3 rounded-full text-xs hover:scale-105 trasition duration-150 hover:text-primaryHeading hover:bg-primary"
                            onClick={() => {setOpen(true)}}
                        >
                            ADD
                        </div>
                    </div>
                    <div className="pb-4 max-w-md">
                        <div className="">
                            {
                                credItems.length !== 0 ? 
                                credItems.map((item, key) => (
                                    <CredItem key={key} item={item} deleteItem={deleteItem}/>
                                ))
                                : 
                                <div className="mt-20">
                                    <p className="text-4xl uppercase pb-4 font-bold tracking-widest text-primaryHeading">vault</p>
                                    <p className="text-base font-semibold">No items Founds. Add now.!</p>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

            <BaseModal open={open} setOpen={(value) => {setOpen(value)}}>
                <AddItemForm addItem={(event) => {addItem(event)}}/>
            </BaseModal>
        </>
    )
}

export default App;


function AddItemForm({
    addItem,
} : {
    addItem: (event: FormEvent<HTMLFormElement>) => void,
}) {

    const [show, setShow] = useState<boolean>(false);
    const [pass, setPass] = useState<string>('');

    const handleAddItem = (event: FormEvent<HTMLFormElement>) => {
        addItem(event);
    }

    const toggleEye = () => {
        setShow(!show);
    }

    return (
        <div>
            <div className="py-2 mb-2 bg-secondary text-secondaryHeading text-center shadow-sm shadow-secondary_light tracking-wider">
                Add Item
            </div>
            <div className="text-sm pt-2 pb-3 px-3">
                <form onSubmit={(event) => {handleAddItem(event)}}>
                    <div className="px-4 py-3 shadow-sm shadow-secondary rounded-lg mb-4">
                        <div className="pb-1 border-b-2 border-secondary border-opacity-5">
                            <p className="opacity-75 ">Name</p>
                            <input type="text" name='name' className='w-full bg-primary focus:outline-none' />
                        </div>
                        <div className="pb-1 border-b-2 border-secondary border-opacity-5">
                                <p className="opacity-75 pt-1">Username</p>
                                <input type="text" name='username' className='w-full bg-primary focus:outline-none' required/>
                        </div>
                        <div className="pb-1 border-b-2 border-secondary border-opacity-5">
                            <p className="opacity-75 pt-1">Password</p>
                            <div className='inline-flex justify-between items-center w-full'>
                                <input type={`${show ? 'value' : 'password'}`} value={pass} onChange={(val) => {setPass(val.target.value)}} name='password' className='w-full bg-primary focus:outline-none' required/>
                                {show === false ? 
                                    <AiOutlineEye className="cursor-pointer h-5 w-5 mr-2" onClick={toggleEye}/>
                                    :
                                    <AiOutlineEyeInvisible className="cursor-pointer h-5 w-5 mr-2" onClick={toggleEye}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 shadow-sm shadow-secondary rounded-lg mb-4">
                        <div className="pb-1 border-b-2 border-secondary border-opacity-5">
                            <p className="opacity-75 ">Website</p>
                            <input type="url" name="url" className='w-full bg-primary focus:outline-none' />
                        </div>
                    </div>

                    <div className='w-full inline-flex justify-end items-center pr-1'>
                        <input type="submit" value="" className='fixed right-5 w-6 h-6 cursor-pointer z-50'/>
                        <div className='p-1 bg-secondary border-2 border-secondary_light rounded-md shadow-inner shadow-primary/20 transition hover:scale-105 duration-150'>
                            <AiOutlineSave className='w-5 h-5' color="#ffc0ad"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
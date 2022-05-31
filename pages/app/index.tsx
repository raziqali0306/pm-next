import { BsViewList } from 'react-icons/bs';
import axios from "axios";
import { CredItemType } from '../../core/entites'
import { useEffect, useState } from "react";
import CredItem from "../../components/credItem";

function App() {

    const [credItems, setCredItems] = useState<CredItemType[] | []>([]);
    
    const fetchCredItems = async() => {
        const token:string | null = sessionStorage.getItem('token_details');
        if(token !== null) {
            await axios.get('http://localhost:3000/pm/credentials', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                setCredItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            // do-something
        }
    }
    
    const addItem = async() => {

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
                        <div className="cursor-pointer border-2 border-secondary bg-secondary text-secondaryHeading font-semibold py-1 px-3 rounded-full text-xs hover:scale-105 trasition duration-150 hover:text-primaryHeading hover:bg-primary">
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
        </>
    )
}

export default App;

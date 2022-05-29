import Navbar from "../../components/navbar";
import CredList from "../../components/credential/CredList";
import { BsViewList } from 'react-icons/bs';
import axios from "axios";
import { CredItemType } from '../../core/entites'
import { useEffect, useState } from "react";

function App() {

    const [CredItems, setCredItems] = useState<CredItemType[] | []>([]);

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

    useEffect(() => {
        fetchCredItems();
    }, [])

    return (
        <>
            <Navbar />

            {/* Content-Layout */}
            <div className="pt-16 max-h-screen min-h-screen grid grid-cols-10 grid-rows-1">
                <div className="col-span-1 bg-secondary_light inline-flex py-4 px-2 justify-center">
                    <BsViewList className="bg-secondary w-8 h-8 p-1 rounded-md cursor-pointer" color='white'/>
                </div>
                <div className="col-span-9 overflow-auto">
                    <div className="w-full px-6 inline-flex justify-between items-center py-2"> 
                        <p className="text-xs text-primaryHeading font-semibold" >Items: <span className="font-bold">10</span></p>
                        <div className="cursor-pointer border-2 border-secondary bg-secondary text-secondaryHeading font-semibold py-1 px-3 rounded-full text-xs hover:scale-105 trasition duration-150 hover:text-primaryHeading hover:bg-primary">
                            ADD
                        </div>
                    </div>
                    <div className="pb-4">
                        <CredList credItems={CredItems}  />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
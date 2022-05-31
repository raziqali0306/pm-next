/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { CredItemType } from "../core/entites";
import BaseModal from "./base_modal";
import { MdDelete } from 'react-icons/md';

function CredItem({
    item,
    deleteItem,
}:
{
    item: CredItemType,
    deleteItem: (id: string) => void,
}) {
    
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="bg-primary hover:bg-black/5 cursor-pointer" onClick={() => {
            setOpen(true);
        }}>
            <div className="px-1 grid grid-cols-8 rounded-2 border-b-2 border-secondary pt-1 pb-2 gap-2 mx-4 md:mx-0">
                <div className="col-span-1 my-auto inline-flex justify-center items-center">
                    <img className="rounded-full" src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=32`} alt="" />
                </div>
                <div className="col-span-7 text-left">
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-xs  opacity-75">{item.username}</p>
                </div>            
            </div>
            <BaseModal open={open} setOpen={(value) => {setOpen(value)}}>
                <ItemInfo item={item} deleteItem={deleteItem} setOpen={(value) => {setOpen(value)}}/>
            </BaseModal>
        </div>
    );
}

export default CredItem;



function ItemInfo({
    item,
    setOpen,
    deleteItem,
}:
{
    item: CredItemType,
    setOpen: (value: boolean) => void,
    deleteItem: (id: string) => void,
}) {
    return (
        <div>
            <div className="py-2 mb-2 bg-secondary text-secondaryHeading text-center shadow-sm shadow-secondary_light tracking-wider">
                Item Information
            </div>
            <div className="text-sm pt-2 pb-3 px-3">
                <div className="px-4 py-3 shadow-sm shadow-secondary rounded-lg mb-4">
                    <p className="opacity-75 ">Name</p>
                    <p className="font-semibold text-base pb-1 border-b-2 border-secondary border-opacity-5">{item.name}</p>
                    <p className="opacity-75 pt-1">Username</p>
                    <p className="font-semibold text-base pb-1 border-b-2 border-secondary border-opacity-5">{item.username}</p>
                    <p className="opacity-75 pt-1">Password</p>
                    <p className="font-semibold text-base">{item.name}</p>
                </div>

        {
            item.url ? 
                <div className="px-4 py-3 shadow-sm shadow-secondary rounded-lg mb-4">
                    <p className="opacity-75 ">Website</p>
                    <p className="font-semibold text-base">{item.url}</p>
                </div>
            :
                <></> 
        }

                <div className="px-2 py-1 inline-flex w-full items-center justify-between">
                    <p><span className="text-xs font-bold opacity-60">Updated On:</span> 23rd July 2021</p>
                    <div className="p-1 bg-secondary border-2 border-secondary_light rounded-md shadow-inner shadow-primary/20 cursor-pointer transition hover:scale-105 duration-150"
                        onClick={()=> {
                            deleteItem(item._id);
                            setOpen(false);
                        }}
                    >
                        <MdDelete color="#ffc0ad" className="w-5 h-5"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
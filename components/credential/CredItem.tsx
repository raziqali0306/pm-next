/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { CredItemType } from "../../core/entites";

function CredItem({
    item,
}:
{
    item: CredItemType,
}) {

    useEffect(() => {
        console.log(item);
    }, [])

    return (
        <div className="px-1 grid grid-cols-8 mb-2 rounded-2 border-b-2 border-secondary pb-2 gap-2 max-w-sm">
            <div className="col-span-1 my-auto inline-flex justify-center items-center">
                <img className="rounded-full" src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=32`} alt="" />
            </div>
            <div className="col-span-7 text-left">
                <p className="text-base font-semibold">{item.name}</p>
                <p className="text-xs  opacity-75">{item.username}</p>
            </div>
        </div>
    );
}

export default CredItem;
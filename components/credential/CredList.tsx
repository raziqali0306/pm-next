import { useEffect } from "react";
import { CredItemType } from "../../core/entites";
import CredItem from "./CredItem";

function CredList({
    credItems,
}: {
    credItems: CredItemType[] | []
}) {
    return (
        <div className="mx-4">
            {
                credItems.length !== 0 ? 
                credItems.map((item, key) => (
                    <CredItem key={key} item={item}/>
                ))
                : 
                <div className="mt-20">
                    <p className="text-4xl uppercase pb-4 font-bold tracking-widest text-primaryHeading">vault</p>
                    <p className="text-base font-semibold">No items Founds. Add now.!</p>
                </div>
            }
        </div>
    );
}

export default CredList;
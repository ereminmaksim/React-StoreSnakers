import AppContext from "../../ContextAPP/context";
import {useContext} from "react";


export const useSummSneakers = ()=> {
    const {sneakersItems, setSneakersItems} = useContext(AppContext)
    const totalPrice = sneakersItems.reduce((summ, obj) =>summ +  obj.price, 0)

    return {sneakersItems, setSneakersItems,totalPrice}
}

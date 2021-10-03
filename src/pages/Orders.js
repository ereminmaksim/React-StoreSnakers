import React, {useEffect, useState} from 'react';
import style from "./Favorites.module.scss";
import Card from "../components/Content/Card";
import axios from "axios";
import instanceURL from "../API/api";


function Orders() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        (async () => {
            try {
                const {data} = await axios.get(`${instanceURL}/orders`)
                /**
                 * оба способа рабочие!!!
                 * .flat
                 * .reduce
                 * console.log(data.map((obj)=> obj.items).flat())
                 * console.log(data.reduce((prev, obj)=>[...prev, ...obj.items],[]))
                 */
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                console.error(error + 'ПРОИЗОШЛА ОШИБКА ПОКУПКИ')
                console.log(error + 'ПРОИЗОШЛА ОШИБКА ПОКУПКИ')
            }
        })()

    }, [])

//вытягиваем заказы!!!
    return (
        <>
            <div className={style.contents}>
                <h1>МОИ ПОКУПКИ!!!</h1>
                <div className="d-flex flex-wrap">
                    {
                        (isLoading ? [...Array(8)] : orders).map((obj, id) => (
                                <Card key={id}
                                      loading={isLoading}
                                      {...obj}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Orders;

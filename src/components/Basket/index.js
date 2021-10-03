import React, {useState} from 'react';
import style from './../Basket/Basket.module.scss'
import Info from "../../Info/Info";
import axios from "axios";
import instanceURL from "../../API/api";
import {useSummSneakers} from "../hooks/useSummSneakers";



const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))


const Basket = ({items = [], onCloseBasket, onRemove, opened}) => {
    const {sneakersItems, setSneakersItems, totalPrice} = useSummSneakers();
    const [orderId, setOrderId] = useState(null)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    //пробую загрузку страницы!!!
    const [isLoading, setIsLoading] = useState(false)
    // const {totalPrice} = useContext(AppContext);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(`${instanceURL}/orders`,
                {items: sneakersItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setSneakersItems([])


            for (let i = 0; i < sneakersItems.length; i++) {
                const item = sneakersItems[i]
                await axios.delete(`${instanceURL}/card/${item.id}`)
                await delay(1000)
            }


        } catch (error) {
            alert(`${error} Данные не загрузились`)
            console.log(`${error} Данные не загрузились`)
            console.error(error)
        }
        setIsLoading(false)
    }


    // console.log(props)
    return (
        <>

            <div className={`${style.drawerShadow} ${opened ? style.drawerShadowVisible : "" }`}>
                <div className={style.drawerBlock}>
                    <div className={style.basket}>
                        <div>
                            <h3>Корзина</h3>
                        </div>
                        <img onClick={onCloseBasket} className="basketArrow cu-p" src="/img/thecross.svg"
                             alt="Cross"/>
                    </div>

                    {
                        items.length > 0 ?
                            <>

                                <div className={style.items}>
                                    {items.map((obj, id) => (

                                        <div key={id} className={style.cartItem}>
                                            <img className={style.sneakersImg} width="180px" height="120px"
                                                 src={obj.imgUrl} alt="sneakers"/>
                                            <div>
                                                <p className="mb-5">{obj.name}</p>
                                                <b>{obj.price}</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className={style.cartItemImg}
                                                 src="/img/thecross.svg" alt="theCross"/>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className={style.cartTotalBlock}>
                                    <ul>
                                        <li>
                                            <span>Итого:</span>
                                            <div></div>
                                            <b>{totalPrice}</b>
                                        </li>
                                        <li>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{Math.floor(totalPrice*0.05)}</b>
                                        </li>
                                    </ul>

                                    <button disabled={isLoading} onClick={onClickOrder}
                                            className={style.cartButton}>Оформить заказ:<img src="img/arrow.svg"
                                                                                             alt="Arrow"/>
                                    </button>
                                </div>
                            </>
                            :
                            (
                                <Info
                                    imgUrl={isOrderComplete ? "img/orderPlaced.png" : "img/empty-cart.jpg"}
                                    name={isOrderComplete ? 'Заказ оформлен' :
                                        'Корзина пустая'}
                                    description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан 
                                    курьерской доставке`
                                        : 'Добавьте пару кросовок для заказа'}/>
                            )
                    }
                </div>
            </div>
        </>
    );
};

export default Basket;

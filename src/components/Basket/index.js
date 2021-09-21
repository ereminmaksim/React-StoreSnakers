import React from 'react';
import style from './../Basket/Basket.module.scss'


const Basket = ({items = [], onCloseBasket, onRemove}) => {
    // console.log(props)
    return (
        <>
            {/*style={{display: "none"}}*/}
            <div className={style.drawerShadow}>
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
                                            <div> </div>
                                            <b>21 498 руб.</b>
                                        </li>
                                        <li>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>1074 руб.</b>
                                        </li>
                                    </ul>

                                    <button className={style.cartButton}>Оформить заказ:<img src="img/arrow.svg"
                                                                                             alt="Arrow"/>
                                    </button>
                                </div>
                            </>
                            :
                            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                                <img className="mb-20" width="120px" src="img/empty-cart.jpg" alt="Empty"/>
                                <h2>Корзина пустая</h2>
                                <p className="opacity-6">Добавьте пару кросовок для заказа</p>
                                <button onClick={onCloseBasket} className={style.greenButton}>
                                    <img src="img/arrows.svg" alt="Arrow"/>
                                    Вернуться назад
                                </button>
                            </div>


                    }


                </div>
            </div>
        </>
    );
};

export default Basket;

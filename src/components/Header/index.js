import React from 'react';
import style from './../Header/Header.module.scss'
import {Link} from "react-router-dom";
import {useSummSneakers} from "../hooks/useSummSneakers";

const Header = (props) => {
    const {totalPrice} = useSummSneakers()


    return (
        <>

            <header style={{backgroundImage: 'url(/img/sneakers/fonsize.png)'}}>
                <Link to="/">
                    <div className="d-flex align-center">
                        <img width="40" height="40" src="/img/logo.png" alt='Logo'/>
                        <div>
                            <h3 className={style.colorWhite}>REACT SNEAKERS</h3>
                            <p className={style.colorWhite}>Магазин лучших кроссовок</p>
                        </div>
                    </div>
                </Link>
                <div>
                    <ul className="headerRight d-flex">

                        <li onClick={props.onClickBasket} className="mr-35 cu-p">
                            <img width="38" height="38" src="/img/baskets.svg" alt="Корзина"/>
                            <span className={style.colorWhite}>{totalPrice}</span>
                        </li>

                        <li style={{cursor: "pointer"}} className="mr-35">
                            <Link to="/favorites"><img width="38" height="38" src="/img/like_5.svg"
                                                       alt="Закладки"/></Link>

                        </li>

                        <li style={{cursor: "pointer"}}>
                            <Link to="/orders"><img width="38" height="38" src="/img/users_3.svg"
                                                       alt="Пользователь"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

        </>
    );
};

export default Header;

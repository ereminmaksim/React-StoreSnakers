import React from 'react';
import style from './../Header/Header.module.scss'
import {Link} from "react-router-dom";

const Header = (props) => {


    return (
        <>
            <header style={{backgroundImage: 'url(/img/sneakers/adidas.png)'}} className={style.backgroundHead}>
                <Link to="/">
                <div className="d-flex align-center">
                    <img width="40" height="40" src="/img/logo.png" alt='Logo'/>
                    <div>
                        <h3 className="text-uppercase">REACT SNEAKERS</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
                </Link>
                <div>
                    <ul className="headerRight d-flex">

                        <li onClick={props.onClickBasket} className="mr-35 cu-p">
                            <img width="18" height="18" src="/img/basket.svg" alt="Корзина"/>
                            <span>1200</span>
                        </li>

                        <li style={{cursor: "pointer"}} className="mr-35">
                            <Link to="/favorites"><img width="18" height="18" src="/img/like.svg" alt="Закладки"/></Link>

                        </li>

                        <li>
                            <img width="18" height="18" src="/img/profile.svg" alt="Пользователь"/>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
};

export default Header;

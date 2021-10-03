import React, {useContext} from 'react';
import style from "../components/Basket/Basket.module.scss";
import AppContext from "../ContextAPP/context";

const Info = ({imgUrl,name, description}) => {

    const { setCardOpen } = useContext(AppContext)
    return (

        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={imgUrl} alt="Empty"/>
            <h2>{name}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCardOpen(false)} className={style.greenButton}>
                <img src="img/arrows.svg" alt="Arrow"/>
                Вернуться назад
            </button>
        </div>



    );
};

export default Info;

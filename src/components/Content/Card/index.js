import React, {useState} from 'react';
import ContentLoader from "react-content-loader"
import style from './Card.module.scss'


const Card = ({
                  id, imgUrl, name, price,
                  onFavorite, onPlus,
                  favorited = false,
                  added = false,
                  loading = false
              }) => {
    const [isAdded, setIsAdded] = useState(added)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const likeOn = () => {
        onPlus({id, imgUrl, name, price})
        setIsAdded(!isAdded)
    }

    const likeFavorite = () => {
        onFavorite({id, imgUrl, name, price})
        setIsFavorite(!isFavorite)
    }

    return (
        <>
            <div className={style.card}>
                {
                    loading ?
                        (<ContentLoader
                            speed={6}
                            width={160}
                            height={186}
                            viewBox="0 0 160 186"
                            backgroundColor="#fff0f0"
                            foregroundColor="#dccccc"
                        >
                            <rect x="8" y="0" rx="0" ry="0" width="0" height="1"/>
                            <rect x="244" y="16" rx="0" ry="0" width="0" height="1"/>
                            <rect x="243" y="17" rx="0" ry="0" width="1" height="0"/>
                            <rect x="243" y="15" rx="0" ry="0" width="1" height="1"/>
                            <rect x="230" y="25" rx="0" ry="0" width="0" height="1"/>
                            <rect x="7" y="5" rx="10" ry="10" width="150" height="91"/>
                            <rect x="7" y="105" rx="3" ry="3" width="150" height="15"/>
                            <rect x="8" y="131" rx="3" ry="3" width="93" height="15"/>
                            <rect x="8" y="157" rx="8" ry="8" width="80" height="24"/>
                            <rect x="124" y="151" rx="8" ry="8" width="32" height="32"/>
                        </ContentLoader>)
                        :
                        (<>
                            <div className={style.favorite}>
                                <button className={style.button}
                                        onClick={likeFavorite}>
                                    <img width="23" height="23" src={isFavorite ? "/img/likes.jpg"
                                        : "/img/like.svg"
                                    } alt=""/>
                                </button>
                            </div>
                            <img width="133" height="112" src={imgUrl} alt=""/>
                            <p>{name}</p>
                            <div className="d-flex justify-between align-center">
                                <div className={style.price}>
                                    <span>Цена:</span>
                                    <b>{price}</b>
                                </div>
                                <button className={style.button}
                                        onClick={likeOn}>
                                    <img className={style.btnImg} width="32" height="32"
                                         src={isAdded ? "/img/green_ok.svg"
                                             : "/img/white_ok.svg"
                                         } alt="Ok"/>
                                </button>
                            </div>
                        </>)

                }


            </div>
            {/*"/img/white_ok.svg"*/}
        </>
    );
};

export default Card;



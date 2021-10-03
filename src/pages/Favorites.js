import React, {useContext} from 'react';
import style from "./Favorites.module.scss";
import Card from "../components/Content/Card";
import AppContext from "../ContextAPP/context";

function Favorites() {

//вытягиваем фаворитов!!!
    const {sneakersFavorites, onAddFavorites} = useContext(AppContext)


    return (
        <>
            <div className={style.contents}>
                <h1>МОИ ЗАКЛАДКИ!!!</h1>
                <div className="d-flex flex-wrap">
                    {
                        sneakersFavorites
                            // .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj, id) => (
                                    <Card key={id}
                                          onFavorite={(obj) => onAddFavorites(obj)}
                                        // КОНКАТАЦИЯ
                                        // name={obj.name}
                                        // price={obj.price}
                                        // imgUrl={obj.imgUrl}
                                          {...obj}
                                          favorited={true}/>
                                )
                            )
                    }

                </div>


            </div>
        </>
    );
}

export default Favorites;



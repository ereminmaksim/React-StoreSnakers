import React, {useEffect, useState} from "react";
import './App.css';
import {Route} from 'react-router-dom';
import axios from "axios";
import {instanceURL} from "./API/api";
import Header from "./components/Header";
import Basket from "./components/Basket";
import Content from "./components/Content";
import Favorites from "./pages/Favorites";
import {AppContext} from "./ContextAPI/context";


const App = () => {
    const [sneakers, setSneakers] = useState([])
    const [sneakersItems, setSneakersItems] = useState([])
    const [sneakersFavorites, setSneakersFavorites] = useState([])
    const [cardOpen, setCardOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    //пробую загрузку страницы!!!
    const [isLoading, setIsLoading] = useState(true)


    // не допускать ошибку, rerender должен произойти один раз!!!Вот что делает useEffect
    useEffect(() => {
        /**
         * Эволюция перехода!!!!
         * fetch('https://613677e48700c50017ef55a3.mockapi.io/items')
         .then((res) => {
                return res.json()
            })
         .then(json => {
                // console.log(json)
                setSneakers(json)
            })
         */

        //

        /**
         * Эволюция перехода!!!!
         * axios.get(`${instanceURL}/items`)
         .then(res => {
                // console.log(res.data)})
         setSneakers(res.data)
         })
         axios.get(`${instanceURL}/card`)
         .then(res => {
                // console.log(res.data)})
         setSneakersItems(res.data)
         })
         axios.get(`${instanceURL}/favorites`)
         .then(res => {
                // console.log(res.data)})
         setSneakersFavorites(res.data)
         })
         */
        try {
            async function fetchData() {
                setIsLoading(true)
                //
                const sneakersItemsResponse = await axios.get(`${instanceURL}/card`)
                const sneakersFavoritesResponse = await axios.get(`${instanceURL}/favorites`)
                const sneakersResponse = await axios.get(`${instanceURL}/items`)
                //
                setIsLoading(false)
                //
                setSneakersItems(sneakersItemsResponse.data)
                setSneakersFavorites(sneakersFavoritesResponse.data)
                setSneakers(sneakersResponse.data)

            }

            fetchData()
        } catch (error) {
            console.log(error + "Ошибка при запросе данных ;(')")
            console.error(error);
        }


    }, []);

    const onAddCart = (obj) => {
        try {
            if (sneakersItems.find(item => Number(item.id) === Number(obj.id))) {
                // axios.delete(`${instanceURL}/card`, obj).then(r =>
                //     setSneakersItems((prev) => [...prev, obj]))
                setSneakersItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                axios.post(`${instanceURL}/card`, obj)
                setSneakersItems((prev) => [...prev, obj])
            }
        } catch (error) {
            console.log(error + 'Error, товар не добавился')
        }

    }
    // console.log(sneakersItems)

    const onRemoveCart = (id) => {
        console.log(id)
        axios.delete(`${instanceURL}/card/${id}`)
        // .then(r => setSneakersItems((prev) => [...prev, id]))
        setSneakersItems((prev) => prev.filter(item => item.id !== id))
    }

    const onAddFavorites = async (obj) => {
        try {
            if (sneakersFavorites.find(arrObj => arrObj.id === obj.id)) {
                axios.delete(`${instanceURL}/favorites/${obj.id}`)
                //удаление произойдёт с бэк, но отрисовка остётся, если удалить строку ниже!!!
                setSneakersFavorites((prev) => prev.filter(item => item.id !== obj.id))

            } else {
                console.log(obj)
                //деструктц-ция переменной data из axios, вытягиваем не весь объект а данные (DATA)
                //вместо const resp == const {data} ==
                const {data} = await axios.post(`${instanceURL}/favorites`, obj)
                setSneakersFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            console.log(error + 'Error, не удалось добавить в избранное')
        }
    }


    const searchInput = (event) => {
        setSearchValue(event.target.value)
    }


    return (
        <AppContext.Provider value={{sneakers, sneakersItems, sneakersFavorites}}>
            <div className="wrapper clear">
                {cardOpen && <Basket items={sneakersItems}
                                     onCloseBasket={() => setCardOpen(false)}
                                     onRemove={onRemoveCart}
                />}

                <Header onClickBasket={() => setCardOpen(true)}/>

                <Route path="/" exact>
                    <Content
                        sneakersItems={sneakersItems}
                        sneakers={sneakers}
                        sneakersFavorites={sneakersFavorites}
                        searchValue={searchValue}
                        searchInput={searchInput}
                        setSearchValue={setSearchValue}
                        onAddFavorites={onAddFavorites}
                        onAddCart={onAddCart}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path="/favorites">
                    <Favorites
                        items={sneakersFavorites}
                        onAddFavorites={onAddFavorites}
                        onAddCart={onAddCart}
                    />

                </Route>

            </div>
        </AppContext.Provider>
    );
}
export default App




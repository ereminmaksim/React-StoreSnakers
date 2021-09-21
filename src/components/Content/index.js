import Card from "./Card";
import style from './../Content/Content.module.scss'


const Content = ({
                     sneakersItems,searchValue, searchInput, setSearchValue,
                     sneakers, onAddFavorites, onAddCart, isLoading
                 }) => {


    const renderItems = () => {

        const filterItems =
            sneakers.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))

        return (isLoading ? [...Array(12)] : filterItems)
            .map((obj, id) => (
                    <Card key={id}
                          onFavorite={(obj) => onAddFavorites(obj)}
                          onPlus={(obj) => onAddCart(obj)}
                        //добавление в корзину
                          added = {sneakersItems.some(items => Number(items.id) ===Number(obj.id))}
                          loading={isLoading}
                        // КОНКАТЕНАЦИЯ
                        // name={obj.name}
                        // price={obj.price}
                        // imgUrl={obj.imgUrl}
                          {...obj}
                    />
                )
            )
    }

    return (
        <>
            <div className={style.content}>
                <div className="d-flex justify-between">
                    <h1>
                        {searchValue ? ` Поиск по запросу: ${searchValue}` : 'Все кроссовки'}


                    </h1>
                    <div className={style.searchBlock}>
                        <img src="/img/search.svg" alt="Search"/>
                        <input onChange={searchInput}
                               value={searchValue}
                               placeholder="Поиск..."
                               type="text"
                               maxLength="15"/>
                        {searchValue && (
                            <img
                                onClick={() => {
                                    setSearchValue('')
                                }}
                                src="/img/thecross.svg"
                                alt="Search"/>)}

                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {renderItems()}
                </div>
            </div>
        </>
    );
};

export default Content;

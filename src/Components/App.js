import { useState, useEffect } from 'react';
import GoodsList from './GoodsList/GoodsList';
import Search from './Search/Search';
import Header from './Header/Header';
import {Leads} from './Leads/Leads';
import {NotFound} from '../Pages/NotFound/NotFound';
import {
  Container
} from '@mui/material';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {REQUEST_URL} from "../data/constants.js";

const App = () => {
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [loadingPosts, setLoading] = useState(false);

    useEffect(() => {
    setLoading(true);
    fetch(REQUEST_URL+'products')
    .then((response) => response.json())
    .then((data) => {
        setLoading(false);
        setProducts( data );
    })
    .catch((err) => {
        setLoading(false);
        console.log(err);
    })
    }, []);

    const handleChange = (e) => {
        if (!e.target.value) {
            setProducts(products);
            setSearch('');
            return;
        }

        setSearch(e.target.value);
        setProducts(
            products.filter((good) =>
                good.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
    };

    const addToOrder = (goodsItem) => {
        let quantity = 1;

        const indexInOrder = order.findIndex(
            (item) => item.id === goodsItem.id
        );

        if (indexInOrder > -1) {
            quantity = order[indexInOrder].quantity + 1;

            setOrder(order.map((item) => {
                    if (item.id !== goodsItem.id) return item;

                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity,
                    };
                }),
            );
        } else {
            setOrder([
                    ...order,
                    {
                        id: goodsItem.id,
                        name: goodsItem.name,
                        price: goodsItem.price,
                        quantity,
                    },
                ],
            );
        }
    };

    const removeFromOrder = (goodsItem) => {
        setOrder(order.filter((item) => item.id !== goodsItem));
    };
    
    return (
      <Routes>
        <Route path="/" element={ <Header order={order} setOrder={removeFromOrder} /> }>
            <Route index element={
                <Container sx={{mt: '2rem', mb: '2rem'}}>
                    <Search
                        value={search}
                        onChange={handleChange}
                    />
                    <GoodsList
                        goods={products}
                        setOrder={addToOrder}
                    />
                </Container>
            } />
            <Route path="/leads" element={ <Leads /> } />
            <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    );
}

export default App;

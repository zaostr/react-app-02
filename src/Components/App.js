import { useState, useEffect } from 'react';
import GoodsList from './GoodsList/GoodsList';
import Search from './Search/Search';
import Header from './Header/Header';
import {Leads} from './Leads/Leads';
import {NotFound} from '../Pages/NotFound/NotFound';
import {
  Container,
  Link,
  Box,
  Typography
} from '@mui/material';
import {
  Routes,
  Route,
} from "react-router-dom";
import {REQUEST_URL} from "../data/constants.js";

const App = () => {
    const [order, setOrder] = useState([]);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [loadingPosts, setLoading] = useState(false);
    let filtredProducts = [];

    useEffect(() => {
    setLoading(true);
    fetch(REQUEST_URL+'products')
    .then((response) => response.json())
    .then((data) => {
        setLoading(false);
        setProducts( data );
        filtredProducts = [...data];
    })
    .catch((err) => {
        setLoading(false);
        console.log(err);
    })
    }, []);

    const handleChange = (e) => {
        if (!e.target.value) {
            setProducts(filtredProducts);
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
                    { /*loadingPosts ? (
                        <>
                            <h2>Loading..</h2>
                        </>
                    ) : (
                        <>
                            <Search
                                value={search}
                                onChange={handleChange}
                            />
                            <GoodsList
                                goods={products}
                                setOrder={addToOrder}
                            />
                        </>
                    )*/ }
                    <Box sx={{mb:5}}>
                        <Typography variant='h3'>M UI Overview</Typography>
                        <Link href="https://mui.com/material-ui/guides/routing/" target="_blank" underline="always" rel="noopener noreferrer">Routing</Link>
                    </Box>
                    <Box sx={{mb:5}}>
                        <Typography variant='h3'>Tables with a lot of things</Typography>
                        <Link href="https://mui.com/x/react-data-grid/editing/#full-featured-crud-component" target="_blank" underline="always" rel="noopener noreferrer">Data Grid Pro</Link>
                    </Box>
                    <Box sx={{mb:5}}>
                        <Typography variant='h3'>Priclist</Typography>
                        <Link href="https://mui.com/pricing/" target="_blank" underline="always" rel="noopener noreferrer">M UI Pricing</Link>
                    </Box>
                    
                </Container>
            } />
            <Route path="/leads" element={ <Leads /> } />
            <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    );
}

export default App;

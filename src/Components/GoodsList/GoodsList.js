import { 
    Grid
} from '@mui/material';
import React from 'react';

import GoodsItem from './GoodsItem/GoodsItem';

const GoodsList = (props) => {
    const { goods, setOrder } = props;

    return (
        <Grid container spacing={{xs: 2, md: 4}}>
            {goods.map((item) => (
                <GoodsItem key={item.id} setOrder={setOrder} {...item} />
            ))}
        </Grid>
    );
};

export default GoodsList;
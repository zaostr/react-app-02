import React from 'react';
import { 
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@mui/material';
import './GoodsItem.css'

const GoodsItem = (props) => {
    const { name, price, setOrder } = props;

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card sx={{height: '100%'}}>
                <CardMedia
                    image={`https://via.placeholder.com/300x150.png?text=${name.slice(
                        0,
                        12
                    )}`}
                    height='140px'
                    alt={name}
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{name}</Typography>
                    <Typography variant="p" component="div" sx={{fontWeight: 700}}>Цена: {price} руб.</Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        variant='contained'
                        size="medium"
                        onClick={() =>
                            setOrder({
                                id: props.id,
                                name: props.name,
                                price: props.price,
                            })
                        }
                    >
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GoodsItem;
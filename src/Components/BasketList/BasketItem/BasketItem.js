import { ListItem, Button } from "@mui/material";

const BasketItem = (props) => {
    return (
        <ListItem>
            {props.name} {props.price}руб x{props.quantity}
            <Button
                className='btn btn-primary'
                onClick={() => props.setOrder(props.id)}
            >
                Удалить из корзины
            </Button>
        </ListItem>
    );
};

export default BasketItem;
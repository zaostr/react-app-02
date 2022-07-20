import React from 'react'
import {
    Typography, 
    IconButton,
    Divider
} from '@mui/material';
import { ShoppingBag, Delete as DeleteIcon } from '@mui/icons-material';
import { 
    Menu,
    MenuItem
} from '@mui/material';

export const HeaderCart = (props) => {
    const {order = [], cartOpen, closeCart, removeOrder} = props;

    let sum = 0;
    order.map((item) => (
        sum += (item.price * item.quantity)
    ))

    const croppedText = (text) => {
        return (text.length > 20) ? (
            <span>{text.slice(0,20)}..</span>
        ) : (
            <span>{text}</span>
        )
    } 


  return (
    <>
    <Menu
            sx={{ mt: '45px' }}
            id="cart-appbar"
            anchorEl={cartOpen}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(cartOpen)}
            onClose={closeCart}
        >

            { order.length > 0 ? (order.map((item) => (
            <MenuItem key={item.id} >
            <Typography textAlign="center" sx={{mr: 2}}>x{ item.quantity }</Typography>
                <Typography textAlign="center">{ croppedText(item.name) }</Typography>
                <IconButton aria-label="delete" onClick={() => {removeOrder(item.id)}}>
                    <DeleteIcon />
                </IconButton>
            </MenuItem>
            )) ) : (
                <Typography variant="h5" sx={{minWidth: '240px', padding: '6px 16px', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Cart is Empty</Typography>  
            ) }
            { sum > 0 ? (
                    <div>
                        <Divider />
                        <Typography variant="h5" sx={{pt: 1, pl: 2}}>Total: {sum}</Typography>
                    </div>
            ) : (
                ''
            ) }
        </Menu>
    </>
    
  )
}

export default HeaderCart
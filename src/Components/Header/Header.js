import {React, useState} from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar,
    Container,
    Badge
} from '@mui/material';
import {
    ShoppingBasket,
    Adb as AdbIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import HeaderCart from './HeaderCart/HeaderCart';
import {
  Outlet,
  Link
} from "react-router-dom";


const pages = ['Home', 'Leads', '404', 'Leads Crud'];
const links = ['/', '/leads', '/dashboard', '/leads-crud'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




export const Header = ({order, setOrder}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isCartOpen, setCartOpen] = useState(false);

    let q = 0;
    order.forEach((element) => {
        q += element.quantity;
    });
    
    /*
    const handleCart = () => {
        setCartOpen(true);
    }*/

    const handleOpenCart = (event) => {
        setCartOpen(event.currentTarget);
    };
    const closeCart = () => {
        setCartOpen(false);
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


  return (
    <>
        <AppBar>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page,key) => (
                    <MenuItem key={page} component={Link} to={links[key]} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page,key) => (
                        <Button
                        component={Link}
                        to={links[key]}
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        {page}
                        </Button>
                    ))}
                </Box>
                <Box sx={{mr: 2}}>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleOpenCart}
                        >
                        <Badge badgeContent={q} color="error">
                            <ShoppingBasket />
                        </Badge>
                    </IconButton>
                    <HeaderCart order={order} cartOpen={isCartOpen} closeCart={closeCart} removeOrder={setOrder} />
                </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Container sx={{mt: '8rem', mb: '2rem'}}>
            <Outlet />
        </Container>
    </>
  )
}

export default Header
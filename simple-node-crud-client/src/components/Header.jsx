import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['Create'];

// eslint-disable-next-line react/prop-types
const ResponsiveAppBar = ({ setdata }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [search, setsearch] = useState(null);

  useEffect(() => {
    const tid = setTimeout(() => {
      SearchData();
    }, 500)
    return () => clearTimeout(tid);
  }, [search])

  const SearchData = async () => {
    if (!search) {
      if (search === '') setdata([]);
      return
    };
    const res = await fetch(`https://backend-lobrockyl.herokuapp.com/search/?q=${search}`);
    const result = await res.json();
    setdata(result.images)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href='/'>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            HackerEarth
          </Typography>
          </a>
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
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{pages[0]}</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            HackerEarth
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <a href='/new'>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[0]}
              </Button>
              </a>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <div className="flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-white rounded-[0.8rem] hover:bg-gray-200">
            <div className="text-[#8a939b] mx-3 font-bold text-lg"><SearchIcon /></div>
           <input className="h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-black placeholder:text-black" type="search" placeholder="Search…"
              value={search}
              onChange={(e) => setsearch(e.target.value)}/>
          </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {AppBar, Container, createTheme, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography} from '@mui/material';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Layout({title, description, children}) {
    const {state, dispatch} = useContext(Store);
    const {darkMode} = state;
    const [mode, setMode] = useState(false); 
    useEffect(() => setMode(darkMode), [darkMode]);
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            }
        },
        palette: {
            mode: mode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080'
            },
        },
    });
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    return (
        <div>
            <Head>
                <title>{title? `${title} - Next Amazona` : 'Next Amazona'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>Amazona</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={mode} onChange={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>Cart</Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>
                        All rights reserved. Next Amazona.
                    </Typography>
                </footer>
            </ThemeProvider>
            
        </div>
    )
}

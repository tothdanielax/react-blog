import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";

export function Layout() {
    return (
        <>
            <Navbar bg='dark'
                    variant='dark'
                    sticky='top'>
                <NavbarBrand href='/'
                             className='ms-2'>React Blog</NavbarBrand>
                <Nav className='ms-auto me-2'>
                    <NavLink href='/admin'>Admin</NavLink>
                    <NavLink href='/'>Public</NavLink>
                </Nav>
            </Navbar>

            <Container className='mt-3'>
                <Outlet/>
            </Container>

            <footer className='bg-dark text-light text-center p-1 mt-5'>
                <span>React Blog 2023 - Tóth Zsolt Dániel</span>
            </footer>
        </>
    );
}

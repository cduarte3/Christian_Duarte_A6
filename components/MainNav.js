import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import {searchHistoryAtom} from '@/store';

export default function MainNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        const searchItem = e.target.search.value;
        if (searchItem != '') {
            const queryString = `title=true&q=${searchItem}`;
            router.push(`/artwork?title=true&q=${searchItem}`);
            setSearchHistory(current => [...current, queryString]);
            setIsExpanded(false);
        }
    };
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };
    return (
        <>
            <Navbar bg="light" expand="lg" className="fixed-top" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Christian Duarte</Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={handleToggle} // toggle isExpanded on click
                        aria-expanded={isExpanded}
                    />
                    <Navbar.Collapse id="basic-navbar-nav" className={isExpanded ? 'show' : ''}>
                        <Nav className="me-auto" onClick={handleClose}>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link href="/" active={router.pathname === "/"}>
                                    Home
                                </Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link href="/search" active={router.pathname === "/search"}>
                                    Advanced Search
                                </Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item href="/favourites" active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item href="/history" active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
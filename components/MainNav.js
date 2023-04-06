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
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();
    const router = useRouter();
    function logout() {
        removeToken();
        router.push('/login');
    }
    async function handleSearch(e) {
        e.preventDefault();
        const searchItem = e.target.search.value;
        if (searchItem != '') {
            const queryString = `title=true&q=${searchItem}`;
            router.push(`/artwork?title=true&q=${searchItem}`);
            setSearchHistory(await addToHistory(`${queryString}`));
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
                            {token &&
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link href="/search" active={router.pathname === "/search"}>
                                        Advanced Search
                                    </Nav.Link>
                                </Link>
                            }
                        </Nav>
                        {!token &&
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link href="/register" active={router.pathname === "/register"}>
                                        Register
                                    </Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link href="/login" active={router.pathname === "/login"}>
                                        Login
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        }
                        &nbsp;
                        {token &&
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
                        }
                        &nbsp;
                        {token &&
                            <Nav>
                                <NavDropdown title={token.userName}>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item href="/favourites">Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item href="/history">Search History</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
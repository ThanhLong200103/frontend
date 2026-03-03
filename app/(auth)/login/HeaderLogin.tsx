'use client'
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
export default function HeaderLogin() {
     return (
    <Navbar className="bg-body-tertiary p-4  ">
      <Container>
        <Navbar.Brand href="/">SHOP</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link href="/login">Bạn cần giúp đỡ gì</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

"use client";
import api from "@/lib/api";
import { authStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  InputGroup,
  Form,
  Row,
} from "react-bootstrap";

export default function HeaderMain() {
  const isAuthenticated = !!authStore((state) => state.token);
  const [roles, setRoles] = useState<string[]>([]);
  
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    setRoles(storedRoles);
  }, []); 

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container className="navbar-grid">
          {/* LEFT */}
          <div className="navbar-left">
            <Navbar.Brand as={Link} href="/">
              SHOP
            </Navbar.Brand>
          </div>

          {/* CENTER */}
          <div className="navbar-search-center" style={{ width: "520px" }}>
            <InputGroup>
              <Form.Control placeholder="Tìm kiếm......" />
              <Button variant="outline-secondary">Tìm kiếm</Button>
            </InputGroup>
          </div>

          {/* RIGHT */}
          <div className="navbar-right">
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="align-items-lg-center">
                {!isAuthenticated ? (
                  <>
                    <Nav.Link as={Link} href="/help">
                      Bạn cần giúp đỡ gì
                    </Nav.Link>
                    <Nav.Link as={Link} href="/login">
                      Đăng nhập
                    </Nav.Link>
                    <Nav.Link as={Link} href="/register">
                      Đăng ký
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} href="/help">
                      Trợ giúp
                    </Nav.Link>
                    {roles.includes("shop") && (
                      <Nav.Link as={Link} href="/shop">
                        shop
                      </Nav.Link>
                    )}

                    {roles.includes("admin") && (
                      <Nav.Link as={Link} href="/admin">
                        admin
                      </Nav.Link>
                    )}
                    {roles.includes("user") && (
                      <Nav.Link as={Link} href="/shop/store">
                        Đăng Ký Shop
                      </Nav.Link>
                    )}
                     <Nav.Link as={Link} href="/cart">
                       <CiShoppingCart />
                      </Nav.Link>
                    
                    <NavDropdown title="Tài khoản" align="end">
                      <NavDropdown.Item as={Link} href="/profile">
                        Thông tin cá nhân
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/orders">
                        Đơn hàng
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} href="/logout">
                        Đăng xuất
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

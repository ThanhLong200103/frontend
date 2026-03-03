"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye ,FaRegEyeSlash  } from "react-icons/fa";
import api from '@/lib/api';
import { authStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

import { toast } from "react-toastify";
import Login from "@/services/auth/login.service";
import addCartService from "@/services/cart/addCartService";
export default function LoginPage() {

   const router = useRouter();
  const [show, setShow] = useState(false);
  const [name , setUserName] = useState("");
  const [password , setPassWord] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  
  
 const isAuthenticated = !!authStore(state => state.token);
  const handleLogin = async() => {
   
    try {
            setErrors({});
      const { role } = await Login({name,password});
      const cart = await addCartService()
        router.push("/");
        localStorage.setItem("roles", JSON.stringify(role));
        // localStorage.setItem("cart",JSON.stringify(cart.id));

    } catch (err: any) {
         if (err.response?.status === 422) {
                 const apiErrors = err.response.data.errors;
                 setErrors(apiErrors);
         
                 // ✅ object -> array -> toast
                 Object.values(apiErrors)
                   .flat()
                   .forEach((msg:any) => {
                     toast.error(msg);
                   });
               } else {
                 console.error(err);
               }
          
        }
  };
  return (
    <>
      <Container className="mw-100 bg-secondary" style={{ height: 480 }}>
        <Container className="col-10  h-100  ">
          <Row className="text-center pt-5" style={{ height: "90%" }}>
            <Col md={8} className="bg-secondary h-100">
              Col 8
            </Col>

            <Col md={4} className="bg-body-tertiary h-100">
              <Row>
                <p className="text-center  mt-4">Đăng Nhập</p>
              </Row>
              <Form className="m-2">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Tên Đăng Nhập"  value={name} onChange={(e) =>setUserName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
                  <InputGroup>
                    <Form.Control
                      type={show ? "text" : "password"}
                      placeholder="Password" 
                      value={password} onChange={(e) =>setPassWord(e.target.value)}
                    />

                    <Button
                      variant="outline-secondary"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Row>
                  <Col className="d-flex justify-content-center mt-4">
                    <Button onClick={()=>{handleLogin()}}>Đăng nhập</Button>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Link href={""} className="text-primary ">
                  Quên mật khẩu
                </Link>
                <Link href={"/register"} className="text-primary">
                  Đăng ký tài khoản
                </Link>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

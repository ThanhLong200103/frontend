'use client'
import RegisterHadle from "@/services/auth/register.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify/unstyled";

export default function register() {
     const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const handleRegister = async () => {
    try {
      setErrors({});
      const res = await RegisterHadle({ name, email, password, phone });
      router.push("/login");
      toast.success("Đăng Ký Thành Công")
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
   return(
     <>
      <Container>
        <Form.Label htmlFor="register">Tên Đăng Nhập</Form.Label>
        <Form.Control
          type="text"
          id="register"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Label htmlFor="register">Email</Form.Label>
        <Form.Control
          type="text"
          id="register"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Form.Label htmlFor="register">Mật khẩu</Form.Label>
        <Form.Control
          type="text"
          id="register"
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />

        <Form.Label htmlFor="register">Số điện thoại</Form.Label>
        <Form.Control
          type="text"
          id="register"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Row className="">
          <Col className=" d-flex justify-content-center mt-5 p-5">
            <Button
              onClick={() => {
                handleRegister();
              }}
            >
              Đăng Ký
            </Button>
          </Col>
        </Row>
      </Container>
    </>
   )
};

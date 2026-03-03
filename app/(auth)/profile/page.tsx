"use client";

import IndexProfile from "@/services/auth/profile/profile.service";
import updateProfile from "@/services/auth/profile/updateProfile.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { data, error, isLoading } = IndexProfile();
  useEffect(() => {
    setName(data?.name);
    setEmail(data?.email);
    setPhone(data?.phone);
  }, [data]);
  const handleUpdate = async () => {
    try {
      const res = await updateProfile({ email, phone });
      router.push("/");
      toast.success("Cập nhật thành công");
    } catch (err: any) {
      if (err.response?.status === 422) {
        const apiErrors = err.response.data.errors;
        setErrors(apiErrors);

        // ✅ object -> array -> toast
        Object.values(apiErrors)
          .flat()
          .forEach((msg: any) => {
            toast.error(msg);
          });
      } else {
        console.error(err);
      }
    }
  };
  return (
    <>
      <Container
        className="mt-4 mb-4 text-center fw-bolder "
        style={{ fontSize: 40 }}
      >
        <Row>
          <Col>Thông Tin Cá Nhân</Col>
        </Row>
      </Container>
      <Container>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Tên Đăng Nhập
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={name} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email@gmail.com"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Số điện thoại
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Row>
            <Col className="d-flex justify-content-center mt-4">
              <Button
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update tài khoản
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

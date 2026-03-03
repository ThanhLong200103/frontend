"use client";
import api from "@/lib/api";
import img from "@/lib/img";
import storeShop from "@/services/shop/store.service";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

export default function store() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    ward: "",
    district: "",
    provionce: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e: any) => {
    setLogo(e.target.files[0]);
  };
  const handleSubmit = async () => {
    try {
      if (!logo) {
       toast.warning("Vui lòng chọn logo")
        return;
      }
      // form gui de luu anh
      const  logoUrl = await img({logo});
      const addShop = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        ward: formData.ward,
        district: formData.district,
        provionce: formData.provionce,
        logo: logoUrl,
      };
      setErrors({});
      const { role } = await storeShop(addShop);
      localStorage.removeItem("roles");
      localStorage.setItem("roles", JSON.stringify(role));
      router.push("/");
      toast.success("Tạo Thành Công");
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
      <Container className="mt-4">
        <Form encType="multipart/form-data">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên shop</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phường / Xã</Form.Label>
                <Form.Control type="text" name="ward" onChange={handleChange} />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quận / Huyện</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tỉnh / Thành phố</Form.Label>
                <Form.Control
                  type="text"
                  name="provionce"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="primary"
          >
            Tạo Shop
          </Button>
        </Form>
      </Container>
    </>
  );
}

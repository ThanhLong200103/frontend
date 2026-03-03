"use client";
import img from "@/lib/img";
import indexAddress from "@/services/shop/address/indexAddress.service";
import showtrueAddressService from "@/services/shop/address/showtrueAddress.service";
import UpdateShopService from "@/services/shop/update.service";
import UpdateShopService2 from "@/services/shop/update2.service";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default  function UpdateShop(props: ShowUpdateShop) {
  const { show, setShow, id, setShopID, shopID } = props;
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [logo, setLogoFile] = useState<File | null>(null);
  const data =  indexAddress({ id });
  const [name, setName] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [addressId, setAddressId] = useState<number | null>();
  const address = showtrueAddressService({ id });

  useEffect(() => {
    if (shopID) {
      setName(shopID.name);
      setLogoPreview(shopID.logo);
      setDescription(shopID.description);
      setAddressId(address[0]?.id);
    }
  }, [shopID]);
  // console.log(logo)

  const handleUpdate = async () => {
    try {
      if (logo) {
        const logoUrl = await img({ logo });

        const res = await UpdateShopService({
          id,
          name,
          description,
          logoUrl,
          address_id: addressId ?? undefined,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const res = await UpdateShopService2({
          id,
          name,
          description,
          logoPreview: logoPreview ?? undefined,
          address_id: addressId ?? undefined,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      toast.success("Update Thành Công");
    } catch (e: any) {
      toast.error("Thất bại");
      console.log(e);
    }
  };
  return (
    <>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update shop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="mt-4">
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên shop</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Logo</Form.Label>

                      {/* Preview ảnh cũ hoặc mới */}
                      {logoPreview && (
                        <div className="mb-2">
                          <img
                            src={logoPreview}
                            alt="logo"
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        </div>
                      )}

                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];

                          if (!file) return;
                          setLogoFile(file);
                          setLogoPreview(URL.createObjectURL(file));
                        }}
                      />

                      <Form.Text muted>
                        Bỏ trống nếu không muốn đổi ảnh
                      </Form.Text>

                      <Form.Control.Feedback type="invalid" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ </Form.Label>
                    <Form.Select
                      onChange={(e) => setAddressId(Number(e.target.value))}
                    >
                      {data.map((d: any) => (
                        <option key={d.id} value={d.id}>
                          {d.address}, {d.ward}, {d.district}, {d.provionce}
                         
                        </option>
                        
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

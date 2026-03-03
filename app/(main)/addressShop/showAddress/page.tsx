"use client";
import destroyAddressShop from "@/services/shop/address/destroy.service";
import showAddressShop from "@/services/shop/address/showAddress.service";
import UpdateAddressShop from "@/services/shop/address/UpdateAddressSHop.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function ShowAddress(props: showAddress) {
  const { showAddress, setShowAddress, addressId, id } = props;
  const [address, SetAddress] = useState("");
  const [ward, SetWard] = useState("");
  const [district, SetDistrict] = useState("");
  const [provionce, SetProvionce] = useState("");
  const addressShow = showAddressShop({ id, addressId });
  const handleClose = () => setShowAddress(false);
  const handleShow = () => setShowAddress(true);
  const handleUpdate = async () => {
    try{
      await UpdateAddressShop({id,addressId,address,ward,district,provionce})
      toast.success("Update thành công")
      setShowAddress(false)
    }catch(e:any){
      console.log(e)
    }
  };
  const handleDelete = async () => {
    try{
     const res =  await destroyAddressShop({id,addressId})
     toast.success("Xóa thành công")
     setShowAddress(false)
    }catch(e:any){
      console.log(e)
    }
  };
  useEffect(() => {
    SetAddress(addressShow.address);
    SetDistrict(addressShow.district);
    SetProvionce(addressShow.provionce);
    SetWard(addressShow.ward);
  }, [addressShow]);
  return (
    <>
      <Modal
        show={showAddress}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tất cả địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e: any) => {
                      SetAddress(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phường / Xã</Form.Label>
                  <Form.Control
                    type="text"
                    value={ward}
                    onChange={(e: any) => {
                      SetWard(e.target.value);
                    }}
                  />
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
                    value={district}
                    onChange={(e: any) => {
                      SetDistrict(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tỉnh / Thành phố</Form.Label>
                  <Form.Control
                    type="text"
                    value={provionce}
                    onChange={(e: any) => {
                      SetProvionce(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
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
            Sửa
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete()
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

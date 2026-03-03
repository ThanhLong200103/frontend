"use client";
import indexAddress from "@/services/shop/address/indexAddress.service";
import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form, Modal, Row } from "react-bootstrap";
import ShopStoreAddress from "./address/page";
import { mutate } from "swr";
import ShowAddress from "./showAddress/page";
import Link from "next/link";

export default function AllAddress(props: AllShowAddress) {
  const { id, showAddressAll, setShowAddressAll } = props;
  const data = indexAddress({ id });
  const [addressId, setAddressId] = useState<string>("");
  const [storeAddress, setStoreShowAddress] = useState(false);
  const handleClose = () => setShowAddressAll(false);
  const handleShow = () => setShowAddressAll(true);
  const [showAddress , setShowAddress] = useState(false)
  // console.log(data);
  const handleIndex = () => {
    setStoreShowAddress(true);
    mutate;
  };
  return (
    <>
      <Modal
        show={showAddressAll}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tất cả địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Container className="mt-4 ">
              <Row className="d-fex justify-content-center fs-4 ">
                Danh Sách Địa chỉ
              </Row>
            </Container>
            <Container className="mt-4">
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  variant="outline-primary"
                  className="w-100 text-start"
                >
                  {"Chọn địa chỉ"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  {data.length > 0 ? (
                    data.map((d: any) => (
                      <Dropdown.Item
                        key={d.id}
                        onClick={() => {
                          setAddressId(d.id);
                          setShowAddress(true)
                        }}
                      >
                        {d.address} {d.ward} {d.district} {d.provionce}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>Không có đia chỉ</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Container>
          <ShopStoreAddress
            storeAddress={storeAddress}
            setStoreShowAddress={setStoreShowAddress}
            id={id}
          ></ShopStoreAddress>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleIndex();
            }}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowAddress  addressId ={addressId} showAddress ={showAddress}  setShowAddress={setShowAddress} id = {id} ></ShowAddress>
    </>
  );
}

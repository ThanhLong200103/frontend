"use client";
import destroyShop from "@/services/shop/destroy.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export default function DeleteShop(props: ShowDeleteShop) {
  const { showDelete, setShowDelete, id } = props;
  const router = useRouter();
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);
  const handleDelete = async () => {
    try {
      await destroyShop({ id });
      router.push("/shop");
      toast.success("Xóa thành công");
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        show={showDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa !!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete();
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

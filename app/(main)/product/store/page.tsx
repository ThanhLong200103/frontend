import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface showProduct {
    showAddProduct :boolean
    setShowAddProduct:(v:boolean)=>void
}
function AddProduct(props:showProduct) {
  const{showAddProduct , setShowAddProduct} = props

  const handleClose = () => setShowAddProduct(false);
  const handleShow = () => setShowAddProduct(true);

  return (
    <>

      <Modal
        show={showAddProduct}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Điền thông tin sản phẩm </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Thêm sản phẩm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
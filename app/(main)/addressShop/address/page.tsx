'use client'
import storeShopAddress from '@/services/shop/address/storeShopAddress.service';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function ShopStoreAddress(props:showStoreAddress) {
  const{storeAddress ,setStoreShowAddress ,id} =props
  const[address , SetAddress] = useState('')
  const[ward , SetWard] = useState('')
  const[district , SetDistrict] = useState('')
  const[provionce , SetProvionce] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const handleClose = () => setStoreShowAddress(false);
  const handleShow = () => setStoreShowAddress(true);
  const handleSubmit = async () =>{
    try{
        const data = await storeShopAddress({id,address,ward,district,provionce})

    if(data){
        setStoreShowAddress(false)
        toast.success("Thêm địa chỉ thành công")
        SetAddress('')
        SetDistrict('')
        SetProvionce('')
        SetWard('')
     
    }else{
        toast.error("Lỗi không thể thêm được")
    }
    }catch (err: any) {
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
  }
  return (
    <>

      <Modal
        show={storeAddress}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e:any)=>{SetAddress(e.target.value)}}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phường / Xã</Form.Label>
                <Form.Control type="text" name="ward"   value={ward}
                  onChange={(e:any)=>{SetWard(e.target.value)}} />
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
                 value={district}
                  onChange={(e:any)=>{SetDistrict(e.target.value)}}
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
                  value={provionce}
                  onChange={(e:any)=>{SetProvionce(e.target.value)}}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleSubmit()}}>Thêm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShopStoreAddress;
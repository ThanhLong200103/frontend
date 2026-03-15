'use client'
import showCartItemService from "@/services/cart/showCartItemService"
import showCartServive from "@/services/cart/showCartServive"
import { useState } from "react"
import { Container, Row, Col, Card, Button, Image, InputGroup, Form } from "react-bootstrap"
export default function Cart() {
    const [total , setTotal] = useState(0)
    const data = showCartServive()
    console.log(data)
    const dataItem = showCartItemService();
    console.log(dataItem)
    return(
        <>
          <Container className="mt-4">

            <h2 className="mb-4">Shopping Cart</h2>

            {/* select all */}
            <Form.Check
                type="checkbox"
                label="Chọn tất cả"
                className="mb-3"
            />

            {dataItem?.map((item : any) => (

                <Card className="mb-3" key={item.id}>
                    <Card.Body>

                        <Row className="align-items-center">

                            {/* checkbox */}
                            <Col md={1}>
                                <Form.Check type="checkbox"/>
                            </Col>

                            {/* image */}
                            <Col md={2}>
                                <Image
                                    src={item.product?.images[0].url}
                                    fluid
                                    rounded
                                />
                            </Col>

                            {/* name */}
                            <Col md={3}>
                                <h6>{item.product?.name}</h6>
                            </Col>

                            {/* price */}
                            <Col md={2}>
                                <span className="text-danger fw-bold">
                                    {item.product?.price} VND
                                </span>
                            </Col>

                            {/* quantity */}
                            <Col md={2}>
                                <InputGroup>
                                    <Button variant="outline-secondary">-</Button>
                                    <Form.Control
                                        value={item.quantity}
                                        readOnly
                                        className="text-center"
                                    />
                                    <Button variant="outline-secondary">+</Button>
                                </InputGroup>
                            </Col>

                            {/* delete */}
                            <Col md={2}>
                                <Button variant="danger">
                                    Xóa
                                </Button>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>

            ))}

            {/* checkout bar */}
            <Card className="p-3 mt-4">
                <Row className="align-items-center">

                    <Col md={8}>
                        <h5 className="mb-0">
                            Tổng thanh toán: <span className="text-danger">{total} VND</span>
                        </h5>
                    </Col>

                    <Col md={4} className="text-end">
                        <Button variant="danger" size="lg">
                            Thanh toán
                        </Button>
                    </Col>

                </Row>
            </Card>

        </Container>
        </>
    )
};

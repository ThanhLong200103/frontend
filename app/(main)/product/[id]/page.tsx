"use client";

import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import showProduct from "@/services/Product/showProduct.service";
import showProductCategorie from "@/services/categories/showProductCategories.service";
import ProductCard from "../ProductCard";

export default function ItemProduct() {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState('');
  const [price ,setPrice] = useState<number>(0);
  const [activeImage, setActiveImage] = useState('');
  const [discount , setDiscount] = useState(0)
  const params = useParams();
  const id = params.id as string;

  const {data , imgCenter} = showProduct({id})
  
  //   data.map((e)=>{
  //     console.log(e)

  //   })
  // console.log(data)
  const images = data?.product?.images?? [];
  const product = data?.product ?? [];
  const attribute = data?.product?.attributes ?? [];
  const textSize = 'size'
  const textColor = 'color'
  const shop = data?.product?.shop ??[]
  const selectedId = data?.product?.category?.id??[]
  // console.log(shop)
  // console.log(imgCenter)
  // setActiveImage(images[0].url)
  console.log(product)
  // console.log(attribute)
  console.log(selectedId)
  // useEffect( 
  //   ()=>{
  //    setActiveImage(images[0].url)
  //   },[]
  // )
 
  const {data2} = showProductCategorie({selectedId})
  console.log(data2)
  useEffect(() => {
  setActiveImage(imgCenter)
  setPrice(product.price)
  if(product.discount == 0){
    setDiscount(1)
  }else{
    setDiscount(product.discount/1000)
  }
}, [images ,price ,discount])
  return (
    <>
      <Container
        style={{ maxWidth: 1200, backgroundColor: "#fafafa" }}
        className="mt-4 border p-5"
      >
        <Row>
          {/* ===== LEFT: IMAGE (SHOPEE SIZE) ===== */}
          <Col md={7}>
            {/* ẢNH CHÍNH */}
            <div
              style={{
                border: "1px solid #eee",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 520,
              }}
            >
              <Image
              
                src={activeImage}
                style={{
                  maxHeight: 500,
                  maxWidth: "100%",
                  objectFit: "contain",
                  cursor: "zoom-in",
                }}
              />
            </div>

            {/* THUMBNAIL */}
            <Row className="mt-3 g-2">
              {images.map((img:any, index:any) => (
                <Col xs={3} key={index}>
                  <Button
                    variant="light"
                    onClick={() => setActiveImage(img.url)}
                    style={{
                      width: "100%",
                      padding: 6,
                      border:
                        activeImage === img
                          ? "2px solid #d6cdcb"
                          : "1px solid #ddd",
                    }}
                  >
                    <Image
                      src={img.url}
                      style={{
                        height: 80,
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>

          {/* ===== RIGHT: INFO ===== */}
          <Col md={5}>
            {/* TITLE */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <h5 className="mb-0">{product.name}</h5>
            </div>

            {/* RATING */}
            <div className="mb-2">
              <span style={{ color: "#f5a623" }}>sao</span>
              <span className="ms-2">{}</span>
              <span className="ms-2 text-muted">| {} đánh giá</span>
            </div>

            {/* PRICE */}
            <div className="p-3 mb-3" style={{ backgroundColor: "#eeeaea" }}>
              <span
                style={{
                  fontSize: 28,
                  color: "#ee4d2d",
                  fontWeight: 600,
                }}
              >
                {(price)*(discount)}
              </span>
              <span
                className="ms-3 text-muted"
                style={{ textDecoration: "line-through" }}
              >
                {price}
              </span>
            </div>

            {/* COLOR */}
            <Row className="mb-3 align-items-center">
              <Col sm={3}>Màu</Col>
              <Col sm={9}>
                {["ĐEN", "XÁM", "TRẮNG", "BẠC"].map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    className="me-2 mb-2"
                    variant={color === c ? "danger" : "outline-secondary"}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </Button>
                ))}
              </Col>
            </Row>

            {/* SIZE */}
            <Row className="mb-3 align-items-center">
              <Col sm={3}>Size</Col>
              <Col sm={9}>
                {["20", "24", "29"].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    className="me-2 mb-2"
                    variant={size === s ? "danger" : "outline-secondary"}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </Col>
            </Row>

            {/* QTY */}
            <Row className="mb-4 align-items-center">
              <Col sm={3}>Số lượng</Col>
              <Col sm={9} className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  −
                </Button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{qty}</span>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </Button>
              </Col>
            </Row>

            {/* ACTION */}
            <div className="d-flex gap-3">
              <Button variant="outline-danger" size="lg">
                Thêm vào giỏ hàng
              </Button>
              <Button variant="danger" size="lg">
                Mua ngay
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container
        style={{ maxWidth: 1200, backgroundColor: "#fafafa" }}
        className="mt-4 border p-5"
      >
        <Row className="align-items-center">
          {/* ===== LEFT: AVATAR + NAME ===== */}
          <Col md={4} className="d-flex align-items-center gap-3">
            <Image
              src={shop.logo}
              roundedCircle
              style={{
                width: 80,
                height: 80,
                border: "1px solid #eee",
              }}
            />

            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{shop.name}</div>
              <div style={{ fontSize: 13, color: "#888" }}>
              
              </div>

              <div className="mt-2 d-flex gap-2">
                <Button size="sm" variant="danger">
                  Chat Ngay
                </Button>
                <Button size="sm" variant="outline-secondary">
                  Xem Shop
                </Button>
              </div>
            </div>
          </Col>

          {/* ===== RIGHT: SHOP STATS ===== */}
          <Col md={8}>
            <Row>
              <Col md={5}>
                <Stat label="Đánh Giá" value="23,1k" />
              </Col>

              <Col md={5}>
                <Stat label="Người Theo Dõi" value="19,2k" />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={5}>
                <Stat label="Sản Phẩm" value="121" />
              </Col>
              <Col md={5}>
                <Stat label="Thời Gian Phản Hồi" value="trong vài giờ" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container
        style={{ maxWidth: 1200, backgroundColor: "#fafafa" }}
        className="mt-4 border p-5 "
      >
        <Row className="h3">Mô tả</Row>
        <Row className=" text-center">
          <Col className="">{product.description}</Col>
        </Row>
      </Container>
      <Container  style={{ maxWidth: 1200, backgroundColor: "#fafafa" }}
        className="mt-4 border p-5 ">
       <Row className="h3">Sản phẩm tương tự</Row>
       <Row className="d-flex justify-content-center pt-5">
        <Col md={9}>
              
        
              <Row >
                {data2.map((p: any) => (
                  <Col md={4} key={p.id} className="mb-4">
                   <ProductCard p={p} />
                  </Col>
                ))}
              </Row> 
        
             {selectedId && data2.length === 0 && (
                <p>Không có sản phẩm trong danh mục này</p>
              )}
            </Col>
       </Row>
      </Container>
    </>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 13, color: "#777" }}>{label}</div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#ee4d2d",
        }}
      >
        {value}
      </div>
    </div>
  );
}

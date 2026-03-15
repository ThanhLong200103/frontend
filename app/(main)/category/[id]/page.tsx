"use client";

import showCategorie from "@/services/categories/showCategories.service";
import showProductCategorie from "@/services/categories/showProductCategories.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Collapse, Container, ListGroup, Row } from "react-bootstrap";
import ProductCard from "../../product/ProductCard";

export default function page() {
  const params = useParams();
  
  const id = params.id as string;
  const [selectedId, setSelectedId] = useState('')
  const {data } = showCategorie({id})
  // console.log(data);
  const {data2} = showProductCategorie({selectedId})
  // console.log(data2)
  const products = data2 ??[];
  console.log(products)
  const cateChildren = data.children
  // console.log(cateChildren);
  useEffect(
    ()=>{
      // setSelectedId()
    },[]
  )
  return (
  <Container>
  <Row>
    
    {/* ===== LEFT: CATEGORY ===== */}
    <Col md={3}>
      <ListGroup variant="flush">
        {cateChildren?.map((e: any) => (
          <ListGroup.Item
            key={e.id}
            action
            active={selectedId === e.id}
            onClick={() => setSelectedId(e.id)}
          >
            {e.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>

    {/* ===== RIGHT: PRODUCT LIST ===== */}
    <Col md={9}>
      

      <Row>
        {products.map((p: any) => (
          <Col md={4} key={p.id} className="mb-4">
           <ProductCard p={p} />
          </Col>
        ))}
      </Row> 

     {selectedId && products.length === 0 && (
        <p>Không có sản phẩm trong danh mục này</p>
      )}
    </Col>

  </Row>
</Container>
  );
}

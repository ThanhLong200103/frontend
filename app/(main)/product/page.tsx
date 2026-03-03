"use client";
import IndexProduct from "@/services/Product/IndexProduct.service";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";


export default function HomeProduct() {
  const [page, setPage] = useState(2);
  const limit = 36;
  const[product , setProduct] = useState([])

  const [totalPages , setTotalPages] = useState(1)
  useEffect(() => {
    const handleProduct = async () => {
      const {product ,pagination} = await IndexProduct({ page, limit });
      setProduct(product)
      setTotalPages(pagination.last_page)
      console.log(product);
      console.log(pagination);

    };
    handleProduct()
  }, [page]);
  return(
     <>
   <Container>
      <Row className="g-2">
        {product.map((p:any) => (
          <Col key={p.id} xs={6} sm={4} md={3} lg={2}>
            <ProductCard p={p} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">

  <Pagination.Prev
    onClick={() => page > 1 && setPage(page - 1)}
    disabled={page === 1}
  />

  {[...Array(totalPages)].map((_, index) => {
    const pageNumber = index + 1;

    return (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === page}
        onClick={() => setPage(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  })}

  <Pagination.Next
    onClick={() => page < totalPages && setPage(page + 1)}
    disabled={page === totalPages}
  />

</Pagination>

    </Container></>
  )
}

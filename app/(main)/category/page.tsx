"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import indexCategories from "@/services/categories/indexCategories.service";
export default function Categories() {
 const {data} = indexCategories()
//  console.log(data)
  return (
    <>
      <Container>
        <Row className="fs-4 mb-3 p-2 ">Danh mục</Row>

        <Row className="g-3 border pb-3">
          {data.map((item: any) => (
            <Col
              key={item.id}
              xs={6} // mobile: 2 cột
              sm={4} // tablet: 3 cột
              md={3} // small desktop: 4 cột
              lg={2} // desktop: 6 cột
            >
              <Link
                href={`/category/${item.id}`}
                className="text-decoration-none"
              >
                <Card className="h-100 text-center border shadow-sm styles.">
                  <Card.Body className="d-flex align-items-center justify-content-center p-3 hover-shadow">
                    <div className="fw-normal small">{item.name}</div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row className="fs-4 mb-3 p-3  d-flex justify-content-center ">
          Gợi ý hôm nay{" "}
        </Row>
      </Container>
    </>
  );
}

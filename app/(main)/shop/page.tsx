'use client'
import ShopIndex from "@/services/shop/index.service";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Dropdown, Row } from "react-bootstrap";

export default function Shop() {
      const [selectedShop, setSelectedShop] = useState<any>(null);
      const shops = ShopIndex();
    return(
        <>
        <Container>
         
        <Container className="mt-4 ">
           <Button ><Link href={'/shop/store'} style={{color :'white'}} className="text-decoration-none">Thêm shop</Link></Button>
          <Row className="d-fex justify-content-center fs-4 ">
            Danh Sách Shop
          </Row>
        </Container>
        <Container className="mt-4">
          <Dropdown className="w-100">
            <Dropdown.Toggle
              variant="outline-primary"
              className="w-100 text-start"
            >
              {selectedShop ? selectedShop.name : "Chọn shop"}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              {shops.length > 0 ? (
                shops.map((shop: any) => (
                  <Dropdown.Item
                    key={shop.id}   
                    as={Link}
                    href={`/shop/${shop.id}`}
                    onClick={() => setSelectedShop(shop)}
                  >
                    {shop.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Không có shop</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Container>
        </>
    )
};

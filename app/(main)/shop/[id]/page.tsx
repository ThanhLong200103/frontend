"use client";
import showShop from "@/services/shop/show.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import UpdateShop from "../update/page";
import { useEffect, useState } from "react";
import DeleteShop from "../delete/page";
import showtrueAddressService from "@/services/shop/address/showtrueAddress.service";
import indexFollowShop from "@/services/shop/follow/indexFollow.service";
import followShopservice from "@/services/shop/follow/follow.service";
import checkFollow from "@/services/shop/follow/checkFollow.service";
import { toast } from "react-toastify";
import AllAddress from "../../addressShop/page";

export default function ShowShop() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [shopID, setShopID] = useState<shop | null>(null);
  const [$follow, setFollow] = useState(0);
  const [statusFollow, setStatusFollow] = useState("");
  const [textFollow, setTextFollow] = useState("");
  const [showAddressAll, setShowAddressAll] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const shops = showShop({ id });

  // console.log(shops);
  const address = showtrueAddressService({ id });
  const { userFollow, isLoading, error } = checkFollow({ id });
  // console.log(userFollow);
  const { $total } = indexFollowShop({ id });
  const handleFollow = async () => {
    const status = await followShopservice({ id });
    // console.log(status);
    if (status) {
      toast.success("Follow Thành Công");
      setFollow($follow + 1);
      setTextFollow("Hủy follow");
      setStatusFollow("");
    } else {
      setFollow($follow - 1);
      toast.success("Hủy Follow Thành Công");
      setTextFollow("Follow");
      setStatusFollow("");
    }
  };

  useEffect(() => {
    setFollow($total);

    if (userFollow === true) {
      setTextFollow("Hủy follow");
    } else if (userFollow === false) {
      setTextFollow("Follow");
    }
  }, [$total, userFollow]);

  // console.log(address);
  return (
    <>
      <Container className="border-bottom border-2 ">
        <Container className="d-flex justify-content-between">
          <Row className="m-2">
            <Link href={"/shop"}>
              <Button>Back</Button>
            </Link>
          </Row>
          <Row className="m-2 d-flex gap-2">
            <Button
              onClick={() => {
                setShow(true);
                setShopID(shops);
              }}
            >
              Update
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              Delete
            </Button>
          </Row>
        </Container>
        <Container className="p-4 d-flex justify-content-between">
          <Row className="col-4 ">
            <Card style={{ width: "21rem" }}>
              <Card.Body className="text-center">
                <Image
                  src={shops.logo}
                  roundedCircle
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <Card.Text className="mt-3">{shops.name}</Card.Text>

                <Card.Link href="#">
                  <Button
                    className=""
                    onClick={() => {
                      handleFollow();
                    }}
                  >
                    {textFollow}
                    {statusFollow}
                  </Button>
                </Card.Link>
                <Card.Link href="">
                  <Button>Chat </Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Row>
          <Row className="col-4 text-center">
            <Col>Sản phẩm:</Col>
            <Col>Đang theo: {$follow}</Col>
            <div className="mt-3 text-muted">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  📍 <strong>Địa chỉ:</strong>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setShowAddressAll(true);
                  }}
                >
                Tất Cả Các Shop
                </Button>
              </div>

              <div className="mt-2">
                {address.length > 0 ? (
                  address.map((add: any) => (
                    <p key={add.id} className="mb-1">
                      {add.address}, {add.ward}, {add.district}, {add.provionce}
                    </p>
                  ))
                ) : (
                  <p className="text-muted fst-italic">Chưa có địa chỉ</p>
                )}
              </div>
            </div>
          </Row>

          <Row className="col-4 text-center">
            <Col>Đánh giá:</Col>
          </Row>
        </Container>

        <Container className="d-flex justify-content-center ">
          <Row></Row>
        </Container>
      </Container>
      <UpdateShop
        show={show}
        setShow={setShow}
        id={id}
        setShopID={setShopID}
        shopID={shopID}
      ></UpdateShop>
      <DeleteShop
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        id={id}
      ></DeleteShop>
      <AllAddress showAddressAll={showAddressAll} setShowAddressAll = {setShowAddressAll} id = {id}></AllAddress>
    </>
  );
}

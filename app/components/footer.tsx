import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Footer() {
    return(
        <> 
          <Container className="d-flex justify-content-center mt-5" >
            <Row>
                <Col >Đây là Footer</Col>
            </Row>
            </Container>
        </>
    )
};

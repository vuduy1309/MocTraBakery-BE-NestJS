import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { BsBoxSeam, BsPeople, BsCash, BsCartCheck, BsTag, BsBarChart, BsGear, BsShieldLock, BsJournalText } from 'react-icons/bs';

function AdminDashboard() {
  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="d-none d-md-block bg-light border-end min-vh-100 p-0">
          <div className="py-4 px-2">
            <h5 className="mb-4">Admin Panel</h5>
            <ListGroup variant="flush">
              <ListGroup.Item action active>
                <BsBarChart className="me-2" /> Dashboard
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsBoxSeam className="me-2" /> Sản phẩm
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsTag className="me-2" /> Khuyến mãi
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsCartCheck className="me-2" /> Đơn hàng
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsPeople className="me-2" /> Khách hàng
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsShieldLock className="me-2" /> Quản lý user
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsJournalText className="me-2" /> Quản lý Blogpost
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsCash className="me-2" /> Thống kê doanh thu
              </ListGroup.Item>
              <ListGroup.Item action>
                <BsGear className="me-2" /> Cài đặt hệ thống
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        {/* Main content */}
        <Col md={10} xs={12}>
          <h3 className="mb-4">Dashboard Admin (Demo)</h3>
          <Row className="mb-4">
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <BsBoxSeam size={32} className="text-success mb-2" />
                  <Card.Title>120</Card.Title>
                  <Card.Text>Sản phẩm</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <BsCartCheck size={32} className="text-primary mb-2" />
                  <Card.Title>45</Card.Title>
                  <Card.Text>Đơn hàng</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <BsPeople size={32} className="text-warning mb-2" />
                  <Card.Title>30</Card.Title>
                  <Card.Text>Khách hàng</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <BsCash size={32} className="text-danger mb-2" />
                  <Card.Title>50.000.000₫</Card.Title>
                  <Card.Text>Doanh thu</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Bảng user hệ thống */}
          <Card className="shadow-sm mb-4">
            <Card.Header>Người dùng hệ thống</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                admin@bakery.vn <Badge bg="danger">Admin</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                manager@bakery.vn <Badge bg="warning">Product Manager</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                user1@gmail.com <Badge bg="secondary">Khách hàng</Badge>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {/* Bảng doanh thu gần đây */}
          <Card className="shadow-sm">
            <Card.Header>Thống kê doanh thu gần đây</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                27/06/2025: 5.000.000₫
              </ListGroup.Item>
              <ListGroup.Item>
                26/06/2025: 3.200.000₫
              </ListGroup.Item>
              <ListGroup.Item>
                25/06/2025: 4.500.000₫
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;

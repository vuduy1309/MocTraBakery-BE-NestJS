import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BsBoxSeam, BsCartCheck, BsPeople, BsCash } from 'react-icons/bs';

function ProductManagerStats({ stats }) {
  return (
    <Row className="mb-4">
      <Col md={3} xs={6} className="mb-3">
        <Card className="text-center shadow-sm">
          <Card.Body>
            <BsBoxSeam size={32} className="text-success mb-2" />
            <Card.Title>{stats.totalProducts}</Card.Title>
            <Card.Text>Sản phẩm</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="text-center shadow-sm">
          <Card.Body>
            <BsCartCheck size={32} className="text-primary mb-2" />
            <Card.Title>{stats.totalOrders}</Card.Title>
            <Card.Text>Đơn hàng</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="text-center shadow-sm">
          <Card.Body>
            <BsPeople size={32} className="text-warning mb-2" />
            <Card.Title>{stats.totalCustomers}</Card.Title>
            <Card.Text>Khách hàng</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="text-center shadow-sm">
          <Card.Body>
            <BsCash size={32} className="text-danger mb-2" />
            <Card.Title>
              {stats.totalRevenue.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Card.Title>
            <Card.Text>Doanh thu</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProductManagerStats;

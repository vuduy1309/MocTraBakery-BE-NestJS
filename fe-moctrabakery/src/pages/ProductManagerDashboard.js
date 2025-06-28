import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import {
  BsBoxSeam,
  BsPeople,
  BsCash,
  BsCartCheck,
  BsTag,
  BsBarChart,
} from 'react-icons/bs';

import api from '../api';

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name: payload.fullName || payload.email || 'User',
      role: payload.role,
    };
  } catch {
    return null;
  }
}

function ProductManagerDashboard() {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.role !== 'ProductManager') {
      navigate('/login');
      return;
    }
    api
      .get('/products/dashboard-stats')
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Không thể tải dữ liệu dashboard');
        setLoading(false);
      });
  }, [navigate]);

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar */}
        <Col
          md={2}
          className="d-none d-md-block bg-light border-end min-vh-100 p-0"
        >
          <div className="py-4 px-2">
            <h5 className="mb-4">Quản trị</h5>
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
            </ListGroup>
          </div>
        </Col>

        {/* Main content */}
        <Col md={10} xs={12}>
          <h3 className="mb-4">Dashboard Product Manager</h3>
          {loading ? (
            <div className="text-center py-5">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-danger py-5">{error}</div>
          ) : (
            stats && (
              <>
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
                {/* Bảng sản phẩm bán chạy */}
                <Card className="shadow-sm mb-4">
                  <Card.Header>Sản phẩm bán chạy</Card.Header>
                  <ListGroup variant="flush">
                    {stats.bestSellers && stats.bestSellers.length > 0 ? (
                      stats.bestSellers.map((item, idx) => (
                        <ListGroup.Item key={item._id || idx}>
                          {item.name}{' '}
                          <Badge bg="success">{item.stock} còn lại</Badge>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>Không có dữ liệu</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
                {/* Bảng đơn hàng gần đây */}
                <Card className="shadow-sm">
                  <Card.Header>Đơn hàng gần đây</Card.Header>
                  <ListGroup variant="flush">
                    {stats.recentOrders && stats.recentOrders.length > 0 ? (
                      stats.recentOrders.map((order, idx) => (
                        <ListGroup.Item key={order.code || idx}>
                          {order.code}{' '}
                          <Badge
                            bg={
                              order.status === 'Hoàn thành'
                                ? 'success'
                                : order.status === 'Đang xử lý'
                                  ? 'warning'
                                  : 'danger'
                            }
                          >
                            {order.status}
                          </Badge>{' '}
                          -{' '}
                          {order.amount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>Không có dữ liệu</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductManagerDashboard;

import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { BsBarChart, BsBoxSeam, BsTag, BsCartCheck, BsPeople, BsShieldLock, BsJournalText, BsCash, BsGear } from 'react-icons/bs';

function getActiveKey(pathname) {
  if (pathname.includes('/admin/products')) return 'products';
  if (pathname.includes('/manager/discounts')) return 'discounts';
  if (pathname.includes('/admin/orders')) return 'orders';
  if (pathname.includes('/admin/customers')) return 'customers';
  if (pathname.includes('/admin/users')) return 'users';
  if (pathname.includes('/admin/blog')) return 'blog';
  if (pathname.includes('/admin/revenue')) return 'revenue';
  if (pathname.includes('/admin/settings')) return 'settings';
  return 'dashboard';
}

function AdminSidebar({ activeKey, navigate }) {
  return (
    <div className="py-4 px-2">
      <h5 className="mb-4">Admin Panel</h5>
      <ListGroup variant="flush" activeKey={activeKey}>
        <ListGroup.Item action active={activeKey === 'dashboard'} onClick={() => navigate('/admin/dashboard')}>
          <BsBarChart className="me-2" /> Dashboard
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'products'} onClick={() => navigate('/admin/products')}>
          <BsBoxSeam className="me-2" /> Sản phẩm
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'discounts'} onClick={() => navigate('/admin/discounts')}>
          <BsTag className="me-2" /> Khuyến mãi
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'orders'} onClick={() => navigate('/admin/orders')}>
          <BsCartCheck className="me-2" /> Đơn hàng
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'customers'} onClick={() => navigate('/admin/customers')}>
          <BsPeople className="me-2" /> Khách hàng
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'users'} onClick={() => navigate('/admin/users')}>
          <BsShieldLock className="me-2" /> Quản lý user
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'blog'} onClick={() => navigate('/admin/blog')}>
          <BsJournalText className="me-2" /> Quản lý Blogpost
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'revenue'} onClick={() => navigate('/admin/revenue')}>
          <BsCash className="me-2" /> Thống kê doanh thu
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'settings'} onClick={() => navigate('/admin/settings')}>
          <BsGear className="me-2" /> Cài đặt hệ thống
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

function AdminLayout() {
  const location = useLocation();
  const activeKey = getActiveKey(location.pathname);
  const navigate = (path) => {
    window.location.hash = '';
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={2} className="d-none d-md-block bg-light border-end min-vh-100 p-0">
          <AdminSidebar activeKey={activeKey} navigate={navigate} />
        </Col>
        <Col md={10} xs={12}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;

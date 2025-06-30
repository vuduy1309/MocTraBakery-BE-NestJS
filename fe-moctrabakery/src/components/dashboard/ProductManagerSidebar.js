import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BsBarChart, BsBoxSeam, BsTag, BsCartCheck, BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function ProductManagerSidebar({ activeKey }) {
  const navigate = useNavigate();
  return (
    <div className="py-4 px-2">
      <h5 className="mb-4">Quản trị</h5>
      <ListGroup variant="flush" activeKey={activeKey}>
        <ListGroup.Item action active={activeKey === 'dashboard'} onClick={() => navigate('/manager/dashboard')}>
          <BsBarChart className="me-2" /> Dashboard
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'products'} onClick={() => navigate('/manager/products')}>
          <BsBoxSeam className="me-2" /> Sản phẩm
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'promotions'} onClick={() => navigate('/manager/promotions')}>
          <BsTag className="me-2" /> Khuyến mãi
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'orders'} onClick={() => navigate('/manager/orders')}>
          <BsCartCheck className="me-2" /> Đơn hàng
        </ListGroup.Item>
        <ListGroup.Item action active={activeKey === 'customers'} onClick={() => navigate('/manager/customers')}>
          <BsPeople className="me-2" /> Khách hàng
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ProductManagerSidebar;

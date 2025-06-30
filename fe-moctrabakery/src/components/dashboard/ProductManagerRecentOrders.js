import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

function ProductManagerRecentOrders({ recentOrders }) {
  return (
    <Card className="shadow-sm">
      <Card.Header>Đơn hàng gần đây</Card.Header>
      <ListGroup variant="flush">
        {recentOrders && recentOrders.length > 0 ? (
          recentOrders.map((order, idx) => (
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
  );
}

export default ProductManagerRecentOrders;

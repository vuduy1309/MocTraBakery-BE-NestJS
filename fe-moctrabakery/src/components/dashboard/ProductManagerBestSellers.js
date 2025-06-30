import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

function ProductManagerBestSellers({ bestSellers }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header>Sản phẩm bán chạy</Card.Header>
      <ListGroup variant="flush">
        {bestSellers && bestSellers.length > 0 ? (
          bestSellers.map((item, idx) => (
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
  );
}

export default ProductManagerBestSellers;

// ProductManagerBestSellers.js
import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

function ProductManagerBestSellers({ bestSellers }) {
  const cardStyle = {
    backgroundColor: '#F5F1EB', // Be nhạt
    border: '1px solid #D4A574', // Viền nâu vàng
    boxShadow: '0 2px 8px rgba(139, 69, 19, 0.1)'
  };

  const headerStyle = {
    backgroundColor: '#D4A574', // Nâu vàng
    color: '#FFFFFF',
    fontWeight: '600',
    borderBottom: '1px solid #C49B6B'
  };

  const itemStyle = {
    backgroundColor: 'transparent',
    color: '#6B4423', // Nâu đậm
    borderColor: '#E8DDD4'
  };

  const badgeStyle = {
    backgroundColor: '#8B6914', // Nâu vàng đậm cho success
    border: 'none'
  };

  return (
    <Card style={cardStyle} className="mb-4">
      <Card.Header style={headerStyle}>🏆 Sản phẩm bán chạy</Card.Header>
      <ListGroup variant="flush">
        {bestSellers && bestSellers.length > 0 ? (
          bestSellers.map((item, idx) => (
            <ListGroup.Item key={item._id || idx} style={itemStyle}>
              <strong>{item.name}</strong>{' '}
              <Badge style={badgeStyle}>{item.stock} còn lại</Badge>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item style={itemStyle}>Không có dữ liệu</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default ProductManagerBestSellers;
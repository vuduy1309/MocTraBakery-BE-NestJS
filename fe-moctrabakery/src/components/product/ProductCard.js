import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
  Image,
} from 'react-bootstrap';
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaGift,
  FaLeaf,
  FaSnowflake,
} from 'react-icons/fa';
import './ProductCard.css';

const API_URL = 'http://localhost:3000'; // Đổi thành domain backend nếu deploy

function ProductCard({
  _id,
  name,
  price,
  image, // Giữ prop image cho tương thích ngược
  images, // Thêm prop images mới
  sizes = [],
  discount,
  isVegetarian,
  isRefrigerated,
  rating = 4.5,
  reviewCount = 0,
  ...rest
}) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Tìm giá nhỏ nhất trong các size (nếu có)
  let displayPrice = price;
  let sizeLabel = '';
  if (sizes && sizes.length > 0) {
    const minSize = sizes.reduce(
      (min, s) => (s.price < min.price ? s : min),
      sizes[0],
    );
    displayPrice = minSize.price;
    sizeLabel = `Từ ${minSize.name}`;
  }

  // Tính giá khuyến mãi nếu có discount
  let finalPrice = displayPrice;
  let discountPercent = 0;
  if (discount && discount.percent) {
    finalPrice = Math.round(displayPrice * (1 - discount.percent / 100));
    discountPercent = discount.percent;
  } else if (discount && discount.amount) {
    finalPrice = Math.max(0, displayPrice - discount.amount);
    discountPercent = Math.round((discount.amount / displayPrice) * 100);
  }

  const handleCardClick = () => {
    if (_id) navigate(`/products/${_id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // Logic thêm nhanh vào giỏ hàng
    console.log('Quick add to cart:', _id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" size={12} />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStar
          key="half"
          className="text-warning"
          size={12}
          style={{ opacity: 0.5 }}
        />,
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-muted" size={12} />,
      );
    }
    return stars;
  };

  // Xử lý ảnh: ưu tiên images từ backend, fallback về image
  let imageUrl = '';

  // Ưu tiên images (từ backend API)
  const imageSource = images || image;

  if (Array.isArray(imageSource) && imageSource.length > 0) {
    let first = imageSource[0];
    if (typeof first === 'string') {
      imageUrl = first;
    } else if (first && typeof first === 'object') {
      imageUrl = first.image || first.url || '';
    }
  } else if (imageSource && typeof imageSource === 'object') {
    imageUrl = imageSource.image || imageSource.url || '';
  } else if (typeof imageSource === 'string') {
    imageUrl = imageSource;
  }

  // Xử lý URL ảnh
  if (imageUrl) {
    // Nếu là đường dẫn tương đối từ server
    if (imageUrl.startsWith('/uploads')) {
      imageUrl = API_URL + imageUrl;
    }
    // Nếu không phải URL đầy đủ và không bắt đầu bằng http
    else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
      imageUrl = API_URL + (imageUrl.startsWith('/') ? '' : '/') + imageUrl;
    }
  }

  return (
    <Card
      className="product-card h-100 border-0 shadow-sm position-relative"
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <Badge
          bg="danger"
          className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-6"
          style={{ zIndex: 10 }}
        >
          <FaGift className="me-1" size={10} />-{discountPercent}%
        </Badge>
      )}

      {/* Favorite Button */}
      <Button
        variant={isFavorite ? 'danger' : 'light'}
        size="sm"
        className="position-absolute top-0 end-0 m-2 rounded-circle p-1 border-0"
        style={{
          zIndex: 10,
          width: '32px',
          height: '32px',
          backgroundColor: isFavorite ? undefined : 'rgba(255, 255, 255, 0.9)',
        }}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
      </Button>

      {/* Product Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: '200px' }}
      >
        <Image
          src={imageUrl || '/default-product.png'}
          alt={name}
          className="w-100 h-100 object-fit-cover"
          style={{
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Quick Add Button - appears on hover */}
        {isHovered && (
          <Button
            variant="primary"
            size="sm"
            className="position-absolute bottom-0 end-0 m-2 rounded-circle p-2"
            onClick={handleQuickAdd}
            style={{
              animation: 'slideUp 0.3s ease',
              width: '40px',
              height: '40px',
            }}
          >
            <FaShoppingCart size={16} />
          </Button>
        )}
      </div>

      <Card.Body className="p-3">
        {/* Product Features */}
        <div className="d-flex align-items-center mb-2">
          {isVegetarian && (
            <OverlayTrigger overlay={<Tooltip>Thực phẩm chay</Tooltip>}>
              <span className="me-2">
                <FaLeaf color="#27ae60" size={14} />
              </span>
            </OverlayTrigger>
          )}
          {isRefrigerated && (
            <OverlayTrigger overlay={<Tooltip>Bảo quản lạnh</Tooltip>}>
              <span className="me-2">
                <FaSnowflake color="#2980b9" size={14} />
              </span>
            </OverlayTrigger>
          )}
          {sizeLabel && (
            <Badge bg="light" text="dark" className="ms-auto">
              {sizeLabel}
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <Card.Title
          as="h6"
          className="mb-2 text-truncate fw-bold"
          style={{
            fontSize: '1rem',
            lineHeight: '1.2',
            minHeight: '1.2rem',
          }}
        >
          {name}
        </Card.Title>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-2">
            {renderStars(rating)}
          </div>
          <small className="text-muted">
            ({reviewCount > 0 ? reviewCount : 'Chưa có'} đánh giá)
          </small>
        </div>

        {/* Price */}
        <div className="mb-3">
          {finalPrice !== displayPrice ? (
            <div>
              <span className="h6 text-success fw-bold mb-0">
                {finalPrice.toLocaleString()}đ
              </span>
              <span className="ms-2 small text-muted text-decoration-line-through">
                {displayPrice.toLocaleString()}đ
              </span>
            </div>
          ) : (
            <span className="h6 text-success fw-bold mb-0">
              {finalPrice.toLocaleString()}đ
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline-primary"
          size="sm"
          className="w-100 fw-bold"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Xem chi tiết
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

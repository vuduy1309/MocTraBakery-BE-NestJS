import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Alert,
  Spinner,
  ButtonGroup,
  Image,
  Stack,
} from 'react-bootstrap';
import {
  FaGift,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaUndo,
} from 'react-icons/fa';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addCartMsg, setAddCartMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Ref để lưu interval ID
  const intervalRef = useRef(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        // Set default size if available
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0].name);
        }
      } catch (err) {
        setError('Không tìm thấy sản phẩm hoặc có lỗi xảy ra.');
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  // Effect để xử lý auto-play ảnh
  useEffect(() => {
    // Chỉ chạy auto-play nếu có nhiều hơn 1 ảnh
    if (product && Array.isArray(product.images) && product.images.length > 1) {
      // Xóa interval cũ nếu có
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Chỉ tạo interval mới nếu không đang hover
      if (!isHovering) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
        }, 5000); // 5 giây (trong khoảng 4-6 giây)
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [product, isHovering]);

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleQuantityChange = (operation) => {
    if (operation === 'increment' && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (operation === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setAddCartMsg('');
    setShowAlert(false);
    try {
      const token = localStorage.getItem('token');
      // 1. Lấy giỏ hàng hiện tại
      const cartRes = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cart = cartRes.data;
      // 2. Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const existed = cart.items && cart.items.some(
        (item) =>
          item.productId &&
          (item.productId._id === product._id || item.productId === product._id) &&
          item.size === selectedSize
      );
      if (existed) {
        setAddCartMsg('Sản phẩm này đã có trong giỏ hàng!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
      // 3. Nếu chưa có thì thêm vào giỏ hàng
      await api.post(
        '/cart/add',
        {
          productId: product._id,
          size: selectedSize,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAddCartMsg('Đã thêm vào giỏ hàng thành công!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      setAddCartMsg('Thêm vào giỏ hàng thất bại. Vui lòng thử lại!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const calculateDiscountedPrice = () => {
    if (product.discountId && product.discountId.percent) {
      return product.price * (1 - product.discountId.percent / 100);
    }
    return product.price;
  };

  const getSelectedSizePrice = () => {
    if (selectedSize && product.sizes) {
      const size = product.sizes.find((s) => s.name === selectedSize);
      return size ? size.price : product.price;
    }
    return product.price;
  };

  // Handler cho việc chuyển ảnh thủ công
  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
    } else {
      setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
    }
  };

  // Handler cho hover events
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" size="lg" />
        <div className="mt-3 h5 text-muted">Đang tải sản phẩm...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!product) return null;

  // Chuẩn bị đặc điểm sản phẩm dạng text
  const features = [];
  if (product.isVegetarian) features.push('Thực phẩm chay');
  if (product.isRefrigerated) features.push('Bảo quản lạnh');
  if (product.calories) features.push(`${product.calories} calories`);
  if (product.shelfLifeDays)
    features.push(`Hạn sử dụng: ${product.shelfLifeDays} ngày`);
  if (product.packaging) features.push(`Đóng gói: ${product.packaging}`);
  if (product.includedFlavors && product.includedFlavors.length > 0)
    features.push(`Hương vị: ${product.includedFlavors.join(', ')}`);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #F8F5F0 0%, #F0EDE8 100%)',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <Container fluid="xl">
        {/* Alert thông báo */}
        {showAlert && (
          <Row className="mb-4">
            <Col>
              <Alert
                variant={addCartMsg.includes('thành công') ? 'success' : 'danger'}
                dismissible
                onClose={() => setShowAlert(false)}
                className="text-center shadow-sm"
                style={{
                  borderRadius: '15px',
                  border: 'none'
                }}
              >
                {addCartMsg}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="g-4">
          {/* Cột ảnh sản phẩm */}
          <Col lg={6}>
            <Card className="border-0 shadow-lg h-100" style={{ 
              borderRadius: '20px',
              background: '#fff',
              minHeight: '500px'
            }}>
              <div 
                className="position-relative p-4 h-100 d-flex align-items-center justify-content-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Badge giảm giá */}
                {product.discountId && product.discountId.percent && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-0 m-3 px-3 py-2"
                    style={{ 
                      zIndex: 10,
                      borderRadius: '15px',
                      fontSize: '0.9rem'
                    }}
                  >
                    <FaGift className="me-1" />-{product.discountId.percent}%
                  </Badge>
                )}
                
                {/* Nút yêu thích */}
                <Button
                  variant={isFavorite ? 'danger' : 'outline-danger'}
                  className="position-absolute top-0 end-0 m-3 rounded-circle p-2"
                  style={{ 
                    zIndex: 10, 
                    width: '50px', 
                    height: '50px',
                    border: '2px solid #dc3545'
                  }}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FaHeart />
                </Button>

                {/* Ảnh sản phẩm */}
                <div className="w-100 h-100 d-flex align-items-center justify-content-center position-relative">
                  {/* Nút chuyển ảnh trái */}
                  {Array.isArray(product.images) && product.images.length > 1 && (
                    <Button
                      variant="light"
                      className="position-absolute top-50 start-0 translate-middle-y"
                      style={{ 
                        zIndex: 11, 
                        borderRadius: '50%', 
                        border: '1px solid #A4907C', 
                        width: 36, 
                        height: 36, 
                        padding: 0, 
                        left: 10,
                        opacity: isHovering ? 1 : 0.7,
                        transition: 'opacity 0.3s ease'
                      }}
                      onClick={() => handleImageNavigation('prev')}
                      aria-label="Ảnh trước"
                    >
                      <span style={{ fontSize: 22, color: '#A4907C' }}>&lt;</span>
                    </Button>
                  )}
                  
                  {/* Container ảnh với hiệu ứng transition */}
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '400px',
                    overflow: 'hidden',
                    borderRadius: '10px'
                  }}>
                    {(() => {
                      let imageUrl = '';
                      let imgArr = Array.isArray(product.images) ? product.images : [];
                      let imgObj = imgArr.length > 0 ? imgArr[currentImageIdx] : null;
                      if (typeof imgObj === 'string') {
                        imageUrl = imgObj;
                      } else if (imgObj && typeof imgObj === 'object') {
                        imageUrl = imgObj.image || imgObj.url || '';
                      } else if (product.image && typeof product.image === 'object') {
                        imageUrl = product.image.image || product.image.url || '';
                      } else if (typeof product.image === 'string') {
                        imageUrl = product.image;
                      }
                      if (imageUrl && imageUrl.startsWith('/uploads')) {
                        imageUrl = 'http://localhost:3000' + imageUrl;
                      }
                      return (
                        <Image
                          key={currentImageIdx} // Key để trigger re-render với animation
                          src={imageUrl || '/default-product.png'}
                          alt={product.name}
                          className="rounded"
                          style={{ 
                            maxHeight: '100%', 
                            maxWidth: '100%', 
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 8px 16px rgba(164,144,124,0.15))',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                            animation: 'fadeInScale 0.5s ease-in-out'
                          }}
                        />
                      );
                    })()}
                  </div>
                  
                  {/* Nút chuyển ảnh phải */}
                  {Array.isArray(product.images) && product.images.length > 1 && (
                    <Button
                      variant="light"
                      className="position-absolute top-50 end-0 translate-middle-y"
                      style={{ 
                        zIndex: 11, 
                        borderRadius: '50%', 
                        border: '1px solid #A4907C', 
                        width: 36, 
                        height: 36, 
                        padding: 0, 
                        right: 10,
                        opacity: isHovering ? 1 : 0.7,
                        transition: 'opacity 0.3s ease'
                      }}
                      onClick={() => handleImageNavigation('next')}
                      aria-label="Ảnh tiếp theo"
                    >
                      <span style={{ fontSize: 22, color: '#A4907C' }}>&gt;</span>
                    </Button>
                  )}

                  {/* Indicator dots cho ảnh */}
                  {Array.isArray(product.images) && product.images.length > 1 && (
                    <div 
                      className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
                      style={{ zIndex: 10 }}
                    >
                      <div className="d-flex gap-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIdx(index)}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              border: 'none',
                              background: index === currentImageIdx ? '#A4907C' : 'rgba(164,144,124,0.4)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              transform: index === currentImageIdx ? 'scale(1.2)' : 'scale(1)'
                            }}
                            aria-label={`Chuyển đến ảnh ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Col>

          {/* Cột thông tin sản phẩm */}
          <Col lg={6}>
            <div className="h-100 d-flex flex-column">
              {/* Thông tin cơ bản */}
              <Card className="border-0 shadow-lg mb-4" style={{ 
                borderRadius: '20px',
                background: '#fff'
              }}>
                <Card.Body className="p-4">
                  {/* Category và Rating */}
                  <div className="mb-3">
                    <Badge 
                      bg="primary" 
                      className="px-3 py-2 me-3"
                      style={{ 
                        borderRadius: '12px',
                        background: '#A4907C',
                        border: 'none'
                      }}
                    >
                      {product.categoryId?.name}
                    </Badge>
                    <div className="d-flex align-items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-warning me-1" />
                      ))}
                      <small className="text-muted ms-2">
                        (4.8/5 - 124 đánh giá)
                      </small>
                    </div>
                  </div>

                  {/* Tên sản phẩm */}
                  <h1 className="mb-3 fw-bold" style={{ 
                    color: '#6B4F27',
                    fontSize: '2rem',
                    lineHeight: '1.3'
                  }}>
                    {product.name}
                  </h1>

                  {/* Mô tả */}
                  <p className="mb-4 text-muted" style={{ 
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}>
                    {product.description}
                  </p>

                  {/* Đặc điểm sản phẩm */}
                  <div>
                    <h6 className="mb-3 fw-bold" style={{ color: '#8B6F3A' }}>
                      Đặc điểm sản phẩm:
                    </h6>
                    <Row>
                      {features.length > 0 ? (
                        features.map((feature, i) => (
                          <Col md={6} key={i} className="mb-2">
                            <div className="d-flex align-items-center">
                              <span className="me-2" style={{ color: '#A4907C' }}>•</span>
                              <span style={{ color: '#6B4F27', fontSize: '0.95rem' }}>
                                {feature}
                              </span>
                            </div>
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <span className="text-muted">Không có thông tin đặc điểm.</span>
                        </Col>
                      )}
                    </Row>
                  </div>
                </Card.Body>
              </Card>

              {/* Card mua hàng */}
              <Card className="border-0 shadow-lg flex-grow-1" style={{ 
                borderRadius: '20px',
                background: '#fff'
              }}>
                <Card.Body className="p-4">
                  {/* Chọn kích thước */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-4">
                      <h6 className="mb-3 fw-bold" style={{ color: '#8B6F3A' }}>
                        Chọn kích thước:
                      </h6>
                      <Row className="g-2">
                        {product.sizes.map((size, i) => (
                          <Col key={i} xs={6} md={4}>
                            <Button
                              variant={selectedSize === size.name ? 'primary' : 'outline-primary'}
                              onClick={() => setSelectedSize(size.name)}
                              className="w-100"
                              style={{
                                borderRadius: '12px',
                                background: selectedSize === size.name ? '#A4907C' : 'transparent',
                                color: selectedSize === size.name ? '#fff' : '#A4907C',
                                borderColor: '#A4907C',
                                transition: 'all 0.3s ease',
                                padding: '12px 8px'
                              }}
                            >
                              <div className="text-center">
                                <div className="fw-bold">{size.name}</div>
                                <small>{size.price.toLocaleString()}đ</small>
                                <br />
                                <small className={selectedSize === size.name ? 'text-light' : 'text-muted'}>
                                  Còn {size.stock}
                                </small>
                              </div>
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {/* Giá */}
                  <div className="mb-4">
                    <h6 className="mb-3 fw-bold" style={{ color: '#8B6F3A' }}>
                      Giá:
                    </h6>
                    <div className="d-flex align-items-center gap-3">
                      {product.discountId && product.discountId.percent ? (
                        <>
                          <span className="h3 fw-bold mb-0" style={{
                            color: '#A4907C',
                            background: 'linear-gradient(135deg, #F8F5F0, #F0EDE8)',
                            borderRadius: '12px',
                            padding: '8px 16px',
                            border: '2px solid #A4907C'
                          }}>
                            {calculateDiscountedPrice().toLocaleString()}đ
                          </span>
                          <span className="h5 mb-0 text-decoration-line-through text-muted">
                            {getSelectedSizePrice().toLocaleString()}đ
                          </span>
                        </>
                      ) : (
                        <span className="h3 fw-bold mb-0" style={{
                          color: '#A4907C',
                          background: 'linear-gradient(135deg, #F8F5F0, #F0EDE8)',
                          borderRadius: '12px',
                          padding: '8px 16px',
                          border: '2px solid #A4907C'
                        }}>
                          {getSelectedSizePrice().toLocaleString()}đ
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Số lượng */}
                  <div className="mb-4">
                    <h6 className="mb-3 fw-bold" style={{ color: '#8B6F3A' }}>
                      Số lượng:
                    </h6>
                    <div className="d-flex align-items-center gap-3">
                      <ButtonGroup>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange('decrement')}
                          disabled={quantity <= 1}
                          style={{
                            borderColor: '#A4907C',
                            color: '#A4907C',
                            background: '#F8F5F0',
                            borderRadius: '8px 0 0 8px',
                            width: '45px',
                            height: '45px'
                          }}
                        >
                          <FaMinus />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          disabled
                          style={{
                            borderColor: '#A4907C',
                            color: '#A4907C',
                            background: '#fff',
                            width: '60px',
                            height: '45px',
                            fontWeight: 'bold'
                          }}
                        >
                          {quantity}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange('increment')}
                          disabled={quantity >= 10}
                          style={{
                            borderColor: '#A4907C',
                            color: '#A4907C',
                            background: '#F8F5F0',
                            borderRadius: '0 8px 8px 0',
                            width: '45px',
                            height: '45px'
                          }}
                        >
                          <FaPlus />
                        </Button>
                      </ButtonGroup>
                      <small className="text-muted">Tối đa 10 sản phẩm</small>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <Row className="g-3 mb-4">
                    <Col>
                      <Button
                        size="lg"
                        className="w-100 py-3 fw-bold"
                        onClick={handleAddToCart}
                        disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
                        style={{
                          background: 'linear-gradient(135deg, #A4907C, #8B6F3A)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 15px rgba(164,144,124,0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FaShoppingCart className="me-2" />
                        Thêm vào giỏ hàng
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-100 py-3 fw-bold"
                        style={{
                          background: 'linear-gradient(135deg, #8B6F3A, #6B4F27)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 15px rgba(139,111,58,0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Mua ngay
                      </Button>
                    </Col>
                  </Row>

                  {/* Thông tin bảo hành */}
                  <div className="pt-3 border-top">
                    <Row className="g-3 text-center">
                      <Col md={4}>
                        <div className="d-flex flex-column align-items-center">
                          <FaTruck className="mb-2" style={{ color: '#A4907C', fontSize: '1.5rem' }} />
                          <small className="text-muted">
                            Miễn phí giao hàng<br />cho đơn từ 200.000đ
                          </small>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex flex-column align-items-center">
                          <FaShieldAlt className="mb-2" style={{ color: '#A4907C', fontSize: '1.5rem' }} />
                          <small className="text-muted">
                            Đảm bảo<br />chất lượng 100%
                          </small>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="d-flex flex-column align-items-center">
                          <FaUndo className="mb-2" style={{ color: '#A4907C', fontSize: '1.5rem' }} />
                          <small className="text-muted">
                            Hỗ trợ đổi trả<br />trong 7 ngày
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetailPage;
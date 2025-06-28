import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  OverlayTrigger,
  Tooltip,
  Alert,
  Spinner,
  ButtonGroup,
  Image,
  Stack,
} from 'react-bootstrap';
import {
  FaLeaf,
  FaSnowflake,
  FaBoxOpen,
  FaFireAlt,
  FaGift,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaStar,
  FaHeart,
} from 'react-icons/fa';
import { MdOutlineFastfood } from 'react-icons/md';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
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

  // Helper render icon with tooltip
  const renderIcon = (icon, text) => (
    <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
      <span className="me-2 icon-detail d-inline-flex align-items-center">
        {icon}
      </span>
    </OverlayTrigger>
  );

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

  return (
    <Container className="product-detail-container py-4">
      {showAlert && (
        <Alert
          variant={addCartMsg.includes('thành công') ? 'success' : 'danger'}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mb-4"
        >
          {addCartMsg}
        </Alert>
      )}

      <Row className="g-4">
        {/* Product Image */}
        <Col lg={6}>
          <Card className="border-0 shadow-lg h-100">
            <div className="position-relative">
              {product.discountId && product.discountId.percent && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-0 m-3 px-3 py-2 fs-6 z-index-1"
                  style={{ zIndex: 10 }}
                >
                  <FaGift className="me-1" />-{product.discountId.percent}%
                </Badge>
              )}
              <Button
                variant={isFavorite ? 'danger' : 'outline-danger'}
                className="position-absolute top-0 end-0 m-3 rounded-circle p-2"
                style={{ zIndex: 10, width: '45px', height: '45px' }}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart />
              </Button>
              <div className="img-container p-3">
                <Image
                  src={product.image || (product.images && product.images[0])}
                  alt={product.name}
                  className="w-100 h-100 object-fit-cover rounded"
                  style={{ minHeight: '400px', maxHeight: '500px' }}
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Product Details */}
        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            {/* Product Header */}
            <Card className="border-0 shadow-lg mb-3">
              <Card.Body>
                <div className="mb-3">
                  <Badge bg="info" className="me-2 px-3 py-2">
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

                <Card.Title
                  as="h1"
                  className="mb-3 text-primary fw-bold display-6"
                >
                  {product.name}
                </Card.Title>

                <Card.Text className="mb-3 text-muted lead">
                  {product.description}
                </Card.Text>

                {/* Product Features */}
                <div className="mb-4">
                  <h6 className="text-secondary mb-3">Đặc điểm sản phẩm:</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {product.isVegetarian &&
                      renderIcon(
                        <FaLeaf color="#27ae60" size={20} />,
                        'Thực phẩm chay',
                      )}
                    {product.isRefrigerated &&
                      renderIcon(
                        <FaSnowflake color="#2980b9" size={20} />,
                        'Bảo quản lạnh',
                      )}
                    {product.calories &&
                      renderIcon(
                        <FaFireAlt color="#e67e22" size={20} />,
                        `${product.calories} calories`,
                      )}
                    {product.shelfLifeDays &&
                      renderIcon(
                        <BsFillCalendar2WeekFill color="#8e44ad" size={20} />,
                        `Hạn sử dụng: ${product.shelfLifeDays} ngày`,
                      )}
                    {product.packaging &&
                      renderIcon(
                        <FaBoxOpen color="#b9770e" size={20} />,
                        `Đóng gói: ${product.packaging}`,
                      )}
                    {product.includedFlavors &&
                      product.includedFlavors.length > 0 &&
                      renderIcon(
                        <MdOutlineFastfood color="#c0392b" size={20} />,
                        `Hương vị: ${product.includedFlavors.join(', ')}`,
                      )}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Purchase Options */}
            <Card className="border-0 shadow-lg flex-grow-1">
              <Card.Body>
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <h6 className="text-secondary mb-3">Chọn kích thước:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {product.sizes.map((size, i) => (
                        <Button
                          key={i}
                          variant={
                            selectedSize === size.name
                              ? 'primary'
                              : 'outline-primary'
                          }
                          onClick={() => setSelectedSize(size.name)}
                          className="rounded-pill px-4"
                        >
                          <div className="text-center">
                            <div className="fw-bold">{size.name}</div>
                            <small>{size.price.toLocaleString()}đ</small>
                            <br />
                            <small className="text-muted">
                              Còn {size.stock}
                            </small>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Display */}
                <div className="mb-4">
                  <h6 className="text-secondary mb-2">Giá:</h6>
                  <div className="d-flex align-items-center gap-3">
                    {product.discountId && product.discountId.percent ? (
                      <>
                        <span className="h3 text-success fw-bold mb-0">
                          {calculateDiscountedPrice().toLocaleString()}đ
                        </span>
                        <span className="h5 text-muted text-decoration-line-through mb-0">
                          {getSelectedSizePrice().toLocaleString()}đ
                        </span>
                      </>
                    ) : (
                      <span className="h3 text-success fw-bold mb-0">
                        {getSelectedSizePrice().toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="mb-4">
                  <h6 className="text-secondary mb-3">Số lượng:</h6>
                  <div className="d-flex align-items-center gap-3">
                    <ButtonGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleQuantityChange('decrement')}
                        disabled={quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        disabled
                        className="px-4"
                      >
                        {quantity}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleQuantityChange('increment')}
                        disabled={quantity >= 10}
                      >
                        <FaPlus />
                      </Button>
                    </ButtonGroup>
                    <small className="text-muted">Tối đa 10 sản phẩm</small>
                  </div>
                </div>

                {/* Action Buttons */}
                <Stack direction="horizontal" gap={3} className="mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="flex-grow-1 py-3 fw-bold"
                    onClick={handleAddToCart}
                    disabled={
                      product.sizes && product.sizes.length > 0 && !selectedSize
                    }
                  >
                    <FaShoppingCart className="me-2" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 py-3 fw-bold"
                  >
                    Mua ngay
                  </Button>
                </Stack>

                {/* Additional Info */}
                <div className="mt-4 pt-3 border-top">
                  <small className="text-muted">
                    <div className="mb-1">
                      ✓ Miễn phí giao hàng cho đơn từ 200.000đ
                    </div>
                    <div className="mb-1">✓ Đảm bảo chất lượng 100%</div>
                    <div>✓ Hỗ trợ đổi trả trong 7 ngày</div>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;

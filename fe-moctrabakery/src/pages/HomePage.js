import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
  Carousel,
  Image,
} from 'react-bootstrap';
import {
  FaStore,
  FaLeaf,
  FaHeart,
  FaShippingFast,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaStar,
  FaQuoteLeft,
} from 'react-icons/fa';
import './HomePage.css';
import './HomePage.custom.css';
import ProductCard from '../components/product/ProductCard';
import api from '../api';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [promo, setPromo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/homepage-data');
        setFeaturedProducts(res.data.featuredProducts || []);
        setPromo(res.data.promo || null);
        setReviews(res.data.reviews || []);
        setDiscounts(res.data.discounts || []);
      } catch (err) {
        setError('Không thể tải dữ liệu trang chủ');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const features = [
    {
      icon: <FaLeaf className="feature-icon-leaf" size={40} />,
      title: 'Nguyên liệu tự nhiên',
      description: '100% nguyên liệu tươi ngon, không chất bảo quản',
    },
    {
      icon: <FaHeart className="feature-icon-heart" size={40} />,
      title: 'Làm bằng tình yêu',
      description: 'Mỗi chiếc bánh được làm với tâm huyết và tình yêu',
    },
    {
      icon: <FaShippingFast className="feature-icon-ship" size={40} />,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng tận nơi trong 30 phút',
    },
    {
      icon: <FaStore className="feature-icon-store" size={40} />,
      title: 'Cửa hàng uy tín',
      description: 'Hơn 5 năm phục vụ khách hàng tận tâm',
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <section className="hero-section bg-gradient-hero py-5 mb-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-4 hero-title">
                Mộc Trà Bakery
              </h1>
              <p className="lead mb-4 fs-5 hero-desc">
                Ngọt ngào từ tâm - Bánh tươi mỗi ngày
              </p>
              <p className="mb-4 hero-desc">
                Khám phá thế giới bánh ngọt tuyệt vời với hương vị đặc biệt,
                được chế biến từ những nguyên liệu tươi ngon nhất.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button
                  size="lg"
                  onClick={() => (window.location.href = '/products')}
                  className="px-4 py-2 fw-bold btn-order-now"
                >
                  Đặt hàng ngay
                </Button>
                <Button size="lg" className="px-4 py-2 fw-bold btn-learn-more">
                  Tìm hiểu thêm
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-4 mt-lg-0">
              <div className="rounded-3 shadow-lg hero-logo-bg d-inline-block p-3">
                <Image
                  src="/Mộc Trà Bakery.png"
                  alt="Mộc Trà Bakery"
                  className="img-fluid rounded-3 hero-logo-text"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        {/* Features Section */}
        <section className="features-section features-section-bg mb-5 rounded-4 py-3 px-2">
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-6 fw-bold features-title mb-3">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="lead features-desc">
                Cam kết mang đến những sản phẩm chất lượng cao với dịch vụ tốt
                nhất
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm text-center feature-card">
                  <Card.Body className="p-4">
                    <div className="mb-3">{feature.icon}</div>
                    <Card.Title className="h5 mb-3 feature-card-title">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="feature-card-desc">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products Section */}
        <section className="featured-section mb-5">
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold text-soft-beige mb-3">
                Sản phẩm nổi bật
              </h2>
              <p className="lead text-muted">
                Những sản phẩm được khách hàng yêu thích nhất
              </p>
            </Col>
          </Row>

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="lg" />
              <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          {!loading && !error && (
            <>
              <Row className="g-4 mb-4">
                {featuredProducts.slice(0, 8).map((product, index) => (
                  <Col lg={3} md={4} sm={6} key={product._id || index}>
                    <ProductCard
                      {...product}
                      discount={
                        product.discountId &&
                        (typeof product.discountId === 'object'
                          ? product.discountId
                          : null)
                      }
                    />
                  </Col>
                ))}
              </Row>
              <div className="text-center">
                <Button
                  variant="soft-beige"
                  size="lg"
                  onClick={() => (window.location.href = '/products')}
                  className="px-5 py-3 fw-bold btn-soft-beige"
                >
                  Xem tất cả sản phẩm
                </Button>
              </div>
            </>
          )}
        </section>

        {/* Promo Section */}
        <section className="promo-section mb-5">
          <Card className="bg-gradient-soft-beige text-soft-beige border-0">
            <Card.Body className="p-5 text-center">
              <h2 className="display-6 fw-bold mb-3">
                <FaStar className="me-2" />
                Ưu đãi hôm nay
              </h2>
              <div className="lead">
                {promo
                  ? promo.content
                  : 'Giảm giá 20% cho tất cả sản phẩm bánh sinh nhật! Áp dụng từ hôm nay đến hết tuần.'}
              </div>
              <Button
                variant="soft-beige"
                size="lg"
                className="mt-3 fw-bold px-4 btn-soft-beige"
              >
                Áp dụng ngay
              </Button>
            </Card.Body>
          </Card>
        </section>

        {/* Reviews Section */}
        <section className="review-section mb-5">
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold text-soft-beige mb-3">
                Khách hàng nói gì?
              </h2>
              <p className="lead text-muted">
                Những đánh giá chân thực từ khách hàng của chúng tôi
              </p>
            </Col>
          </Row>

          {reviews.length > 0 ? (
            <Carousel interval={5000} className="review-carousel">
              {reviews.map((review, index) => (
                <Carousel.Item key={index}>
                  <Card
                    className="border-0 shadow-sm mx-auto"
                    style={{ maxWidth: '600px' }}
                  >
                    <Card.Body className="p-4 text-center">
                      <FaQuoteLeft className="text-soft-beige mb-3" size={30} />
                      <blockquote className="mb-3 fs-5 fst-italic">
                        "{review.content}"
                      </blockquote>
                      <div className="d-flex justify-content-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-warning me-1" />
                        ))}
                      </div>
                      <cite className="fw-bold text-soft-beige">
                        — {review.author}
                      </cite>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Row className="g-4">
              {[1, 2, 3].map((i) => (
                <Col lg={4} key={i}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4 text-center">
                      <FaQuoteLeft className="text-soft-beige mb-3" size={24} />
                      <blockquote className="mb-3">
                        "Bánh rất ngon, tươi và chất lượng. Tôi sẽ quay lại ủng
                        hộ!"
                      </blockquote>
                      <div className="d-flex justify-content-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className="text-warning me-1"
                            size={14}
                          />
                        ))}
                      </div>
                      <cite className="fw-bold text-soft-beige">
                        — Khách hàng {i}
                      </cite>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Contact Section */}
        <section className="contact-section" style={{ marginBottom: 0 }}>
          <Card className="border-0 shadow-lg">
            <Card.Header className="bg-soft-beige text-soft-beige text-center py-4">
              <h2 className="display-6 fw-bold mb-0">Liên hệ với chúng tôi</h2>
            </Card.Header>
            <Card.Body className="p-5">
              <Row className="g-4">
                <Col lg={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt
                      className="text-soft-beige me-3"
                      size={20}
                    />
                    <div>
                      <strong>Địa chỉ:</strong>
                      <br />
                      123 Đường Admin, Quận 1, TP. HCM
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <FaPhone className="text-soft-beige me-3" size={20} />
                    <div>
                      <strong>Hotline:</strong>
                      <br />
                      0901 234 567
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="d-flex align-items-center mb-3">
                    <FaEnvelope className="text-soft-beige me-3" size={20} />
                    <div>
                      <strong>Email:</strong>
                      <br />
                      moctrabakery@example.com
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <FaFacebook className="text-soft-beige me-3" size={20} />
                    <div>
                      <strong>Facebook:</strong>
                      <br />
                      fb.com/moctrabakery
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-4">
                <Button
                  variant="soft-beige"
                  size="lg"
                  className="px-5 fw-bold btn-soft-beige"
                >
                  Liên hệ ngay
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  );
}

export default HomePage;

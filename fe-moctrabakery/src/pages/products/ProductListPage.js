import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  InputGroup, 
  Card, 
  Spinner, 
  Alert, 
  Badge,
  Button
} from 'react-bootstrap';
import api from '../../api';
import ProductCard from '../../components/product/ProductCard';
import './ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
        ]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        setError('Không thể tải dữ liệu');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Lọc sản phẩm theo search, category, giá
  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    let matchCategory = true;
    if (category) {
      if (typeof p.categoryId === 'object' && p.categoryId !== null) {
        matchCategory = p.categoryId._id === category;
      } else {
        matchCategory = p.categoryId === category;
      }
    }
    let matchPrice = true;
    const price = typeof p.price === 'number' ? p.price : parseInt(p.price || '0');
    if (priceRange === '1') matchPrice = price < 30000;
    else if (priceRange === '2') matchPrice = price >= 30000 && price < 70000;
    else if (priceRange === '3') matchPrice = price >= 70000 && price < 150000;
    else if (priceRange === '4') matchPrice = price >= 150000;
    return matchName && matchCategory && matchPrice;
  });

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPriceRange('');
  };

  return (
    <div className="product-list-page bg-light min-vh-100 py-4">
      <Container fluid className="px-4">
        
        {/* Header Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center py-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-4" 
                   style={{ width: '80px', height: '80px' }}>
                <i className="fas fa-store fa-2x text-primary"></i>
              </div>
              <h1 className="display-4 fw-bold text-primary mb-3">
                Danh sách sản phẩm
              </h1>
              <p className="lead text-muted">
                Khám phá bộ sưu tập sản phẩm đa dạng với chất lượng tốt nhất
              </p>
            </div>
          </Col>
        </Row>

        {/* Filter Section */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <Row className="align-items-end">
                  <Col lg={5} className="mb-3 mb-lg-0">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Tìm kiếm sản phẩm
                    </Form.Label>
                    <InputGroup size="lg">
                      <InputGroup.Text className="bg-white border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên sản phẩm..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border-start-0 ps-0"
                        style={{ boxShadow: 'none' }}
                      />
                      {search && (
                        <Button 
                          variant="outline-secondary" 
                          onClick={() => setSearch('')}
                          className="border-start-0"
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      )}
                    </InputGroup>
                  </Col>
                  <Col lg={4} className="mb-3 mb-lg-0">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Danh mục
                    </Form.Label>
                    <InputGroup size="lg">
                      <InputGroup.Text className="bg-white border-end-0">
                        <i className="fas fa-filter text-muted"></i>
                      </InputGroup.Text>
                      <Form.Select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="border-start-0"
                        style={{ boxShadow: 'none' }}
                      >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  <Col lg={3}>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Khoảng giá
                    </Form.Label>
                    <InputGroup size="lg">
                      <InputGroup.Text className="bg-white border-end-0">
                        <i className="fas fa-money-bill-wave text-muted"></i>
                      </InputGroup.Text>
                      <Form.Select
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                        className="border-start-0"
                        style={{ boxShadow: 'none' }}
                      >
                        <option value="">Tất cả</option>
                        <option value="1">Dưới 30.000đ</option>
                        <option value="2">30.000đ - 70.000đ</option>
                        <option value="3">70.000đ - 150.000đ</option>
                        <option value="4">Trên 150.000đ</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                </Row>
                
                {/* Filter Summary */}
                <Row className="mt-4 pt-3 border-top">
                  <Col>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="d-flex align-items-center gap-3 mb-2 mb-sm-0">
                        <Badge bg="primary" pill className="fs-6 px-3 py-2">
                          <i className="fas fa-box me-2"></i>
                          {filteredProducts.length} sản phẩm
                        </Badge>
                        {search && (
                          <small className="text-muted">
                            Tìm kiếm: <strong>"{search}"</strong>
                          </small>
                        )}
                      </div>
                      
                      {(search || category || priceRange) && (
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={clearFilters}
                          className="d-flex align-items-center"
                        >
                          <i className="fas fa-times me-2"></i>
                          Xóa bộ lọc
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Loading State */}
        {loading && (
          <Row className="justify-content-center py-5">
            <Col xs="auto">
              <div className="text-center">
                <Spinner 
                  animation="border" 
                  variant="primary" 
                  style={{ width: '3rem', height: '3rem' }}
                />
                <div className="mt-3">
                  <h5 className="text-muted">Đang tải sản phẩm...</h5>
                  <p className="text-muted mb-0">Vui lòng chờ trong giây lát</p>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Error State */}
        {error && (
          <Row className="justify-content-center mb-4">
            <Col lg={8}>
              <Alert variant="danger" className="d-flex align-items-center py-3">
                <i className="fas fa-exclamation-circle me-3 fa-lg"></i>
                <div>
                  <strong>Có lỗi xảy ra!</strong> {error}
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <Row className="g-4">
            {filteredProducts.map((p) => (
              <Col key={p._id} xs={12} sm={6} md={4} lg={3}>
                <div className="h-100 product-card-hover">
                  <ProductCard
                    {...p}
                    discount={p.discountId && (typeof p.discountId === 'object' ? p.discountId : null)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <Row className="justify-content-center py-5">
            <Col xs="auto">
              <div className="text-center py-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4" 
                     style={{ width: '100px', height: '100px' }}>
                  <i className="fas fa-box-open fa-3x text-muted"></i>
                </div>
                <h4 className="text-muted mb-3">Không có sản phẩm phù hợp</h4>
                <p className="text-muted mb-4">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục để tìm sản phẩm bạn cần
                </p>
                {(search || category) && (
                  <Button 
                    variant="primary"
                    onClick={clearFilters}
                    className="d-flex align-items-center mx-auto"
                  >
                    <i className="fas fa-redo me-2"></i>
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        )}

        {/* Results Summary */}
        {!loading && filteredProducts.length > 0 && (
          <Row className="mt-5">
            <Col>
              <div className="text-center py-4 border-top">
                <p className="text-muted mb-0">
                  Hiển thị <strong className="text-primary">{filteredProducts.length}</strong> trong 
                  tổng số <strong className="text-primary">{products.length}</strong> sản phẩm
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default ProductListPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name: payload.fullName || payload.email || 'User',
      role: payload.role,
    };
  } catch {
    return null;
  }
}

// Không dùng demoProducts nữa, khởi tạo rỗng

function ProductManagerProducts() {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.role !== 'ProductManager') {
      navigate('/login');
      return;
    }
    // Fetch data từ backend
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log('Products fetched:', data);
      })
      .catch(() => setProducts([]));
  }, [navigate]);

  React.useEffect(() => {
    console.log('Products state:', products);
  }, [products]);

  const handleAdd = () => {
    alert('Demo: Thêm sản phẩm');
  };

  const handleEdit = (id) => {
    alert('Demo: Sửa sản phẩm ' + id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <Container className="mt-4">
      <h2>Quản lý sản phẩm</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Danh sách sản phẩm</h4>
        <Button variant="success" onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Tồn kho</th>
            <th>Hoạt động</th>
            <th>Danh mục</th>
            <th>Khuyến mãi</th>
            <th>Ngày tạo</th>
            <th>Thuần chay</th>
            <th>HSD (ngày)</th>
            <th>Bảo quản lạnh</th>
            <th>Không gluten</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p._id}>
              <td>{idx + 1}</td>
              <td>{p.name}</td>
              <td>{p.description || ''}</td>
              <td>{p.price?.toLocaleString('vi-VN')} đ</td>
              <td>
                {Array.isArray(p.images) && p.images.length > 0
                  ? p.images
                      .map((img, i) => {
                        if (typeof img === 'string') {
                          return (
                            <img
                              key={i}
                              src={img}
                              alt={p.name}
                              style={{ width: 40, marginRight: 4 }}
                            />
                          );
                        }
                        if (img && typeof img === 'object') {
                          if (typeof img.image === 'string') {
                            return (
                              <img
                                key={i}
                                src={img.image}
                                alt={p.name}
                                style={{ width: 40, marginRight: 4 }}
                              />
                            );
                          }
                          if (typeof img.url === 'string') {
                            return (
                              <img
                                key={i}
                                src={img.url}
                                alt={p.name}
                                style={{ width: 40, marginRight: 4 }}
                              />
                            );
                          }
                        }
                        return null;
                      })
                      .filter(Boolean)
                  : ''}
              </td>
              <td>{p.stock}</td>
              <td>{p.isActive ? 'Đang bán' : 'Ngừng bán'}</td>
              <td>
                {p.categoryId && typeof p.categoryId === 'object'
                  ? p.categoryId.name
                  : p.categoryId || ''}
              </td>
              <td>
                {p.discountId && typeof p.discountId === 'object'
                  ? p.discountId.name
                  : p.discountId || ''}
              </td>
              <td>
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleString('vi-VN')
                  : ''}
              </td>
              <td>{p.isVegetarian ? '✔️' : ''}</td>
              <td>{p.shelfLifeDays || ''}</td>
              <td>{p.isRefrigerated ? '✔️' : ''}</td>
              <td>{p.isGlutenFree ? '✔️' : ''}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(p._id)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(p._id)}
                >
                  Xóa
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() =>
                    alert('Demo: Xem feedback cho sản phẩm ' + p.name)
                  }
                >
                  View Feedback
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductManagerProducts;

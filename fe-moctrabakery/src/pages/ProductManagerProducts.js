import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button} from 'react-bootstrap';

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

  // Filter state
  const [filter, setFilter] = React.useState({
    name: '',
    category: '',
    isActive: '',
    origin: '',
  });

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const nameMatch = filter.name === '' || (p.name && p.name.toLowerCase().includes(filter.name.toLowerCase()));
    const categoryMatch = filter.category === '' || (p.categoryId && typeof p.categoryId === 'object' && p.categoryId.name && p.categoryId.name.toLowerCase().includes(filter.category.toLowerCase()));
    const isActiveMatch = filter.isActive === '' || (filter.isActive === 'active' && p.isActive) || (filter.isActive === 'inactive' && !p.isActive);
    const originMatch = filter.origin === '' || (p.origin && p.origin.toLowerCase().includes(filter.origin.toLowerCase()));
    return nameMatch && categoryMatch && isActiveMatch && originMatch;
  });

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">Quản lý sản phẩm</h2>
        <Button variant="success" size="lg" className="px-4 py-2 fw-bold shadow" onClick={handleAdd}>
          + Thêm sản phẩm
        </Button>
      </div>
      {/* Bộ lọc */}
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên..."
            value={filter.name}
            onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo danh mục..."
            value={filter.category}
            onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={filter.isActive}
            onChange={e => setFilter(f => ({ ...f, isActive: e.target.value }))}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang bán</option>
            <option value="inactive">Ngừng bán</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo nguồn gốc..."
            value={filter.origin}
            onChange={e => setFilter(f => ({ ...f, origin: e.target.value }))}
          />
        </div>
      </div>
      <div className="table-responsive rounded shadow-sm bg-white p-3">
        <Table bordered hover className="align-middle mb-0" style={{ minWidth: 1200 }}>
          <thead className="table-light">
            <tr style={{ verticalAlign: 'middle', textAlign: 'center' }}>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Hoạt động</th>
              <th>Danh mục</th>
              <th>Khuyến mãi</th>
              <th>Ngày tạo</th>
              <th>Thuần chay</th>
              <th>HSD (ngày)</th>
              <th>Bảo quản lạnh</th>
              <th>Không gluten</th>
              <th>Nguồn gốc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, idx) => {
              // Lấy ảnh đầu tiên hợp lệ
              let imageUrl = '';
              if (Array.isArray(p.images) && p.images.length > 0) {
                let first = p.images[0];
                if (typeof first === 'string') {
                  imageUrl = first;
                } else if (first && typeof first === 'object') {
                  imageUrl = first.image || first.url || '';
                }
              } else if (p.image && typeof p.image === 'object') {
                imageUrl = p.image.image || p.image.url || '';
              } else if (typeof p.image === 'string') {
                imageUrl = p.image;
              }
              if (imageUrl && imageUrl.startsWith('/uploads')) {
                imageUrl = 'http://localhost:3000' + imageUrl;
              }
              return (
                <tr key={p._id} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={imageUrl || '/default-product.png'}
                      alt={p.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    />
                  </td>
                  <td className="fw-bold text-dark">{p.name || 'Không'}</td>
                  <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description || 'Không'}</td>
                  <td className="text-success fw-bold">{p.price ? p.price.toLocaleString('vi-VN') + ' đ' : 'Không'}</td>
                  <td>{p.stock ?? 'Không'}</td>
                  <td>
                    <span className={p.isActive ? 'badge bg-success' : 'badge bg-secondary'}>
                      {p.isActive === undefined ? 'Không' : (p.isActive ? 'Đang bán' : 'Ngừng bán')}
                    </span>
                  </td>
                  <td>{p.categoryId && typeof p.categoryId === 'object' && p.categoryId.name ? p.categoryId.name : 'Không'}</td>
                  <td>{p.discountId && typeof p.discountId === 'object' && p.discountId.name ? p.discountId.name : 'Không'}</td>
                  <td>{p.createdAt ? new Date(p.createdAt).toLocaleString('vi-VN') : 'Không'}</td>
                  <td>{p.isVegetarian === undefined ? 'Không' : (p.isVegetarian ? '✔️' : 'Không')}</td>
                  <td>{p.shelfLifeDays ?? 'Không'}</td>
                  <td>{p.isRefrigerated === undefined ? 'Không' : (p.isRefrigerated ? '✔️' : 'Không')}</td>
                  <td>{p.isGlutenFree === undefined ? 'Không' : (p.isGlutenFree ? '✔️' : 'Không')}</td>
                  <td>{p.origin || 'Không'}</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="fw-bold shadow-sm"
                        onClick={() => handleEdit(p._id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="fw-bold shadow-sm"
                        onClick={() => handleDelete(p._id)}
                      >
                        Xóa
                      </Button>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="fw-bold shadow-sm"
                        onClick={() => alert('Demo: Xem feedback cho sản phẩm ' + p.name)}
                      >
                        Feedback
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default ProductManagerProducts;

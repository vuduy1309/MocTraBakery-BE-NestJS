import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api';

const allProductFields = [
  { name: 'origin', label: 'Xuất xứ', type: 'text' },
  { name: 'shelfLifeDays', label: 'Hạn sử dụng (ngày)', type: 'number' },
  { name: 'isRefrigerated', label: 'Bảo quản lạnh', type: 'text' },
  { name: 'isVegetarian', label: 'Chay', type: 'text' },
  { name: 'calories', label: 'Calories', type: 'number' },
  {
    name: 'includedFlavors',
    label: 'Hương vị kèm theo (danh sách)',
    type: 'text',
  },
  { name: 'packaging', label: 'Đóng gói', type: 'text' },
  {
    name: 'sizes',
    label: 'Kích cỡ (Small, Medium, Large)',
    type: 'multiselect',
  },
];

const defaultFields = [
  { name: 'name', label: 'Tên sản phẩm', required: true, type: 'text' },
  { name: 'price', label: 'Giá', required: true, type: 'number' },
  { name: 'stock', label: 'Tồn kho', required: true, type: 'number' },
  { name: 'categoryId', label: 'Danh mục (ID)', required: true, type: 'text' },
  {
    name: 'images',
    label: 'Ảnh (URL, cách nhau bởi dấu phẩy)',
    required: false,
    type: 'text',
  },
  { name: 'description', label: 'Mô tả', required: false, type: 'text' },
];

function ProductAddPage() {
  const [fields, setFields] = useState(defaultFields);
  const [form, setForm] = useState({});
  const [newField, setNewField] = useState({
    name: '',
    label: '',
    type: 'text',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddField = () => {
    if (!newField.name || !newField.label) return;
    if (fields.some((f) => f.name === newField.name)) return;
    const found = allProductFields.find((f) => f.name === newField.name);
    if (!found) return;
    setFields([...fields, { ...found, required: false }]);
    setNewField({ name: '', label: '', type: 'text' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    for (let f of fields) {
      if (f.required && !form[f.name]) {
        setError(`Vui lòng nhập ${f.label}`);
        return;
      }
    }

    let submitData = { ...form };

    if (submitData.images && Array.isArray(submitData.images)) {
      const uploadedUrls = [];
      for (let file of submitData.images) {
        const data = new FormData();
        data.append('file', file);
        try {
          const res = await api.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          uploadedUrls.push(res.data.url);
        } catch (err) {
          setError(
            'Lỗi upload ảnh: ' + (err.response?.data?.message || err.message),
          );
          return;
        }
      }
      submitData.images = uploadedUrls;
    } else if (typeof submitData.images === 'string') {
      submitData.images = submitData.images.split(',').map((s) => s.trim());
    }

    // Chuyển mảng sizes thành JSON nếu có
    // if (submitData.sizes && Array.isArray(submitData.sizes)) {
    //   submitData.sizes = JSON.stringify(submitData.sizes);
    // }

    try {
      await api.post('/products', submitData);
      setSuccess('Thêm sản phẩm thành công!');
      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Lỗi không xác định',
      );
    }
  };

  return (
    <Container className="mt-4">
      <h3>Thêm sản phẩm mới</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          {fields.map((f) => (
            <Col md={6} key={f.name} className="mb-3">
              <Form.Group>
                <Form.Label>
                  {f.label}{' '}
                  {f.required && <span style={{ color: 'red' }}>*</span>}
                </Form.Label>
                {f.name === 'categoryId' ? (
                  <Form.Select
                    name="categoryId"
                    value={form['categoryId'] || ''}
                    onChange={handleChange}
                    required={f.required}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                ) : f.name === 'images' ? (
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      setForm({ ...form, images: Array.from(e.target.files) });
                    }}
                  />
                ) : f.name === 'isActive' ||
                  f.name === 'isRefrigerated' ||
                  f.name === 'isVegetarian' ? (
                  <Form.Select
                    name={f.name}
                    value={
                      form[f.name] === undefined
                        ? ''
                        : form[f.name]
                          ? 'true'
                          : 'false'
                    }
                    onChange={(e) =>
                      setForm({ ...form, [f.name]: e.target.value === 'true' })
                    }
                    required={f.required}
                  >
                    <option value="">-- Chọn --</option>
                    <option value="true">Có</option>
                    <option value="false">Không</option>
                  </Form.Select>
                ) : f.name === 'sizes' ? (
                  <div
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 4,
                      padding: 8,
                      marginBottom: 8,
                    }}
                  >
                    {(form.sizes || [{ name: '', price: '', stock: '' }]).map(
                      (sz, idx) => (
                        <Row key={idx} className="mb-2">
                          <Col md={4}>
                            <Form.Select
                              value={sz.name || ''}
                              onChange={(e) => {
                                const arr = [...(form.sizes || [])];
                                arr[idx] = {
                                  ...arr[idx],
                                  name: e.target.value,
                                };
                                setForm({ ...form, sizes: arr });
                              }}
                            >
                              <option value="">-- Size --</option>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                            </Form.Select>
                          </Col>
                          <Col md={4}>
                            <Form.Control
                              type="number"
                              placeholder="Giá"
                              value={sz.price || ''}
                              onChange={(e) => {
                                const arr = [...(form.sizes || [])];
                                arr[idx] = {
                                  ...arr[idx],
                                  price: e.target.value,
                                };
                                setForm({ ...form, sizes: arr });
                              }}
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Control
                              type="number"
                              placeholder="Tồn kho"
                              value={sz.stock || ''}
                              onChange={(e) => {
                                const arr = [...(form.sizes || [])];
                                arr[idx] = {
                                  ...arr[idx],
                                  stock: e.target.value,
                                };
                                setForm({ ...form, sizes: arr });
                              }}
                            />
                          </Col>
                          <Col md={1}>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                const arr = [...(form.sizes || [])];
                                arr.splice(idx, 1);
                                setForm({ ...form, sizes: arr });
                              }}
                            >
                              -
                            </Button>
                          </Col>
                        </Row>
                      ),
                    )}
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => {
                        setForm({
                          ...form,
                          sizes: [
                            ...(form.sizes || []),
                            { name: '', price: '', stock: '' },
                          ],
                        });
                      }}
                    >
                      + Thêm size
                    </Button>
                  </div>
                ) : (
                  <Form.Control
                    type={f.type}
                    name={f.name}
                    value={form[f.name] || ''}
                    onChange={handleChange}
                    required={f.required}
                  />
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button type="submit" variant="success" className="me-2">
          Thêm sản phẩm
        </Button>
      </Form>
      <hr />
      <h5>Thêm trường mới (tùy chọn)</h5>
      <Row>
        <Col md={5}>
          <Form.Select
            value={newField.name}
            onChange={(e) => {
              const selected = allProductFields.find(
                (f) => f.name === e.target.value,
              );
              setNewField(
                selected
                  ? { ...selected, label: selected.label }
                  : { name: '', label: '', type: 'text' },
              );
            }}
          >
            <option value="">-- Chọn trường --</option>
            {allProductFields
              .filter((f) => !fields.some((ff) => ff.name === f.name))
              .map((f) => (
                <option key={f.name} value={f.name}>
                  {f.label}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control
            placeholder="Nhãn hiển thị"
            value={newField.label}
            onChange={(e) =>
              setNewField({ ...newField, label: e.target.value })
            }
            disabled={!newField.name}
          />
        </Col>
        <Col md={2}>
          <Button
            variant="info"
            onClick={handleAddField}
            disabled={!newField.name}
          >
            Thêm trường
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductAddPage;

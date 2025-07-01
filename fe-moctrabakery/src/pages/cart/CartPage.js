import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Container, Table, Button, Form, Alert, Card } from 'react-bootstrap';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Cart API data:', res.data);
      setCart(res.data);
    } catch (err) {
      setError('Không thể tải giỏ hàng. Vui lòng đăng nhập!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId, size) => {
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      await api.post('/cart/remove', { productId, size }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Đã xóa sản phẩm khỏi giỏ hàng!');
      fetchCart();
    } catch {
      setMsg('Xóa thất bại!');
    }
  };

  // Thay đổi số lượng sản phẩm trong cart
  const handleUpdateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      await api.post('/cart/update', { productId, size, quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Đã cập nhật số lượng!');
      fetchCart();
    } catch {
      setMsg('Cập nhật số lượng thất bại!');
    }
  };

  // Xử lý nút checkout (demo)
  const handleCheckout = () => {
    setMsg('Cảm ơn bạn đã đặt hàng! (Demo: chưa thực hiện thanh toán thực tế)');
    // Có thể chuyển hướng sang trang thanh toán thực tế ở đây
  };

  if (loading) return (
    <div className="cart-page-bg p-0 m-0" style={{ minHeight: '100vh', width: '100vw' }}>
      <div style={{ height: 80 }}></div>
      <Card className="cart-card mx-auto my-5 p-4" style={{ width: '75vw', maxWidth: 1400, minWidth: 340 }}>
        <div>Đang tải giỏ hàng...</div>
      </Card>
    </div>
  );
  if (error) return (
    <div className="cart-page-bg p-0 m-0" style={{ minHeight: '100vh', width: '100vw' }}>
      <div style={{ height: 80 }}></div>
      <Card className="cart-card mx-auto my-5 p-4" style={{ width: '75vw', maxWidth: 1400, minWidth: 340 }}>
        <Alert className="cart-error-alert" variant="danger">{error}</Alert>
      </Card>
    </div>
  );
  if (!cart || !cart.items || cart.items.length === 0) return (
    <div className="cart-page-bg p-0 m-0" style={{ minHeight: '100vh', width: '100vw' }}>
      <div style={{ height: 80 }}></div>
      <Card className="cart-card mx-auto my-5 p-4" style={{ width: '75vw', maxWidth: 1400, minWidth: 340 }}>
        <Alert className="cart-empty-alert" variant="info">Giỏ hàng trống.</Alert>
      </Card>
    </div>
  );

  return (
    <div className="cart-page-bg p-0 m-0" style={{ minHeight: '100vh', width: '100vw' }}>
      <div style={{ height: 80 }}></div>
      <Card className="cart-card mx-auto my-5 p-4" style={{ width: '75vw', maxWidth: 1400, minWidth: 340 }}>
        <h2 style={{ color: '#6B4F27', fontWeight: 700, marginBottom: 24 }}>Giỏ hàng của bạn</h2>
        {msg && <Alert className="cart-info-alert" variant="info">{msg}</Alert>}
        <div className="cart-list-view">
          {cart.items.map((item, idx) => {
            const prod = item.productId;
            let imgSrc = prod?.images?.[0] || prod?.image || 'https://via.placeholder.com/60x60?text=No+Image';
            if (imgSrc && imgSrc.startsWith('/uploads/')) {
              imgSrc = `http://localhost:3000${imgSrc}`;
            }
            const discountPercent = prod?.discount?.percent || 0;
            const discountText = prod?.discount ? `-${prod.discount.percent}%` : '';
            const priceAfterDiscount = discountPercent ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
            return (
              <div key={idx} className="cart-list-item" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #E5D9C5', padding: '18px 0' }}>
                <div style={{ width: 90, textAlign: 'center', marginRight: 22 }}>
                  {prod ? (
                    <img src={imgSrc} alt={prod.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #A4907C', background: '#fff' }} />
                  ) : (
                    <span style={{ color: '#A4907C' }}>—</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, color: '#6B4F27' }}>{prod?.name || <span style={{ color: '#A4907C' }}>Sản phẩm đã xóa</span>}</div>
                  <div style={{ color: '#A4907C', fontSize: 15, margin: '2px 0 6px 0' }}>{prod?.description || '—'}</div>
                  <div style={{ fontSize: 14, color: '#6B4F27' }}>
                    <span style={{ marginRight: 16 }}>Calo: {prod?.calories !== undefined && prod?.calories !== null ? `${prod.calories} kcal` : '—'}</span>
                    <span style={{ marginRight: 16 }}>Nguồn gốc: {prod?.origin || '—'}</span>
                    <span style={{ marginRight: 16 }}>Chay: {prod?.isVegetarian === true ? 'Chay' : prod?.isVegetarian === false ? 'Không chay' : '—'}</span>
                    <span style={{ marginRight: 16 }}>Bảo quản lạnh: {prod?.isRefrigerated === true ? 'Có' : prod?.isRefrigerated === false ? 'Không' : '—'}</span>
                    <span style={{ marginRight: 16 }}>Size: {item.size || '—'}</span>
                  </div>
                </div>
                <div style={{ minWidth: 120, marginRight: 18, display: 'flex', alignItems: 'center' }}>
                  <span style={{marginRight: 6, color: '#6B4F27', fontWeight: 500}}>Số lượng:</span>
                  <Form.Control
                    type="number"
                    min={1}
                    max={99}
                    defaultValue={item.quantity}
                    style={{ width: 70, display: 'inline-block', background: '#fff', border: '1.5px solid #A4907C', color: '#6B4F27' }}
                    onBlur={e => handleUpdateQuantity(prod?._id, item.size, Number(e.target.value))}
                    disabled={!prod}
                  />
                </div>
                <div style={{ minWidth: 120, color: '#8B6F3A', fontWeight: 600, marginRight: 18 }}>
                  <span style={{marginRight: 4}}>Đơn giá:</span>{item.price?.toLocaleString()} đ
                </div>
                <div style={{ minWidth: 120, color: '#4E944F', fontWeight: 700, marginRight: 18 }}>
                  <span style={{marginRight: 4}}>Thành tiền:</span>{priceAfterDiscount * item.quantity > 0 ? (priceAfterDiscount * item.quantity).toLocaleString() : (item.price * item.quantity).toLocaleString()} đ
                </div>
                <div>
                  <Button className="cart-remove-btn" size="sm" onClick={() => handleRemove(prod?._id, item.size)}>
                    Xóa
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-total" style={{ textAlign: 'right', marginTop: 24, fontSize: 20, fontWeight: 600 }}>
          Tổng tiền: {cart.total?.toLocaleString()} đ
        </div>
        <div style={{ textAlign: 'right', marginTop: 24 }}>
          <Button className="cart-checkout-btn" size="lg" onClick={handleCheckout} disabled={cart.items.length === 0}>
            Thanh toán
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CartPage;

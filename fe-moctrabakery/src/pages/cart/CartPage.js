import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';

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

  if (loading) return <Container className="py-5"><div>Đang tải giỏ hàng...</div></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!cart || !cart.items || cart.items.length === 0) return <Container className="py-5"><Alert variant="info">Giỏ hàng trống.</Alert></Container>;

  return (
    <Container className="py-5">
      <h2>Giỏ hàng của bạn</h2>
      {msg && <Alert variant="info">{msg}</Alert>}
      <Table bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.productId?.name || 'Sản phẩm đã xóa'}</td>
              <td>{item.size}</td>
              <td style={{minWidth: 120}}>
                <Form.Control
                  type="number"
                  min={1}
                  max={99}
                  value={item.quantity}
                  style={{width: 70, display: 'inline-block', marginRight: 8}}
                  onChange={e => handleUpdateQuantity(item.productId?._id, item.size, Number(e.target.value))}
                  disabled={!item.productId}
                />
              </td>
              <td>{item.price?.toLocaleString()} đ</td>
              <td>{(item.price * item.quantity).toLocaleString()} đ</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleRemove(item.productId?._id, item.size)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{textAlign:'right', fontWeight:'bold', fontSize:18}}>
        Tổng tiền: {cart.total?.toLocaleString()} đ
      </div>
      <div style={{textAlign:'right', marginTop: 24}}>
        <Button variant="success" size="lg" onClick={handleCheckout} disabled={cart.items.length === 0}>
          Thanh toán
        </Button>
      </div>
    </Container>
  );
}

export default CartPage;

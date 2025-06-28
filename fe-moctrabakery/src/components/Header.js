import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import {
  BsCart3,
  BsBell,
  BsEnvelope,
  BsPersonCircle,
  BsHouseFill,
  BsBoxSeam,
  BsJournalText,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyLink = ({ to, children, className, title, ...props }) => (
  <a
    href={to}
    className={className}
    title={title}
    style={{ textDecoration: 'none' }}
    {...props}
  >
    {children}
  </a>
);

function Header() {
  const cartCount = 2;
  const notificationCount = 3;
  const messageCount = 1;

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            name: payload.fullName || payload.email || 'User',
            role: payload.role,
          });
        } catch (err) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    // Lắng nghe custom event để cập nhật user sau login
    window.addEventListener('user-login', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('user-login', checkUser);
    };
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Gửi event để các tab khác cũng update
    window.dispatchEvent(new Event('user-login'));
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      sticky="top"
      className="shadow-sm border-bottom"
      style={{
        minHeight: '80px',
        borderBottom: '2px solid #e9ecef',
      }}
    >
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold fs-3 text-dark"
          style={{
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#198754')}
          onMouseLeave={(e) => (e.target.style.color = '#212529')}
        >
          <span className="me-2" style={{ fontSize: '2rem' }}>
            🍰
          </span>
          <span>
            Mộc Trà
            <span style={{ color: '#198754' }} className="ms-1">
              Bakery
            </span>
          </span>
        </Navbar.Brand>

        {/* Navigation */}
        <Nav className="mx-auto">
          <Nav.Link
            as={Link}
            to="/"
            className="px-4 fw-medium text-dark position-relative"
            style={{
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#198754';
              e.target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#212529';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsHouseFill className="me-2" />
            Trang chủ
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/products"
            className="px-4 fw-medium text-dark"
            style={{
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#198754';
              e.target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#212529';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsBoxSeam className="me-2" />
            Sản phẩm
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/blog"
            className="px-4 fw-medium text-dark"
            style={{
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#198754';
              e.target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#212529';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsJournalText className="me-2" />
            Blogpost
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/cart"
            className="px-4 fw-medium text-dark"
            style={{
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#198754';
              e.target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#212529';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <BsCart3 className="me-2" />
            Giỏ hàng
          </Nav.Link>
          {/* Menu quản trị cho admin/manager */}
          {user &&
            (user.role === 'Admin' || user.role === 'ProductManager') && (
              <Nav.Link
                as={Link}
                to={user.role === 'Admin' ? '/admin/dashboard' : '/manager/dashboard'}
                className={`px-4 fw-medium ${user.role === 'Admin' ? 'text-danger' : 'text-warning'}`}
                style={{
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  borderRadius: '8px',
                  color: user.role === 'Admin' ? '#dc3545' : '#ffc107',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#fff';
                  e.target.style.backgroundColor =
                    user.role === 'Admin' ? '#dc3545' : '#ffc107';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color =
                    user.role === 'Admin' ? '#dc3545' : '#ffc107';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <BsBoxSeam className="me-2" />
                Dashboard quản trị
              </Nav.Link>
            )}
        </Nav>

        {/* Right side icons and auth */}
        <div className="d-flex align-items-center">
          {/* Icon buttons */}
          <div className="d-flex align-items-center me-3">
            <Button
              as={Link}
              to="/cart"
              variant="outline-success"
              size="sm"
              className="position-relative me-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
              title="Giỏ hàng"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d1e7dd';
                e.target.style.borderColor = '#198754';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <BsCart3 size={18} />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{
                    fontSize: '0.7rem',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              as={Link}
              to="/notifications"
              variant="outline-primary"
              size="sm"
              className="position-relative me-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
              title="Thông báo"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#cff4fc';
                e.target.style.borderColor = '#0d6efd';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <BsBell size={18} />
              {notificationCount > 0 && (
                <Badge
                  bg="primary"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{
                    fontSize: '0.7rem',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            <Button
              as={Link}
              to="/messages"
              variant="outline-info"
              size="sm"
              className="position-relative rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
              title="Tin nhắn"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d3f3fd';
                e.target.style.borderColor = '#0dcaf0';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <BsEnvelope size={18} />
              {messageCount > 0 && (
                <Badge
                  bg="info"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{
                    fontSize: '0.7rem',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  {messageCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Auth section */}
          <div className="border-start ps-3">
            {user ? (
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center bg-success-subtle px-3 py-2 rounded-pill me-3"
                  style={{ border: '1px solid #d1e7dd' }}
                >
                  <BsPersonCircle size={20} className="text-success me-2" />
                  <span className="fw-medium text-success-emphasis small">
                    Xin chào, {user.name}
                  </span>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-pill fw-medium"
                  style={{
                    transition: 'all 0.3s ease',
                    border: '2px solid #dc3545',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#dc3545';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#dc3545';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-dark"
                  size="sm"
                  className="d-flex align-items-center me-2 rounded-pill fw-medium"
                  style={{
                    transition: 'all 0.3s ease',
                    border: '2px solid #6c757d',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#198754';
                    e.target.style.borderColor = '#198754';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#6c757d';
                    e.target.style.color = '#6c757d';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <BsPersonCircle size={16} className="me-1" />
                  Đăng nhập
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  size="sm"
                  className="rounded-pill fw-medium"
                  style={{
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(25, 135, 84, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#157347';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow =
                      '0 4px 8px rgba(25, 135, 84, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#198754';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow =
                      '0 2px 4px rgba(25, 135, 84, 0.2)';
                  }}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Navbar>
  );
}

export default Header;

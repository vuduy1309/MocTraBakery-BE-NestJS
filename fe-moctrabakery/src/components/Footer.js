import React from 'react';
import { BsFacebook, BsMessenger, BsTelephone, BsGeoAlt, BsEnvelope, BsClock } from 'react-icons/bs';

function Footer() {
  return (
    <footer 
      style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        borderTop: '4px solid #198754',
        color: '#fff',
        padding: '3rem 0',
        marginTop: 'auto'
      }}
    >
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{marginBottom: '1.5rem'}}>
              <h5 style={{
                fontWeight: 'bold',
                color: '#198754',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{marginRight: '0.5rem', fontSize: '1.5rem'}}>🍰</span>
                Mộc Trà Bakery
              </h5>
              <p style={{
                color: '#adb5bd',
                marginBottom: '1rem',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                Tiệm bánh thủ công với hương vị truyền thống, mang đến những sản phẩm bánh tươi ngon, 
                được làm từ nguyên liệu chất lượng cao.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#adb5bd',
                marginBottom: '0.5rem'
              }}>
                <BsClock style={{marginRight: '0.5rem', color: '#ffc107'}} />
                <span style={{fontSize: '0.9rem'}}>Mở cửa: 6:00 - 22:00 hàng ngày</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h6 style={{
              fontWeight: 'bold',
              color: '#ffc107',
              marginBottom: '1rem'
            }}>
              Thông tin liên hệ
            </h6>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  borderRadius: '50%',
                  backgroundColor: '#198754',
                  width: '35px',
                  height: '35px'
                }}>
                  <BsGeoAlt size={16} style={{color: '#fff'}} />
                </div>
                <div>
                  <div style={{fontWeight: '500', marginBottom: '0.25rem'}}>Địa chỉ</div>
                  <div style={{color: '#adb5bd', fontSize: '0.9rem'}}>123 Đường Admin, TP. HCM</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  borderRadius: '50%',
                  backgroundColor: '#0dcaf0',
                  width: '35px',
                  height: '35px'
                }}>
                  <BsTelephone size={16} style={{color: '#fff'}} />
                </div>
                <div>
                  <div style={{fontWeight: '500', marginBottom: '0.25rem'}}>Hotline</div>
                  <a 
                    href="tel:0901234567" 
                    style={{
                      color: '#0dcaf0',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
                    onMouseLeave={(e) => e.target.style.color = '#0dcaf0'}
                  >
                    0901 234 567
                  </a>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  borderRadius: '50%',
                  backgroundColor: '#ffc107',
                  width: '35px',
                  height: '35px'
                }}>
                  <BsEnvelope size={16} style={{color: '#000'}} />
                </div>
                <div>
                  <div style={{fontWeight: '500', marginBottom: '0.25rem'}}>Email</div>
                  <a 
                    href="mailto:info@moctrabakery.com" 
                    style={{
                      color: '#ffc107',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ffeb3b'}
                    onMouseLeave={(e) => e.target.style.color = '#ffc107'}
                  >
                    info@moctrabakery.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h6 style={{
              fontWeight: 'bold',
              color: '#ffc107',
              marginBottom: '1rem'
            }}>
              Kết nối với chúng tôi
            </h6>
            <p style={{
              color: '#adb5bd',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              Theo dõi chúng tôi để cập nhật những sản phẩm mới và ưu đãi hấp dẫn!
            </p>
            
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#1877f2',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(24, 119, 242, 0.2)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(24, 119, 242, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 8px rgba(24, 119, 242, 0.2)';
                }}
              >
                <BsFacebook style={{marginRight: '0.5rem'}} size={20} />
                Facebook
              </a>

              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#0068ff',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 104, 255, 0.2)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0056d6';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0, 104, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#0068ff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 104, 255, 0.2)';
                }}
              >
                <BsMessenger style={{marginRight: '0.5rem'}} size={20} />
                Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
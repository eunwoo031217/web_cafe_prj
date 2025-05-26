import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

//상단 네비게이션 바 컴포넌트
function Topbar() {
    return (
        <nav style={{
            backgroundColor: '#002b5b',
            padding: '10px 20px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }}>
            <h2 style={{ margin: 0 }}>Cafe Homepage</h2>
            <Link to="/cart">
                <button style={{
                    backgroundColor: 'white',
                    color: '#002b5b',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <FiShoppingCart />장바구니
                </button>
            </Link>
        </nav>
    )
}

export default Topbar;
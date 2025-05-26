import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Topbar from './components/Topbar'

function App() {
  // 장바구니 상태 선언
  // (초기값: localStorage에서 cart가 있으면 파싱하여 사용, 없으면 빈 배열)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // cart 상태가 바뀔 때마다 localStorage에 저장 (새로고침해도 장바구니 유지됨)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}

export default App;

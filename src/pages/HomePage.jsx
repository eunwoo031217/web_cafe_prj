import React, { useEffect, useState } from "react";
import MenuItem from '../components/MenuItem';
import CustomizerModal from '../components/CustomizerModal';
import Roulette from '../components/Roulette';

//메뉴 리스트와 룰렛, 커스터마이징 기능 포함
function HomePage({ cart, setCart }) {
    //.env에 정의한 API 키 (프록시 서버 주소)
    const API_KEY_URL = import.meta.env.VITE_CAFE_API_URL;
    
    //메뉴 전체 리스트, 선택된 아이템 상태값
    const [menu, setMenu] = useState([]); //API로 불러온 메뉴
    const [selectedItem, setSelectedItem] = useState(null); //클릭한 메뉴 (모달용)

    //API 호출 함수
    const fetchMenuData = async () => {
        const response = await fetch(API_KEY_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch menu");
        }
        return await response.json();
    };

    //컴포넌트 첫 렌더링 시 메뉴 데이터 불러오기
    useEffect(() => {
        fetchMenuData()
            .then(data => {
                const formatted = data.map(item => ({
                    id: item.id,
                    name: item.title,
                    basePrice: 3500, //기본 가격 설정
                    image: item.image,
                }));
                setMenu(formatted); //메뉴 상태 저장
            })
            .catch(error => {
                console.error("API 호출 오류: ", error);
            });
    }, []); //빈 배열: 처음 한번만 실행

    //커스터마이징 완료된 항목을 장바구니에 추가
    const addToCart = (customizedItem) => {
        setCart([...cart, { ...customizedItem, quantity: 1 }]);
        setSelectedItem(null);
    };

    return (
        <div>
            {/* 메뉴 페이지 타이틀 */}
            <h1 style={{ textAlign: "center", marginTop: "30px" }}>Menu</h1>
            
            {/* 추천 룰렛 영역 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Roulette menu={menu} onSelect={(item) => setSelectedItem(item)} />
            </div>
            
            {/* 메뉴 카드 리스트 영역 */}
            <div style={{
                display: 'flex',
                flexWrap: "wrap",
                justifyContent: "center",
                gap: '20px',
                padding: "20px 0"
            }}>
                {menu.map(item => (
                    <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} /> //클릭 시 모달 띄움
                ))}
            </div>

            {/* 메뉴 선택 시 모달 출력 */}
            {selectedItem && (
                <CustomizerModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onAdd={addToCart} //장바구니에 추가
                />
            )}
        </div>
    )
}

export default HomePage;
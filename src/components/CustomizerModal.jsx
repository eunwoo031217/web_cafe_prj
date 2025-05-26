import React, { useState } from "react";

//사용자 메뉴 커스터마이징 모달 컴포넌트
function CustomizerModal({ item, onClose, onAdd }) {
    //사용자 선택을 위한 상태값 설정
    const [temperature, setTemperature] = useState("Hot"); //온도 옵션
    const [size, setSize] = useState("Medium"); //사이즈 옵션
    const [ice, setIce] = useState("보통"); //얼음 양 옵션
    const [shot, setShot] = useState(0); //샷 추가
    const [syrup, setSyrup] = useState(""); //시럽 종류
    const [whippedCream, setWhippedCream] = useState(false); //휘핑 옵션

    //총 가격 계산
    const calcPrice = () => {
        let price = item.basePrice;
        if (temperature === "Ice") price += 500;
        if (size === "Small") price -= 500;
        if (size === "Large") price += 500;
        if (shot > 0) price += shot * 600; //1샷 당 600원
        if (syrup) price += 300;
        if (whippedCream) price += 500;
        return price;
    };

    //장바구니 추가 시 부모에게 전달
    const handleAdd = () => {
        onAdd({
            ...item,
            options: { temperature, size, ice, shot, syrup, whippedCream },
            totalPrice: calcPrice(),
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                width: '400px',
                maxHeight: '80vh',
                overflowY: 'auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                fontFamily: 'sans-serif'
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: '#002b5b', fontSize: "22px" }}>
                    {item.name} 옵션 선택
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label>
                        온도:
                        <select value={temperature} onChange={e => setTemperature(e.target.value)} style={{ width: "100%", padding: "6px" }}>
                            <option value="Hot">Hot</option>
                            <option value="Ice">Ice (+500)</option>
                        </select>
                    </label>

                    <label>
                        사이즈:
                        <select value={size} onChange={e => setSize(e.target.value)} style={{ width: "100%", padding: "6px" }}>
                            <option value="Small">Small (-500)</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large (+500)</option>
                        </select>
                    </label>

                    <label>
                        얼음:
                        <select value={ice} onChange={e => setIce(e.target.value)} style={{ width: "100%", padding: "6px" }}>
                            <option>없음</option>
                            <option>적게</option>
                            <option>보통</option>
                            <option>많이</option>
                        </select>
                    </label>

                    <label>
                        샷 추가:
                        <input type="number" min="0" value={shot}
                            onChange={e => setShot(Number(e.target.value))}
                            style={{ width: "100%", padding: "6px" }} />
                    </label>

                    <label>
                        시럽:
                        <select value={syrup} onChange={e => setSyrup(e.target.value)} style={{ width: "100%", padding: "6px" }}>
                            <option value="">없음</option>
                            <option value="바닐라">바닐라</option>
                            <option value="헤이즐넛">헤이즐넛</option>
                            <option value="카라멜">카라멜</option>
                        </select>
                    </label>

                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" checked={whippedCream} onChange={e => setWhippedCream(e.target.checked)} />
                        휘핑크림 추가 (+500원)
                    </label>

                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                        총 가격: <strong>{calcPrice().toLocaleString()}원</strong>
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                        <button
                            onClick={handleAdd}
                            style={{
                                backgroundColor: "#002b5b",
                                color: "white",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            장바구니에 추가
                        </button>
                        <button
                            onClick={onClose}
                            style={{
                                backgroundColor: "#ccc",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizerModal;

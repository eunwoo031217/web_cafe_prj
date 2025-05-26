import React, { useState } from 'react';

//룰렛 추천 컴포넌트
function Roulette({ menu, onSelect }) {
  //추천된 메뉴 결과를 저장라는 상태
  const [result, setResult] = useState(null);
  //룰렛이 돌고 있는지 여부를 나타내는 상태
  const [isSpinning, setIsSpinning] = useState(false);

  //룰렛 버튼 클릭 시 실행
  const handleRoulette = () => {
    if (!menu || menu.length === 0) return; //메뉴가 없으면 동작안함
    setIsSpinning(true); //버튼 비활성화를 위해 설정
    setResult(null); //이전 결과 초기화

    //1.5초 후에 랜덤 추천 메뉴 설정
    setTimeout(() => {
      const random = menu[Math.floor(Math.random() * menu.length)]; //무작위 선택
      setResult(random); //선택된 메뉴를 상태로 설정
      setIsSpinning(false); //버튼 다시 활성화
    }, 1500);
  };

  return (
    <div style={{
      border: "2px dashed #aaa",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      marginBottom: "30px"
    }}>
      <h3>🎲 오늘 뭐 마시지?</h3>
      <button
        onClick={handleRoulette}
        disabled={isSpinning}
        style={{
          backgroundColor: "#002b5b",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {isSpinning ? "돌리는 중..." : "룰렛 돌리기"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>✨ 추천 메뉴: <strong>{result.name}</strong></p>
          <img src={result.image} alt={result.name} width="120" style={{ borderRadius: '8px' }} />
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => onSelect(result)}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              이 메뉴로 주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roulette;
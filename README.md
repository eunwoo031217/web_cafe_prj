# web_cafe_project

카페 주문 시스템을 React +  Vite로 구현한 웹 프로젝트입니다.

### 배포 주소

🔗 [cafehomepage.vercel.app](cafehomepage.vercel.app)


---

### 기술 스택

-  **Frontend**: React, Vite
-  **CI/CD**: GitHub Actions, Vercel
-  **Deployment**: Docker, Nginx
-  **기타**: localStorage, Serverless Function

---

### 주요 기능

-  **외부 API 연동**: 메뉴 이름과 이미지를 외부 API에서 불러옴
-  **메뉴 주문 기능**: 음료 이미지, 이름, 가격을 보고 주문 가능
-  **옵션 커스터마이징**: 사이즈, 온도, 샷, 시럽, 휘핑크림 등 추가
-  **장바구니**: 수량 조절, 항목 삭제, 총 합계 계산
-  **로컬 저장소(localStorage)**: 새로고침해도 장바구니 유지
-  **룰렛 추천 기능**: 메뉴를 랜덤으로 추천
-  **환경변수 보호**: Serverless Function으로 API 키 노출 방지
-  **Docker 환경 구성**: Nginx로 정적 파일 제공
-  **자동 배포**: GitHub + Vercel 연동을 통한 CI/CD 구축

---

### CI/CD 구성

본 프로젝트는 GitHub Actions와 Vercel을 활용해 CI/CD 자동화가 구성되어 있습니다.

- `main` 브랜치에 코드가 Push되면 GitHub Actions가 자동으로 실행됩니다.
- CI 단계에서는 `vite-project/` 디렉토리 기준으로 `npm ci`, `npm run build`를 수행합니다.
- 이후 배포 단계에서는 `amondnet/vercel-action`을 이용해 Vercel로 자동 배포가 진행됩니다.
- 빌드 중 필요한 환경변수(`VITE_COFFEE_API_URL`)는 GitHub Secrets를 통해 안전하게 주입됩니다.

---

### 환경변수 관리

- env 파일은 GitHub에 포함되지 않으며, 배포 시 필요한 환경변수는 GitHub Secrets로 관리합니다.
- VITE_COFFEE_API_URL : 외부 API 주소
- VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID : 배포 시 사용

---

### Docker 로컬 실행

Docker 및 Nginx로 정적 빌드 파일을 실행하려면:

```bash
npm run build
docker build -t nginx-proxy .
docker run -d -p 8080:80 nginx-proxy
```

### 실행 방법 (로컬 개발)

```bash
npm install
npm run dev
```
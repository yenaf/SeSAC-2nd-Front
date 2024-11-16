# Node.js + React 웹 풀스택 CRUD 프로젝트

> SeSAC 영등포 6기 2차 팀 프로젝트

![lieblings](https://github.com/user-attachments/assets/945184b3-90e3-43de-8ca9-68e4a5d8ee07)

🔗 배포 서버 : http://43.201.85.98:8080

📃 [리블링스 발표자료 PDF](https://github.com/user-attachments/files/17101470/default.pdf)

📁 [Project Github](https://github.com/SeSAC-2nd)

<br/>

# 1. 프로젝트 소개

덕질의 즐거움을 함께 나누는 공간, 리블링스(lieblings)는 독일어로 '최애'를 의미합니다. 덕질의 열정은 시간이 흘러도 변하지 않습니다. 하지만 최애가 바뀌기도 하고, 새로운 애정을 찾기도 합니다.

저희 웹 사이트는 “나의 구최애가 너의 현최애다, 너의 구최애가 나의 현최애다.” 라는 슬로건 아래 K-pop, 스포츠, 애니메이션, 영화/드라마, 게임, 스포츠 등 **'다양한 덕질 분야의 물품을 중고 거래하는 반응형 웹 사이트'** 입니다.

- 프로젝트명: 리블링스 (Lieblings)⁠
- 개발 기간: 2024.08.21 - 2024.09.12⁠
- 팀 구성: Frontend 3명, Backend 2명, Full-Stack 1명
- 주요 업무 : [FE] 페이지 레이아웃, 상태 관리, 렌더링 및 기능 구현

<br/>

# 2. 개발 환경 및 기술 스택

## 2-1 사용한 기술 스택

![기술 스택](https://github.com/user-attachments/assets/61510a11-a55c-4e8e-a751-a7f11494ce39)

## 2-2 시스템 아키텍쳐

![Section 1 (1)](https://github.com/user-attachments/assets/eaad7281-840c-4c03-8fb7-252aa6042678)

## 2-3 폴더구조

![폴더구조](https://github.com/user-attachments/assets/113b7fe8-d0d8-4c53-83b3-fcebbe697e8a)

[폴더 구조 문서](https://docs.google.com/spreadsheets/d/1ejSEfh5wNLHUo5joWHr98xINd54qU_B9NT_mapkFq8k/edit?usp=sharing)

<br/>

# 3. 프로젝트 진행과정

## 1) 타임라인

![리블링스 타임라인](https://github.com/user-attachments/assets/8bd21f06-6676-4e81-8207-dcf1ac4b1100)

## 2) 주요기능

![주요기능](https://github.com/user-attachments/assets/bab0ab19-4bea-41f9-a14d-b78efec5c792)

## 3) 요구 분석 명세서

> 프로젝트의 주요 기능을 바탕으로 우선순위를 둔 정의서를 작성하고, 구체적인 기능 및 요구 사항을 상세히 기술한 명세서 작성 진행

![요구분석명세서](https://github.com/user-attachments/assets/89448fcb-d39f-4514-af60-ea081fc5e3e8)
![요구분석정의서](https://github.com/user-attachments/assets/499ab26a-95c5-4ab4-a75c-75a49b5f93f9)

[요구분석 정의서/명세서](https://docs.google.com/spreadsheets/d/1Ya0RCD4RilnOiLNQEIT97pBJ_jZ2YYCjc8nT2JiX4nU/edit?usp=sharing)

## 4) 화면설계

> Figma를 사용하여 벤치마킹 및 디자인 컨셉을 잡고 화면 설계를 진행

![벤치마킹](https://github.com/user-attachments/assets/086d3877-9481-4d24-92d0-d56b67eaf8ca)
![화면설계](https://github.com/user-attachments/assets/da8a6199-1f9e-4374-b82c-5734760aa249)

[피그마 화면설계 바로가기](https://www.figma.com/design/DWtFFjfUstdvSYmbkATfLE/sesac-2nd-pj?node-id=0-1&t=NlH6zdI2wXEn13yE-1)

## 5) 컨벤션

### ▪ 커밋 컨벤션

![커밋컨벤션](https://github.com/user-attachments/assets/86165adb-d353-4ae3-b9ab-4296455d002b)

### ▪ ESLint, Prettier 설정

> ESLint와 Prettier를 적용하여 코드 품질과 스타일을 일관되게 유지하여 생산성과 협업 효율성을 높였습니다.

<details>
<summary>ESLint 코드</summary>

```
module.exports = {
  env: { // 코드가 실행될 환경
    browser: true, // 브라우저 환경에서 실행
    es2021: true, // ECMAScript 2021의 기능 사용
    node: true, // Node.js 환경에서 실행
    es6: true, // ES6 기능 사용
  },
  extends: [ // 기본 규칙 세트를 확장
    'eslint:recommended', // ESLint의 추천 규칙을 사용
    'plugin:react/recommended', // React 관련 추천 규칙을 사용
    'plugin:react-hooks/recommended', // React Hooks 사용에 대한 추천 규칙을 사용
    'plugin:prettier/recommended', // Prettier와의 통합 규칙을 사용
    'prettier', // Prettier의 기본 설정을 사용
  ],
  parserOptions: { // 코드 구문 분석
    ecmaFeatures: {
      jsx: true, // JSX를 사용
    },
    ecmaVersion: 12, // ECMAScript 12 버전
    sourceType: 'module', // ES 모듈 사용
  },
  plugins: ['react', 'react-hooks', 'prettier'], // ESLint 플러그인
  rules: {
    'no-unused-vars': 'off', // 호출되지 않은 변수도 사용 가능하게 설정
    'react/prop-types': 'off', // 프롭스 타입 무시
    'prettier/prettier': [ // Prettier 규칙 위반 시 오류 발생
      'error',
      {
        singleQuote: true, // 싱글 쿼트 사용
      },
    ],
  },
  settings: { // 플러그인 추가 설정
    react: {
      version: 'detect', // React의 버전 자동 감지
    },
  },
};
```

</details>

<details>
<summary>Prettier 코드</summary>

```
{
  "printWidth": 80, // 줄 바꿈 할 폭 길이
  "tabWidth": 2, // 탭 너비
  "singleQuote": true, // 홑따옴표 사용 여부
  "endOfLine": "auto" // 줄 끝의 형식, OS별로 처리 방식이 다름
}
```

</details>

### ▪ Git Branch 전략

> 원본 저장소를 fork하여 각 팀원의 작업을 독립적으로 관리하며, Pull Request(PR)를 통해 원본 저장소를 변경하는 방법으로 변경 전 코드 리뷰를 할 수 있도록 브랜치 전략을 세웠습니다.

```
  Main branch
      └── dev ── fork
                  ├── Main branch
                  ├── dev
                  |  ├── MainPage
                  |  ├── RegisterPage
                  |  ├── SellersPage
                  |  ├── MyPage
                  |  ├── ···Page
                            ·
                            ·
                            ·
```

### ▪ API 요청

> API 문서를 토대로 Postman을 활용하여 서버로부터의 API 응답을 확인하고 테스트 후에 개발을 진행했습니다.

![api 명세서](https://github.com/user-attachments/assets/4b1ed466-2fac-4244-93ce-c0c9646e4ede)

[API 명세서](https://docs.google.com/spreadsheets/d/1-0RlzFqaF0dKiKEZAWkdBiv5Gmmao4aRCdPj4UP301w/edit?usp=sharing)

<br/>

# 4. 담당 기능

- ESLint, Prettier 설정 및 적용
- 공통 UI 레이아웃(header, footer, main)
- 리액트 라우터 초기세팅
- 메인페이지 레이아웃 및 스와이퍼, 렌더링 기능

  ![메인페이지](https://github.com/user-attachments/assets/5caf3479-b05e-4848-918b-eebc651803bf)

- 소개페이지 레이아웃 및 기능

  ![소개페이지](https://github.com/user-attachments/assets/0be0f2e1-1ce0-44b4-929e-a5edce0e5447)

- 판매글 등록 페이지 레이아웃 및 기능

  ![판매글 등록 페이지](https://github.com/user-attachments/assets/8fd9fc20-188a-4822-83c0-017d20a9557b)

- 판매글 상세페이지(상품정보, 찜, 신고, 댓글, 대댓글) 레이아웃 및 기능

  ![판매글 상세페이지](https://github.com/user-attachments/assets/b8b8b98f-05c6-47a7-beeb-9359c883b3ad)

  ![댓글](https://github.com/user-attachments/assets/2b6931bc-c33b-45ec-8e0d-a0bfb2d4ecd2)

- 알림 시스템 개선

  ![알림](https://github.com/user-attachments/assets/72c937df-93e2-461b-aee3-23cc63a2d955)

<br>

# 5. 리팩토링 한 부분

1. 사이트 소개 페이지 개선
   > 사이트 소개 페이지에서 목적과 기능을 명확히 설명.

![DD](https://github.com/user-attachments/assets/a2422d2f-7894-45b8-bc1e-db29fbd878f1)

[해당커밋내역보기](https://github.com/yenaf/SeSAC-2nd-Front/commit/8c119e796514b5299324162c7fb47ac8a37d81ce)

<br>

2. 테스트 용 계정 제공
   > 기능을 충분히 테스트할 수 있도록 테스트 계정 제공.

![테스트 계정제공 캡쳐](https://github.com/user-attachments/assets/e182cdbf-7b4e-46bd-a63e-9c4b2717e8e3)

<br>

3. 성능최적화, 접근성 최적화

![최적화 커밋내역](https://github.com/user-attachments/assets/6b935c83-fcfe-4bf0-bd6a-d033680feffa)

![성능최적화](https://github.com/user-attachments/assets/3c1cfd30-3f8f-4b53-b9e9-abc9c10ae264)

![접근성최적화](https://github.com/user-attachments/assets/79adf3c6-15e0-4932-b205-8f831dc7e0cf)

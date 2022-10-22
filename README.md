# 나날꽃

날짜별로 오늘의 꽃을 소개하는 웹 사이트입니다.  

[라이브 데모 링크](https://daily-flower.web.app)  
[피그마](https://www.figma.com/file/OuuCbxVGE1NpNbz3pNOUNb/DailyFlower?node-id=6%3A70)

## 스택

### Frontend
-   `Vue.js`
-   `Vuex`
-   `Sass`
-   `TypeScript`
-   `Axios`

### Backend
- [농촌진흥청 국립원예특작과학원 제공 API](https://www.data.go.kr/data/15084605/openapi.do)

## 기능 (gif 추가하기)

### 메인 페이지
- 오늘 날짜의 꽃 정보를 간략히 보여줍니다.
- 자세히 보기를 누르면 상세 정보 페이지로 이동합니다.
![daily-flower-main](https://user-images.githubusercontent.com/79434205/197403697-b57577a3-7263-4e05-8168-a10e85388b56.gif)  
![daily-flower-main-mobile](https://user-images.githubusercontent.com/79434205/197403700-716fd9e9-17bb-4cc3-8478-a5b8badb65b6.gif)

### 상세 정보 페이지
- 날짜별 꽃 정보를 상세히 보여줍니다.
- 화살표를 누르면 각각 이전 날, 다음 날의 꽃 상세 정보 페이지로 이동합니다.
![daily-flower-info](https://user-images.githubusercontent.com/79434205/197403814-f000d624-53f8-4e73-a793-0486563008b2.gif)  
![daily-flower-info-mobile](https://user-images.githubusercontent.com/79434205/197403914-f5f4f546-6b2f-476a-ae7d-47918aa4b645.gif)
- 랜덤으로 보기 버튼을 누르면 무작위 날짜의 꽃 상세 정보 페이지로 이동합니다.
![daily-flower-random](https://user-images.githubusercontent.com/79434205/197404218-52701f4c-c068-40e6-a25b-9467b2ffdd90.gif)  
![daily-flower-random-mobile](https://user-images.githubusercontent.com/79434205/197404221-90305462-89a6-44c1-aa8a-69e9f498b7bf.gif)

### 꽃 검색 페이지
- 검색하기 버튼을 누르면 날짜 (단일), 날짜 (범위), 꽃 이름, 꽃말 4가지의 항목별로 꽃을 검색할 수 있습니다.
- 날짜 (단일)
![daily-flower-search-date](https://user-images.githubusercontent.com/79434205/197404025-8cb851bb-8b8f-4bee-a5af-87b19697b30d.gif)  
![daily-flower-search-date-mobile](https://user-images.githubusercontent.com/79434205/197404029-a540b011-e369-484b-ac83-93b58e345b10.gif)
- 날짜 (범위)
![daily-flower-search-range](https://user-images.githubusercontent.com/79434205/197404094-7f734b20-dbf9-4a32-8d79-6c9c7a67f5ca.gif)  
![daily-flower-search-range-mobile](https://user-images.githubusercontent.com/79434205/197404096-a847241a-6675-4aa3-9a13-0ac828ddfa75.gif)
- 꽃 이름 (한글 또는 영어)
![daily-flower-search-name](https://user-images.githubusercontent.com/79434205/197404130-4716c5eb-94c2-4a7d-9961-a91533e3cdd1.gif)  
![daily-flower-search-name-mobile](https://user-images.githubusercontent.com/79434205/197404134-bddf46d1-0d6b-475a-9ed3-3942ce220215.gif)
- 꽃말 (한글)
![daily-flower-search-word](https://user-images.githubusercontent.com/79434205/197404165-e09ce282-0bb6-4a30-81ca-148c4ed68076.gif)
![daily-flower-search-word-mobile](https://user-images.githubusercontent.com/79434205/197404167-afd9362f-5016-4bbb-a346-51510099bea5.gif)

## 추후 보완하고 싶은 점
- 학명으로도 검색할 수 있도록 하기
- 다크 모드용 색상 및 로고 변경하기

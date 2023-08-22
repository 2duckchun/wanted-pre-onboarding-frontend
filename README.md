# [wanted-pre-onboarding-frontend]

원티드 프론트엔드 프리온보딩 과제물인 투두리스트입니다.

<br />

## 👓 프로젝트 시현 링크

🎫 링크 : https://2dc-todolist.vercel.app/

<br />

## 😃 지원자

**이름** : 김태수

**분야** : 프론트엔드

<br />

## 🎞 프로젝트 실행 방법

```zsh
$ npm install
$ npm start
```

<br />

## 📖 사용 라이브러리

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"> <img src="https://img.shields.io/badge/Css3-1572B6?style=for-the-badge&logo=Css3&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=black">

<br />

## 데모 영상

### 회원가입 / 로그인 시현 영상

- 회원가입이 성공하면 /signin 페이지로 리다이렉트 됩니다.
- 로그인이 성공하면 /todo 페이지로 리다이렉트 됩니다.

<br />

![sign](https://github.com/2duckchun/wanted-pre-onboarding-frontend/assets/92588154/6bcb662f-bd00-4fa6-8049-5592c6de3ea6)

<hr />

### TODO 생성 / 수정 / 삭제 / 체크 시현 영상

- TODO의 생성, 수정, 삭제, 체크를 구현했습니다.
- 수정 모드가 아닌 상태에서 체크 상태를 바꿀 경우, 바뀐 체크 상태가 서버로 전달됩니다.
- 수정 모드가 켜져있는 상태에서는 체크 상태를 바꿔도 서버에 자동 반영되지 않습니다. 수정을 눌러야만 변경사항이 서버로 전달됩니다.

<br />

![todo](https://github.com/2duckchun/wanted-pre-onboarding-frontend/assets/92588154/7dce45e6-1756-480b-b0a0-133651fbdc62)

<hr />

### token 유무에 따른 리다이렉트 처리

- token이 없는 상태에서 /todo 페이지에 접근할 시, /signin 페이지로 리다이렉트 됩니다.
- token이 있는 상태에서 /signup, /signin 페이지에 접근할 시, /todo 페이지로 리다이렉트 됩니다.

<br />

![token](https://github.com/2duckchun/wanted-pre-onboarding-frontend/assets/92588154/5b11a01f-3016-4670-a77e-14680fe51b0d)

<hr />

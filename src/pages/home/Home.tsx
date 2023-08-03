import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.home_title}>메인 화면입니다!</h1>
      <p className={styles.home_paragraph}>
        안녕하세요! 프리온보딩 과제 제출물인 TodoList 입니다.
      </p>
      <p className={styles.home_paragraph}>
        이번 과제는 앱의 신뢰성과 에러처리에 중점을 두고 작업을 하였습니다.
      </p>
      <p className={styles.home_paragraph}>
        좋은 기회를 얻어, 많이 배우고 싶습니다.
      </p>
      <p className={styles.home_paragraph}>감사합니다!</p>
    </div>
  );
}

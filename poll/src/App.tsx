import styles from './App.module.scss';
import PollForm from './components/poll/form/PollForm';

function App() {
  return (
    <div className={styles.main}>
      <main>
        <section className={styles.featuresBlock}>
          <div className={styles.feature}>
            <h2>
              Prostota
            </h2>
            <div>
              Do stworzenia ankiety musisz tylko zadać pytanie i podać opcje do wyboru.
            </div>
          </div>
          <div className={styles.feature}>
            <h2>
              Elastyczność
            </h2>
            <div>
              Dodawaj tyle opcji ile potrzebujesz.
            </div>
          </div>
          <div className={styles.feature}>
            <h2>
              Zapisuj na później
            </h2>
            <div>
              Przygotuj ankietę teraz i modyfikuj ją później.
            </div>
          </div>
          <div className={styles.feature}>
            <h2>
              Za darmo
            </h2>
            <div>
              Tworzenie ankiet jak i zakładanie konta nic Cie nie kosztuje.
            </div>
          </div>
        </section>
        <section className={styles.pollBlock}>
          <div className={styles.poll}>
            <h1 className={styles.pollTitle}>Stwórz nową ankietę</h1>
            <PollForm></PollForm>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

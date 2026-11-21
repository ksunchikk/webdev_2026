import { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { ProgramDialog } from './components/ProgramDialog';
import { schedule } from './data';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [isProgramOpen, setProgramOpen] = useState(false);

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Сдвиг — наверх">
          <span className="logo-symbol" aria-hidden="true">◕</span>
          <span>сдвиг<span className="logo-period">.</span></span>
        </a>
        <nav className="header-nav" aria-label="Основная навигация">
          <a href="#about">О встрече</a>
          <button className="plain-nav-button" type="button" onClick={() => setProgramOpen(true)}>Программа</button>
          <a className="nav-cta" href="#registration">Регистрация <Arrow /></a>
        </nav>
      </header>

      <main>
        <div className="content-grid">
          <div className="story-column" id="about">
            <div className="hero-topline">
              <span className="eyebrow">ВСТРЕЧА О ЦИФРОВЫХ ПРОДУКТАХ</span>
              <span className="hero-edition">ВЫПУСК / 02</span>
            </div>
            <h1 className="hero-title">Интерфейс<br /><i>без догадок.</i></h1>
            <p className="hero-description">
              Один день о том, как люди на самом деле пользуются цифровыми продуктами.
              Про исследования, решения и ошибки, которые становятся заметны только после релиза.
            </p>

            <div className="poster" aria-hidden="true">
              <div className="poster-orbit poster-orbit-one" />
              <div className="poster-orbit poster-orbit-two" />
              <div className="poster-ring" />
              <div className="poster-label">СДВИГ / 2027</div>
            </div>

            <div className="event-facts">
              <div>
                <span className="fact-label">КОГДА</span>
                <strong>27 марта, суббота</strong>
                <span>10:00–17:30</span>
              </div>
              <div>
                <span className="fact-label">ГДЕ</span>
                <strong>Москва + онлайн</strong>
                <span>Адрес отправим участникам</span>
              </div>
            </div>

            <div className="agenda-preview" id="schedule">
              <div className="agenda-title-row">
                <div>
                  <span className="eyebrow">ЧТО БУДЕТ</span>
                  <h2>Без презентаций<br />на сорок слайдов</h2>
                </div>
                <button type="button" className="text-link" onClick={() => setProgramOpen(true)}>
                  Вся программа <Arrow />
                </button>
              </div>
              <div className="agenda-list">
                {schedule.slice(0, 3).map((item) => (
                  <div className="agenda-preview-item" key={item.time}>
                    <time>{item.time}</time>
                    <p>{item.title}</p>
                    <span>{item.kind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="form-column">
            <RegistrationForm />
            <p className="side-caption">Не нашли ответ? Напишите на <a href="mailto:hello@sdvig.example">hello@sdvig.example</a></p>
          </aside>
        </div>
      </main>

      <footer className="site-footer">
        <span>Сдвиг / разговоры о продукте</span>
        <span>Учебный пример · данные никуда не отправляются</span>
      </footer>

      {isProgramOpen && <ProgramDialog onClose={() => setProgramOpen(false)} />}
    </div>
  );
}

export default App;

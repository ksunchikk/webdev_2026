import { useState, type FormEvent } from "react";

type Format = "offline" | "online";

type FormValues = {
  name: string;
  email: string;
  team: string;
  format: Format;
  agree: boolean;
};

type FormErrors = Partial<Record<"name" | "email" | "agree", string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  team: "",
  format: "offline",
  agree: false,
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Укажите имя и фамилию";
  if (!values.email.trim()) errors.email = "Нужен email для подтверждения";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Проверьте адрес почты";
  }
  if (!values.agree) errors.agree = "Подтвердите согласие";

  return errors;
}

export function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="success-panel">
        <div className="success-mark" aria-hidden="true">
          ✓
        </div>
        <span className="eyebrow">ГОТОВО</span>
        <h2>Заявка у нас</h2>
        <p>
          Мы отправим подтверждение на <strong>{values.email}</strong>. Обычно
          отвечаем в течение двух рабочих дней.
        </p>
        <div className="success-details">
          <span>Формат</span>
          <strong>{values.format === "offline" ? "В зале" : "Онлайн"}</strong>
        </div>
        <button
          type="button"
          className="button-secondary"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
          }}
        >
          Изменить заявку
        </button>
      </section>
    );
  }

  return (
    <section
      className="registration"
      id="registration"
      aria-labelledby="registration-title"
    >
      <div className="form-head">
        <p className="eyebrow">01 / РЕГИСТРАЦИЯ</p>
        <h2 id="registration-title">Оставить заявку</h2>
        <p>
          Мест немного, поэтому каждую заявку подтверждаем письмом. Участие
          бесплатное.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="field-topline">
            <span className="field-heading">Как будете участвовать?</span>
            <button
              className="help-button"
              type="button"
              onClick={() => setShowInfo(!showInfo)}
            >
              ?
            </button>
          </div>
          {showInfo && (
            <p className="hint-popover">
              В зале можно участвовать в обсуждениях. Онлайн пришлём ссылку на
              трансляцию.
            </p>
          )}
          <div className="format-grid">
            <div
              className={`format-card ${
                values.format === "offline" ? "selected" : ""
              }`}
              onClick={() => update("format", "offline")}
            >
              <span className="choice-dot" />
              <strong>В зале</strong>
              <small>Москва, лекторий</small>
            </div>
            <div
              className={`format-card ${
                values.format === "online" ? "selected" : ""
              }`}
              onClick={() => update("format", "online")}
            >
              <span className="choice-dot" />
              <strong>Онлайн</strong>
              <small>Прямая трансляция</small>
            </div>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <span className="field-label">
              Имя и фамилия <em>*</em>
            </span>
            <input
              type="text"
              placeholder="Например, Анна Иванова"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label className="field-label" htmlFor="contact-email">
              Электронная почта <em>*</em>
            </label>
            <input
              id="email"
              type="email"
              placeholder="anna@company.ru"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              className={errors.email ? "invalid" : ""}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
        </div>

        <div className="field optional-field">
          <label className="field-label" htmlFor="team">
            Компания или команда <span>(необязательно)</span>
          </label>
          <input
            id="team"
            type="text"
            placeholder="Где сейчас работаете?"
            value={values.team}
            onChange={(event) => update("team", event.target.value)}
          />
        </div>

        <div className="form-footer">
          <div
            className="agreement"
            onClick={() => update("agree", !values.agree)}
          >
            <span className={`fake-checkbox ${values.agree ? "checked" : ""}`}>
              {values.agree ? "✓" : ""}
            </span>
            <span>Согласен получать организационные письма о встрече.</span>
          </div>
          {errors.agree && (
            <p className="field-error consent-error">{errors.agree}</p>
          )}
          <button className="button-primary" type="submit">
            Отправить заявку <span aria-hidden="true">↗</span>
          </button>
          <p className="form-note">
            Нажимая кнопку, вы отправляете заявку на участие. Ничего оплачивать
            не нужно.
          </p>
        </div>
      </form>
    </section>
  );
}

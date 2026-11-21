import { schedule } from "../data";

type Props = {
  onClose: () => void;
};

export function ProgramDialog({ onClose }: Props) {
  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <div
        className="program-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Программа встречи"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-head">
          <div>
            <p className="eyebrow">СУББОТА, 27 МАРТА</p>
            <h2>Программа дня</h2>
          </div>
          <button className="dialog-close" type="button" onClick={onClose}>
            Закрыть <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="dialog-intro">
          Двери откроем в 10:00. Между выступлениями будут перерывы и время
          поговорить.
        </p>
        <div className="dialog-schedule">
          {schedule.map((session) => (
            <div className="schedule-item" key={session.time}>
              <time>{session.time}</time>
              <div>
                <span className="small-tag">{session.kind}</span>
                <h3>{session.title}</h3>
                <p>{session.speaker}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="button-secondary dialog-bottom"
          type="button"
          onClick={onClose}
        >
          Понятно, спасибо
        </button>
      </div>
    </div>
  );
}

import styles from "./FiltroRoteiros.module.css";

export default function FiltroRoteiros({
  disciplinas,
  disciplina,
  ano,
  onDisciplinaChange,
  onAnoChange,
}) {
  return (
    <div className={styles.filtros}>
      <div className={styles.campo}>
        <label htmlFor="disciplina">Disciplina</label>
        <select
          id="disciplina"
          value={disciplina}
          onChange={(e) => onDisciplinaChange(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {disciplinas.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="ano">Ano</label>
        <select
          id="ano"
          value={ano}
          onChange={(e) => onAnoChange(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="6">6º ano</option>
          <option value="7">7º ano</option>
          <option value="8">8º ano</option>
          <option value="9">9º ano</option>
        </select>
      </div>
    </div>
  );
}

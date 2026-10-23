import styles from "./FiltroRoteiros.module.css";

export default function FiltroRoteiros({
  disciplinaSelecionada,
  anoSelecionado,
  disciplinas = [],
  disciplinasDisponiveis,
  listaDisciplinas,
  onDisciplinaChange,
  onAnoChange,
}) {
  const lista = disciplinasDisponiveis || listaDisciplinas || disciplinas || [];

  return (
    <div className={styles.filtros}>
      <div className={styles.campo}>
        <label htmlFor="disciplina">Disciplina</label>
        <select
          id="disciplina"
          value={disciplinaSelecionada}
          onChange={onDisciplinaChange}
        >
          <option value="Todas">Todas</option>
          {lista.map((disciplina) => (
            <option key={disciplina} value={disciplina}>
              {disciplina}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="ano">Ano</label>
        <select
          id="ano"
          value={anoSelecionado}
          onChange={onAnoChange}
        >
          <option value="6">6º ano</option>
          <option value="7">7º ano</option>
          <option value="8">8º ano</option>
          <option value="9">9º ano</option>
        </select>
      </div>
    </div>
  );
}

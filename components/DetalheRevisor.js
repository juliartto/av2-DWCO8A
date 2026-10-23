import styles from "./DetalheRevisor.module.css";

export default function DetalheRevisor({
  nome,
  disciplina,
  escola,
  professor,
  revisor,
  ...rest
}) {
  const dados = professor || revisor || rest;
  const nomeProf = nome || dados.nome || "Não informado";
  const disciplinaProf = disciplina || dados.disciplina || "Não informada";
  const escolaProf = escola || dados.escola || "Não informada";

  return (
    <div className={styles.container}>
      <p className={styles.alerta}>
        Este roteiro foi gerado por Inteligência Artificial e revisado pelo professor indicado.
      </p>
      <div className={styles.detalhes}>
        <p>
          <strong>Professor:</strong> {nomeProf}
        </p>
        <p>
          <strong>Disciplina:</strong> {disciplinaProf}
        </p>
        <p>
          <strong>Escola:</strong> {escolaProf}
        </p>
      </div>
    </div>
  );
}

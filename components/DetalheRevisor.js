import styles from "./DetalheRevisor.module.css";

export default function DetalheRevisor({ revisor }) {
  return (
    <div className={styles.container}>
      <p className={styles.alerta}>
        Este roteiro foi gerado por inteligência artificial e revisado pelo
        professor abaixo.
      </p>
      <div className={styles.detalhes}>
        <p>
          <strong>Professor:</strong> {revisor.nome}
        </p>
        <p>
          <strong>Disciplina:</strong> {revisor.disciplina}
        </p>
        <p>
          <strong>Escola:</strong> {revisor.escola}
        </p>
      </div>
    </div>
  );
}

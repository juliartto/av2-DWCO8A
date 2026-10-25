import Link from "next/link";
import styles from "./CardRoteiro.module.css";

export default function CardRoteiro({ roteiro, revisor }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.titulo}>{roteiro.titulo}</h2>
      <p>
        <strong>Disciplina:</strong> {roteiro.disciplina}
      </p>
      <p>
        <strong>Ano escolar:</strong> {roteiro.ano}º ano
      </p>
      <p>
        <strong>Tema:</strong> {roteiro.tema}
      </p>
      <p>
        <strong>Tempo estimado de estudo:</strong> {roteiro.tempoEstudo} min
      </p>
      {revisor && (
        <p>
          <strong>Revisor:</strong> {revisor.nome} ({revisor.escola})
        </p>
      )}
      <Link href={`/roteiros/${roteiro.id}`} className={styles.link}>
        Ver roteiro
      </Link>
    </article>
  );
}

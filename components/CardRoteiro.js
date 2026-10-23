import Link from "next/link";
import styles from "./CardRoteiro.module.css";

export default function CardRoteiro({ roteiro, revisor, professor, ...rest }) {
  const dadosRoteiro = roteiro || rest;
  const dadosRevisor = revisor || professor || dadosRoteiro.revisor || {};

  const { id, titulo, disciplina, ano, tempoEstudo, tema } = dadosRoteiro;
  const { nome, escola } = dadosRevisor;

  return (
    <article className={styles.card}>
      <h2 className={styles.titulo}>{titulo}</h2>
      <p>
        <strong>Disciplina:</strong> {disciplina}
      </p>
      <p>
        <strong>Ano escolar:</strong> {ano}º ano
      </p>
      <p>
        <strong>Tema:</strong> {tema}
      </p>
      <p>
        <strong>Tempo estimado de estudo:</strong> {tempoEstudo} min
      </p>
      <p>
        <strong>Revisor:</strong> {nome || "Não informado"} {escola ? `(${escola})` : ""}
      </p>
      <Link href={`/roteiros/${id}`} className={styles.link}>
        Ver Roteiro
      </Link>
    </article>
  );
}

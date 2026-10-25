import Link from "next/link";
import { notFound } from "next/navigation";
import roteiros from "@/data/roteiros.json";
import professores from "@/data/professores.json";
import DetalheRevisor from "@/components/DetalheRevisor";
import ItemQuestao from "@/components/ItemQuestao";
import QuadroWikipedia from "@/components/QuadroWikipedia";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return roteiros.map((roteiro) => ({ id: String(roteiro.id) }));
}

export default async function PaginaRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((r) => String(r.id) === id);

  if (!roteiro) {
    notFound();
  }

  const revisor = professores.find((p) => p.id === roteiro.revisorId);

  return (
    <article className={styles.container}>
      <Link href="/" className={styles.voltar}>
        ← Voltar aos roteiros
      </Link>

      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>{roteiro.titulo}</h1>
        <div className={styles.badges}>
          <span className={styles.badge}>{roteiro.disciplina}</span>
          <span className={styles.badge}>{roteiro.ano}º ano</span>
          <span className={styles.badge}>{roteiro.tempoEstudo} min</span>
        </div>
      </header>

      {revisor && <DetalheRevisor revisor={revisor} />}

      <section className={styles.secao}>
        <h2 className={styles.subtitulo}>Explicação</h2>
        <p className={styles.explicacao}>{roteiro.explicacao}</p>
      </section>

      <section className={styles.secao}>
        <h2 className={styles.subtitulo}>Questões</h2>
        <div className={styles.questoes}>
          {roteiro.questoes.map((questao, i) => (
            <ItemQuestao
              key={i}
              numero={i + 1}
              pergunta={questao.pergunta}
              resposta={questao.resposta}
            />
          ))}
        </div>
      </section>

      <QuadroWikipedia pagina={roteiro.paginaWikipedia} />
    </article>
  );
}

import Link from "next/link";
import roteiros from "@/data/roteiros.json";
import professores from "@/data/professores.json";
import DetalheRevisor from "@/components/DetalheRevisor";
import ItemQuestao from "@/components/ItemQuestao";
import QuadroWikipedia from "@/components/QuadroWikipedia";
import styles from "./page.module.css";

export function generateStaticParams() {
  return [
    ...roteiros.map((roteiro) => ({ id: String(roteiro.id) })),
    { id: "999" },
  ];
}

export default async function PaginaRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((r) => String(r.id) === id);

  if (!roteiro) {
    return (
      <section className={styles.naoEncontrado}>
        <h1>Roteiro não encontrado</h1>
        <Link href="/" className={styles.voltar}>
          Voltar para a página inicial
        </Link>
      </section>
    );
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

      <DetalheRevisor
        nome={revisor?.nome}
        disciplina={revisor?.disciplina}
        escola={revisor?.escola}
        professor={revisor}
        revisor={revisor}
      />

      <section className={styles.secao}>
        <h2 className={styles.subtitulo}>Explicação do Conteúdo</h2>
        <p className={styles.explicacao}>{roteiro.explicacao}</p>
      </section>

      {roteiro.questoes && roteiro.questoes.length > 0 && (
        <section className={styles.secao}>
          <h2 className={styles.subtitulo}>Questões</h2>
          <div className={styles.questoes}>
            {roteiro.questoes.map((questao, index) => (
              <ItemQuestao
                key={index}
                numero={index + 1}
                indice={index}
                enunciado={questao.pergunta}
                pergunta={questao.pergunta}
                resposta={questao.resposta}
                gabarito={questao.resposta}
              />
            ))}
          </div>
        </section>
      )}

      {roteiro.paginaWikipedia && (
        <QuadroWikipedia
          termo={roteiro.paginaWikipedia}
          paginaWikipedia={roteiro.paginaWikipedia}
        />
      )}
    </article>
  );
}

"use client";

import { useState } from "react";
import roteiros from "@/data/roteiros.json";
import professores from "@/data/professores.json";
import FiltroRoteiros from "@/components/FiltroRoteiros";
import CardRoteiro from "@/components/CardRoteiro";
import styles from "./page.module.css";

const disciplinasDisponiveis = [
  ...new Set(roteiros.map((r) => r.disciplina)),
];

export default function Home() {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("Todas");
  const [anoSelecionado, setAnoSelecionado] = useState("Todos");

  const roteirosFiltrados = roteiros.filter((roteiro) => {
    const matchDisciplina =
      disciplinaSelecionada === "Todas" ||
      !disciplinaSelecionada ||
      roteiro.disciplina === disciplinaSelecionada;

    const matchAno =
      anoSelecionado === "Todos" ||
      anoSelecionado === "Todas" ||
      !anoSelecionado ||
      String(roteiro.ano) === String(anoSelecionado);

    return matchDisciplina && matchAno;
  });

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Roteiros disponíveis</h1>

      <FiltroRoteiros
        disciplinaSelecionada={disciplinaSelecionada}
        anoSelecionado={anoSelecionado}
        disciplinas={disciplinasDisponiveis}
        onDisciplinaChange={(e) =>
          setDisciplinaSelecionada(e.target ? e.target.value : e)
        }
        onAnoChange={(e) =>
          setAnoSelecionado(e.target ? e.target.value : e)
        }
      />

      {roteirosFiltrados.length === 0 ? (
        <p className={styles.mensagemVazia}>Nenhum roteiro foi encontrado.</p>
      ) : (
        <div className={styles.grade}>
          {roteirosFiltrados.map((roteiro) => {
            const professor = professores.find(
              (p) => p.id === roteiro.revisorId
            );
            return (
              <CardRoteiro
                key={roteiro.id}
                roteiro={roteiro}
                revisor={professor}
                professor={professor}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

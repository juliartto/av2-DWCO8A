"use client";

import { useState } from "react";
import roteiros from "@/data/roteiros.json";
import professores from "@/data/professores.json";
import FiltroRoteiros from "@/components/FiltroRoteiros";
import CardRoteiro from "@/components/CardRoteiro";
import styles from "./page.module.css";

const disciplinas = [...new Set(roteiros.map((r) => r.disciplina))];

export default function Home() {
  const [disciplina, setDisciplina] = useState("Todas");
  const [ano, setAno] = useState("Todos");

  const roteirosFiltrados = roteiros.filter(
    (r) =>
      (disciplina === "Todas" || r.disciplina === disciplina) &&
      (ano === "Todos" || r.ano === Number(ano))
  );

  return (
    <section className={styles.container}>
      <h1 className={styles.titulo}>Roteiros disponíveis</h1>

      <FiltroRoteiros
        disciplinas={disciplinas}
        disciplina={disciplina}
        ano={ano}
        onDisciplinaChange={setDisciplina}
        onAnoChange={setAno}
      />

      {roteirosFiltrados.length === 0 ? (
        <p className={styles.mensagemVazia}>Nenhum roteiro foi encontrado.</p>
      ) : (
        <div className={styles.grade}>
          {roteirosFiltrados.map((roteiro) => (
            <CardRoteiro
              key={roteiro.id}
              roteiro={roteiro}
              revisor={professores.find((p) => p.id === roteiro.revisorId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

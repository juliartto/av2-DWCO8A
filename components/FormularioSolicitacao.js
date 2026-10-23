"use client";

import { useState } from "react";
import styles from "./FormularioSolicitacao.module.css";

export default function FormularioSolicitacao({
  disciplinas = [],
  anos = [],
  disciplinasDisponiveis,
  anosDisponiveis,
  onSubmit,
}) {
  const listaDisciplinas = disciplinasDisponiveis || disciplinas || [];
  const listaAnos = anosDisponiveis || anos || [6, 7, 8, 9];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [ano, setAno] = useState("");
  const [tema, setTema] = useState("");
  const [numeroQuestoes, setNumeroQuestoes] = useState("");
  const [dataUso, setDataUso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        nome,
        email,
        disciplina,
        ano,
        tema,
        numeroQuestoes,
        dataUso,
      });
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.campo}>
        <label htmlFor="nome">Nome do professor</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="email">E-mail institucional</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="disciplina">Disciplina</label>
        <select
          id="disciplina"
          name="disciplina"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          required
        >
          <option value="">Selecione uma disciplina</option>
          {listaDisciplinas.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="ano">Ano escolar</label>
        <select
          id="ano"
          name="ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        >
          <option value="">Selecione o ano escolar</option>
          {listaAnos.map((a) => {
            const val = typeof a === "object" ? a.value : a;
            const label =
              typeof a === "object"
                ? a.label
                : String(a).includes("ano")
                ? a
                : `${a}º ano`;
            return (
              <option key={val} value={val}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="tema">Tema do roteiro</label>
        <input
          type="text"
          id="tema"
          name="tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="numeroQuestoes">Número de questões</label>
        <input
          type="number"
          id="numeroQuestoes"
          name="numeroQuestoes"
          min="1"
          max="20"
          value={numeroQuestoes}
          onChange={(e) => setNumeroQuestoes(e.target.value)}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="dataUso">Data de uso</label>
        <input
          type="date"
          id="dataUso"
          name="dataUso"
          value={dataUso}
          onChange={(e) => setDataUso(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.botao}>
        Solicitar roteiro
      </button>
    </form>
  );
}

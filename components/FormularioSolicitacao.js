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

  const [erros, setErros] = useState([]);
  const [sucesso, setSucesso] = useState(null);

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSucesso(null);

    const errosEncontrados = [];

    // 1. Campos vazios
    if (!nome.trim()) {
      errosEncontrados.push("O campo 'Nome do professor' é obrigatório.");
    }

    if (!email.trim()) {
      errosEncontrados.push("O campo 'E-mail institucional' é obrigatório.");
    } else {
      // 2. E-mail que não termine em @escola.educa.gov.br ou não tenha usuário antes do @
      const emailLimpo = email.trim().toLowerCase();
      const partes = emailLimpo.split("@");

      if (
        !emailLimpo.endsWith("@escola.educa.gov.br") ||
        partes.length !== 2 ||
        !partes[0].trim()
      ) {
        errosEncontrados.push(
          "O e-mail deve ter um usuário antes do @ e terminar com @escola.educa.gov.br."
        );
      }
    }

    if (!disciplina.trim()) {
      errosEncontrados.push("O campo 'Disciplina' é obrigatório.");
    }

    if (!String(ano).trim()) {
      errosEncontrados.push("O campo 'Ano escolar' é obrigatório.");
    }

    if (!tema.trim()) {
      errosEncontrados.push("O campo 'Tema do roteiro' é obrigatório.");
    }

    // 3. Quantidade de questões menor que 3 ou maior que 10
    if (!String(numeroQuestoes).trim()) {
      errosEncontrados.push("O campo 'Número de questões' é obrigatório.");
    } else {
      const qtd = Number(numeroQuestoes);
      if (isNaN(qtd) || qtd < 3 || qtd > 10) {
        errosEncontrados.push(
          "A quantidade de questões não pode ser menor que 3 nem maior que 10."
        );
      }
    }

    // 4. Data de uso inferior a 7 dias corridos a partir da data de hoje
    if (!dataUso.trim()) {
      errosEncontrados.push("O campo 'Data de uso' é obrigatório.");
    } else {
      const [anoUso, mesUso, diaUso] = dataUso.split("-").map(Number);
      const dataEscolhida = new Date(anoUso, mesUso - 1, diaUso);

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const dataMinima = new Date(hoje);
      dataMinima.setDate(dataMinima.getDate() + 7);

      if (isNaN(dataEscolhida.getTime()) || dataEscolhida < dataMinima) {
        errosEncontrados.push(
          "A data de uso não pode ser inferior a 7 dias corridos a partir de hoje."
        );
      }
    }

    if (errosEncontrados.length > 0) {
      setErros(errosEncontrados);
      return;
    }

    // Confirmação de sucesso e resumo do pedido
    setErros([]);
    setSucesso({
      nome,
      email,
      disciplina,
      ano,
      tema,
      numeroQuestoes,
      dataUso,
    });

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

    // Limpa os campos
    setNome("");
    setEmail("");
    setDisciplina("");
    setAno("");
    setTema("");
    setNumeroQuestoes("");
    setDataUso("");
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
      <div className={styles.campo}>
        <label htmlFor="nome">Nome do professor</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="disciplina">Disciplina</label>
        <select
          id="disciplina"
          name="disciplina"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
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
        />
      </div>

      <button type="submit" className={styles.botao}>
        Solicitar roteiro
      </button>

      {erros.length > 0 && (
        <div className={styles.feedbackErro} role="alert">
          <h4>Erros encontrados:</h4>
          <ul>
            {erros.map((erro, index) => (
              <li key={index}>{erro}</li>
            ))}
          </ul>
        </div>
      )}

      {sucesso && (
        <div className={styles.feedbackSucesso} role="status">
          <h4>Solicitação enviada com sucesso!</h4>
          <p>Confira o resumo do seu pedido:</p>
          <ul>
            <li>
              <strong>Professor:</strong> {sucesso.nome}
            </li>
            <li>
              <strong>E-mail:</strong> {sucesso.email}
            </li>
            <li>
              <strong>Disciplina:</strong> {sucesso.disciplina}
            </li>
            <li>
              <strong>Ano escolar:</strong>{" "}
              {String(sucesso.ano).includes("ano")
                ? sucesso.ano
                : `${sucesso.ano}º ano`}
            </li>
            <li>
              <strong>Tema do roteiro:</strong> {sucesso.tema}
            </li>
            <li>
              <strong>Número de questões:</strong> {sucesso.numeroQuestoes}
            </li>
            <li>
              <strong>Data de uso:</strong> {formatarData(sucesso.dataUso)}
            </li>
          </ul>
        </div>
      )}
    </form>
  );
}

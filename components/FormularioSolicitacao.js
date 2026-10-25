"use client";

import { useState } from "react";
import styles from "./FormularioSolicitacao.module.css";

const camposIniciais = {
  nome: "",
  email: "",
  disciplina: "",
  ano: "",
  tema: "",
  numeroQuestoes: "",
  dataUso: "",
};

function validar(campos) {
  const erros = [];

  if (!campos.nome.trim()) erros.push("Informe o nome do professor.");

  if (!/^[^\s@]+@escola\.educa\.gov\.br$/i.test(campos.email.trim())) {
    erros.push("O e-mail institucional deve terminar em @escola.educa.gov.br.");
  }

  if (!campos.disciplina) erros.push("Selecione a disciplina.");
  if (!campos.ano) erros.push("Selecione o ano escolar.");
  if (!campos.tema.trim()) erros.push("Informe o tema do roteiro.");

  const qtd = Number(campos.numeroQuestoes);
  if (!campos.numeroQuestoes || qtd < 3 || qtd > 10) {
    erros.push("O número de questões deve ser entre 3 e 10.");
  }

  const dataMinima = new Date();
  dataMinima.setHours(0, 0, 0, 0);
  dataMinima.setDate(dataMinima.getDate() + 7);
  const dataUso = new Date(campos.dataUso + "T00:00");
  if (!campos.dataUso || dataUso < dataMinima) {
    erros.push("A data de uso precisa ser daqui a pelo menos 7 dias.");
  }

  return erros;
}

export default function FormularioSolicitacao({ disciplinas, anos }) {
  const [campos, setCampos] = useState(camposIniciais);
  const [erros, setErros] = useState([]);
  const [pedido, setPedido] = useState(null);

  function alterar(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  function enviar(e) {
    e.preventDefault();
    const errosEncontrados = validar(campos);
    setErros(errosEncontrados);

    if (errosEncontrados.length > 0) {
      setPedido(null);
      return;
    }

    setPedido(campos);
    setCampos(camposIniciais);
  }

  return (
    <form className={styles.formulario} onSubmit={enviar} noValidate>
      <div className={styles.campo}>
        <label htmlFor="nome">Nome do professor</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={campos.nome}
          onChange={alterar}
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="email">E-mail institucional</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nome@escola.educa.gov.br"
          value={campos.email}
          onChange={alterar}
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="disciplina">Disciplina</label>
        <select
          id="disciplina"
          name="disciplina"
          value={campos.disciplina}
          onChange={alterar}
        >
          <option value="">Selecione</option>
          {disciplinas.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="ano">Ano escolar</label>
        <select id="ano" name="ano" value={campos.ano} onChange={alterar}>
          <option value="">Selecione</option>
          {anos.map((a) => (
            <option key={a} value={a}>
              {a}º ano
            </option>
          ))}
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="tema">Tema do roteiro</label>
        <input
          type="text"
          id="tema"
          name="tema"
          value={campos.tema}
          onChange={alterar}
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="numeroQuestoes">Número de questões (3 a 10)</label>
        <input
          type="number"
          id="numeroQuestoes"
          name="numeroQuestoes"
          min="3"
          max="10"
          value={campos.numeroQuestoes}
          onChange={alterar}
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="dataUso">Data em que vai usar o roteiro</label>
        <input
          type="date"
          id="dataUso"
          name="dataUso"
          value={campos.dataUso}
          onChange={alterar}
        />
      </div>

      <button type="submit" className={styles.botao}>
        Solicitar roteiro
      </button>

      {erros.length > 0 && (
        <div className={styles.feedbackErro} role="alert">
          <h4>Corrija os campos abaixo:</h4>
          <ul>
            {erros.map((erro) => (
              <li key={erro}>{erro}</li>
            ))}
          </ul>
        </div>
      )}

      {pedido && (
        <div className={styles.feedbackSucesso} role="status">
          <h4>Pedido registrado!</h4>
          <p>Resumo do pedido:</p>
          <ul>
            <li>
              <strong>Professor:</strong> {pedido.nome}
            </li>
            <li>
              <strong>E-mail:</strong> {pedido.email}
            </li>
            <li>
              <strong>Disciplina:</strong> {pedido.disciplina}
            </li>
            <li>
              <strong>Ano escolar:</strong> {pedido.ano}º ano
            </li>
            <li>
              <strong>Tema:</strong> {pedido.tema}
            </li>
            <li>
              <strong>Número de questões:</strong> {pedido.numeroQuestoes}
            </li>
            <li>
              <strong>Data de uso:</strong>{" "}
              {pedido.dataUso.split("-").reverse().join("/")}
            </li>
          </ul>
        </div>
      )}
    </form>
  );
}

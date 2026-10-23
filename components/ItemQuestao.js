"use client";

import { useState } from "react";
import styles from "./ItemQuestao.module.css";

export default function ItemQuestao({
  numero,
  indice,
  index,
  enunciado,
  pergunta,
  resposta,
  gabarito,
}) {
  const [mostrarGabarito, setMostrarGabarito] = useState(false);

  const num = numero ?? (typeof indice === "number" ? indice + 1 : indice) ?? (typeof index === "number" ? index + 1 : index);
  const textoEnunciado = enunciado || pergunta;
  const textoResposta = resposta || gabarito;

  return (
    <div className={styles.item}>
      <h3 className={styles.cabecalho}>
        {num ? `Questão ${num}` : "Questão"}
      </h3>
      <p className={styles.enunciado}>{textoEnunciado}</p>
      <button
        type="button"
        className={styles.botao}
        onClick={() => setMostrarGabarito((prev) => !prev)}
      >
        {mostrarGabarito ? "Ocultar Gabarito" : "Mostrar Gabarito"}
      </button>
      {mostrarGabarito && (
        <div className={styles.resposta}>
          <p>
            <strong>Gabarito:</strong> {textoResposta}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "./ItemQuestao.module.css";

export default function ItemQuestao({ numero, pergunta, resposta }) {
  const [mostrarResposta, setMostrarResposta] = useState(false);

  return (
    <div className={styles.item}>
      <h3 className={styles.cabecalho}>Questão {numero}</h3>
      <p className={styles.enunciado}>{pergunta}</p>
      <button
        type="button"
        className={styles.botao}
        onClick={() => setMostrarResposta(!mostrarResposta)}
      >
        {mostrarResposta ? "Ocultar resposta" : "Mostrar resposta"}
      </button>
      {mostrarResposta && (
        <div className={styles.resposta}>
          <p>
            <strong>Resposta:</strong> {resposta}
          </p>
        </div>
      )}
    </div>
  );
}

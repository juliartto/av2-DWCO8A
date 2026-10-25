"use client";

import { useState, useEffect } from "react";
import styles from "./QuadroWikipedia.module.css";

export default function QuadroWikipedia({ pagina }) {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pagina)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((dados) => setResumo(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [pagina]);

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>Texto de apoio (Wikipédia)</h2>

      {carregando && (
        <p className={styles.carregando}>Carregando texto de apoio...</p>
      )}

      {erro && (
        <div className={styles.avisoErro}>
          <p>
            Não foi possível carregar o texto da Wikipédia agora. O roteiro
            acima continua disponível normalmente.
          </p>
        </div>
      )}

      {resumo && (
        <>
          <p className={styles.resumo}>{resumo.extract}</p>
          <a
            href={resumo.content_urls.desktop.page}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Ler mais na Wikipédia
          </a>
        </>
      )}
    </section>
  );
}

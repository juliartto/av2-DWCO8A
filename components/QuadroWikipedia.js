"use client";

import { useState, useEffect } from "react";
import styles from "./QuadroWikipedia.module.css";

export default function QuadroWikipedia({ termo, paginaWikipedia, ...rest }) {
  const termoBusca = termo || paginaWikipedia || rest.pagina || "";

  const [carregando, setCarregando] = useState(Boolean(termoBusca));
  const [erro, setErro] = useState(!termoBusca);
  const [dados, setDados] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!termoBusca) {
      return;
    }

    fetch(
      `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        termoBusca
      )}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar dados da Wikipédia");
        }
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setDados(json);
          setCarregando(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setErro(true);
          setCarregando(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [termoBusca]);

  const urlWikipedia =
    dados?.content_urls?.desktop?.page ||
    `https://pt.wikipedia.org/wiki/${encodeURIComponent(termoBusca)}`;

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>Texto de Apoio (Wikipédia)</h2>

      {carregando && (
        <p className={styles.carregando}>
          Carregando texto de apoio da Wikipédia...
        </p>
      )}

      {!carregando && (erro || !dados) && (
        <div className={styles.avisoErro}>
          <p>
            O texto complementar da Wikipédia não pôde ser carregado no momento,
            mas o roteiro de estudo acima pode ser utilizado normalmente.
          </p>
        </div>
      )}

      {!carregando && !erro && dados && (
        <>
          <p className={styles.resumo}>{dados.extract}</p>
          <a
            href={urlWikipedia}
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

import Link from "next/link";
import styles from "./not-found.module.css";

export default function NaoEncontrado() {
  return (
    <section className={styles.container}>
      <h1>Página não encontrada</h1>
      <p>O roteiro ou a página que você procurou não existe.</p>
      <Link href="/">Voltar para a página inicial</Link>
    </section>
  );
}

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.conteudo}>
        <Link href="/" className={styles.logo}>
          Roteiros de Estudo
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <Link href="/solicitar">Solicitar roteiro</Link>
        </nav>
      </div>
    </header>
  );
}

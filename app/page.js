import Link from "next/link";
import roteiros from "@/data/roteiros.json";

// Lista provisória. Os cards e o filtro entram nas etapas 4 e 6.
export default function Home() {
  return (
    <section>
      <h1>Roteiros disponíveis</h1>
      <ul>
        {roteiros.map((roteiro) => (
          <li key={roteiro.id}>
            <Link href={`/roteiros/${roteiro.id}`}>{roteiro.titulo}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import roteiros from "@/data/roteiros.json";

export function generateStaticParams() {
  return roteiros.map((roteiro) => ({ id: String(roteiro.id) }));
}

// Página provisória. O conteúdo completo entra na etapa 7.
export default async function PaginaRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((r) => String(r.id) === id);

  if (!roteiro) {
    notFound();
  }

  return (
    <section>
      <Link href="/">Voltar</Link>
      <h1>{roteiro.titulo}</h1>
      <p>
        {roteiro.disciplina}, {roteiro.ano}º ano
      </p>
    </section>
  );
}

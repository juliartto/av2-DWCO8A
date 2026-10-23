import FormularioSolicitacao from "@/components/FormularioSolicitacao";
import roteiros from "@/data/roteiros.json";

const disciplinasDisponiveis = [
  ...new Set(roteiros.map((r) => r.disciplina)),
];
const anosDisponiveis = [6, 7, 8, 9];

export default function PaginaSolicitar() {
  return (
    <section>
      <h1>Solicitar roteiro</h1>
      <FormularioSolicitacao
        disciplinas={disciplinasDisponiveis}
        anos={anosDisponiveis}
      />
    </section>
  );
}

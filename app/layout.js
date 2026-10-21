import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Roteiros de Estudo",
  description: "Roteiros de estudo para alunos do 6º ao 9º ano da rede municipal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="rodape">
          Roteiros gerados por IA e revisados por professores da rede municipal.
        </footer>
      </body>
    </html>
  );
}

"use client";
import { useCallback } from "react";
import html2canvas from "html2canvas";
import Botao from "@/components/Botao";
import Estatistica from "@/components/Estatistica";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Resultado.module.css";

export default function Resultado({
  searchParams,
}: {
  searchParams: { total: number; certas: number };
}) {
  const { total, certas } = searchParams;
  const percentual = Math.round((certas / total) * 100);

  const capturarScreenshot = useCallback(async () => {
    try {
      const canvas = await html2canvas(document.body),
        imageData = canvas.toDataURL("image/jpeg"),
        downloadLink = document.createElement("a");

      Object.assign(downloadLink, {
        href: imageData,
        download: "screenshot.jpg"
      }).click();

    } catch {
      console.error("Erro ao obter screenshot");
    }
  }, []);

  return (
    <div className={styles.resultado}>
      <h1>Resultado Final</h1>
      <div style={{ display: "flex" }}>
        <Estatistica texto="Perguntas" valor={total} />
        <Estatistica texto="Certas" valor={certas} corFundo="#9CD2A4" />
        <Estatistica
          texto="Percentual"
          valor={`${percentual}%`}
          corFundo="#DE6A33"
        />
      </div>
      <Botao href="/" texto="Tentar Novamente" />
      <Botao texto="Baixar Resultado" onClick={capturarScreenshot} />
      <IconeGithub />
    </div>
  );
}
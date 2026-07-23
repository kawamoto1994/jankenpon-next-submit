import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "じゃんけんぽん";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadDarumadropFont(text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Darumadrop+One&text=${encodeURIComponent(text)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
      },
    },
  ).then((res) => res.text());

  const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype|woff)'\)/)?.[1];
  if (!fontUrl) {
    throw new Error("Darumadrop One のフォントURLが見つかりませんでした");
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const logoText = "じゃんけんぽん";

  const [fontData, bgData] = await Promise.all([
    loadDarumadropFont(logoText),
    readFile(join(process.cwd(), "public", "bg.png")),
  ]);

  const bgSrc = `data:image/png;base64,${bgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={bgSrc}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "white",
              borderRadius: 32,
              padding: "56px 96px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Darumadrop One",
                fontSize: 110,
              }}
            >
              <span style={{ color: "#f43f5e" }}>じゃん</span>
              <span style={{ color: "#0ea5e9" }}>けん</span>
              <span style={{ color: "#f59e0b" }}>ぽん</span>
            </div>

            <div style={{ display: "flex", fontSize: 56, marginTop: 32 }}>
              ✊ ✌️ ✋
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Darumadrop One",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

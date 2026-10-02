import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const role = locale === "eu" ? "Full Stack web garatzailea" : "Desarrollador web Full Stack";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#18181b",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(226,83,45,0.35), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#fafaf9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 20,
                height: 24,
                borderRadius: "50%",
                border: "5px solid #18181b",
              }}
            />
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#fafaf9" }}>
            proyecto<span style={{ color: "#e2532d" }}>zero</span>
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, color: "#fafaf9" }}>
          Sergio Moreno<span style={{ color: "#e2532d" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa", marginTop: 20 }}>
          {role}
        </div>
      </div>
    ),
    size,
  );
}

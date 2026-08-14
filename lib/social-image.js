import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function createSocialImage({ kicker, title, detail, accent = "#e0664f" }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#25211f",
          background: "#f4ead9",
          padding: "68px 76px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "22px",
            border: "2px solid rgba(37, 33, 31, 0.16)",
            borderRadius: "32px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "510px",
            height: "510px",
            right: "-120px",
            top: "-120px",
            borderRadius: "999px",
            background: accent,
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "310px",
            height: "310px",
            right: "70px",
            bottom: "-135px",
            borderRadius: "999px",
            background: "#8a9d74",
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "130px",
            height: "130px",
            right: "310px",
            top: "235px",
            borderRadius: "28px",
            transform: "rotate(16deg)",
            background: "#d5a23b",
            opacity: 0.86,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "820px",
            height: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span
              style={{
                width: "42px",
                height: "5px",
                borderRadius: "999px",
                background: accent,
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div
              style={{
                maxWidth: "790px",
                fontFamily: "Georgia, serif",
                fontSize: title.length > 30 ? "72px" : "86px",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
              }}
            >
              {title}
            </div>
            <div style={{ maxWidth: "690px", fontSize: "26px", lineHeight: 1.35 }}>
              {detail}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "21px",
              fontWeight: 700,
            }}
          >
            <span>Khaled Mousa</span>
            <span style={{ opacity: 0.48 }}>•</span>
            <span style={{ opacity: 0.72 }}>Engineering · Code · Systems</span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}

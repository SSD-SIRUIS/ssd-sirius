import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

// Image de partage par défaut (LinkedIn, WhatsApp, X, Facebook…).
// Les fiches projet la remplacent par leur propre visuel.
export const alt = `${SITE.legalName} — applications, plateformes web et paiements Mobile Money`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#08090a",
          color: "#f7f8f8",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8a8f98", letterSpacing: 2 }}>
          SSD SIRIUS · BAMAKO · PARIS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            Applications mobiles, plateformes web et paiements Mobile Money.
          </div>
          <div style={{ fontSize: 32, color: "#8a8f98", marginTop: 32 }}>
            Flash Market · Picasso Resolve · MaliLink
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8a8f98" }}>sirius-mali.tech</div>
      </div>
    ),
    size
  );
}

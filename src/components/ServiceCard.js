import Link from "next/link";
import Icon from "@/components/Icon";

export default function ServiceCard({ service, href = "/services" }) {
  return (
    <div className="card">
      <span className="icon-orbit">
        <Icon name={service.icon} />
      </span>
      <h3 className="h3">{service.title}</h3>
      <p className="muted">{service.excerpt}</p>
      <Link href={href} className="link-arrow" style={{ marginTop: "auto" }}>
        En savoir plus
        <Icon name="ArrowRight" />
      </Link>
    </div>
  );
}

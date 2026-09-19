"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import SiriusMark from "@/components/SiriusMark";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="SSD Sirius — accueil">
          <SiriusMark size={20} />
          <span className="brand__name">Sirius</span>
        </Link>

        <nav className="nav" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="nav-sep" aria-hidden="true" />

        <div className="site-header__actions">
          <ThemeToggle />
          <Link href="/contact" className="btn btn--primary btn--sm">
            Nous contacter
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "X" : "Menu"} width={18} height={18} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Navigation mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn--primary btn--block">
            Nous contacter
          </Link>
        </nav>
      )}
    </header>
  );
}

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="SSD Sirius — accueil">
          <SiriusMark size={30} />
          <span className="brand__text">
            <span className="brand__name">Sirius</span>
            <span className="brand__sub">Solutions Digitales</span>
          </span>
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

        <div className="site-header__actions">
          <ThemeToggle />
          <Link href="/contact" className="btn btn--primary btn--sm">
            Démarrer un projet
            <Icon name="ArrowRight" />
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "X" : "Menu"} width={20} height={20} />
        </button>
      </div>

      {open && (
        <div className="mobile-nav" id="mobile-nav">
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
            Démarrer un projet
            <Icon name="ArrowRight" />
          </Link>
        </div>
      )}
    </header>
  );
}

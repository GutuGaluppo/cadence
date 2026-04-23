import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { toSitePath } from "../lib/sitePaths";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type SiteShellProps = {
  children: ReactNode;
  navItems: NavItem[];
  navAriaLabel: string;
  compact?: boolean;
  footer?: ReactNode;
};

export function SiteShell({
  children,
  navItems,
  navAriaLabel,
  compact = false,
  footer,
}: SiteShellProps) {
  const { t } = useTranslation();

  return (
    <div className={`page-shell${compact ? " page-shell-compact" : ""}`}>
      <header className="topbar">
        <a
          className="brand"
          href={toSitePath("/")}
          aria-label={t("brand.homeAriaLabel")}
        >
          <span className="brand-mark">C</span>
          <span className="brand-text">
            <strong>{t("brand.name")}</strong>
            <span>{t("brand.subtitle")}</span>
          </span>
        </a>

        <nav className="topnav" aria-label={navAriaLabel}>
          {navItems.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>
      </header>

      {children}
      {footer}
    </div>
  );
}

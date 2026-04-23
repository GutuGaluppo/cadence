import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en",    flag: "gb", label: "English"        },
  { code: "pt-BR", flag: "br", label: "Português (BR)" },
  { code: "es",    flag: "es", label: "Español"         },
  { code: "it",    flag: "it", label: "Italiano"        },
  { code: "de",    flag: "de", label: "Deutsch"         },
  { code: "ja",    flag: "jp", label: "日本語"           },
];

function resolveCode(language: string): string {
  if (language === "pt" || language.startsWith("pt-")) return "pt-BR";
  const base = language.split("-")[0];
  return LANGUAGES.find((l) => l.code === base || l.code.startsWith(base))?.code ?? "en";
}

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeCode = resolveCode(i18n.language);
  const active = LANGUAGES.find((l) => l.code === activeCode) ?? LANGUAGES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className={`lang-select${open ? " lang-select--open" : ""}`}
    >
      <button
        className="lang-select-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={active.label}
        aria-label={t("lang.switcherLabel")}
      >
        <span className={`fi fi-${active.flag} fis lang-flag`} />
        <svg className="lang-chevron" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="lang-select-dropdown"
          role="listbox"
          aria-label={t("lang.switcherLabel")}
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === activeCode}>
              <button
                className={`lang-option${lang.code === activeCode ? " lang-option--active" : ""}`}
                onClick={() => select(lang.code)}
                title={lang.label}
              >
                <span className={`fi fi-${lang.flag} fis lang-flag`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

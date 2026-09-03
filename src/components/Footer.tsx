const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Developers", href: "#developers" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-text">EA DEV</p>
          <p className="mt-1 text-xs text-text-secondary">
            Built by Eduardo &amp; Auler. © {new Date().getFullYear()}
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-text-secondary">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="link"
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

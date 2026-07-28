import Link from "next/link";

const columns = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid size-7 place-items-center rounded-lg bg-brand text-sm text-brand-foreground">
                V
              </span>
              Vyral
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              One workspace to plan, publish, and prove the value of your content.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold tracking-tight">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} Vyral. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

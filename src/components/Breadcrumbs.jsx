import { Link } from "react-router-dom";

export default function Breadcrumbs({
  items = [],
  separator = "/",
  className = "",
}) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const content =
            item.href && !isLast ? (
              <Link to={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            );

          return (
            <li key={`${item.label}-${idx}`} style={{ display: "inline" }}>
              {content}
              {!isLast && (
                <span aria-hidden="true" style={{ padding: "0 .5ch" }}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

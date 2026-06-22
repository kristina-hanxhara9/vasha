import { Fragment } from "react";

/**
 * Renders a komandë, highlighting the [bracketed] blanks she replaces with her
 * own details. Inherits whitespace handling from its parent (use
 * `whitespace-pre-line` on the wrapper to keep the line breaks).
 */
export function TemplateText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark
            key={i}
            className="rounded bg-rose-100 px-1 font-medium text-rose-700"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

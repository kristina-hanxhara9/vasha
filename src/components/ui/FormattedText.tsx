import React from "react";

/** Renders plain AI text, turning any **bold** into real bold and stripping
 *  stray markdown asterisks so the user never sees literal ** in a reply. */
export function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\*\*([^*\n]+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="font-semibold text-plum-700">
              {m[1]}
            </strong>
          );
        }
        return <React.Fragment key={i}>{p.replace(/\*\*/g, "")}</React.Fragment>;
      })}
    </>
  );
}

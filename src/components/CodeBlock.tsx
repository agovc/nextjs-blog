import { Highlight, themes } from "prism-react-renderer";

export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <Highlight code={code} theme={themes.palenight} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="rounded-xl overflow-x-auto text-sm" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

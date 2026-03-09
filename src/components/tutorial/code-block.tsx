"use client";

import { useState, useRef, useCallback } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  hideHeader?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  hideHeader = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Ctrl+A or Cmd+A to select only the code
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();
      if (codeRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, []);

  const wrapperClass = hideHeader ? "" : "overflow-hidden rounded-xl border border-border";

  return (
    <div className={wrapperClass}>
      {/* Header - hidden when used inside CodeTabs */}
      {!hideHeader && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {filename || `code.${language}`}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      )}

      {/* Code - click to focus, then Ctrl+A selects only code */}
      <div
        className="overflow-x-auto bg-[#0d1117] focus:outline-none focus:ring-1 focus:ring-accent/50"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <pre ref={codeRef} className="p-4 text-sm font-mono text-gray-300 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}

interface CodeTabsProps {
  files: Record<string, string>;
  defaultTab?: string;
}

export function CodeTabs({ files, defaultTab }: CodeTabsProps) {
  const filenames = Object.keys(files);
  const [activeTab, setActiveTab] = useState(defaultTab || filenames[0]);
  const [copied, setCopied] = useState(false);

  if (filenames.length === 0) {
    return null;
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(files[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Tabs header with copy button */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30">
        <div className="flex overflow-x-auto">
          {filenames.map((filename) => (
            <button
              key={filename}
              onClick={() => setActiveTab(filename)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === filename
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {filename}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1 rounded-md px-3 py-1 mr-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Active file content - no header since tabs serve as header */}
      <CodeBlock
        code={files[activeTab]}
        filename={activeTab}
        language={getLanguageFromFilename(activeTab)}
        hideHeader
      />
    </div>
  );
}

function getLanguageFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    tsx: "tsx",
    ts: "typescript",
    jsx: "jsx",
    js: "javascript",
    css: "css",
    scss: "scss",
    html: "html",
    json: "json",
  };
  return languageMap[ext || ""] || "text";
}

"use client";

import { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Header */}
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

      {/* Code */}
      <div className="overflow-x-auto bg-[#0d1117]">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none pr-4 text-right text-muted-foreground/50 w-8">
                    {i + 1}
                  </span>
                )}
                <span className="text-gray-300">{line || " "}</span>
              </div>
            ))}
          </code>
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

  if (filenames.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
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

      {/* Active file content */}
      <CodeBlock
        code={files[activeTab]}
        filename={activeTab}
        language={getLanguageFromFilename(activeTab)}
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

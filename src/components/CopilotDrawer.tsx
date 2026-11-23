import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Bot,
  Check,
  Copy,
  Loader2,
  Send,
  X,
} from 'lucide-react';
import type { CopilotMessage } from '../types/hr';
import type { Translations } from '../i18n/translations';

interface CopilotDrawerProps {
  t: Translations;
  isOpen: boolean;
  messages: CopilotMessage[];
  isLoading: boolean;
  error: string | null;
  pendingPrompt?: string | null;
  onConsumePendingPrompt?: () => void;
  onClose: () => void;
  onSendPrompt: (prompt: string) => Promise<void>;
}

function renderFormattedContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-xs leading-relaxed text-slate-700">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          const clean = trimmed.replace(/^#{1,3}\s+/, '').replace(/\*\*/g, '');
          return (
            <h4 key={i} className="font-display font-semibold text-slate-900 text-xs pt-1">
              {clean}
            </h4>
          );
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const body = trimmed.slice(2);
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#5E4AE3] shrink-0" />
              <span>{renderInlineBold(body)}</span>
            </div>
          );
        }

        return <p key={i}>{renderInlineBold(trimmed)}</p>;
      })}
    </div>
  );
}

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  t,
  isOpen,
  messages,
  isLoading,
  error,
  pendingPrompt,
  onConsumePendingPrompt,
  onClose,
  onSendPrompt,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && pendingPrompt && !isLoading) {
      const promptToRun = pendingPrompt;
      onConsumePendingPrompt?.();
      void onSendPrompt(promptToRun);
    }
  }, [isOpen, pendingPrompt, isLoading, onConsumePendingPrompt, onSendPrompt]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await onSendPrompt(text);
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <aside
      aria-label={t.copilotTitle}
      className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-slate-200 bg-white shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-display font-semibold text-slate-900">
              {t.copilotTitle}
            </h2>
            <p className="text-[11px] text-slate-500">{t.copilotSubtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close AI HR Copilot"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Executive Prompts */}
      <div className="border-b border-slate-200 px-5 py-3.5 bg-white space-y-2">
        <p className="text-[11px] font-semibold text-slate-500">{t.copilotPresetsHeading}</p>
        <div className="flex flex-col gap-1.5">
          {t.presetPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isLoading}
              onClick={() => void onSendPrompt(prompt)}
              className="w-full text-left rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-700 hover:border-[#5E4AE3]/50 hover:bg-[#5E4AE3]/5 hover:text-[#5E4AE3] disabled:opacity-60 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#F8FAFC]">
        {messages.length === 0 && !isLoading && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 leading-relaxed">
            {t.copilotEmptyHint}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl p-4 ${
              msg.role === 'user'
                ? 'bg-[#5E4AE3] text-white ml-6'
                : 'bg-white border border-slate-200 mr-2'
            }`}
          >
            {msg.role === 'user' ? (
              <p className="text-xs font-medium leading-relaxed">{msg.content}</p>
            ) : (
              <div className="space-y-2.5">
                {renderFormattedContent(msg.content)}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                    {msg.timestamp}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{t.copy}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 mr-2 flex items-center gap-2.5 text-xs text-slate-600">
            <Loader2 className="w-4 h-4 animate-spin text-[#5E4AE3]" />
            <span>{t.copilotLoading}</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 bg-white p-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={t.copilotPlaceholder}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#5E4AE3] focus:outline-none focus:ring-2 focus:ring-[#5E4AE3]/15"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Send message to AI HR Copilot"
          className="inline-flex items-center justify-center rounded-lg bg-[#5E4AE3] p-2.5 text-white hover:bg-[#4F3FD1] disabled:opacity-50 transition-colors shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </aside>
  );
};

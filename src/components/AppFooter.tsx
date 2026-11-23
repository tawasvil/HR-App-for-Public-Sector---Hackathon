import React from 'react';
import { Info } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface AppFooterProps {
  t: Translations;
  onOpenAbout: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ t, onOpenAbout }) => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500">{t.footerMeta}</p>
        <button
          type="button"
          onClick={onOpenAbout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:border-[#5E4AE3] hover:text-[#5E4AE3] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E4AE3]"
        >
          <Info className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
          <span>{t.footerInfoButton}</span>
        </button>
      </div>
    </footer>
  );
};

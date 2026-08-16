import React, { useState } from 'react';
import { Key, Check, AlertCircle, X, Shield } from 'lucide-react';
import { connectApiKey, disconnectApiKey } from '../services/geminiService';

interface ApiSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConfigured: boolean;
  onConfiguredChange: (configured: boolean) => void;
}

export const ApiSetupModal: React.FC<ApiSetupModalProps> = ({
  isOpen,
  onClose,
  isConfigured,
  onConfiguredChange,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setErrorMsg('Please enter an API key.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await connectApiKey(apiKeyInput.trim());
      if (result.valid) {
        setSuccessMsg('Archive connected successfully.');
        onConfiguredChange(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.message || 'Unable to connect. Check the key and try again.');
      }
    } catch {
      setErrorMsg('Unable to connect. Check the key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectApiKey();
    onConfiguredChange(false);
    setSuccessMsg('Disconnected from archive.');
    setTimeout(() => {
      setSuccessMsg(null);
    }, 1500);
  };

  return (
    <div
      id="api-setup-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        id="api-setup-modal-container"
        className="relative w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 shadow-2xl text-center"
      >
        {isConfigured && (
          <button
            id="api-setup-close-btn"
            onClick={onClose}
            aria-label="Close settings"
            className="absolute top-4 right-4 p-2 text-[#8C8C87] hover:text-[#F5F5F0] transition-colors rounded-full hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Editorial Heading */}
        <div className="mb-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F5F0]">
            <Key className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-serif-display font-medium tracking-widest text-[#F5F5F0] uppercase">
            CANINOGRAPHY
          </h2>
          <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] text-amber-300 font-mono tracking-widest uppercase">
            Gemini 3.1 Flash-Lite Engine
          </div>
          <p className="text-xs font-sans text-[#8C8C87] mt-3 tracking-wide">
            {isConfigured
              ? 'The documentary archive is currently connected.'
              : 'Connect your Gemini API key to query real-time taxonomic dossiers, lineage patterns, and historical timelines.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center space-x-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center space-x-2 text-left">
            <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {isConfigured ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#D8D8D2] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-[#8C8C87]">••••••••••••••••</span>
              </div>
              <span className="text-[11px] text-emerald-400 uppercase font-medium tracking-wider">Connected</span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-lg bg-white text-black font-sans text-xs font-medium tracking-wider hover:bg-[#F5F5F0] transition-colors"
              >
                RETURN TO DOCUMENTARY
              </button>
              <button
                type="button"
                onClick={handleDisconnect}
                className="py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#8C8C87] hover:text-red-400 hover:border-red-900/40 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="text-left">
              <label htmlFor="api-key-input" className="block text-[11px] font-sans text-[#8C8C87] mb-1.5 uppercase tracking-wider">
                API Key
              </label>
              <input
                id="api-key-input"
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter Gemini API key..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-[#F5F5F0] text-xs placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                autoComplete="off"
                disabled={loading}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-left text-[11px] leading-relaxed text-[#8C8C87] space-y-1">
              <span className="font-semibold text-[#F5F5F0] block font-mono text-[10px] uppercase tracking-wider text-amber-300">Gemini 3.1 Flash-Lite Integration</span>
              <span>This high-efficiency, sub-second latency model serves as the primary intelligence layer, generating synchronized evolutionary history, taxonomic profiles, and lineage records dynamically.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-white text-black font-sans text-xs font-medium tracking-wider hover:bg-[#F5F5F0] disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Connecting...</span>
              ) : (
                <span>CONNECT</span>
              )}
            </button>
          </form>
        )}

        {/* Security & Privacy explanation */}
        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center space-x-2 text-[11px] text-[#8C8C87]">
          <Shield className="w-3.5 h-3.5 opacity-60" />
          <span>The key is retained securely in memory for this documentary session.</span>
        </div>
      </div>
    </div>
  );
};

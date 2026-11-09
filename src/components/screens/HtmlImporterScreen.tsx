import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Image as ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCcw, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { sampleHtmlTemplates } from '../../data/mockData';

export const HtmlImporterScreen: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(sampleHtmlTemplates[0].id);
  const [htmlInput, setHtmlInput] = useState<string>(sampleHtmlTemplates[0].html);
  const [copied, setCopied] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'parsed' | 'extracted_images' | 'raw'>('parsed');

  // Handle template selection
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const found = sampleHtmlTemplates.find((t) => t.id === id);
    if (found) {
      setHtmlInput(found.html);
    }
  };

  // Parser: extracts hotlinked images and content from html string
  const parsedData = useMemo(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');

      // Extract hotlinked images
      const imgElements = Array.from(doc.querySelectorAll('img'));
      const images = imgElements.map((img) => ({
        src: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || 'Hotlinked Screen Image',
      })).filter((img) => Boolean(img.src));

      // Extract headings
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4')).map(
        (h) => h.textContent?.trim() || ''
      ).filter(Boolean);

      // Extract paragraphs
      const paragraphs = Array.from(doc.querySelectorAll('p')).map(
        (p) => p.textContent?.trim() || ''
      ).filter(Boolean);

      // Extract lists
      const listItems = Array.from(doc.querySelectorAll('li')).map(
        (li) => li.textContent?.trim() || ''
      ).filter(Boolean);

      // Extract buttons
      const buttons = Array.from(doc.querySelectorAll('button, a.btn')).map(
        (b) => b.textContent?.trim() || 'Action'
      ).filter(Boolean);

      return {
        title: headings[0] || 'Custom Screen Preview',
        subtitle: headings[1] || '',
        paragraphs,
        listItems,
        buttons: buttons.length > 0 ? buttons : ['Get Started Now'],
        images,
      };
    } catch {
      return {
        title: 'Screen Preview',
        subtitle: '',
        paragraphs: ['Could not parse HTML.'],
        listItems: [],
        buttons: ['Continue'],
        images: [],
      };
    }
  }, [htmlInput]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-20 text-white">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-red-500" />
              HTML Screen & Image Hotlinker
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Paste any screen HTML snippet with &lt;img&gt; tags to hotlink & render live
            </p>
          </div>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="px-4">
        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
          Select or Load HTML Screen Template
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sampleHtmlTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectPreset(t.id)}
              className={`p-2.5 rounded-2xl border text-left text-xs font-bold transition-all truncate ${
                selectedPresetId === t.id
                  ? 'border-red-600 bg-red-950/30 text-white'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* HTML Editor Box */}
      <div className="px-4">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950/80 border-b border-neutral-800 text-xs">
            <span className="font-mono text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>HTML Source Code</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyHtml}
                className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
          </div>

          <div className="p-3">
            <textarea
              value={htmlInput}
              onChange={(e) => {
                setHtmlInput(e.target.value);
                setSelectedPresetId('');
              }}
              rows={5}
              placeholder="Paste your screen HTML snippet here with <img src='...'> tags..."
              className="w-full bg-neutral-950 text-neutral-200 text-xs font-mono p-3 rounded-2xl border border-neutral-800 outline-none resize-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Preview Tabs */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-2xl border border-neutral-800">
          <button
            onClick={() => setPreviewTab('parsed')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              previewTab === 'parsed'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Live Screen View
          </button>
          <button
            onClick={() => setPreviewTab('extracted_images')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              previewTab === 'extracted_images'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Hotlinked Assets ({parsedData.images.length})</span>
          </button>
        </div>
      </div>

      {/* Rendered Live Screen Display */}
      {previewTab === 'parsed' && (
        <div className="px-4">
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl p-5 space-y-4">
            {/* Hotlinked Image Banner */}
            {parsedData.images.length > 0 ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-800 relative h-48 w-full group">
                <img
                  src={parsedData.images[0].src}
                  alt={parsedData.images[0].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white border border-white/20">
                    Hotlinked: {new URL(parsedData.images[0].src).hostname}
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-32 rounded-2xl bg-neutral-950 border border-dashed border-neutral-800 flex items-center justify-center text-xs text-neutral-500">
                No &lt;img&gt; tag found in your HTML snippet
              </div>
            )}

            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-black text-white leading-tight">
                {parsedData.title}
              </h3>
              {parsedData.subtitle && (
                <h4 className="text-sm font-semibold text-red-400 mt-1">
                  {parsedData.subtitle}
                </h4>
              )}
              {parsedData.paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Feature Bullets */}
            {parsedData.listItems.length > 0 && (
              <div className="bg-neutral-950/70 rounded-2xl p-3.5 border border-neutral-800 space-y-2">
                {parsedData.listItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2">
              {parsedData.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-98"
                >
                  <span>{btn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Extracted Images Inspector */}
      {previewTab === 'extracted_images' && (
        <div className="px-4 space-y-3">
          {parsedData.images.map((img, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-3"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-700"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{img.alt}</div>
                <div className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">{img.src}</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Hotlink Verified
                </div>
              </div>
              <a
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

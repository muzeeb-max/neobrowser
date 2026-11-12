import { useMemo, useState } from 'react'
import { Search, X, Copy, Check, ChevronDown, Code2, Command, Sparkles } from 'lucide-react'
import { questions } from './questions.js'

function App() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return questions
    return questions.filter(item => `${item.title} ${item.statement} ${item.tags.join(' ')}`.toLowerCase().includes(q))
  }, [query])

  async function copyCode(item) {
    try {
      await navigator.clipboard.writeText(item.code)
      setCopiedId(item.id)
      window.setTimeout(() => setCopiedId(current => current === item.id ? null : current), 1600)
    } catch {
      const field = document.createElement('textarea')
      field.value = item.code
      field.style.position = 'fixed'; field.style.opacity = '0'
      document.body.appendChild(field); field.select(); document.execCommand('copy'); field.remove()
      setCopiedId(item.id); window.setTimeout(() => setCopiedId(null), 1600)
    }
  }

  return <main className="min-h-screen px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
    <div className="mx-auto max-w-[820px]">
      <header className="mb-9 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#252a37] bg-[#11141c] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#a8adbd]"><span className="h-1.5 w-1.5 rounded-full bg-[#8b91ff]"/> DAA LAB <span className="text-[#454a5a]">/</span> FAT QUICK REFERENCE</div>
        <h1 className="text-[34px] font-semibold tracking-[-1.2px] text-[#f1f1f5] sm:text-[42px]">Find it. Copy it. <span className="text-[#8b91ff]">Done.</span></h1>
        <p className="mt-2 text-[14px] text-[#848999]">Your algorithms, ready when you need them.</p>
      </header>

      <div className="sticky top-3 z-10 mb-5 rounded-xl border border-[#292d3a] bg-[#12151d]/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,.28)] backdrop-blur-xl">
        <div className="flex h-11 items-center gap-3 px-3">
          <Search size={18} className="shrink-0 text-[#868b9b]" strokeWidth={1.8}/>
          <input aria-label="Search questions" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search questions… try “dijkstra” or “queen”" className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-[#e5e7ef] outline-none placeholder:text-[#656a79]"/>
          {query ? <button onClick={() => setQuery('')} aria-label="Clear search" className="rounded-md p-1 text-[#868b9b] hover:bg-[#252936] hover:text-white"><X size={15}/></button> : <span className="hidden items-center gap-1 rounded border border-[#303443] bg-[#1a1e28] px-1.5 py-1 text-[10px] text-[#858a9b] sm:flex"><Command size={10}/> K</span>}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between px-1 text-[11px] text-[#737888]"><span>{query ? <><span className="font-medium text-[#c1c5d2]">{filtered.length}</span> {filtered.length === 1 ? 'result' : 'results'} for <span className="text-[#c1c5d2]">“{query}”</span></> : 'QUESTION BANK'}</span><span>{filtered.length} questions</span></div>

      <section className="space-y-2" aria-label="DAA questions">
        {filtered.map((item, index) => {
          const isOpen = openId === item.id
          return <article key={item.id} className={`overflow-hidden rounded-xl border transition-colors ${isOpen ? 'border-[#444a69] bg-[#11141c]' : 'border-[#232733] bg-[#101219] hover:border-[#343949]'}`}>
            <button onClick={() => setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5">
              <span className="w-8 shrink-0 font-mono text-[11px] text-[#777d8f]">{String(item.id).padStart(2,'0')}</span>
              <span className="min-w-0 flex-1"><span className="block text-[14px] font-medium text-[#e3e5ec]">{item.title}</span><span className="mt-1 block truncate text-[12px] text-[#818696]">{item.statement}</span></span>
              <ChevronDown size={17} className={`shrink-0 text-[#777d8f] transition-transform ${isOpen ? 'rotate-180 text-[#a3a8ff]' : ''}`}/>
            </button>
            {isOpen && <div className="border-t border-[#252a37] px-4 pb-4 pt-4 sm:px-5">
              <p className="mb-4 text-[13px] leading-6 text-[#b0b4c0]">{item.statement}</p>
              <div className="overflow-hidden rounded-lg border border-[#292e3a] bg-[#0c0e13]">
                <div className="flex h-10 items-center justify-between border-b border-[#252a34] px-3"><span className="flex items-center gap-2 text-[11px] text-[#888d9d]"><Code2 size={14} className="text-[#8b91ff]"/> Java <span className="text-[#575c6a]">·</span> {item.fileName}</span><button onClick={() => copyCode(item)} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${copiedId === item.id ? 'border-emerald-900/70 bg-emerald-950/50 text-emerald-300' : 'border-[#343949] bg-[#191d27] text-[#c5c8d2] hover:border-[#555d7d] hover:text-white'}`}>{copiedId === item.id ? <Check size={13}/> : <Copy size={13}/>} {copiedId === item.id ? 'Copied' : 'Copy code'}</button></div>
                <pre className="code-scroll max-h-[510px] overflow-auto p-4 font-mono text-[12px] leading-[1.75] text-[#c6cad7] whitespace-pre"><code>{item.code}</code></pre>
              </div>
            </div>}
          </article>
        })}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-[#303443] px-5 py-12 text-center"><Sparkles size={18} className="mx-auto mb-3 text-[#777dff]"/><p className="text-sm text-[#d4d6df]">No matching questions</p><p className="mt-1 text-xs text-[#777d8c]">Try a topic like “graph”, “sort”, or “puzzle”.</p></div>}
      </section>
      <footer className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#5e6371]"><Code2 size={13}/> 24 algorithms <span className="text-[#383d49]">·</span> Java source included</footer>
    </div>
  </main>
}

export default App

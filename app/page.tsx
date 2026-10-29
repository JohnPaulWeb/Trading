const backgroundImage =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-45zI4TBcUQmlpcbWj2Wa13zPWRh4ZF.png'

const stats = [
  ['3,500+', 'autonomous agents active'],
  ['99.97%', 'distributed uptime'],
  ['<50ms', 'execution latency'],
]

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="hero-shell relative isolate min-h-screen">
        <div
          aria-hidden="true"
          className="hero-art"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div aria-hidden="true" className="hero-grid" />
        <div aria-hidden="true" className="hero-glow hero-glow-one" />
        <div aria-hidden="true" className="hero-glow hero-glow-two" />

        <nav className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-white/10 px-6 py-5 lg:px-12">
          <a href="#top" className="text-xl font-semibold tracking-[-0.06em] sm:text-2xl">
            COMPUTE <sup className="ml-0.5 text-[9px] tracking-normal">TM</sup>
          </a>
          <div className="hidden items-center gap-9 text-sm text-white/70 md:flex">
            <a href="#capabilities" className="transition hover:text-white">Capabilities</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#infra" className="transition hover:text-white">Infra</a>
            <a href="#integrations" className="transition hover:text-white">Integrations</a>
            <a href="#security" className="transition hover:text-white">Security</a>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#signin" className="hidden text-white/70 transition hover:text-white sm:block">Sign in</a>
            <a href="#deploy" className="rounded-full bg-white px-5 py-2.5 font-medium text-black transition hover:bg-rose-100">Deploy agent</a>
          </div>
        </nav>

        <div id="top" className="relative z-10 mx-auto flex min-h-[calc(100vh-77px)] w-full max-w-[1440px] flex-col justify-between px-6 pb-9 pt-32 lg:px-12 lg:pb-10 lg:pt-40">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="h-px w-8 bg-rose-300/80" />
              Autonomous AI agents for distributed computing
            </div>
            <h1 className="max-w-4xl text-[clamp(3.5rem,8.3vw,8.2rem)] font-medium leading-[0.9] tracking-[-0.075em] text-balance">
              Intelligence that moves at the speed of your business.
            </h1>
            <p className="mt-8 max-w-md text-base leading-7 text-white/65 sm:text-lg">
              Build, deploy, and orchestrate autonomous agents across your entire compute stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#deploy" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-rose-100">Start building <span aria-hidden="true">↗</span></a>
              <a href="#capabilities" className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60 hover:bg-white/10">Explore platform</a>
            </div>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-6 border-t border-white/20 pt-6 sm:grid-cols-3 sm:gap-10">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-medium tracking-[-0.06em] sm:text-4xl">{value}</p>
                <p className="mt-1 text-xs text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-y border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-kicker">01 / Capabilities</p>
            <h2 className="mt-6 max-w-lg text-4xl font-medium leading-[.95] tracking-[-.06em] sm:text-6xl">The operating system for intelligent work.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/55">From your first prototype to millions of executions, Compute gives every agent the context, tools, and infrastructure to do its best work.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ['Deploy anywhere', 'Run agents across cloud, edge, and private infrastructure with one unified control plane.'],
              ['Think in systems', 'Coordinate specialized agents that share context, memory, and responsibility.'],
              ['Built for velocity', 'Ship reliable workflows with observability, versioning, and instant rollbacks built in.'],
              ['Scale with confidence', 'Automatic orchestration keeps performance high while infrastructure stays efficient.'],
            ].map(([title, copy], index) => (
              <article key={title} className="group bg-[#080808] p-7 transition-colors hover:bg-[#101010] sm:p-9">
                <span className="font-mono text-xs text-rose-300/80">0{index + 1}</span>
                <h3 className="mt-14 text-xl font-medium tracking-[-.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{copy}</p>
                <span className="mt-8 block text-xl text-white/35 transition group-hover:translate-x-1 group-hover:text-rose-200">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
            <div><p className="section-kicker">02 / Process</p><h2 className="mt-5 text-4xl font-medium tracking-[-.06em] sm:text-6xl">From prompt to production.</h2></div>
            <p className="max-w-xs text-sm leading-6 text-white/50">A clear path from a bold idea to an agent your team can trust.</p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              ['Define', 'Describe the outcome. We help shape the right agent architecture for the job.'],
              ['Compose', 'Connect models, tools, data, and people into a workflow that gets smarter over time.'],
              ['Operate', 'Monitor every run, learn from results, and improve performance without slowing down.'],
            ].map(([title, copy], index) => (
              <div key={title} className="relative border-l border-rose-300/40 pl-6">
                <span className="font-mono text-xs text-white/40">STEP 0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-medium tracking-[-.04em]">{title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-t border-white/10 bg-[#f1ede8] px-6 py-24 text-[#0a0a0a] lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div><p className="section-kicker text-black/50">03 / Trust layer</p><h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[.92] tracking-[-.07em] sm:text-7xl">Serious infrastructure for ambitious teams.</h2></div>
          <a href="#deploy" className="inline-flex w-fit rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-950">Talk to our team <span className="ml-2">↗</span></a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-6 bg-[#050505] px-6 py-8 text-sm text-white/45 sm:flex-row lg:px-12">
        <span className="font-medium tracking-[-.04em] text-white">COMPUTE <sup className="text-[8px]">TM</sup></span>
        <span>Autonomous intelligence, distributed.</span>
        <span>© 2026 Compute Systems</span>
      </footer>
    </main>
  )
}


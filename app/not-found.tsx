export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0b0e14] text-white font-mono text-sm">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-white/60 mb-4">Trading Instrument or Page Not Found</p>
        <a href="/" className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition">
          Return to Terminal
        </a>
      </div>
    </div>
  )
}


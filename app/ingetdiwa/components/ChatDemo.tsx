type Bubble = { from: "user" | "bot"; text: string };

const conversation: Bubble[] = [
  { from: "user", text: "jemput adik di sekolah jam 3 sore" },
  {
    from: "bot",
    text: "Sip! Jadwal ditambahkan:\n1. Jemput adik di sekolah (15:00)",
  },
  { from: "user", text: "ingetin bayar token listrik abis isya" },
  {
    from: "bot",
    text: "Sip! Jadwal ditambahkan:\n2. Bayar token listrik (19:30)",
  },
  { from: "user", text: "list" },
  {
    from: "bot",
    text: "Tugas hari ini:\n1. Jemput adik di sekolah (15:00)\n2. Bayar token listrik (19:30)",
  },
  { from: "user", text: "1 done" },
  {
    from: "bot",
    text: "Bagus! Tugas 1 selesai. ✅\n\nTugas hari ini:\n2. Bayar token listrik (19:30)\n\nSudah selesai:\n~1. Jemput adik di sekolah~",
  },
];

export default function ChatDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-sm font-bold text-slate-900">
            ID
          </div>
          <div>
            <p className="text-sm font-semibold text-white">IngetDiWA</p>
            <p className="text-xs text-emerald-100">online</p>
          </div>
        </div>

        <div className="space-y-2 bg-[#0b141a] px-3 py-4">
          {conversation.map((bubble, index) => (
            <div
              key={index}
              className={bubble.from === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <p
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  bubble.from === "user"
                    ? "rounded-br-sm bg-[#005c4b] text-white"
                    : "rounded-bl-sm bg-[#202c33] text-slate-100"
                }`}
              >
                {bubble.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Tangkapan layar percakapan asli dari bot IngetDiWA.
      </p>
    </div>
  );
}

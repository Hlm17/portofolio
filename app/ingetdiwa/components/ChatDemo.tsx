import Image from "next/image";
import { Fragment, type ReactNode } from "react";

type Bubble = { from: "user" | "bot"; text: string };

/**
 * Percakapan ini meniru perilaku bot yang sebenarnya.
 *
 * Bedanya dengan versi sebelumnya: setiap tugas baru masuk ke SATU daftar yang
 * sudah ada dengan penomoran lanjut, bukan menampilkan daftar baru yang mulai
 * dari nomor 1 lagi. Tugas yang baru ditambahkan dibungkus `_garis bawah_`
 * supaya tampil miring, persis balasan asli bot di WhatsApp.
 */
const conversation: Bubble[] = [
  { from: "user", text: "jemput adik di sekolah jam 3 sore" },
  {
    from: "bot",
    text: "Tugas 'jemput adik di sekolah jam 3 sore' ditambahkan:\n1. _Jemput adik di sekolah (15:00)_",
  },
  { from: "user", text: "ingetin bayar token listrik abis isya" },
  {
    from: "bot",
    text: "Tugas 'ingetin bayar token listrik abis isya' ditambahkan:\n1. Jemput adik di sekolah (15:00)\n2. _Bayar token listrik (19:30)_",
  },
  { from: "user", text: "list" },
  {
    from: "bot",
    text: "Tugas hari ini:\n1. Jemput adik di sekolah (15:00)\n2. Bayar token listrik (19:30)",
  },
  { from: "user", text: "1 done" },
  {
    from: "bot",
    text: "Bagus! Tugas 1 selesai.\n\nTugas hari ini:\n2. Bayar token listrik (19:30)\n\nSudah selesai:\n~1. Jemput adik di sekolah~",
  },
];

/**
 * Penanda WhatsApp yang dipakai bot: `_miring_` dan `~tercoret~`.
 * Tanpa ini, tanda garis bawah dan gelombang akan ikut tercetak apa adanya.
 */
function renderLine(line: string, keyPrefix: number): ReactNode[] {
  return line
    .split(/(_[^_]+_|~[^~]+~)/g)
    .filter((part) => part !== "")
    .map((part, index) => {
      const key = `${keyPrefix}-${index}`;
      if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }
      if (part.length > 2 && part.startsWith("~") && part.endsWith("~")) {
        return (
          <s key={key} className="text-white/45">
            {part.slice(1, -1)}
          </s>
        );
      }
      return <Fragment key={key}>{part}</Fragment>;
    });
}

export default function ChatDemo() {
  return (
    <div className="w-full max-w-[360px]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_24px_80px_-24px_rgba(58,41,255,0.55)]">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3.5 py-3">
          <Image
            src="/ingetdiwa-icon.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-white">IngetDiWA</p>
            <p className="text-[11px] text-brand-cyan">aktif menerima pesan</p>
          </div>
        </div>

        <div className="mt-1.5 space-y-1.5 rounded-xl bg-black/40 px-3 py-4">
          {conversation.map((bubble, index) => (
            <div
              key={index}
              className={bubble.from === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <p
                className={`max-w-[82%] rounded-xl px-3 py-2 text-[12.5px] leading-relaxed ${
                  bubble.from === "user"
                    ? "rounded-br-sm bg-brand-blue text-white"
                    : "rounded-bl-sm border border-white/10 bg-white/[0.06] text-white/85"
                }`}
              >
                {bubble.text.split("\n").map((line, lineIndex) => (
                  <Fragment key={lineIndex}>
                    {lineIndex > 0 && <br />}
                    {renderLine(line, lineIndex)}
                  </Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[12px] text-white/35">
        Percakapan sebenarnya dengan bot. Semua tanda waktu dihitung otomatis oleh sistem.
      </p>
    </div>
  );
}

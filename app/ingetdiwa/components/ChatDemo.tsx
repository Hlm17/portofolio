import Image from "next/image";
import { Fragment, type ReactNode } from "react";

type Bubble = { from: "user" | "bot"; text: string };

/**
 * Percakapan ini meniru balasan bot yang sebenarnya, redaksi dan tanda
 * pemformatan WhatsApp-nya sekaligus:
 *  - Tugas baru masuk ke SATU daftar yang sudah ada dengan penomoran lanjut,
 *    dan hanya baris baru itu yang dicetak miring (dibungkus `_garis bawah_`).
 *  - Judul daftar dicetak tebal (`*bintang*`), sama seperti balasan asli bot.
 *  - Setelah satu tugas dicoret, nomor daftar dirapikan lagi dari 1, dan
 *    tugas yang selesai dipindah ke daftar coretan (`~garis gelombang~`).
 *  - Satu tugas sengaja ditulis tanpa jam, karena bot juga menyimpan tugas
 *    yang belum punya waktu sama sekali.
 */
const conversation: Bubble[] = [
  { from: "user", text: "jemput adik di sekolah jam 4 sore" },
  {
    from: "bot",
    text: "Tugas 'jemput adik di sekolah jam 4 sore' ditambahkan:\n1. _Jemput adik di sekolah (16:00)_",
  },
  { from: "user", text: "beli galon air minum" },
  {
    from: "bot",
    text: "Tugas 'beli galon air minum' ditambahkan:\n1. Jemput adik di sekolah (16:00)\n2. _Beli galon air minum_",
  },
  { from: "user", text: "bayar tagihan listrik abis isya" },
  {
    from: "bot",
    text: "Tugas 'bayar tagihan listrik abis isya' ditambahkan:\n1. Jemput adik di sekolah (16:00)\n2. Beli galon air minum\n3. _Bayar tagihan listrik (19:30)_",
  },
  { from: "user", text: "list" },
  {
    from: "bot",
    text: '📋 *Tugas hari ini:*\n\n1. Jemput adik di sekolah (16:00)\n2. Beli galon air minum\n3. Bayar tagihan listrik (19:30)\n\n_Ketik "1 done" untuk menyelesaikan tugas nomor 1._',
  },
  { from: "user", text: "1 done" },
  {
    from: "bot",
    text: "Bagus! Tugas 1 selesai. ✅\n*Tugas hari ini:*\n1. Beli galon air minum\n2. Bayar tagihan listrik (19:30)\n\n*Sudah selesai (List selesai direset setiap hari):*\n~Jemput adik di sekolah~",
  },
];

/**
 * Penanda WhatsApp yang dipakai bot: `_miring_`, `*tebal*`, dan `~tercoret~`.
 * Tanpa ini, tanda-tandanya ikut tercetak apa adanya.
 */
function renderLine(line: string, keyPrefix: number): ReactNode[] {
  return line
    .split(/(_[^_]+_|\*[^*]+\*|~[^~]+~)/g)
    .filter((part) => part !== "")
    .map((part, index) => {
      const key = `${keyPrefix}-${index}`;
      const wrapped = /^(_|\*|~)([\s\S]+)\1$/.exec(part);
      if (wrapped) {
        const teks = wrapped[2];
        if (wrapped[1] === "_") return <em key={key}>{teks}</em>;
        if (wrapped[1] === "*") {
          return (
            <strong key={key} className="font-semibold text-white">
              {teks}
            </strong>
          );
        }
        return (
          <s key={key} className="text-white/45">
            {teks}
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
        Percakapan sebenarnya dengan bot. Tugas tanpa jam tetap tersimpan di daftar Anda.
      </p>
    </div>
  );
}

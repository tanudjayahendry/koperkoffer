import fs from "fs";
import path from "path";

// UTIL baca file JSON
function readJSON(filePath) {
  const full = path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(full, "utf-8");
  return JSON.parse(raw);
}

export default function HomePage() {
  const productsDir = path.join(process.cwd(), "content/products");
  const productFiles = fs.readdirSync(productsDir);

  const products = productFiles
    .map((file) => readJSON(`content/products/${file}`))
    .filter((p) => p.active);

  const batchesDir = path.join(process.cwd(), "content/batches");
  const batchFiles = fs.readdirSync(batchesDir);
  const batches = batchFiles.map((file) => readJSON(`content/batches/${file}`));

  const config = readJSON("content/config/site.json");

  const productsDE = products.filter((p) => p.direction === "DE_TO_ID");
  const productsID = products.filter((p) => p.direction === "ID_TO_DE");

  const batchDE = batches.find((b) => b.direction === "DE_TO_ID");
  const batchID = batches.find((b) => b.direction === "ID_TO_DE");

  return (
    <div className="py-10 space-y-14">
      {/* HERO */}
      <section className="grid gap-10 md:grid-cols-[1.3fr,1fr] items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-kk-muted">
            JERMAN ↔ INDONESIA
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-kk-cream leading-tight">
            Layanan titip barang lintas{" "}
            <span className="text-kk-accent">Jerman &amp; Indonesia</span>
          </h1>
          <p className="text-sm md:text-base text-kk-muted max-w-xl">
            KoperKoffer membantu Anda menitip barang dari Jerman ke Indonesia
            dan sebaliknya, dengan batch terjadwal dan komunikasi langsung
            melalui WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${config.whatsapp_number}`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-kk-accent text-kk-navy hover:opacity-90 transition"
            >
              Hubungi via WhatsApp
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium border border-kk-border text-kk-cream hover:bg-kk-border/60 transition"
            >
              Lihat produk
            </a>
          </div>
        </div>

        <div className="border border-kk-border rounded-2xl p-5 bg-gradient-to-br from-kk-border/40 to-kk-navy">
          <h2 className="text-sm font-semibold text-kk-muted mb-3">
            Ringkasan batch aktif
          </h2>
          <div className="space-y-4 text-sm">
            <BatchSummary
              title={batchDE?.from_label || "Jastip Jerman → Indonesia"}
              batch={batchDE}
            />
            <div className="h-px bg-kk-border/70" />
            <BatchSummary
              title={batchID?.from_label || "Jastip Indonesia → Jerman"}
              batch={batchID}
            />
          </div>
        </div>
      </section>

      {/* SECTION: DE -> ID */}
      <section
        id="products"
        className="space-y-4 border border-kk-border rounded-2xl p-6 bg-kk-navy/40"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-kk-cream">
              {batchDE?.from_label || "Jastip Jerman → Indonesia"}
            </h2>
            {batchDE && (
              <p className="text-xs text-kk-muted mt-1">
                Terima barang sampai{" "}
                <span className="text-kk-cream">
                  {batchDE.receive_until}
                </span>{" "}
                · Estimasi sampai{" "}
                <span className="text-kk-cream">
                  {batchDE.arrival_estimate_text}
                </span>{" "}
                · Status:{" "}
                <span className="text-kk-accent">{batchDE.status}</span>
              </p>
            )}
          </div>
        </div>

        <ProductGrid products={productsDE} />
      </section>

      {/* SECTION: ID -> DE */}
      <section className="space-y-4 border border-kk-border rounded-2xl p-6 bg-kk-navy/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-kk-cream">
              {batchID?.from_label || "Jastip Indonesia → Jerman"}
            </h2>
            {batchID && (
              <p className="text-xs text-kk-muted mt-1">
                Terima barang sampai{" "}
                <span className="text-kk-cream">
                  {batchID.receive_until}
                </span>{" "}
                · Estimasi sampai{" "}
                <span className="text-kk-cream">
                  {batchID.arrival_estimate_text}
                </span>{" "}
                · Status:{" "}
                <span className="text-kk-accent">{batchID.status}</span>
              </p>
            )}
          </div>
        </div>

        <ProductGrid products={productsID} />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-kk-border/70 pt-6 mt-4 text-xs text-kk-muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-4">
            <a
              className="hover:text-kk-cream"
              href={`https://wa.me/${config.whatsapp_number}`}
            >
              WhatsApp
            </a>
            <a
              className="hover:text-kk-cream"
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
          <p>© {new Date().getFullYear()} KoperKoffer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function BatchSummary({ title, batch }) {
  if (!batch) {
    return (
      <div className="text-kk-muted">
        <p className="font-medium text-kk-cream">{title}</p>
        <p className="text-xs mt-1">Belum ada batch aktif.</p>
      </div>
    );
  }

  return (
    <div className="text-kk-muted">
      <p className="font-medium text-kk-cream">{title}</p>
      <p className="text-xs mt-1">
        Terima barang sampai{" "}
        <span className="text-kk-cream">{batch.receive_until}</span>
        <br />
        Estimasi sampai{" "}
        <span className="text-kk-cream">{batch.arrival_estimate_text}</span>
        <br />
        Status: <span className="text-kk-accent">{batch.status}</span>
      </p>
    </div>
  );
}

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-sm text-kk-muted">
        Belum ada produk aktif untuk batch ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border border-kk-border rounded-xl p-3 bg-kk-navy/60"
        >
          <div className="w-full aspect-square bg-kk-border/60 rounded-lg flex items-center justify-center">
            {p.images?.[0] ? (
              <img
                src={p.images[0]}
                className="w-full h-full object-contain"
                alt={p.title}
              />
            ) : (
              <span className="text-kk-muted text-xs">No image</span>
            )}
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-xs font-medium text-kk-cream line-clamp-2">
              {p.title}
            </p>
            <p className="text-xs text-kk-muted">
              {p.price_public} {p.currency}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

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

  const batches = batchFiles.map((file) =>
    readJSON(`content/batches/${file}`)
  );

  const config = readJSON("content/config/site.json");

  // Pisah product & batch per direction
  const productsDE = products.filter((p) => p.direction === "DE_TO_ID");
  const productsID = products.filter((p) => p.direction === "ID_TO_DE");

  const batchDE = batches.find((b) => b.direction === "DE_TO_ID");
  const batchID = batches.find((b) => b.direction === "ID_TO_DE");

  return (
    <main className="p-4 max-w-4xl mx-auto">

      {/* HERO */}
      <section className="text-center py-10 bg-kk-blue rounded-2xl mb-10">
        <div className="flex justify-center mb-6">
          <img
            src="/maskot-koperkoffer.png"
            alt="Koper & Koffer"
            className="w-64 h-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-kk-text">
          Titip barang dari Jerman?
        </h1>
        <h2 className="text-xl text-kk-text/70 mb-6">
          Titip oleh-oleh dari Indonesia?
        </h2>

        <div className="flex justify-center gap-4">
          <a
            href={`https://wa.me/${config.whatsapp_number}`}
            className="bg-kk-mint text-kk-text px-6 py-3 rounded-lg font-semibold border border-kk-text/20"
          >
            WhatsApp
          </a>

          <a
            href="#products"
            className="bg-kk-yellow text-kk-text px-6 py-3 rounded-lg font-semibold border border-kk-text/20"
          >
            Lihat Produk
          </a>
        </div>
      </section>

      {/* SECTION: DE -> ID */}
      <section id="products" className="my-14 bg-kk-yellow p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-2 text-kk-text">
          {batchDE?.from_label || "Jastip Jerman → Indonesia"}
        </h2>

        <ul className="text-kk-text/80 mb-4 text-sm">
          {batchDE && (
            <>
              <li>Terima barang sampai: {batchDE.receive_until}</li>
              <li>Estimasi sampai: {batchDE.arrival_estimate_text}</li>
              <li>Status: {batchDE.status}</li>
            </>
          )}
        </ul>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {productsDE.map((p) => (
            <div key={p.id} className="border border-kk-text/20 rounded-lg p-3 bg-white">
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    className="w-full h-full object-contain"
                    alt={p.title}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>

              <div className="mt-2">
                <p className="font-semibold text-kk-text">{p.title}</p>
                <p className="text-kk-text/70 text-sm">
                  {p.price_public} {p.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: ID -> DE */}
      <section className="my-14 bg-kk-peach p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-2 text-kk-text">
          {batchID?.from_label || "Jastip Indonesia → Jerman"}
        </h2>

        <ul className="text-kk-text/80 mb-4 text-sm">
          {batchID && (
            <>
              <li>Terima barang sampai: {batchID.receive_until}</li>
              <li>Estimasi sampai: {batchID.arrival_estimate_text}</li>
              <li>Status: {batchID.status}</li>
            </>
          )}
        </ul>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {productsID.map((p) => (
            <div key={p.id} className="border border-kk-text/20 rounded-lg p-3 bg-white">
              <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    className="w-full h-full object-contain"
                    alt={p.title}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>

              <div className="mt-2">
                <p className="font-semibold text-kk-text">{p.title}</p>
                <p className="text-kk-text/70 text-sm">
                  {p.price_public} {p.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-kk-text/70 py-8 border-t mt-10">
        <div className="flex justify-center gap-6 mb-2">
          <a
            className="text-kk-text font-semibold"
            href={`https://wa.me/${config.whatsapp_number}`}
          >
            WhatsApp
          </a>
          <a
            className="text-kk-text font-semibold"
            href="https://instagram.com/"
          >
            Instagram
          </a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} KoperKoffer</p>
      </footer>
    </main>
  );
}

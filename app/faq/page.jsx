import fs from "fs";
import path from "path";

function readJSON(filePath) {
  const full = path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(full, "utf-8");
  return JSON.parse(raw);
}

export default function FAQPage() {
  const faq = readJSON("content/faq/faq.json");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        {faq.items.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4 bg-white">
            <p className="font-semibold text-gray-800">{item.q}</p>
            <p className="text-gray-600 mt-1 text-sm">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

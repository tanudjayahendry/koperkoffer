import fs from "fs";
import path from "path";

function readJSON(filePath) {
  const raw = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
  return JSON.parse(raw);
}

export default function HowItWorks() {
  const data = readJSON("content/howitworks/howitworks.json");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cara Titip</h1>

      <ol className="space-y-4 list-decimal list-inside">
        {data.steps.map((step, idx) => (
          <li key={idx} className="border rounded-lg p-4 bg-white text-gray-700">
            {step}
          </li>
        ))}
      </ol>
    </main>
  );
}

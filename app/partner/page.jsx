import fs from "fs";
import path from "path";
import PartnerClient from "./PartnerClient";

// server util
function readJSON(filePath) {
  const full = path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(full, "utf8"));
}

export default function PartnerPage() {
  const productsDir = path.join(process.cwd(), "content/products");
  const productFiles = fs.readdirSync(productsDir);

  const products = productFiles.map((f) => readJSON(`content/products/${f}`));

  return <PartnerClient products={products} />;
}

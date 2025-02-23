import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { ContractData } from "@/types";

export async function POST(req: Request) {
  try {
    const data: ContractData = await req.json();

    const uniqueLink = "https://diyor-dev.uz";

    const qrCodeData = await QRCode.toDataURL(uniqueLink);
    const qrCodeBuffer = Buffer.from(qrCodeData.split(",")[1], "base64");

    const templatePath = path.join(process.cwd(), "public", "template.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [
        new ImageModule({
          getImage(tag: string) {
            if (tag === "qrcode") {
              return qrCodeBuffer;
            }
            return null;
          },
          getSize() {
            return [100, 100];
          },
        }),
      ],
    });

    doc.render({
      ...data,
      qrcode: "qrcode",
    });

    const buffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    return new NextResponse(buffer);
  } catch (error: unknown) {
    console.error("Xatolik:", error);
    return new NextResponse(`Xatolik yuz berdi: ${error}`, { status: 500 });
  }
}

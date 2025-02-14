import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { NextResponse } from "next/server";
import { ContractData } from "@/types";

export async function POST(req: Request) {
  try {
    const data: ContractData = await req.json();

    const templatePath = path.join(process.cwd(), "public", "template.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      ...data,
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

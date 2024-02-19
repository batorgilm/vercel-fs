import { createWriteStream, readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('filename');

  const file = path.join(process.cwd(), 'tmp', filename as string);
  const stringField = readFileSync(file, 'utf8');
  return NextResponse.json({ message: stringField });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, filename }: any = body;

    let fileContent = createWriteStream(`tmp/${filename}.txt`, 'utf8');

    fileContent.write(title);

    return NextResponse.json({
      msg: `File ${filename} saved to tmp folder.`,
    });
  } catch (error: any) {
    throw new Error(error?.message as string);
  }
}

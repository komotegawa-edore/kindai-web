import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { ensureTables } from "@/lib/init-db";
import { readFile, stat } from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; file: string }> }
) {
  try {
    const { slug, file } = await params;

    // ファイル名のバリデーション（パストラバーサル防止）
    if (!/^\d{3}\.mp3$/.test(file)) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // トークン検証（audioタグはカスタムヘッダー不可のためクエリパラメータ）
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await ensureTables();
    const sql = neon(process.env.DATABASE_URL!);

    const sessions = await sql`
      SELECT s.book_id, b.slug
      FROM tokuten_sessions s
      JOIN tokuten_books b ON b.id = s.book_id
      WHERE s.token = ${token}
        AND s.expires_at > NOW()
        AND b.slug = ${slug}
      LIMIT 1
    `;

    if (sessions.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ファイルパス解決
    const filePath = path.join(process.cwd(), "audio-protected", slug, file);

    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileSize = fileStat.size;
    const rangeHeader = request.headers.get("Range");

    // Rangeリクエスト対応（シーク操作用）
    if (rangeHeader) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

        if (start >= fileSize) {
          return new NextResponse("Range Not Satisfiable", {
            status: 416,
            headers: { "Content-Range": `bytes */${fileSize}` },
          });
        }

        const buffer = await readFile(filePath);
        const chunk = buffer.subarray(start, end + 1);

        return new NextResponse(chunk, {
          status: 206,
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Length": String(chunk.length),
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Cache-Control": "private, max-age=3600",
          },
        });
      }
    }

    // 通常レスポンス
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(fileSize),
        "Accept-Ranges": "bytes",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Audio serve error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

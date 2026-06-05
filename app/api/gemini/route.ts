import { NextResponse } from 'next/server';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface GeminiRequestBody {
  question?: string;
  source?: string;
  sectionTitle?: string;
  mode?: 'textbook' | 'free'; // textbook = markdown-grounded, free = full Gemini knowledge
  history?: ChatTurn[];       // previous conversation turns for multi-turn chat
}

const SYSTEM_TEXTBOOK = [
  'Bạn là trợ lý học tập môn Lý luận chính trị — Chương 6: Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội.',
  'Trả lời ngắn gọn, rõ ràng, đúng trọng tâm bằng tiếng Việt.',
  'Ưu tiên dựa vào trích đoạn giáo trình được cung cấp để trả lời.',
  'Nếu câu hỏi vượt ngoài phạm vi trích đoạn, vẫn trả lời bằng kiến thức Lý luận chính trị tổng quát và ghi chú rõ.',
].join('\n');

const SYSTEM_FREE = [
  'Bạn là chuyên gia về Lý luận chính trị Mác - Lênin, lịch sử tư tưởng chính trị và vấn đề dân tộc.',
  'Trả lời đầy đủ, sâu sắc bằng tiếng Việt. Có thể mở rộng ra ngoài phạm vi giáo trình.',
  'Đưa ra phân tích, ví dụ cụ thể và kết nối với thực tiễn Việt Nam và thế giới khi phù hợp.',
  'Nếu câu hỏi không liên quan đến Lý luận chính trị, hãy lịch sự nhắc nhở người dùng.',
].join('\n');

const buildTextbookContents = (
  question: string,
  source: string,
  sectionTitle: string,
  history: ChatTurn[],
) => {
  const trimmedSource = source?.slice(0, 2000) ?? '';

  // System message as first user turn (Gemini doesn't have system role in v1beta)
  const systemPart = {
    role: 'user' as const,
    parts: [{
      text: `${SYSTEM_TEXTBOOK}\n\n---\nChủ đề: ${sectionTitle || 'Lý luận chính trị'}\nTrích đoạn giáo trình:\n${trimmedSource || 'Không có trích đoạn phù hợp.'}\n---\nHãy xác nhận bạn đã hiểu vai trò và sẵn sàng trả lời.`,
    }],
  };
  const systemAck = {
    role: 'model' as const,
    parts: [{ text: 'Tôi đã hiểu. Tôi sẽ trả lời các câu hỏi dựa trên giáo trình và kiến thức Lý luận chính trị.' }],
  };

  // Previous conversation history
  const historyContents = history.map(turn => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  // Current question
  const currentQuestion = {
    role: 'user' as const,
    parts: [{ text: question }],
  };

  return [systemPart, systemAck, ...historyContents, currentQuestion];
};

const buildFreeContents = (question: string, history: ChatTurn[]) => {
  const systemPart = {
    role: 'user' as const,
    parts: [{ text: `${SYSTEM_FREE}\n\nHãy xác nhận bạn đã hiểu vai trò.` }],
  };
  const systemAck = {
    role: 'model' as const,
    parts: [{ text: 'Tôi sẵn sàng. Hãy hỏi bất kỳ điều gì về Lý luận chính trị!' }],
  };

  const historyContents = history.map(turn => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const currentQuestion = {
    role: 'user' as const,
    parts: [{ text: question }],
  };

  return [systemPart, systemAck, ...historyContents, currentQuestion];
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
  }

  let body: GeminiRequestBody;
  try {
    body = (await request.json()) as GeminiRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.question || typeof body.question !== 'string') {
    return NextResponse.json({ error: 'question is required' }, { status: 400 });
  }

  const mode = body.mode ?? 'textbook';
  const history = body.history ?? [];

  const contents =
    mode === 'free'
      ? buildFreeContents(body.question, history)
      : buildTextbookContents(body.question, body.source ?? '', body.sectionTitle ?? '', history);

  const requestBody = JSON.stringify({
    contents,
    generationConfig: {
      temperature: mode === 'free' ? 0.7 : 0.4,
      maxOutputTokens: mode === 'free' ? 1024 : 600,
    },
  });

  let geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    },
  );

  // Fallback to 2.0-flash-lite if 2.5-flash is overloaded (503) or fails
  if (!geminiResponse.ok && geminiResponse.status === 503) {
    console.log("Gemini 2.5 Flash 503 Overloaded. Falling back to 2.0-flash-lite...");
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      },
    );
  }

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    return NextResponse.json(
      { error: 'Gemini API request failed', detail: errorText },
      { status: geminiResponse.status },
    );
  }

  const data = (await geminiResponse.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const answer =
    data.candidates?.[0]?.content?.parts?.map(part => part.text ?? '').join('')?.trim() ??
    '';

  if (!answer) {
    return NextResponse.json({ error: 'Gemini returned empty response' }, { status: 502 });
  }

  return NextResponse.json({ answer });
}

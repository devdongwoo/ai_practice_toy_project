import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { topic, keywords, style } = await req.json();

        const styleGuides = {
            tutorial: `
        - 목적: 초보자를 위한 단계별 가이드
        - 구조: 제목(학습 목표) -> 제목(사용목적) -> 제목(주요기능) -> 제목(사전 준비) -> 단계별 진행(Step 1, 2, 3...)(코드 예시 자세하게)  -> 제목(마무리)
        - 말투: 친절하고 상세한 선생님 톤
        - 특이사항: 각 단계마다 실행 가능한 코드 예시와 자세한 설명을 반드시 포함할 것.
      `,
            til: `
        - 목적: 핵심 개념의 간결한 기록
        - 구조: 학습 주제 요약 -> 주요 내용(이론) -> 핵심 코드 -> 회고(깨달은 점)
        - 말투: 담백하고 군더더기 없는 기록용 말투
        - 특이사항: 불필요한 수식어는 제외하고 핵심 위주로 작성할 것.
      `,
            troubleshooting: `
        - 목적: 에러 해결 과정 기록
        - 구조: 문제 상황(에러 메시지 포함) -> 원인 분석 -> 해결 방법(수정 코드) -> 결론(재발 방지)
        - 말투: 논리적이고 분석적인 전문가 톤
        - 특이사항: 발생할 수 있는 구체적인 에러 상황을 가정하여 기술적으로 분석할 것.
      `
        };

        const selectedGuide = styleGuides[style as keyof typeof styleGuides];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `당신은 숙련된 기술 블로그 작가입니다. 다음 가이드라인을 엄격히 준수하여 글을 작성하세요.
          
          [가이드라인]
          ${selectedGuide}
          
          [출력 형식]
          - 반드시 JSON 객체 형식으로만 응답하세요.
          - 형식: { "title": "글 제목", "content": "마크다운 본문", "hashtags": ["#태그1", "#태그2"], "description": "검색엔진 노출을 위해서 최대한 짧고 강렬한 요약 매끄러운 문구(핵심 키워드 포함)" }
          - 본문 내 소제목은 ##, ###를 사용하고 코드 블록에는 반드시 언어 명시(예: \`\`\`javascript)를 하세요.`
                },
                {
                    role: "user",
                    content: `주제: ${topic}\n키워드: ${keywords ? keywords.join(', ') : '없음'}`
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;

        if (!content) {
            throw new Error("OpenAI 부터 컨텐츠를 받을 수 없습니다!");
        }

        return NextResponse.json(JSON.parse(content));

    } catch (error: unknown) {
        console.error('Error generating post:', error);
        if(error instanceof Error)
            return NextResponse.json(
                { error: error.message || '글 생성 중 오류가 발생했습니다.' },
                { status: 500 }
            );
    }
}
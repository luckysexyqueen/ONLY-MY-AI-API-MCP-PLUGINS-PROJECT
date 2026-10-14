import fs from 'node:fs';
import path from 'node:path';

const out=path.resolve('dist-pages');
fs.mkdirSync(out,{recursive:true});
const html=`<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Spec Direct MCP · GitHub-only</title>
<style>body{font:16px system-ui;max-width:740px;margin:5vh auto;padding:24px;background:#111827;color:#f9fafb}section{padding:24px;border:1px solid #475569;border-radius:16px}a{color:#93c5fd}p{line-height:1.7}.ok{color:#86efac}.muted{color:#cbd5e1}</style></head>
<body><section><h1>Spec Direct MCP · GitHub-only</h1>
<p class="ok">외부 호스팅 및 MCP_PUBLIC_URL 설정 없이 이 대시보드를 사용할 수 있습니다.</p>
<p>GitHub Actions에서 MCP 서버를 일시적으로 실행하고 <code>/health</code>, <code>initialize</code>, <code>tools/list</code>를 검사합니다.</p>
<p class="muted">이 페이지는 정적 대시보드입니다. GitHub Pages가 공개 MCP 서버를 호스팅하지 않으며, 외부 MCP 클라이언트에서 접속할 수 있는 24시간 서버 주소를 제공하지 않습니다.</p>
<p><a href="https://github.com/luckysexyqueen/ONLY-MY-AI-API-MCP-PLUGINS-PROJECT/actions/workflows/run-mcp-server.yml">MCP 실행 테스트 결과 확인</a></p>
<p><a href="https://github.com/luckysexyqueen/ONLY-MY-AI-API-MCP-PLUGINS-PROJECT">프로젝트 소스 보기</a></p>
</section></body></html>`;
fs.writeFileSync(path.join(out,'index.html'),html);
console.log('Standalone GitHub Pages dashboard built without MCP_PUBLIC_URL');

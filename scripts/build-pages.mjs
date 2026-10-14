import fs from 'node:fs';
import path from 'node:path';

const out=path.resolve('dist-pages');
fs.mkdirSync(out,{recursive:true});
const input=(process.env.MCP_PUBLIC_URL||'').trim();
function normalize(value){
  if(!value)return '';
  const u=new URL(value);
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('MCP_PUBLIC_URL must be a clean HTTPS URL');
  const p=u.pathname.replace(/\\/$/,'');
  u.pathname=p.endsWith('/mcp')?p:(p+'/mcp');
  return u.href;
}
const configured=normalize(input);
const html=`<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Spec Direct MCP Dashboard</title>
<style>body{font:16px system-ui;max-width:740px;margin:5vh auto;padding:24px;background:#111827;color:#f9fafb}section{padding:24px;border:1px solid #475569;border-radius:16px}input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #64748b;border-radius:8px;background:#1f2937;color:white}button{padding:12px;border-radius:8px;cursor:pointer;margin:8px 8px 8px 0}code{overflow-wrap:anywhere}p{line-height:1.6}.muted{color:#cbd5e1}.warning{color:#fbbf24}a{color:#93c5fd}</style></head>
<body><section><h1>Spec Direct MCP</h1>
<p>GitHub Pages는 대시보드만 제공합니다. GitHub Actions의 임시 MCP 테스트 서버는 외부 공개 서버가 아닙니다.</p>
<p id="status" role="status"></p>
<label for="endpoint">실제 배포된 MCP HTTPS 주소</label>
<input id="endpoint" type="url" placeholder="https://your-real-worker.workers.dev/mcp" autocomplete="off" spellcheck="false">
<p class="muted">MCP_PUBLIC_URL GitHub 변수 없이도 배포할 수 있습니다. 나중에 실제 서버를 배포한 뒤 주소를 입력하세요. 주소는 이 브라우저에만 저장되며 GitHub 설정을 변경하지 않습니다.</p>
<button id="save">주소 저장</button><button id="copy" disabled>주소 복사</button><button id="clear">초기화</button>
<p><code id="url"></code></p><p><a id="link" rel="noopener noreferrer" target="_blank" hidden>서버 주소 열기</a></p>
<p class="warning">주소 저장은 연결 성공을 의미하지 않습니다. MCP 서버가 실제 배포되어 있어야 사용할 수 있습니다. API 토큰을 여기에 입력하지 마세요.</p>
</section>
<script>
const defaultUrl=${JSON.stringify(configured)};
const input=document.getElementById('endpoint'),status=document.getElementById('status'),display=document.getElementById('url'),copy=document.getElementById('copy'),link=document.getElementById('link');
function normalize(v){const u=new URL(v);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('쿼리나 인증정보 없는 HTTPS 주소만 허용됩니다.');u.pathname=u.pathname.replace(/\\/$/,'');if(!u.pathname.endsWith('/mcp'))u.pathname+='/mcp';return u.href}
function render(v){input.value=v;display.textContent=v||'MCP 서버 주소 미설정';copy.disabled=!v;link.hidden=!v;if(v)link.href=v;else link.removeAttribute('href');status.textContent=v?'MCP 주소 입력됨 · 서버 연결은 확인되지 않음':'MCP_PUBLIC_URL 미설정 · 대시보드 사용 가능 (서버 미연결)'}
try{render(localStorage.getItem('spec-direct-mcp-url')||defaultUrl)}catch{render(defaultUrl)}
document.getElementById('save').onclick=()=>{try{const v=normalize(input.value.trim());localStorage.setItem('spec-direct-mcp-url',v);render(v)}catch(e){status.textContent='주소 오류: '+e.message}};
document.getElementById('clear').onclick=()=>{localStorage.removeItem('spec-direct-mcp-url');render(defaultUrl)};
copy.onclick=()=>navigator.clipboard.writeText(input.value).then(()=>{status.textContent='MCP URL 복사 완료'});
</script></body></html>`;
fs.writeFileSync(path.join(out,'index.html'),html);
console.log('GitHub Pages built:',out,configured?'with configured MCP URL':'without MCP URL (manual entry enabled)');

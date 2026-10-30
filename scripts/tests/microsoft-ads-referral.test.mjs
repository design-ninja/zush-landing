import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
function route(country='US') {
  let requests=0;
  const source=readFileSync(new URL('../../src/pages/api/microsoft-ads-referral.ts',import.meta.url),'utf8')
    .replace(/^import[^\n]*\n/gm,'').replaceAll('import.meta.env.SUPABASE_ANON_KEY',"'test-anon-jwt'")
    .replaceAll('import.meta.env.PUBLIC_SUPABASE_URL',"'https://test.supabase.co'");
  const context={exports:{},Response,AbortSignal,geolocation:()=>({country}),fetch:async()=>{requests++;return Response.json({cid:`msads_525101967_${'b'.repeat(32)}`});}};
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
  return {post:context.exports.POST,requests:()=>requests};
}
const request=(headers={})=>new Request('https://zushapp.com/api/microsoft-ads-referral',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify({campaign_id:'525101967',microsoft_click_id:'a'.repeat(32)})});
test('US proxy returns an opaque CID and is never cached',async()=>{
  const r=route();const response=await r.post({request:request()});assert.equal(r.requests(),1);
  assert.equal((await response.json()).cid,`msads_525101967_${'b'.repeat(32)}`);
  assert.equal(response.headers.get('cache-control'),'private, no-store');
});
test('privacy and location gates prevent sending click IDs to the attribution server',async()=>{
  for(const [country,headers] of [['GB',{}],[undefined,{}],['US',{'sec-gpc':'1'}],['US',{dnt:'1'}]]){
    const r=route(country??'');const response=await r.post({request:request(headers)});
    assert.equal((await response.json()).cid,null);assert.equal(r.requests(),0);
  }
});

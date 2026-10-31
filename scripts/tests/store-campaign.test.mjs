import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
const compile = path => ts.transpileModule(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8').replace(/^import[^\n]*\n/gm, ''), { compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022} }).outputText;
const webUrl = 'https://apps.microsoft.com/detail/9ND4WVZSDQ3X';
const appUrl = 'ms-windows-store://pdp/?ProductId=9ND4WVZSDQ3X';
function runtime(query = '', {gpc = false, blockedStorage = false, platform = 'Win32', adsTagId = '343281815'} = {}) {
  const data = new Map(); const assigned = []; const timers = []; const events = [];
  const context = { exports: {}, URL, Date, navigator: {platform, globalPrivacyControl:gpc},
    window: {location: {href:`https://zushapp.com/?${query}`, assign: url => assigned.push(url)},
      sessionStorage: { getItem: key => { if(blockedStorage) throw Error(); return data.get(key); }, setItem: (k,v) => { if(blockedStorage) throw Error(); data.set(k,v); }, removeItem:k=>data.delete(k)},
      setTimeout: f => {timers.push(f); return timers.length;}, clearTimeout:()=>{}, addEventListener:()=>{}, removeEventListener:()=>{}},
    document: {addEventListener:()=>{},removeEventListener:()=>{}},
    trackAnalyticsEvent: (name, props) => events.push([name,props]), getAnalyticsPageProperties:()=>({}),
    AbortSignal, getMicrosoftAdsTagId: async () => adsTagId, SUPABASE_URL: 'https://test.supabase.co', SUPABASE_ANON_KEY: 'test-anon-jwt',
  };
  vm.runInNewContext(compile('src/utils/microsoftStoreCampaign.ts'),context);
  const campaign = context.exports; Object.assign(context,campaign); context.exports={};
  vm.runInNewContext(compile('src/utils/storeLinks.ts'),context);
  return {context,campaign,links:context.exports,data,assigned,timers,events};
}
function click(r, options={}) {
  const event={button:0,altKey:false,ctrlKey:false,metaKey:false,shiftKey:false,currentTarget:{href:webUrl,dataset:{downloadSource:'hero'}},preventDefault(){this.prevented=true;},...options};
  r.links.handleStoreLinkClick(event,{os:'windows',webUrl,appUrl}); return event;
}
test('paid native Store attempt and delayed web fallback retain the same CID',()=>{
  const r=runtime('msclkid=private-click&utm_id=525101967'); const e=click(r);
  assert.equal(e.prevented,true);
  assert.equal(new URL(r.assigned[0]).searchParams.get('cid'),'msads_525101967');
  r.timers[0]();
  assert.equal(new URL(r.assigned[1]).searchParams.get('cid'),'msads_525101967');
  assert.equal(r.events[0][0],'store_protocol_attempt');
  assert.ok(!JSON.stringify([...r.data]).includes('private-click'));
  assert.ok(!r.assigned.some(url=>url.includes('private-click')));
});
test('web and modified clicks keep their default navigation with campaign tags',()=>{
  for(const options of [{ctrlKey:true},{button:1}]) {
    const r=runtime('msclkid=click'); const e=click(r,options);
    assert.equal(e.prevented,undefined); assert.equal(r.assigned.length,0);
    assert.equal(new URL(e.currentTarget.href).searchParams.get('cid'),'msads_search');
  }
  const r=runtime('utm_source=bing&utm_medium=cpc',{platform:'MacIntel'}); const e=click(r);
  assert.equal(e.currentTarget.href,`${webUrl}?cid=msads_search`);
});
test('campaign survives internal navigation but other campaigns supersede it',()=>{
  const r=runtime('msclkid=click&utm_campaign=Search_Windows_AI-Renamer_EN_US-GB');
  assert.equal(r.campaign.getMicrosoftStoreCampaignId(),'msads_525101967');
  r.context.window.location.href='https://zushapp.com/windows';
  assert.equal(r.campaign.getMicrosoftStoreCampaignId(),'msads_525101967');
  r.context.window.location.href='https://zushapp.com/?utm_source=google&utm_medium=cpc';
  assert.equal(r.campaign.getMicrosoftStoreCampaignId(),null);
});
test('organic Bing, arbitrary campaign text, opt-out and disabled storage',()=>{
  assert.equal(runtime('utm_source=bing&utm_medium=organic').campaign.getMicrosoftStoreCampaignId(),null);
  assert.equal(runtime('msclkid=click&utm_campaign=someone@example.com').campaign.getMicrosoftStoreCampaignId(),'msads_search');
  assert.equal(runtime('msclkid=click',{gpc:true}).campaign.getMicrosoftStoreCampaignId(),null);
  assert.equal(runtime('msclkid=click',{blockedStorage:true}).campaign.getMicrosoftStoreCampaignId(),'msads_search');
  assert.equal(click(runtime()).currentTarget.href,appUrl);
});
test('only Zush Store targets are tagged and existing locale parameters survive',()=>{
  const r=runtime(); const apply=r.campaign.withMicrosoftStoreCampaign;
  assert.equal(new URL(apply(`${webUrl}?gl=US&hl=en-US`,'msads_search')).searchParams.get('gl'),'US');
  assert.equal(apply('https://apps.apple.com/app/zush/id6758432449','msads_search'),'https://apps.apple.com/app/zush/id6758432449');
  assert.equal(apply(webUrl,'personal-data'),webUrl);
  assert.equal(r.links.getPreferredStoreHref({os:'windows',webUrl,appUrl,runtimeOS:'windows',campaignId:'msads_search'}),`${appUrl}&cid=msads_search`);
});

const REFERRAL_URL='https://test.supabase.co/functions/v1/ad-acquisition-referral';
const paidQuery=`msclkid=${'a'.repeat(32)}&utm_id=525101967`;
const opaqueCid=`msads_525101967_${'b'.repeat(32)}`;
function serve(r, answers) {
  const requests=[];
  r.context.fetch=async(url,options)=>{requests.push([url,options]);const answer=answers[Math.min(requests.length,answers.length)-1];if(answer instanceof Error)throw answer;return answer;};
  return requests;
}
const reply=(status,body)=>({ok:status<300,status,json:async()=>body});

test('opaque referral from the server is used for both Store targets and survives internal navigation', async()=>{
  const clickId='a'.repeat(32);
  const r=runtime(paidQuery); const requests=serve(r,[reply(200,{cid:opaqueCid})]);
  assert.equal(await r.campaign.prepareMicrosoftStoreCampaign(),opaqueCid);
  assert.equal(requests[0][0],REFERRAL_URL);
  assert.equal(requests[0][1].headers.Authorization,'Bearer test-anon-jwt');
  assert.deepEqual(JSON.parse(requests[0][1].body),{campaign_id:'525101967',microsoft_click_id:clickId});
  click(r);
  assert.equal(new URL(r.assigned[0]).searchParams.get('cid'),opaqueCid);
  r.timers[0]();assert.equal(new URL(r.assigned[1]).searchParams.get('cid'),opaqueCid);
  assert.ok(!JSON.stringify([...r.data]).includes(clickId));
  r.context.window.location.href='https://zushapp.com/windows';
  assert.equal(r.campaign.getMicrosoftStoreCampaignId(),opaqueCid);
});
test('blocked referral creation preserves campaign-only Store navigation', async()=>{
  const r=runtime(paidQuery); serve(r,[Error('blocked')]);
  assert.equal(await r.campaign.prepareMicrosoftStoreCampaign(),'msads_525101967');
  click(r);assert.equal(new URL(r.assigned[0]).searchParams.get('cid'),'msads_525101967');
});
test('a declined referral is final for the click and is not requested again', async()=>{
  const r=runtime(paidQuery); const requests=serve(r,[reply(200,{cid:null})]);
  for(let i=0;i<4;i++) assert.equal(await r.campaign.prepareMicrosoftStoreCampaign(),'msads_525101967');
  assert.equal(requests.length,1);
});
test('visitors outside the server US gate never send the click ID', async()=>{
  const r=runtime(paidQuery,{adsTagId:null}); const requests=serve(r,[reply(200,{cid:opaqueCid})]);
  for(let i=0;i<3;i++) assert.equal(await r.campaign.prepareMicrosoftStoreCampaign(),'msads_525101967');
  assert.equal(requests.length,0);
});
test('transient server errors are retried once, then the campaign label is kept', async()=>{
  const r=runtime(paidQuery); const requests=serve(r,[reply(503,{}),reply(503,{}),reply(200,{cid:opaqueCid})]);
  for(let i=0;i<4;i++) assert.equal(await r.campaign.prepareMicrosoftStoreCampaign(),'msads_525101967');
  assert.equal(requests.length,2);
});
test('a Store click during an in-flight referral waits for the opaque CID', async()=>{
  const r=runtime(paidQuery); let respond;
  r.context.fetch=()=>new Promise(resolve=>{respond=resolve;});
  const prepared=r.campaign.prepareMicrosoftStoreCampaign();
  await new Promise(resolve=>setImmediate(resolve));
  const e=click(r);
  assert.equal(e.prevented,true); assert.equal(r.assigned.length,0);
  respond(reply(200,{cid:opaqueCid})); await prepared; await new Promise(resolve=>setImmediate(resolve));
  assert.equal(new URL(r.assigned[0]).searchParams.get('cid'),opaqueCid);
});
test('a Store click opens with the campaign label when the referral stalls', async()=>{
  const r=runtime(paidQuery);
  r.context.fetch=()=>new Promise(()=>{});
  void r.campaign.prepareMicrosoftStoreCampaign();
  await new Promise(resolve=>setImmediate(resolve));
  click(r); assert.equal(r.assigned.length,0);
  r.timers[0](); await new Promise(resolve=>setImmediate(resolve));
  assert.equal(new URL(r.assigned[0]).searchParams.get('cid'),'msads_525101967');
});

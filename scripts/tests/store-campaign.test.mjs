import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
const compile = path => ts.transpileModule(readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8').replace(/^import[^\n]*\n/gm, ''), { compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022} }).outputText;
const webUrl = 'https://apps.microsoft.com/detail/9ND4WVZSDQ3X';
const appUrl = 'ms-windows-store://pdp/?ProductId=9ND4WVZSDQ3X';
function runtime(query = '', {gpc = false, blockedStorage = false, platform = 'Win32'} = {}) {
  const data = new Map(); const assigned = []; const timers = []; const events = [];
  const context = { exports: {}, URL, Date, navigator: {platform, globalPrivacyControl:gpc},
    window: {location: {href:`https://zushapp.com/?${query}`, assign: url => assigned.push(url)},
      sessionStorage: { getItem: key => { if(blockedStorage) throw Error(); return data.get(key); }, setItem: (k,v) => { if(blockedStorage) throw Error(); data.set(k,v); }, removeItem:k=>data.delete(k)},
      setTimeout: f => {timers.push(f); return timers.length;}, clearTimeout:()=>{}, addEventListener:()=>{}, removeEventListener:()=>{}},
    document: {addEventListener:()=>{},removeEventListener:()=>{}},
    trackAnalyticsEvent: (name, props) => events.push([name,props]), getAnalyticsPageProperties:()=>({}),
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

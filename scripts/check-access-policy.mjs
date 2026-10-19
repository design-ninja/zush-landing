import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const requests = [], analytics = [], alerts = [];
let closed = 0;
let allowed = false;
let failNext = 0;
const listeners = new Map();
class Input { type = 'email'; value = 'buyer@example.com'; validity = {valid:true}; form; }
class Select { value = 'BD'; form; }
class Form {
  country = new Select(); email = new Input();
  constructor() {this.country.form=this;this.email.form=this;}
  querySelector() {return this.country;}
  querySelectorAll() {return [this.email];}
}
const context = vm.createContext({
  console, AbortSignal, setTimeout, clearTimeout,
  HTMLInputElement:Input, HTMLSelectElement:Select, HTMLFormElement:Form,
  document:{documentElement:{lang:'en',dataset:{}},addEventListener:(name,callback)=>listeners.set(name,callback)},
  window:{Paddle:{Checkout:{close:()=>closed++}},alert:message=>alerts.push(message)},
  sessionStorage:{removeItem(){}},
  fetch:async (_url,options)=>{requests.push(JSON.parse(options.body));if(failNext>0){failNext--;throw new Error('offline');}return {ok:allowed,status:allowed?200:403,json:async()=>({allowed,code:'blocked_email'})};},
});
const stubs = {
  '@/utils/analytics': {trackAnalyticsEvent:(name,data)=>analytics.push({name,data}),getAnalyticsDistinctId:()=>null},
  '@/utils/checkoutAnalytics': {getCheckoutAnalyticsEvent:()=>null},
  '@/utils/supabase': {SUPABASE_URL:'https://test.invalid'},
  '@/utils/accessPolicyMessage': {accessPolicyMessage:()=> 'Service unavailable'},
};
async function load(path, extra='') {
  const code=ts.transpileModule(readFileSync(path,'utf8')+extra,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  const module=new vm.SourceTextModule(code,{context,identifier:path,initializeImportMeta:meta=>{meta.env={};}});
  await module.link(specifier=>{const values=stubs[specifier]; assert.ok(values,`Unexpected import ${specifier}`);return new vm.SyntheticModule(Object.keys(values),function(){for(const [k,v] of Object.entries(values))this.setExport(k,v);},{context});});
  await module.evaluate();return module.namespace;
}
const paddle=await load('src/utils/paddle.ts','\nexport {verifyCheckoutCountry}; export function setTestSession(s){activeCheckoutSession=s;activeCheckoutTransactionId=null;} export function setTestTransaction(t){activeCheckoutSession=null;activeCheckoutTransactionId=t;}');
paddle.setTestSession('session');
await paddle.verifyCheckoutCountry({data:{customer:{email:'buyer@example.com',address:{country_code:'BD'}}}});
assert.equal(closed,1);assert.equal(requests[0].email,'buyer@example.com');assert.equal(requests[0].country_code,'BD');assert.equal(alerts.length,1);
allowed=true; paddle.setTestSession('session2');
await paddle.verifyCheckoutCountry({data:{customer:{email:'allowed@example.com',address:{country_code:'US'}}}});
assert.equal(closed,1);
let beforeEvents=requests.length;
await paddle.verifyCheckoutCountry({data:{customer:{email:'allowed@example.com',address:{country_code:'US'}}}});
assert.equal(requests.length,beforeEvents,'Repeated Paddle events for one customer must be checked once');
paddle.setTestSession('session3');failNext=1;beforeEvents=requests.length;
await paddle.verifyCheckoutCountry({data:{customer:{email:'retry@example.com',address:{country_code:'US'}}}});
assert.equal(requests.length,beforeEvents+2,'A transient failure is retried once');
assert.equal(closed,1,'A successful retry keeps checkout open');
paddle.setTestSession('session4');failNext=2;
await paddle.verifyCheckoutCountry({data:{customer:{email:'offline@example.com',address:{country_code:'US'}}}});
assert.equal(closed,2,'A second failure closes checkout');
assert.equal(JSON.stringify(analytics).includes('@example.com'),false);

// The app's payment link (_ptxn) has no session token: the check must identify it by transaction.
allowed=false; paddle.setTestTransaction('txn_01aaaaaaaaaaaaaaaaaaaaaaaa');let closedBefore=closed;
await paddle.verifyCheckoutCountry({data:{customer:{email:'app@example.com',address:{country_code:'BD'}}}});
assert.equal(requests.at(-1).transaction_id,'txn_01aaaaaaaaaaaaaaaaaaaaaaaa','App payment links are checked by transaction id');
assert.equal('checkout_session' in requests.at(-1),false);
assert.equal(closed,closedBefore+1,'A blocked country closes the app payment link checkout');
paddle.setTestTransaction(null);beforeEvents=requests.length;
await paddle.verifyCheckoutCountry({data:{customer:{email:'none@example.com',address:{country_code:'US'}}}});
assert.equal(requests.length,beforeEvents,'Without a session or transaction there is nothing to check');

const observer=await load('src/utils/emailAccessPolicy.ts');observer.bindEmailAccessPolicy();
const form=new Form();const before=requests.length;
listeners.get('focusout')({target:form.email});
listeners.get('submit')({target:form});
await new Promise(resolve=>setTimeout(resolve,0));
assert.equal(requests.length,before+1,'Blur and submit must not duplicate the same observation');
form.country.value='IN';listeners.get('change')({target:form.country});
await new Promise(resolve=>setTimeout(resolve,0));
assert.equal(requests.at(-1).country_code,'IN');
assert.equal(JSON.stringify(analytics).includes('@example.com'),false);
console.log('Landing checkout, email observation and analytics privacy checks passed');

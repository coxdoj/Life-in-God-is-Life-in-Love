// assets/mlWorker.js
// Tiny keyword scorer (simulates lightweight ML without external libs)
const buckets = {
  worship: { keywords: ["jesus","praise","worship","holy","spirit","glory","hallelujah"], w: 1.2 },
  finance: { keywords: ["invest","wealth","finance","budget","steward","tithe","assets","value"], w: 1.0 },
  writing: { keywords: ["write","poem","story","words","journal","devotional","verse"], w: 0.9 }
};
onmessage = (e)=>{
  const t = (e.data.text||"").toLowerCase();
  let best = {label:"neutral", score:0};
  for (const [label,cfg] of Object.entries(buckets)){
    let s = 0;
    for (const k of cfg.keywords) if (t.includes(k)) s += cfg.w;
    if (s>best.score) best = {label, score:s};
  }
  postMessage(best);
};
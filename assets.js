// H3: auto-correct + self-assess + asset helpers
window.H3 = {
  // --- config ---
  assetBase: "./assets/",          // change if your folder moves
  assetList: [                     // put filenames that exist in /assets
    "logo.png","banner.png","favicon-32x32.png","favicon-180x180.png"
  ],

  // --- utils ---
  clean(s){ return (s||"").replace(/\s+/g," ").trim(); },
  capFirst(s){ return (s||"").replace(/^([a-z])/, m=>m.toUpperCase()); },
  smartQuotes(s){
    return (s||"")
      .replace(/(^|[\s[(])"([^"]*)"/g,'$1“$2”')
      .replace(/(^|[\s[(])'([^']*)'/g,"$1‘$2’")
      .replace(/--/g,"—");
  },

  // --- autocorrect ---
  autocorrect(s){
    if(!s) return "";
    let t = s.normalize("NFC");
    t = this.clean(t);
    t = t.replace(/\s+([,.;:!?])/g,"$1");
    t = t.replace(/([,.;:!?])(?!\s|$)/g,"$1 ");
    t = t.replace(/\s{2,}/g," ");
    t = this.smartQuotes(t);
    t = t.replace(/\bi\bi/g,"I").replace(/\bi\sam\bi/gi,"I am").replace(/\bi'm\bi/gi,"I'm");
    t = this.capFirst(t);
    return this.clean(t);
  },

  // --- self assessment ---
  assess(s){
    const text = this.clean(s||""
    const words = text ? text.split(/\s+/).length : 0;
    const sentences = (text.match(/[.!?]+/g)||[]).length || (text?1:0);
    const chars = text.replace(/\s/g,"").length;
    const syllables = (text.match(/[aeiouy]+/gi)||[]).length;
    const ASL = words/(sentences||1);
    const ASW = syllables/(words||1);
    const flesch = Math.max(0, Math.min(100, 206.835 - 1.015*ASL - 84.6*ASW));
    const suggestions = [];
    if (ASL > 22) suggestions.push("Break long sentences.");
    if (words < 40) suggestions.push("Add detail. Aim for 100–150 words.");
    if (flesch < 50) suggestions.push("Use simpler words.");
    if (/\s{2,}/.test(text)) suggestions.push("Remove extra spaces.");
    return { words, sentences, chars, flesch: Math.round(flesch), suggestions };
  },

  // --- storage ---
  save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } },
  load(k){ try{ return JSON.parse(localStorage.getItem(k)||"null"); }catch(e){ return null; } },

  // ===== assets (in ./assets) =====
  url(name){ return this.assetBase + encodeURIComponent(name); },

  // set <img> source by element or CSS selector
  setImg(target, name){
    const el = (typeof target === "string") ? document.querySelector(target) : target;
    if (!el) return false;
    const cached = this.load("asset:"+name);
    if (cached && cached.dataUrl) { el.src = cached.dataUrl; return true; }
    el.src = this.url(name);
    return true;
  },

  // preload list of files into browser cache
  preload(list){
    (list||this.assetList).forEach(n=>{
      const img = new Image(); img.src = this.url(n);
    });
  },

  // cache as dataURL for offline (small images only)
  async cacheAsDataURL(name){
    try{
      const r = await fetch(this.url(name), {cache:"force-cache"});
      const b = await r.blob();
      if (b.size > 512*1024) return false;               // skip >512 KB
      const dataUrl = await new Promise(res=>{
        const fr = new FileReader(); fr.onload = ()=>res(fr.result); fr.readAsDataURL(b);
      });
      this.save("asset:"+name,{dataUrl, ts:Date.now()});
      return true;
    }catch(_){ return false; }
  },

  // preload + cache all declared assets
  warmAssets(){
    this.preload();
    this.assetList.forEach(n=>this.cacheAsDataURL(n));
  }
};

// Optional: auto-warm on load
if (document.readyState !== "loading") { H3.warmAssets(); }

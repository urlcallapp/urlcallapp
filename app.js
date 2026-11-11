(function(){
  "use strict";

  var IC = {
    tel:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    sms:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/></svg>',
    mailto:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    facetime:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>'
  };

  var COLORS = {tel:"#7c3aed", sms:"#0891b2", whatsapp:"#16a34a", mailto:"#db2777", facetime:"#2563eb"};

  var PROTOCOLS = {
    tel: {
      name:"שיחה", dir:"call",
      fields:[{k:"phone",type:"phone",label:"מספר טלפון",hint:"למשל 050-1234567"}],
      target:function(d){ return "tel:" + d.phoneDial; },
      land:function(d){ return {title:"שיחה יוצאת אל", detail:d.phonePretty, btn:"התקשר עכשיו"}; }
    },
    sms: {
      name:"SMS", dir:"sms",
      fields:[
        {k:"phone",type:"phone",label:"מספר טלפון"},
        {k:"text",type:"textarea",label:"הודעה (לא חובה)"}
      ],
      target:function(d){ return "sms:" + d.phoneDial + (d.text ? "?&body=" + encodeURIComponent(d.text) : ""); },
      land:function(d){ return {title:"שליחת SMS אל", detail:d.phonePretty, btn:"פתח הודעה"}; }
    },
    whatsapp: {
      name:"וואטסאפ", dir:"whatsapp",
      anyOf:["phone","text"],
      fields:[
        {k:"phone",type:"phone",label:"מספר טלפון",hint:"או למטה: הודעה בלבד, והנמען ייבחר בוואטסאפ"},
        {k:"text",type:"textarea",label:"הודעה מוכנה מראש"}
      ],
      target:function(d){
        if(d.phoneIntl){ return "https://wa.me/" + d.phoneIntl + (d.text ? "?text=" + encodeURIComponent(d.text) : ""); }
        return "https://wa.me/?text=" + encodeURIComponent(d.text);
      },
      land:function(d){
        if(d.phoneIntl) return {title:"שיחת וואטסאפ עם", detail:d.phonePretty, btn:"פתח וואטסאפ"};
        return {title:"הודעת וואטסאפ", detail:d.text || "", btn:"בחר נמען בוואטסאפ"};
      }
    },
    mailto: {
      name:"אימייל", dir:"email",
      fields:[
        {k:"email",type:"email",label:"כתובת מייל"},
        {k:"subject",type:"text",label:"נושא (לא חובה)"},
        {k:"body",type:"textarea",label:"תוכן (לא חובה)"}
      ],
      target:function(d){
        var q=[];
        if(d.subject) q.push("subject=" + encodeURIComponent(d.subject));
        if(d.body) q.push("body=" + encodeURIComponent(d.body));
        return "mailto:" + d.email + (q.length ? "?" + q.join("&") : "");
      },
      land:function(d){ return {title:"כתיבת מייל אל", detail:d.email, btn:"פתח מייל"}; }
    },
    facetime: {
      name:"FaceTime", dir:"facetime",
      fields:[{k:"phone",type:"phone",label:"מספר טלפון או אימייל",hint:"מספר, או כתובת מייל של Apple ID"}],
      target:function(d){ return "facetime:" + (d.phoneDial || d.raw); },
      land:function(d){ return {title:"שיחת FaceTime אל", detail:d.phonePretty, btn:"התחל FaceTime"}; }
    }
  };

  var CODES = [
    ["+972","IL +972"],["+1","US +1"],["+44","UK +44"],["+49","DE +49"],
    ["+33","FR +33"],["+39","IT +39"],["+34","ES +34"],["+7","RU +7"],
    ["+91","IN +91"],["+971","AE +971"],["+90","TR +90"]
  ];

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/[&<>"']/g,function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

  function decoratePhone(d){
    if(!d.phone) return;
    var raw = d.phone;
    var code = d.phone_code || "";
    var digits = raw.replace(/[^\d+]/g,"");
    var intl;
    if(digits.charAt(0)==="+"){ intl = digits.slice(1); }
    else if(code){ intl = code.replace("+","") + digits.replace(/^0+/,""); }
    else if(/^0/.test(digits)){ intl = "972" + digits.replace(/^0+/,""); }
    else { intl = digits; }
    d.raw = raw;
    d.phoneIntl = intl;
    d.phoneDial = /^\+/.test(digits) ? digits : (code ? code + digits.replace(/^0+/,"") : digits);
    d.phonePretty = raw;
  }

  var mode = document.body.dataset.mode || "builder";

  /* ---------- landing mode ---------- */
  if(mode === "landing"){
    var type = document.body.dataset.type || new URLSearchParams(location.search).get("p");
    var proto = type && PROTOCOLS[type];
    if(!proto){ location.replace("../"); return; }
    var data = {};
    new URLSearchParams(location.search).forEach(function(v,k){ if(k!=="p") data[k]=v; });
    decoratePhone(data);
    var target;
    try { target = proto.target(data); } catch(e){ target=null; }
    if(!target){ location.replace("../"); return; }
    var info = proto.land(data);
    document.title = info.title + " " + (info.detail||"") + " · urlcallapp";
    $("lIc").innerHTML = IC[type].replace("<svg", '<svg class="big-ic" style="color:' + COLORS[type] + '"');
    $("lTitle").textContent = info.title;
    $("lDetail").textContent = info.detail || "";
    var go = $("lGo");
    go.innerHTML = IC[type] + esc(info.btn);
    go.addEventListener("click", function(){ window.location.href = target; });
    // ניסיון פתיחה אוטומטי; חלק מהדפדפנים דורשים מגע של המשתמש ואז הכפתור מחכה
    setTimeout(function(){ window.location.href = target; }, 650);
    return;
  }

  /* ---------- builder mode ---------- */
  var protosEl=$("protos"), fieldsEl=$("fields"), resultEl=$("result"),
      outEl=$("out"), copyBtn=$("copy"), copyTxt=$("copyTxt"),
      tryLink=$("try"), shareBtn=$("share"), toast=$("toast");
  var current = "tel";

  Object.keys(PROTOCOLS).forEach(function(key){
    var p = PROTOCOLS[key];
    var el = document.createElement("div");
    el.className = "proto" + (key===current ? " active":"");
    el.dataset.p = key;
    el.innerHTML = IC[key] + '<div class="nm">'+esc(p.name)+'</div>';
    el.addEventListener("click", function(){
      current = key;
      Array.prototype.forEach.call(protosEl.children,function(c){
        c.classList.toggle("active", c.dataset.p===key);
      });
      renderFields();
      resultEl.classList.remove("show");
    });
    protosEl.appendChild(el);
  });

  function renderFields(){
    var p = PROTOCOLS[current];
    fieldsEl.innerHTML = "";
    p.fields.forEach(function(f){
      var lab = document.createElement("label");
      lab.innerHTML = esc(f.label) + (f.hint ? ' <span class="hint">'+esc(f.hint)+'</span>' : "");
      fieldsEl.appendChild(lab);
      if(f.type==="phone"){
        var row = document.createElement("div");
        row.className = "phone-row";
        var sel = document.createElement("select");
        sel.id = "f_"+f.k+"_code";
        CODES.forEach(function(c){
          var o=document.createElement("option");
          o.value=c[0]; o.textContent=c[1];
          sel.appendChild(o);
        });
        var inp = document.createElement("input");
        inp.id = "f_"+f.k; inp.type="tel"; inp.placeholder="50-123-4567";
        inp.autocomplete="off"; inp.inputMode="tel";
        row.appendChild(sel); row.appendChild(inp);
        fieldsEl.appendChild(row);
      } else if(f.type==="textarea"){
        var ta=document.createElement("textarea");
        ta.id="f_"+f.k; ta.placeholder=f.label.replace(" (לא חובה)","");
        fieldsEl.appendChild(ta);
      } else {
        var i2=document.createElement("input");
        i2.id="f_"+f.k; i2.type = f.type==="email" ? "email" : "text";
        if(f.type==="email") i2.className="ltr";
        fieldsEl.appendChild(i2);
      }
    });
  }
  renderFields();

  function val(k){ var e=$("f_"+k); return e ? e.value.trim() : ""; }

  function basePath(){ return location.pathname.replace(/[^\/]*$/, ""); }

  $("gen").addEventListener("click", function(){
    var p = PROTOCOLS[current];
    var params = new URLSearchParams();
    var missing = false;
    p.fields.forEach(function(f){
      var v = val(f.k);
      if(f.type==="phone"){
        var codeEl = $("f_"+f.k+"_code");
        if(!v && !p.anyOf){ missing = true; }
        if(v) params.set("phone", v);
        if(codeEl && v) params.set("phone_code", codeEl.value);
      } else {
        if(!v && !p.anyOf && f.label.indexOf("לא חובה")===-1) missing = true;
        if(v) params.set(f.k, v);
      }
    });
    if(p.anyOf){
      var any = p.anyOf.some(function(k){ return !!val(k); });
      if(!any) missing = true;
    }
    if(missing){
      toast.textContent = "חסר שדה חובה";
      toast.style.background="#dc2626";
      toast.classList.add("show");
      setTimeout(function(){ toast.classList.remove("show"); }, 1800);
      return;
    }
    var url = location.origin + basePath() + p.dir + "/?" + params.toString();
    outEl.textContent = url;
    tryLink.href = url;
    resultEl.classList.add("show");
    resultEl.scrollIntoView({behavior:"smooth", block:"nearest"});
  });

  function doCopy(){
    var text = outEl.textContent;
    function ok(){
      copyTxt.textContent = "הועתק";
      copyBtn.classList.add("ok");
      toast.textContent = "הקישור הועתק!";
      toast.style.background="#16a34a";
      toast.classList.add("show");
      setTimeout(function(){
        toast.classList.remove("show");
        copyTxt.textContent = "העתקה";
        copyBtn.classList.remove("ok");
      }, 1800);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(ok, function(){ fallback(); });
    } else { fallback(); }
    function fallback(){
      var ta=document.createElement("textarea");
      ta.value=text; document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand("copy"); ok(); }catch(e){}
      document.body.removeChild(ta);
    }
  }
  copyBtn.addEventListener("click", doCopy);

  shareBtn.addEventListener("click", function(){
    var url = outEl.textContent;
    if(navigator.share){
      navigator.share({title:"urlcallapp", url:url}).catch(function(){});
    } else {
      doCopy();
    }
  });
})();

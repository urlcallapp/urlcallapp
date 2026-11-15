(function(){
  "use strict";

  var IC = {
    tel:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    sms:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/></svg>',
    mailto:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    facetime:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>'
  };

  IC.contact = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5 11H3v-1c0-2 3-3 5-3s5 1 5 3Zm7-3h-5v-2h5Zm0-4h-5V9h5Z"/></svg>';
  var COLORS = {tel:"#7c3aed", sms:"#0891b2", whatsapp:"#16a34a", mailto:"#db2777", facetime:"#2563eb"};

  var PROTOCOLS = {
    tel: {
      name:"שיחה", dir:"call",
      fields:[
        {k:"name",type:"text",label:"שם (לא חובה)",hint:"יוצג בדף שנפתח מהקישור"},
        {k:"phone",type:"phone",label:"מספר טלפון",hint:"למשל 050-1234567"}
      ],
      target:function(d){ return "tel:" + d.phoneDial; },
      land:function(d){ return {title:d.name ? "שיחה יוצאת אל " + d.name : "שיחה יוצאת אל", detail:d.phonePretty, btn:"התקשר עכשיו"}; }
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

  PROTOCOLS.contact = {
    name:"כרטיס קשר", dir:"contact", anyOf:["phone","email"],
    fields:[
      {k:"name",type:"text",label:"שם לתצוגה"},
      {k:"phone",type:"phone",label:"טלפון (לא חובה)",hint:"לשיחה, וואטסאפ ו-SMS"},
      {k:"email",type:"email",label:"אימייל (לא חובה)"}
    ]
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
    var code = /^\+\d{1,4}$/.test(d.phone_code || "") ? d.phone_code : "";
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

  function validPhone(value){ return /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g,"").length >= 5 && value.replace(/\D/g,"").length <= 15; }
  function validEmail(value){ return /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value); }
  function showError(message){
    toast.textContent=message; toast.style.background="#dc2626"; toast.classList.add("show");
    setTimeout(function(){toast.classList.remove("show");},2500);
  }

  /* ---------- contact card: no automatic launch ---------- */
  if(mode === "contact"){
    function renderContact(){
    $("contact-actions").replaceChildren();
    ["contact-phone","contact-email","contact-status"].forEach(function(id){$(id).textContent="";});
    var cardData={};
    new URLSearchParams(location.hash.slice(1)).forEach(function(v,k){cardData[k]=v;});
    $("contact-name").textContent=cardData.name || "כרטיס קשר";
    document.title=(cardData.name || "כרטיס קשר")+" · urlcallapp";
    var phoneOK=cardData.phone && validPhone(cardData.phone);
    var emailOK=cardData.email && validEmail(cardData.email);
    if(phoneOK) decoratePhone(cardData);
    var actions=$("contact-actions");
    function addAction(type,label,target,detail){
      var a=document.createElement("a");a.className="contact-action "+type;a.href=target;
      a.innerHTML=IC[type]+"<span></span>";a.lastChild.textContent=label;
      a.setAttribute("aria-label",label+" "+detail);actions.appendChild(a);
    }
    if(phoneOK){
      $("contact-phone").textContent=cardData.phoneDial;
      if(cardData.call!=="0") addAction("tel","שיחה",PROTOCOLS.tel.target(cardData),cardData.phoneDial);
      if(cardData.wa!=="0") addAction("whatsapp","וואטסאפ",PROTOCOLS.whatsapp.target(cardData),cardData.phoneDial);
      if(cardData.sms!=="0") addAction("sms","SMS",PROTOCOLS.sms.target(cardData),cardData.phoneDial);
    }
    if(emailOK){
      $("contact-email").textContent=cardData.email;
      addAction("mailto","אימייל","mailto:"+encodeURIComponent(cardData.email).replace(/%40/g,"@"),cardData.email);
    }
    if(!actions.children.length) $("contact-status").textContent="אין פרטי קשר תקינים בקישור. בקשו מהשולח קישור חדש.";
    }
    renderContact();
    window.addEventListener("hashchange",renderContact);
    return;
  }

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
    var el = document.createElement("button");
    el.type="button"; el.setAttribute("aria-pressed", key===current ? "true":"false");
    el.className = "proto" + (key===current ? " active":"");
    el.dataset.p = key;
    el.innerHTML = IC[key] + '<div class="nm">'+esc(p.name)+'</div>';
    el.addEventListener("click", function(){
      current = key;
      Array.prototype.forEach.call(protosEl.children,function(c){
        c.classList.toggle("active", c.dataset.p===key);
        c.setAttribute("aria-pressed",c.dataset.p===key ? "true":"false");
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
      lab.htmlFor="f_"+f.k;
      fieldsEl.appendChild(lab);
      if(f.type==="phone"){
        var row = document.createElement("div");
        row.className = "phone-row";
        var sel = document.createElement("select");
        sel.id = "f_"+f.k+"_code"; sel.setAttribute("aria-label","קידומת מדינה");
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
    if(current==="contact"){
      var opts=document.createElement("fieldset");opts.className="contact-options";
      opts.innerHTML='<legend>כפתורים בכרטיס (כשיש טלפון)</legend>'+[["call","שיחה"],["wa","וואטסאפ"],["sms","SMS"]].map(function(item){return '<label><input type="checkbox" id="opt_'+item[0]+'" checked>'+item[1]+'</label>';}).join("");
      fieldsEl.appendChild(opts);
    }
  }
  renderFields();
  fieldsEl.addEventListener("input",function(){resultEl.classList.remove("show");});

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
    if(current==="contact"){
      if(!val("name")) missing=true;
      var enabled=["call","wa","sms"].some(function(k){return $("opt_"+k).checked;});
      if(!val("email") && !(val("phone") && enabled)) missing=true;
      ["call","wa","sms"].forEach(function(k){if(!$("opt_"+k).checked) params.set(k,"0");});
    }
    if(val("email") && !validEmail(val("email"))){showError("כתובת האימייל אינה תקינה");return;}
    if(val("phone") && !(current==="facetime" && validEmail(val("phone"))) && !validPhone(val("phone"))){showError("מספר הטלפון אינו תקין");return;}
    if(missing){
      toast.textContent = "חסר שדה חובה";
      toast.style.background="#dc2626";
      toast.classList.add("show");
      setTimeout(function(){ toast.classList.remove("show"); }, 1800);
      return;
    }
    var url = location.origin + basePath() + p.dir + "/" + (current==="contact" ? "#" : "?") + params.toString();
    outEl.textContent = url;
    tryLink.href = url;
    resultEl.classList.add("show");
    renderQR(url);
    resultEl.scrollIntoView({behavior:"smooth", block:"nearest"});
  });

  function renderQR(url){
    var canvas=$("qr"), error=$("qr-error"), download=$("download-qr");
    canvas.hidden=true;error.hidden=true;download.disabled=true;
    QRCode.toCanvas(canvas,url,{width:768,margin:4,errorCorrectionLevel:"M",color:{dark:"#1f1235",light:"#ffffff"}},function(err){
      if(err){error.textContent="הקישור ארוך מדי לקוד QR. אפשר להעתיק ולשתף אותו כרגיל.";error.hidden=false;return;}
      canvas.hidden=false;download.disabled=false;
    });
  }
  $("download-qr").addEventListener("click",function(){
    var a=document.createElement("a");a.download="urlcallapp-qr.png";a.href=$("qr").toDataURL("image/png");a.click();
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

  /* ---------- designed share card (local canvas, no server) ---------- */
  var shareSheet=$("shareSheet"), shareName=$("shareName"), sharePreview=$("sharePreview"),
      shareImg=$("shareImg"), shareGo=$("shareGo"), shareDownload=$("shareDownload"),
      shareCancel=$("shareCancel");
  var shareBlob=null, shareTimer=null;
  var SHARE_PHRASES={tel:"שיחה",sms:"SMS",whatsapp:"וואטסאפ",mailto:"מייל",facetime:"FaceTime",contact:"כרטיס קשר"};
  var SHARE_COLORS={tel:"#7c3aed",sms:"#0891b2",whatsapp:"#16a34a",mailto:"#db2777",facetime:"#2563eb",contact:"#ea580c"};
  var FONT='"Heebo","Segoe UI",Arial,sans-serif';

  function iconPath(key){ var m=IC[key] && IC[key].match(/d="([^"]+)"/); return m ? new Path2D(m[1]) : null; }
  function rr(x,px,py,w,h,r){ x.beginPath(); x.moveTo(px+r,py); x.arcTo(px+w,py,px+w,py+h,r); x.arcTo(px+w,py+h,px,py+h,r); x.arcTo(px,py+h,px,py,r); x.arcTo(px,py,px+w,py,r); x.closePath(); }
  function fitFont(x,text,weight,size,min,family,maxW){
    while(size>min){ x.font=weight+" "+size+"px "+family; if(x.measureText(text).width<=maxW) break; size-=2; }
    return size;
  }

  function drawShareCard(name,key){
    var W=1080,H=1080,c=document.createElement("canvas");c.width=W;c.height=H;
    var x=c.getContext("2d"), color=SHARE_COLORS[key]||"#7c3aed";
    var g=x.createLinearGradient(0,0,W,H);
    g.addColorStop(0,"#6d28d9");g.addColorStop(.45,"#db2777");g.addColorStop(1,"#f59e0b");
    x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,.09)";
    x.beginPath();x.arc(60,150,240,0,7);x.fill();
    x.beginPath();x.arc(W-40,H-170,290,0,7);x.fill();
    x.fillStyle="rgba(255,255,255,.06)";
    x.beginPath();x.arc(180,H-40,170,0,7);x.fill();
    x.beginPath();x.arc(W-190,70,150,0,7);x.fill();
    /* brand row: mark + urlcallapp wordmark, centered as a group */
    var mark=104, markY=86;
    var phoneIcon=iconPath("tel");
    x.font="800 78px "+FONT;
    var w1=x.measureText("url").width, w2=x.measureText("call").width, w3=x.measureText("app").width;
    var total=mark+26+w1+w2+w3, bx=(W-total)/2;
    rr(x,bx,markY,mark,mark,30);
    var mg=x.createLinearGradient(bx,markY,bx+mark,markY+mark);
    mg.addColorStop(0,"#fde047");mg.addColorStop(1,"#fb923c");
    x.fillStyle=mg;x.fill();
    x.save();x.translate(bx+mark/2,markY+mark/2);
    var ms=mark*0.62/24;x.scale(ms,ms);x.translate(-12,-12);
    x.fillStyle="#1f1235";if(phoneIcon)x.fill(phoneIcon);x.restore();
    x.textBaseline="middle";x.textAlign="left";x.direction="ltr";
    var ty=markY+mark/2+4, tx=bx+mark+26;
    x.fillStyle="#fff";x.fillText("url",tx,ty);
    x.fillStyle="#fde047";x.fillText("call",tx+w1,ty);
    x.fillStyle="#fff";x.fillText("app",tx+w1+w2,ty);
    /* white card */
    var cx=100,cy=250,cw=W-200,ch=620;
    x.save();
    x.shadowColor="rgba(31,18,53,.35)";x.shadowBlur=45;x.shadowOffsetY=18;
    rr(x,cx,cy,cw,ch,56);x.fillStyle="rgba(255,255,255,.95)";x.fill();
    x.restore();
    /* protocol icon disc */
    var icx=W/2, icy=cy+128, ir=76;
    x.beginPath();x.arc(icx,icy,ir,0,7);x.fillStyle=color;x.fill();
    var p=iconPath(key)||phoneIcon;
    x.save();x.translate(icx,icy);
    var is=(ir*2*0.62)/24;x.scale(is,is);x.translate(-12,-12);
    x.fillStyle="#fff";if(p)x.fill(p);x.restore();
    /* headline + subline */
    var headline=name ? "היי "+name+"!" : "היי!";
    x.direction="rtl";x.textAlign="center";x.textBaseline="alphabetic";
    fitFont(x,headline,"800",84,40,FONT,cw-120);
    x.fillStyle="#1f1235";
    x.fillText(headline,W/2,cy+292);
    var line2="הכנתי לך קישור שפותח "+(SHARE_PHRASES[key]||"פעולה")+" בלחיצה אחת";
    fitFont(x,line2,"500",40,26,FONT,cw-140);
    x.fillStyle="#4c3f73";
    x.fillText(line2,W/2,cy+368);
    /* domain pill */
    var pill="urlcallapp.github.io/urlcallapp";
    x.font="700 34px "+FONT;x.direction="ltr";
    var pw=x.measureText(pill).width+72;
    rr(x,(W-pw)/2,cy+460,pw,86,43);
    x.fillStyle="#f3efff";x.fill();
    x.fillStyle="#7c3aed";x.textAlign="center";x.textBaseline="middle";
    x.fillText(pill,W/2,cy+460+46);
    /* footer on the gradient */
    x.font="400 30px "+FONT;x.fillStyle="rgba(255,255,255,.92)";x.direction="rtl";
    x.fillText("נוצר בדפדפן, בלי אפליקציה ובלי שרת",W/2,cy+ch+92);
    return c;
  }

  function copyPlain(text,onOk){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(onOk,function(){legacy();});
    } else { legacy(); }
    function legacy(){
      var ta=document.createElement("textarea");
      ta.value=text;document.body.appendChild(ta);ta.select();
      try{document.execCommand("copy");onOk();}catch(e){}
      document.body.removeChild(ta);
    }
  }

  function refreshSharePreview(){
    var card=drawShareCard(shareName.value.trim(),current);
    shareImg.src=card.toDataURL("image/png");
    sharePreview.hidden=false;
    shareBlob=null;shareGo.disabled=true;
    card.toBlob(function(b){ shareBlob=b; shareGo.disabled=false; },"image/png");
  }

  function openShare(){
    var preset=val("name");
    if(preset) shareName.value=preset;
    shareSheet.hidden=false;
    document.body.style.overflow="hidden";
    refreshSharePreview();
    setTimeout(function(){ shareName.focus(); },80);
  }
  function closeShare(){
    shareSheet.hidden=true;
    document.body.style.overflow="";
  }

  shareBtn.addEventListener("click", openShare);
  shareCancel.addEventListener("click", closeShare);
  shareSheet.addEventListener("click", function(e){ if(e.target===shareSheet) closeShare(); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && !shareSheet.hidden) closeShare(); });
  shareName.addEventListener("input", function(){
    clearTimeout(shareTimer);
    shareTimer=setTimeout(refreshSharePreview,160);
  });
  shareDownload.addEventListener("click", function(){
    if(!shareImg.src) return;
    var a=document.createElement("a");a.download="urlcallapp-share.png";a.href=shareImg.src;a.click();
  });

  shareGo.addEventListener("click", function(){
    var url=outEl.textContent;
    var nm=shareName.value.trim();
    var text=(nm ? nm+", " : "")+"הכנתי לך קישור שפותח "+(SHARE_PHRASES[current]||"פעולה")+" בלחיצה אחת ✨";
    function done(){ closeShare(); }
    function copyFallback(){
      copyPlain(text+"\n"+url,function(){
        toast.textContent="הטקסט והקישור הועתקו!";
        toast.style.background="#16a34a";
        toast.classList.add("show");
        setTimeout(function(){ toast.classList.remove("show"); },1800);
      });
      done();
    }
    if(shareBlob){
      var file=new File([shareBlob],"urlcallapp-share.png",{type:"image/png"});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        navigator.share({files:[file],text:text+"\n"+url,title:"urlcallapp"}).then(done,function(){});
        return;
      }
    }
    if(navigator.share){
      navigator.share({title:"urlcallapp",text:text,url:url}).then(done,function(){});
      return;
    }
    copyFallback();
  });
})();

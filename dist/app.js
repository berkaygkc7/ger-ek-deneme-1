"use strict";var ServisApp=(()=>{var G=["\u015Eeyh \u015Eamil Mahallesi","Ahi Evran Mahallesi","Eryaman 1. Etap","Eryaman 3. Etap","Elvankent Meydan\u0131","Etimesgut Sanayi","Sincan Otogar","Bat\u0131kent Metro","Mesa Koru","\xDCmitk\xF6y Migros","\xC7ayyolu Caddesi","Ya\u015Famkent","\u0130ncek Kav\u015Fa\u011F\u0131","T\xFCrkkonut","Alacaatl\u0131","Yaprac\u0131k","Ba\u011Fl\u0131ca","Temelli","Yenikent","Fatih Mahallesi"];function N(e){let t=new Set,a=[];for(let n=0;n<e;n++){let s;do s=Math.floor(Math.random()*G.length);while(t.has(s));t.add(s);let i=7+Math.floor(n*.6),r=n*12%60;a.push({id:`stop-${s}`,name:G[s],lat:39.9+Math.random()*.1,lng:32.7+Math.random()*.2,estimatedTime:`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`})}return a}var g=[{id:"r1",name:"Etimesgut - Merkez G\xFCzergah",stops:N(6),driverName:"Ahmet \xC7elik",vehiclePlate:"06 ABC 123"},{id:"r2",name:"Sincan - Bat\u0131kent G\xFCzergah",stops:N(5),driverName:"Mustafa Demir",vehiclePlate:"06 DEF 456"},{id:"r3",name:"Eryaman - Elvankent G\xFCzergah",stops:N(7),driverName:"Hasan Y\u0131ld\u0131z",vehiclePlate:"06 GHI 789"},{id:"r4",name:"\xC7ayyolu - \xDCmitk\xF6y G\xFCzergah",stops:N(5),driverName:"Ali Kara",vehiclePlate:"06 JKL 012"},{id:"r5",name:"Ba\u011Fl\u0131ca - Yaprac\u0131k G\xFCzergah",stops:N(4),driverName:"\xD6mer Aksoy",vehiclePlate:"06 MNO 345"}],_=["Elif","Yusuf","Zeynep","Mehmet","Ay\u015Fe","Burak","Defne","Emre","Selin","Kaan","Merve","Arda","Fatma","Can","Sude","Berk","\u0130rem","Ege","Ecrin","Doruk"],I=["Y\u0131lmaz","Kaya","Demir","\xC7elik","\u015Eahin","Arslan","Do\u011Fan","K\u0131l\u0131\xE7","Aslan","Ayd\u0131n","\xD6zdemir","Korkmaz","Erdo\u011Fan","G\xFCne\u015F","Akta\u015F"],U=["1-A","1-B","2-A","2-B","3-A","3-B","4-A","4-B","5-A","5-B"],f=Array.from({length:30},(e,t)=>{let a=g[t%g.length],n=t===5||t===12||t===23;return{id:`stu-${t+1}`,name:`${_[t%_.length]} ${I[t%I.length]}`,class:U[t%U.length],route:a.name,stopName:a.stops[t%a.stops.length]?.name??G[0],isOutsideRoute:n,parentPhone:`(5${30+t}) ${100+t*3}-${4e3+t*7}`}});function Z(){let e=Date.now();return[{id:"a1",type:"route_complete",title:"Sabah Seferi Tamamland\u0131",description:"Etimesgut - Merkez g\xFCzergah\u0131 sabah seferi ba\u015Far\u0131yla tamamland\u0131. 28 \xF6\u011Frenci ta\u015F\u0131nd\u0131.",timestamp:new Date(e-25*6e4),icon:"\u2705"},{id:"a2",type:"attendance",title:"Yoklama Al\u0131nd\u0131",description:"3-A s\u0131n\u0131f\u0131 yoklamas\u0131 tamamland\u0131. 24/26 \xF6\u011Frenci mevcut.",timestamp:new Date(e-45*6e4),icon:"\u{1F4CB}"},{id:"a3",type:"driver_rating",title:"\u015Eof\xF6r De\u011Ferlendirmesi",description:"Ahmet \xC7elik i\xE7in yeni bir de\u011Ferlendirme yap\u0131ld\u0131. Ortalama puan: 4.8/5",timestamp:new Date(e-2*36e5),icon:"\u2B50"},{id:"a4",type:"alert",title:"G\xFCzergah D\u0131\u015F\u0131 Uyar\u0131s\u0131",description:"Burak \u015Eahin g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli bilgilendirildi.",timestamp:new Date(e-3*36e5),icon:"\u26A0\uFE0F"},{id:"a5",type:"new_student",title:"Yeni \xD6\u011Frenci Kayd\u0131",description:"Ecrin Akta\u015F, Sincan - Bat\u0131kent g\xFCzergah\u0131na kay\u0131t edildi.",timestamp:new Date(e-5*36e5),icon:"\u{1F195}"},{id:"a6",type:"route_change",title:"Rota G\xFCncellendi",description:"Eryaman - Elvankent g\xFCzergah\u0131na Yaprac\u0131k dura\u011F\u0131 eklendi.",timestamp:new Date(e-8*36e5),icon:"\u{1F504}"},{id:"a7",type:"maintenance",title:"Ara\xE7 Bak\u0131m\u0131",description:"06 GHI 789 plakal\u0131 arac\u0131n periyodik bak\u0131m\u0131 tamamland\u0131.",timestamp:new Date(e-12*36e5),icon:"\u{1F527}"},{id:"a8",type:"route_complete",title:"Ak\u015Fam Seferi Tamamland\u0131",description:"\xC7ayyolu - \xDCmitk\xF6y g\xFCzergah\u0131 ak\u015Fam seferi sorunsuz tamamland\u0131.",timestamp:new Date(e-24*36e5),icon:"\u2705"},{id:"a9",type:"attendance",title:"Haftal\u0131k Yoklama Raporu",description:"Bu haftan\u0131n genel yoklama oran\u0131: %96.2 \u2014 Ge\xE7en haftaya g\xF6re %1.4 art\u0131\u015F.",timestamp:new Date(e-28*36e5),icon:"\u{1F4CA}"},{id:"a10",type:"driver_rating",title:"Ayl\u0131k En \u0130yi \u015Eof\xF6r",description:"Mustafa Demir, 4.9/5 ortalama puan ile ay\u0131n \u015Fof\xF6r\xFC se\xE7ildi.",timestamp:new Date(e-48*36e5),icon:"\u{1F3C6}"},{id:"a11",type:"alert",title:"Trafik Uyar\u0131s\u0131",description:"Bat\u0131kent Metro kav\u015Fa\u011F\u0131nda yo\u011Funluk nedeniyle Sincan g\xFCzergah\u0131nda 8 dk gecikme.",timestamp:new Date(e-52*36e5),icon:"\u{1F6A6}"},{id:"a12",type:"new_student",title:"Toplu Kay\u0131t",description:"Fatih \u0130lkokulu ile anla\u015Fma yap\u0131ld\u0131. 15 yeni \xF6\u011Frenci sisteme eklendi.",timestamp:new Date(e-72*36e5),icon:"\u{1F3EB}"}]}var Y=[{id:"d1",name:"Ahmet \xC7elik",plate:"06 ABC 123",route:"Etimesgut - Merkez",avatar:"A\xC7"},{id:"d2",name:"Mustafa Demir",plate:"06 DEF 456",route:"Sincan - Bat\u0131kent",avatar:"MD"},{id:"d3",name:"Hasan Y\u0131ld\u0131z",plate:"06 GHI 789",route:"Eryaman - Elvankent",avatar:"HY"},{id:"d4",name:"Ali Kara",plate:"06 JKL 012",route:"\xC7ayyolu - \xDCmitk\xF6y",avatar:"AK"},{id:"d5",name:"\xD6mer Aksoy",plate:"06 MNO 345",route:"Ba\u011Fl\u0131ca - Yaprac\u0131k",avatar:"\xD6A"}];function O(){let e=new Date,t=["active","active","active","idle","returning"];return g.map((a,n)=>({id:`v-${n+1}`,plate:a.vehiclePlate,driverName:a.driverName,routeName:a.name,status:t[n],position:{lat:39.92+Math.random()*.08,lng:32.75+Math.random()*.15,speed:t[n]==="active"?25+Math.floor(Math.random()*35):0,heading:Math.floor(Math.random()*360)},lastUpdate:new Date(e.getTime()-Math.floor(Math.random()*3e5)),studentsOnBoard:t[n]==="active"?12+Math.floor(Math.random()*16):0,capacity:28+Math.floor(Math.random()*8),nextStop:a.stops[Math.floor(Math.random()*a.stops.length)]?.name??"Bilinmiyor",eta:t[n]==="active"?`${3+Math.floor(Math.random()*12)} dk`:"-",fuelLevel:40+Math.floor(Math.random()*55)}))}function J(){let e=Date.now();return[{id:"n1",type:"arrival",title:"Servis Yakla\u015F\u0131yor",message:"Elif'in servisi 3 dakika i\xE7inde dura\u011Fa ula\u015Facakt\u0131r.",studentName:"Elif Y\u0131lmaz",parentName:"Ay\u015Fe Y\u0131lmaz",parentPhone:"(532) 100-4000",timestamp:new Date(e-5*6e4),read:!1,priority:"medium"},{id:"n2",type:"departure",title:"Okula Vard\u0131",message:"Yusuf okula g\xFCvenle ula\u015Fm\u0131\u015Ft\u0131r. \u0130yi dersler!",studentName:"Yusuf Kaya",parentName:"Mehmet Kaya",parentPhone:"(533) 103-4007",timestamp:new Date(e-25*6e4),read:!0,priority:"low"},{id:"n3",type:"delay",title:"Servis Gecikmesi",message:"Trafik yo\u011Funlu\u011Fu nedeniyle Zeynep'in servisi yakla\u015F\u0131k 10 dakika gecikecektir.",studentName:"Zeynep Demir",parentName:"Fatma Demir",parentPhone:"(534) 106-4014",timestamp:new Date(e-45*6e4),read:!1,priority:"high"},{id:"n4",type:"absence",title:"Devams\u0131zl\u0131k Bildirimi",message:"Mehmet bug\xFCnk\xFC yoklamada devams\u0131z olarak i\u015Faretlenmi\u015Ftir.",studentName:"Mehmet \xC7elik",parentName:"Ali \xC7elik",parentPhone:"(535) 109-4021",timestamp:new Date(e-2*36e5),read:!0,priority:"medium"},{id:"n5",type:"route_change",title:"G\xFCzergah De\u011Fi\u015Fikli\u011Fi",message:"Ay\u015Fe'nin g\xFCzergah\u0131na Yaprac\u0131k dura\u011F\u0131 eklenmi\u015Ftir. Yeni tahmini var\u0131\u015F: 07:45",studentName:"Ay\u015Fe \u015Eahin",parentName:"Hasan \u015Eahin",parentPhone:"(536) 112-4028",timestamp:new Date(e-4*36e5),read:!1,priority:"medium"},{id:"n6",type:"emergency",title:"Acil Durum Bildirimi",message:"Burak'\u0131n servisinde k\xFC\xE7\xFCk bir ar\u0131za tespit edildi. Yedek ara\xE7 g\xF6nderildi, 15 dk gecikme bekleniyor.",studentName:"Burak Arslan",parentName:"Kemal Arslan",parentPhone:"(537) 115-4035",timestamp:new Date(e-5*36e5),read:!1,priority:"urgent"},{id:"n7",type:"general",title:"Haftal\u0131k Rapor",message:"Defne bu hafta %100 devam oran\u0131 ile t\xFCm seferlere kat\u0131ld\u0131. Tebrikler!",studentName:"Defne Do\u011Fan",parentName:"Sema Do\u011Fan",parentPhone:"(538) 118-4042",timestamp:new Date(e-24*36e5),read:!0,priority:"low"},{id:"n8",type:"arrival",title:"Eve Yakla\u015F\u0131yor",message:"Emre'nin servisi dura\u011Fa 5 dakika i\xE7inde varacakt\u0131r.",studentName:"Emre K\u0131l\u0131\xE7",parentName:"Veli K\u0131l\u0131\xE7",parentPhone:"(539) 121-4049",timestamp:new Date(e-26*36e5),read:!0,priority:"medium"},{id:"n9",type:"delay",title:"Sabah Seferi Gecikmesi",message:"Selin'in sabah seferi yol \xE7al\u0131\u015Fmas\u0131 nedeniyle 7 dakika gecikecektir.",studentName:"Selin Aslan",parentName:"Deniz Aslan",parentPhone:"(540) 124-4056",timestamp:new Date(e-30*36e5),read:!0,priority:"high"},{id:"n10",type:"general",title:"Servis \xDCcreti Hat\u0131rlatma",message:"Kaan'\u0131n Mart ay\u0131 servis \xFCcreti son \xF6deme tarihi 5 Mart't\u0131r.",studentName:"Kaan Ayd\u0131n",parentName:"Selim Ayd\u0131n",parentPhone:"(541) 127-4063",timestamp:new Date(e-48*36e5),read:!1,priority:"low"}]}function W(){return{totalStudents:156,activeRoutes:5,avgAttendance:94.7,totalTripsToday:10,onTimePercentage:91.3,activeVehicles:4,totalDrivers:5,avgDriverRating:4.6}}function X(){return[{day:"Pazartesi",present:142,absent:14,total:156},{day:"Sal\u0131",present:148,absent:8,total:156},{day:"\xC7ar\u015Famba",present:145,absent:11,total:156},{day:"Per\u015Fembe",present:150,absent:6,total:156},{day:"Cuma",present:138,absent:18,total:156}]}function Q(){return[{routeName:"Etimesgut - Merkez",onTimeRate:94.2,avgDelay:2.3,studentCount:28,tripCount:42,satisfaction:4.8},{routeName:"Sincan - Bat\u0131kent",onTimeRate:88.5,avgDelay:4.1,studentCount:32,tripCount:40,satisfaction:4.5},{routeName:"Eryaman - Elvankent",onTimeRate:96.1,avgDelay:1.2,studentCount:35,tripCount:44,satisfaction:4.9},{routeName:"\xC7ayyolu - \xDCmitk\xF6y",onTimeRate:91.7,avgDelay:3,studentCount:30,tripCount:38,satisfaction:4.6},{routeName:"Ba\u011Fl\u0131ca - Yaprac\u0131k",onTimeRate:93.4,avgDelay:2.7,studentCount:31,tripCount:41,satisfaction:4.7}]}function l(e){return document.querySelector(e)}function be(e,t,a){let n=document.createElement(e);return t&&Object.entries(t).forEach(([s,i])=>{s==="className"?n.className=i:s==="innerHTML"?n.innerHTML=i:n.setAttribute(s,i)}),a&&a.forEach(s=>{typeof s=="string"?n.appendChild(document.createTextNode(s)):n.appendChild(s)}),n}function P(e){let a=new Date().getTime()-e.getTime(),n=Math.floor(a/6e4),s=Math.floor(a/36e5),i=Math.floor(a/864e5);return n<1?"Az \xF6nce":n<60?`${n} dakika \xF6nce`:s<24?`${s} saat \xF6nce`:i<7?`${i} g\xFCn \xF6nce`:e.toLocaleDateString("tr-TR")}function ee(e){return e.toLocaleDateString("tr-TR",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}function d(e,t="info"){let a={success:"\u2705",error:"\u274C",warning:"\u26A0\uFE0F",info:"\u2139\uFE0F"},n={success:"#4caf50",error:"#e53935",warning:"#ff9800",info:"#1a3a5f"},s=be("div",{className:"sp-toast",innerHTML:`<span class="sp-toast-icon">${a[t]}</span><span>${e}</span>`});s.style.cssText=`
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${n[t]};color:#fff;padding:0.85rem 1.5rem;border-radius:10px;
    box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:10001;display:flex;align-items:center;
    gap:0.6rem;font-size:0.95rem;opacity:0;transition:all 0.3s;max-width:90%;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>s.remove(),300)},3500)}var o={step:"select-start",selectedRoute:null,startStop:null,endStop:null,time:null,history:[]};function b(){let e=g.find(t=>t.id===o.selectedRoute);return e?e.stops:g.flatMap(t=>t.stops)}function F(e){o.history.push(o.step),o.step=e}function ke(){let e=o.history.pop();e&&(o.step==="confirm"&&(o.time=null),o.step==="select-time"&&(o.endStop=null),o.step==="select-end"&&(o.startStop=null),o.step=e,D())}function te(){o.step="select-start",o.selectedRoute=null,o.startStop=null,o.endStop=null,o.time=null,o.history=[],D(),d("Rota planlamas\u0131 iptal edildi.","warning")}function $e(){let e=[{key:"select-start",label:"Ba\u015Flang\u0131\xE7"},{key:"select-end",label:"Var\u0131\u015F"},{key:"select-time",label:"Saat"},{key:"confirm",label:"Onay"}],t=e.findIndex(a=>a.key===o.step);return`<div class="sp-steps">
    ${e.map((a,n)=>`
      <div class="sp-step ${n<t?"completed":""} ${n===t?"active":""}">
        <div class="sp-step-num">${n<t?"\u2713":n+1}</div>
        <div class="sp-step-label">${a.label}</div>
      </div>
      ${n<e.length-1?'<div class="sp-step-line '+(n<t?"completed":"")+'"></div>':""}
    `).join("")}
  </div>`}function Se(){return`<div class="sp-planner-controls">
    ${o.history.length>0?'<button class="sp-btn sp-btn-outline" id="rpBack">\u2190 Geri</button>':"<div></div>"}
    <button class="sp-btn sp-btn-danger" id="rpCancel">\u2715 \u0130ptal Et</button>
  </div>`}function Ee(){return`
    <h4>G\xFCzergah & Ba\u015Flang\u0131\xE7 Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-form-group">
      <label class="sp-label">G\xFCzergah</label>
      <div class="sp-radio-group">${g.map(t=>`<label class="sp-radio-card">
      <input type="radio" name="route" value="${t.id}" ${o.selectedRoute===t.id?"checked":""}>
      <div class="sp-radio-body">
        <strong>${t.name}</strong>
        <small>${t.stops.length} durak \xB7 \u015Eof\xF6r: ${t.driverName} \xB7 ${t.vehiclePlate}</small>
      </div>
    </label>`).join("")}</div>
    </div>
    <div class="sp-form-group" id="rpStartStops" style="${o.selectedRoute?"":"display:none"}">
      <label class="sp-label">Ba\u015Flang\u0131\xE7 Dura\u011F\u0131</label>
      <select class="sp-select" id="rpStartSelect">
        <option value="">Durak se\xE7in...</option>
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextStart" disabled>Devam Et \u2192</button>
    </div>`}function Me(){let t=b().filter(n=>n.id!==o.startStop).map(n=>`<option value="${n.id}" ${n.id===o.endStop?"selected":""}>${n.name} (${n.estimatedTime})</option>`).join("");return`
    <h4>Var\u0131\u015F Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} Ba\u015Flang\u0131\xE7: <strong>${b().find(n=>n.id===o.startStop)?.name??""}</strong></div>
    <div class="sp-form-group">
      <label class="sp-label">Var\u0131\u015F Dura\u011F\u0131</label>
      <select class="sp-select" id="rpEndSelect">
        <option value="">Durak se\xE7in...</option>
        ${t}
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextEnd" disabled>Devam Et \u2192</button>
    </div>`}function Te(){let t=["06:30","07:00","07:30","08:00","08:30","12:00","13:00","15:30","16:00","16:30","17:00","17:30"].map(a=>`<button class="sp-time-chip ${o.time===a?"selected":""}" data-time="${a}">${a}</button>`).join("");return`
    <h4>Sefer Saati Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} ${b().find(a=>a.id===o.startStop)?.name} \u2192 ${b().find(a=>a.id===o.endStop)?.name}</div>
    <div class="sp-time-grid">${t}</div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextTime" disabled>Devam Et \u2192</button>
    </div>`}function Le(){let e=g.find(n=>n.id===o.selectedRoute),t=b().find(n=>n.id===o.startStop)?.name??"",a=b().find(n=>n.id===o.endStop)?.name??"";return`
    <h4>Rota Onay\u0131</h4>
    <div class="sp-confirm-card">
      <div class="sp-confirm-row"><span>G\xFCzergah:</span><strong>${e?.name}</strong></div>
      <div class="sp-confirm-row"><span>\u015Eof\xF6r:</span><strong>${e?.driverName}</strong></div>
      <div class="sp-confirm-row"><span>Ara\xE7:</span><strong>${e?.vehiclePlate}</strong></div>
      <div class="sp-confirm-row"><span>Ba\u015Flang\u0131\xE7:</span><strong>${t}</strong></div>
      <div class="sp-confirm-row"><span>Var\u0131\u015F:</span><strong>${a}</strong></div>
      <div class="sp-confirm-row"><span>Saat:</span><strong>${o.time}</strong></div>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-success" id="rpConfirm">\u2713 Rotay\u0131 Onayla</button>
    </div>`}function D(){let e=l("#routePlannerContent");if(!e)return;let t=$e();switch(o.step){case"select-start":t+=Ee();break;case"select-end":t+=Me();break;case"select-time":t+=Te();break;case"confirm":t+=Le();break}t+=Se(),e.innerHTML=t,De()}function De(){let e=l("#rpBack"),t=l("#rpCancel");if(e?.addEventListener("click",ke),t?.addEventListener("click",te),o.step==="select-start"){document.querySelectorAll('input[name="route"]').forEach(s=>{s.addEventListener("change",()=>{o.selectedRoute=s.value;let i=l("#rpStartStops"),r=l("#rpStartSelect");if(i&&(i.style.display=""),r){let h=b();r.innerHTML='<option value="">Durak se\xE7in...</option>'+h.map(L=>`<option value="${L.id}">${L.name} (${L.estimatedTime})</option>`).join("")}})});let a=l("#rpStartSelect"),n=l("#rpNextStart");a?.addEventListener("change",()=>{o.startStop=a.value||null,n&&(n.disabled=!o.startStop)}),n?.addEventListener("click",()=>{o.startStop&&(F("select-end"),D())})}if(o.step==="select-end"){let a=l("#rpEndSelect"),n=l("#rpNextEnd");a?.addEventListener("change",()=>{o.endStop=a.value||null,n&&(n.disabled=!o.endStop)}),n?.addEventListener("click",()=>{o.endStop&&(F("select-time"),D())})}o.step==="select-time"&&(document.querySelectorAll(".sp-time-chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".sp-time-chip").forEach(i=>i.classList.remove("selected")),n.classList.add("selected"),o.time=n.dataset.time??null;let s=l("#rpNextTime");s&&(s.disabled=!1)})}),l("#rpNextTime")?.addEventListener("click",()=>{o.time&&(F("confirm"),D())})),o.step==="confirm"&&l("#rpConfirm")?.addEventListener("click",()=>{d("Rota ba\u015Far\u0131yla onayland\u0131!","success"),te()})}function ae(){l("#routePlannerContent")&&D()}var ne={route_complete:"#4caf50",attendance:"#2196f3",new_student:"#9c27b0",driver_rating:"#ff9800",route_change:"#00bcd4",alert:"#e53935",maintenance:"#607d8b"},we={route_complete:"Sefer",attendance:"Yoklama",new_student:"Kay\u0131t",driver_rating:"De\u011Ferlendirme",route_change:"G\xFCzergah",alert:"Uyar\u0131",maintenance:"Bak\u0131m"};function se(){let e=l("#activitiesContent");if(!e)return;let t=Z(),a=`
    <div class="sp-activity-filters">
      <button class="sp-filter-btn active" data-filter="all">T\xFCm\xFC</button>
      <button class="sp-filter-btn" data-filter="route_complete">Seferler</button>
      <button class="sp-filter-btn" data-filter="attendance">Yoklama</button>
      <button class="sp-filter-btn" data-filter="alert">Uyar\u0131lar</button>
      <button class="sp-filter-btn" data-filter="driver_rating">De\u011Ferlendirme</button>
    </div>`;function n(s){let i=s==="all"?t:t.filter(r=>r.type===s);return i.length===0?'<div class="sp-empty-state">Bu kategoride aktivite bulunamad\u0131.</div>':i.map(r=>`
      <div class="sp-activity-item" data-type="${r.type}">
        <div class="sp-activity-icon" style="background:${ne[r.type]??"#757575"}">${r.icon}</div>
        <div class="sp-activity-body">
          <div class="sp-activity-header">
            <strong>${r.title}</strong>
            <span class="sp-activity-badge" style="background:${ne[r.type]??"#757575"}">${we[r.type]??""}</span>
          </div>
          <p>${r.description}</p>
          <small>${P(r.timestamp)}</small>
        </div>
      </div>
    `).join("")}e.innerHTML=a+`<div class="sp-activity-list" id="activityList">${n("all")}</div>`,e.querySelectorAll(".sp-filter-btn").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".sp-filter-btn").forEach(r=>r.classList.remove("active")),s.classList.add("active");let i=e.querySelector("#activityList");i&&(i.innerHTML=n(s.dataset.filter??"all"))})})}var u=new Map,H="all",q="";function $(){return f.filter(e=>{let t=H==="all"||e.class===H,a=!q||e.name.toLowerCase().includes(q.toLowerCase());return t&&a})}function Ae(){return[...new Set(f.map(e=>e.class))].sort()}function ie(){let e=$(),t=e.filter(s=>u.get(s.id)===!0).length,a=e.filter(s=>u.get(s.id)===!1).length,n=e.length-t-a;return{total:e.length,present:t,absent:a,unmarked:n}}function k(){let e=l("#attendanceContent");if(!e)return;let t=Ae(),a=ie(),n=$(),s=ee(new Date),i=a.total>0?Math.round(a.present/a.total*100):0;e.innerHTML=`
    <div class="sp-attendance-header">
      <div class="sp-attendance-date">\u{1F4C5} ${s}</div>
      <div class="sp-attendance-stats-bar">
        <div class="sp-att-stat sp-att-present"><span>${a.present}</span> Mevcut</div>
        <div class="sp-att-stat sp-att-absent"><span>${a.absent}</span> Yok</div>
        <div class="sp-att-stat sp-att-unmarked"><span>${a.unmarked}</span> Bekliyor</div>
        <div class="sp-att-stat sp-att-pct"><span>%${i}</span> Kat\u0131l\u0131m</div>
      </div>
    </div>

    <div class="sp-attendance-toolbar">
      <div class="sp-att-filters">
        <select class="sp-select sp-select-sm" id="attClassFilter">
          <option value="all">T\xFCm S\u0131n\u0131flar</option>
          ${t.map(r=>`<option value="${r}" ${r===H?"selected":""}>${r}</option>`).join("")}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="attSearch" placeholder="\xD6\u011Frenci ara..." value="${q}">
      </div>
      <div class="sp-att-bulk">
        <button class="sp-btn sp-btn-sm sp-btn-success" id="attMarkAllPresent">T\xFCm\xFC Mevcut</button>
        <button class="sp-btn sp-btn-sm sp-btn-danger" id="attMarkAllAbsent">T\xFCm\xFC Yok</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="attReset">S\u0131f\u0131rla</button>
      </div>
    </div>

    <div class="sp-attendance-list">
      ${n.length===0?'<div class="sp-empty-state">\xD6\u011Frenci bulunamad\u0131.</div>':""}
      ${n.map(r=>{let h=u.get(r.id),L=h===!0,j=h===!1;return`
          <div class="sp-att-row ${L?"present":""} ${j?"absent":""} ${r.isOutsideRoute?"outside-route":""}">
            <div class="sp-att-student">
              <div class="sp-att-avatar">${r.name.split(" ").map(he=>he[0]).join("")}</div>
              <div class="sp-att-info">
                <strong>${r.name}</strong>
                <small>${r.class} \xB7 ${r.stopName}</small>
                ${r.isOutsideRoute?'<span class="sp-att-warning">\u26A0\uFE0F G\xFCzergah d\u0131\u015F\u0131</span>':""}
              </div>
            </div>
            <div class="sp-att-actions">
              <button class="sp-att-btn present ${L?"active":""}" data-id="${r.id}" data-action="present" title="Mevcut">\u2713</button>
              <button class="sp-att-btn absent ${j?"active":""}" data-id="${r.id}" data-action="absent" title="Yok">\u2715</button>
            </div>
          </div>`}).join("")}
    </div>

    <div class="sp-attendance-footer">
      <button class="sp-btn sp-btn-primary sp-btn-lg" id="attSave">\u{1F4CB} Yoklamay\u0131 Kaydet</button>
    </div>`,Ne(e)}function Ne(e){e.querySelector("#attClassFilter")?.addEventListener("change",t=>{H=t.target.value,k()}),e.querySelector("#attSearch")?.addEventListener("input",t=>{q=t.target.value,k()}),e.querySelectorAll(".sp-att-btn").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.id,n=t.dataset.action,s=u.get(a);if(n==="present"&&s===!0||n==="absent"&&s===!1)u.delete(a);else{u.set(a,n==="present");let i=f.find(r=>r.id===a);i?.isOutsideRoute&&n==="present"&&d(`\u26A0\uFE0F ${i.name} g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli ile ileti\u015Fime ge\xE7ilmesi \xF6nerilir.`,"warning")}k()})}),e.querySelector("#attMarkAllPresent")?.addEventListener("click",()=>{$().forEach(a=>u.set(a.id,!0));let t=$().filter(a=>a.isOutsideRoute);t.length>0&&d(`\u26A0\uFE0F ${t.length} \xF6\u011Frenci g\xFCzergah d\u0131\u015F\u0131nda ikamet ediyor. Listede i\u015Faretlendi.`,"warning"),k()}),e.querySelector("#attMarkAllAbsent")?.addEventListener("click",()=>{$().forEach(t=>u.set(t.id,!1)),k()}),e.querySelector("#attReset")?.addEventListener("click",()=>{$().forEach(t=>u.delete(t.id)),k()}),e.querySelector("#attSave")?.addEventListener("click",()=>{let t=ie();if(t.unmarked>0){d(`${t.unmarked} \xF6\u011Frencinin yoklamas\u0131 hen\xFCz i\u015Faretlenmedi.`,"warning");return}let a=$().map(n=>({studentId:n.id,date:new Date().toISOString().split("T")[0],present:u.get(n.id)??!1}));console.log("Yoklama kaydedildi:",a),d(`Yoklama ba\u015Far\u0131yla kaydedildi! ${t.present} mevcut, ${t.absent} devams\u0131z.`,"success")})}function re(){k()}var S=[{key:"safety",label:"G\xFCvenli S\xFCr\xFC\u015F",icon:"\u{1F6E1}\uFE0F"},{key:"punctuality",label:"Dakiklik",icon:"\u23F0"},{key:"friendliness",label:"\u0130leti\u015Fim & Samimiyet",icon:"\u{1F60A}"},{key:"driving",label:"S\xFCr\xFC\u015F Kalitesi",icon:"\u{1F68C}"},{key:"cleanliness",label:"Ara\xE7 Temizli\u011Fi",icon:"\u2728"}],w="",c={},R="",K=!1;function Re(e,t){return Array.from({length:5},(a,n)=>`<span class="sp-star ${n<t?"filled":""}" data-criterion="${e}" data-value="${n+1}">\u2605</span>`).join("")}function z(){let e=l("#surveyOverlay");if(!e)return;if(!K){e.style.display="none";return}e.style.display="flex";let t=e.querySelector(".sp-survey-content");if(!t)return;let a=Y.map(i=>`<option value="${i.id}" ${i.id===w?"selected":""}>${i.name} \u2014 ${i.route} (${i.plate})</option>`).join(""),n=w&&S.every(i=>(c[i.key]??0)>0),s=S.length>0?(S.reduce((i,r)=>i+(c[r.key]??0),0)/S.length).toFixed(1):"0.0";t.innerHTML=`
    <div class="sp-survey-header">
      <h3>\u015Eof\xF6r De\u011Ferlendirme Anketi</h3>
      <button class="sp-survey-close" id="surveyClose">&times;</button>
    </div>
    <div class="sp-survey-body">
      <p class="sp-survey-desc">Bu anket iste\u011Fe ba\u011Fl\u0131d\u0131r. \u015Eof\xF6rlerimizi de\u011Ferlendirerek hizmet kalitemizi art\u0131rmam\u0131za yard\u0131mc\u0131 olabilirsiniz.</p>
      <div class="sp-form-group">
        <label class="sp-label">\u015Eof\xF6r Se\xE7in</label>
        <select class="sp-select" id="surveyDriverSelect">
          <option value="">\u015Eof\xF6r se\xE7in...</option>
          ${a}
        </select>
      </div>
      ${w?`
        <div class="sp-survey-criteria">
          ${S.map(i=>`
            <div class="sp-criterion">
              <div class="sp-criterion-label">${i.icon} ${i.label}</div>
              <div class="sp-stars">${Re(i.key,c[i.key]??0)}</div>
              <div class="sp-criterion-value">${c[i.key]?c[i.key]+"/5":"-"}</div>
            </div>
          `).join("")}
        </div>
        <div class="sp-survey-avg">Ortalama Puan: <strong>${s}</strong>/5</div>
        <div class="sp-form-group">
          <label class="sp-label">Yorumunuz (\u0130ste\u011Fe ba\u011Fl\u0131)</label>
          <textarea class="sp-textarea" id="surveyComment" placeholder="\u015Eof\xF6r hakk\u0131ndaki g\xF6r\xFC\u015Flerinizi yazabilirsiniz..." rows="3">${R}</textarea>
        </div>
        <button class="sp-btn sp-btn-primary sp-btn-lg" id="surveySubmit" ${n?"":"disabled"}>
          De\u011Ferlendirmeyi G\xF6nder
        </button>
      `:'<div class="sp-empty-state">De\u011Ferlendirmek istedi\u011Finiz \u015Fof\xF6r\xFC se\xE7in.</div>'}
    </div>`,ze(e)}function ze(e){e.querySelector("#surveyClose")?.addEventListener("click",V),e.addEventListener("click",t=>{t.target.classList.contains("sp-survey-overlay")&&V()}),e.querySelector("#surveyDriverSelect")?.addEventListener("change",t=>{w=t.target.value,S.forEach(a=>delete c[a.key]),R="",z()}),e.querySelectorAll(".sp-star").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.criterion,n=parseInt(t.dataset.value,10);c[a]=n,z()})}),e.querySelector("#surveyComment")?.addEventListener("input",t=>{R=t.target.value}),e.querySelector("#surveySubmit")?.addEventListener("click",()=>{let t=Y.find(n=>n.id===w);if(!t)return;let a={driverId:t.id,driverName:t.name,ratings:{safety:c.safety??0,punctuality:c.punctuality??0,friendliness:c.friendliness??0,driving:c.driving??0,cleanliness:c.cleanliness??0},comment:R,date:new Date().toISOString().split("T")[0]};console.log("Anket g\xF6nderildi:",a),d(`${t.name} i\xE7in de\u011Ferlendirmeniz kaydedildi. Te\u015Fekk\xFCrler!`,"success"),V(),w="",S.forEach(n=>delete c[n.key]),R=""})}function V(){K=!1,z()}function Be(){K=!0,z()}function oe(){document.querySelectorAll('[data-action="open-survey"]').forEach(e=>{e.addEventListener("click",Be)}),z()}function le(){let e=l("#demoRequestForm");e&&e.addEventListener("submit",t=>{t.preventDefault();let a=new FormData(e),n={fullName:a.get("demoName"),email:a.get("demoEmail"),phone:a.get("demoPhone"),company:a.get("demoCompany"),studentCount:a.get("demoStudentCount"),serviceType:a.get("demoServiceType"),message:a.get("demoMessage")};console.log("Demo talebi:",n),d("Demo talebiniz al\u0131nd\u0131! Ekibimiz en k\u0131sa s\xFCrede sizinle ileti\u015Fime ge\xE7ecek.","success"),e.reset()})}function de(){let e=l("#contactMapContainer");e&&!e.querySelector("iframe")&&(e.innerHTML=`
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.6!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
        width="100%" height="250" style="border:0;border-radius:10px;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    `)}function ce(){let e=l("#routeCheckContent");if(!e)return;let t=f.filter(a=>a.isOutsideRoute);if(t.length===0){e.innerHTML='<div class="sp-empty-state">T\xFCm \xF6\u011Frenciler g\xFCzergah dahilinde.</div>';return}e.innerHTML=`
    <div class="sp-route-check-alert">
      <div class="sp-alert-banner warning">
        \u26A0\uFE0F <strong>${t.length} \xF6\u011Frenci</strong> kay\u0131tl\u0131 g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir.
      </div>
      <div class="sp-outside-list">
        ${t.map(a=>`
          <div class="sp-outside-card">
            <div class="sp-outside-info">
              <div class="sp-att-avatar">${a.name.split(" ").map(n=>n[0]).join("")}</div>
              <div>
                <strong>${a.name}</strong>
                <small>${a.class} \xB7 ${a.route}</small>
                <small>Durak: ${a.stopName}</small>
              </div>
            </div>
            <div class="sp-outside-actions">
              <button class="sp-btn sp-btn-sm sp-btn-outline" data-notify="${a.id}">\u{1F4F1} Veli Bilgilendir</button>
              <button class="sp-btn sp-btn-sm sp-btn-primary" data-reassign="${a.id}">\u{1F504} G\xFCzergah Ata</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`,e.querySelectorAll("[data-notify]").forEach(a=>{a.addEventListener("click",()=>{let n=f.find(s=>s.id===a.dataset.notify);n&&(d(`${n.name}'in velisine (${n.parentPhone}) bilgilendirme mesaj\u0131 g\xF6nderildi.`,"success"),a.textContent="\u2713 Bilgilendirildi",a.disabled=!0)})}),e.querySelectorAll("[data-reassign]").forEach(a=>{a.addEventListener("click",()=>{let n=f.find(s=>s.id===a.dataset.reassign);n&&d(`${n.name} i\xE7in yeni g\xFCzergah atama i\u015Flemi ba\u015Flat\u0131ld\u0131.`,"info")})})}var p=[],E=null,y="all",xe=null;function pe(e){return{active:"Seferde",idle:"Beklemede",maintenance:"Bak\u0131mda",returning:"D\xF6n\xFC\u015Fte"}[e]??e}function B(e){return{active:"#4caf50",idle:"#ff9800",maintenance:"#e53935",returning:"#2196f3"}[e]??"#757575"}function Ce(){return y==="all"?p:p.filter(e=>e.status===y)}function Pe(e){let t=Math.floor((Date.now()-e.getTime())/1e3);return t<60?`${t} sn \xF6nce`:`${Math.floor(t/60)} dk \xF6nce`}function He(e){let t=E===e.id,a=Math.round(e.studentsOnBoard/e.capacity*100),n=e.fuelLevel>50?"#4caf50":e.fuelLevel>25?"#ff9800":"#e53935";return`
    <div class="vt-card ${t?"selected":""}" data-vehicle="${e.id}">
      <div class="vt-card-header">
        <div class="vt-plate">
          <span class="vt-status-dot" style="background:${B(e.status)}"></span>
          <strong>${e.plate}</strong>
        </div>
        <span class="vt-status-badge" style="background:${B(e.status)}20;color:${B(e.status)}">${pe(e.status)}</span>
      </div>
      <div class="vt-card-body">
        <div class="vt-info-row"><span>\u015Eof\xF6r:</span><strong>${e.driverName}</strong></div>
        <div class="vt-info-row"><span>G\xFCzergah:</span><strong>${e.routeName}</strong></div>
        <div class="vt-info-row"><span>H\u0131z:</span><strong>${e.position.speed} km/s</strong></div>
        <div class="vt-info-row"><span>Sonraki Durak:</span><strong>${e.nextStop}</strong></div>
        <div class="vt-info-row"><span>Tahmini Var\u0131\u015F:</span><strong>${e.eta}</strong></div>
        <div class="vt-progress-row">
          <span>Yolcu (${e.studentsOnBoard}/${e.capacity})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${a}%;background:${a>85?"#e53935":"#4caf50"}"></div>
          </div>
        </div>
        <div class="vt-progress-row">
          <span>Yak\u0131t (%${e.fuelLevel})</span>
          <div class="vt-progress-bar">
            <div class="vt-progress-fill" style="width:${e.fuelLevel}%;background:${n}"></div>
          </div>
        </div>
        <div class="vt-update-time">Son g\xFCncelleme: ${Pe(e.lastUpdate)}</div>
      </div>
    </div>`}function qe(){let e=E?p.find(i=>i.id===E):null;if(!e)return`
      <div class="vt-map-placeholder">
        <div class="vt-map-icon">\u{1F5FA}\uFE0F</div>
        <p>Harita g\xF6r\xFCnt\xFCs\xFC i\xE7in bir ara\xE7 se\xE7in</p>
        <small>Sol panelden bir araca t\u0131klayarak konum bilgilerini g\xF6r\xFCnt\xFCleyebilirsiniz</small>
      </div>`;let t=12,a=Math.round((e.position.lat-39.9)/.1*(t-1)),n=Math.round((e.position.lng-32.75)/.15*(t-1)),s="";for(let i=0;i<t;i++)for(let r=0;r<t;r++){let h=i===t-1-a&&r===n;s+=`<div class="vt-grid-cell ${h?"vehicle":""}">${h?"\u{1F68C}":""}</div>`}return`
    <div class="vt-map-detail">
      <div class="vt-map-header">
        <h4>\u{1F4CD} ${e.plate} - ${e.driverName}</h4>
        <span class="vt-status-badge" style="background:${B(e.status)}20;color:${B(e.status)}">${pe(e.status)}</span>
      </div>
      <div class="vt-mini-map">
        <div class="vt-grid">${s}</div>
      </div>
      <div class="vt-coords">
        <div class="vt-coord-item"><span>Enlem:</span><strong>${e.position.lat.toFixed(4)}\xB0</strong></div>
        <div class="vt-coord-item"><span>Boylam:</span><strong>${e.position.lng.toFixed(4)}\xB0</strong></div>
        <div class="vt-coord-item"><span>Y\xF6n:</span><strong>${e.position.heading}\xB0</strong></div>
        <div class="vt-coord-item"><span>H\u0131z:</span><strong>${e.position.speed} km/s</strong></div>
      </div>
      <div class="vt-map-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtSendMessage" data-id="${e.id}">\u{1F4AC} \u015Eof\xF6re Mesaj</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="vtShowRoute" data-id="${e.id}">\u{1F5FA}\uFE0F G\xFCzergah\u0131 G\xF6ster</button>
      </div>
    </div>`}function x(){let e=l("#vehicleTrackingContent");if(!e)return;let t=Ce(),a=p.filter(i=>i.status==="active").length,n=p.reduce((i,r)=>i+r.studentsOnBoard,0),s=p.filter(i=>i.status==="active").reduce((i,r)=>i+r.position.speed,0)/(a||1);e.innerHTML=`
    <div class="vt-summary">
      <div class="vt-summary-card"><span class="vt-summary-num">${p.length}</span><span>Toplam Ara\xE7</span></div>
      <div class="vt-summary-card active"><span class="vt-summary-num">${a}</span><span>Seferde</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${n}</span><span>Yolcu</span></div>
      <div class="vt-summary-card"><span class="vt-summary-num">${Math.round(s)} km/s</span><span>Ort. H\u0131z</span></div>
    </div>

    <div class="vt-toolbar">
      <select class="sp-select sp-select-sm" id="vtStatusFilter">
        <option value="all" ${y==="all"?"selected":""}>T\xFCm Ara\xE7lar</option>
        <option value="active" ${y==="active"?"selected":""}>Seferde</option>
        <option value="idle" ${y==="idle"?"selected":""}>Beklemede</option>
        <option value="returning" ${y==="returning"?"selected":""}>D\xF6n\xFC\u015Fte</option>
        <option value="maintenance" ${y==="maintenance"?"selected":""}>Bak\u0131mda</option>
      </select>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="vtRefresh">\u{1F504} Yenile</button>
    </div>

    <div class="vt-layout">
      <div class="vt-vehicle-list">
        ${t.length===0?'<div class="sp-empty-state">Bu filtre ile e\u015Fle\u015Fen ara\xE7 yok.</div>':""}
        ${t.map(i=>He(i)).join("")}
      </div>
      <div class="vt-map-area">
        ${qe()}
      </div>
    </div>`,Ge(e)}function Ge(e){e.querySelector("#vtStatusFilter")?.addEventListener("change",t=>{y=t.target.value,x()}),e.querySelector("#vtRefresh")?.addEventListener("click",()=>{Ye(),d("Ara\xE7 konumlar\u0131 g\xFCncellendi.","info")}),e.querySelectorAll(".vt-card").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.vehicle;E=E===a?null:a,x()})}),e.querySelector("#vtSendMessage")?.addEventListener("click",()=>{let t=p.find(a=>a.id===E);t&&d(`${t.driverName} \u015Fof\xF6re mesaj g\xF6nderildi.`,"success")}),e.querySelector("#vtShowRoute")?.addEventListener("click",()=>{let t=p.find(a=>a.id===E);t&&d(`${t.routeName} g\xFCzergah\u0131 haritada g\xF6steriliyor.`,"info")})}function Ye(){p=O(),x()}function ue(){p=O(),x(),xe=setInterval(()=>{p.forEach(t=>{t.status==="active"&&(t.position.lat+=(Math.random()-.5)*.002,t.position.lng+=(Math.random()-.5)*.002,t.position.speed=Math.max(0,t.position.speed+Math.floor((Math.random()-.5)*10)),t.lastUpdate=new Date)}),l("#panel-vehicle-tracking")?.classList.contains("active")&&x()},1e4)}var v=[],m="all",T="all",A="";function Oe(e){return{arrival:"Var\u0131\u015F",departure:"Kalk\u0131\u015F",delay:"Gecikme",absence:"Devams\u0131zl\u0131k",route_change:"G\xFCzergah",emergency:"Acil",general:"Genel"}[e]??e}function Fe(e){return{arrival:"\u{1F68C}",departure:"\u{1F3EB}",delay:"\u23F0",absence:"\u274C",route_change:"\u{1F504}",emergency:"\u{1F6A8}",general:"\u{1F4E2}"}[e]??"\u{1F4CB}"}function Ve(e){return{low:"D\xFC\u015F\xFCk",medium:"Orta",high:"Y\xFCksek",urgent:"Acil"}[e]??e}function me(e){return{low:"#4caf50",medium:"#2196f3",high:"#ff9800",urgent:"#e53935"}[e]??"#757575"}function Ke(){return v.filter(e=>{let t=m==="all"||e.type===m,a=T==="all"||e.priority===T,n=!A||e.title.toLowerCase().includes(A.toLowerCase())||e.studentName.toLowerCase().includes(A.toLowerCase())||e.parentName.toLowerCase().includes(A.toLowerCase());return t&&a&&n})}function M(){let e=l("#notificationsContent");if(!e)return;let t=Ke(),a=v.filter(s=>!s.read).length,n=v.filter(s=>s.priority==="urgent"&&!s.read).length;e.innerHTML=`
    <div class="pn-summary">
      <div class="pn-summary-card"><span class="pn-summary-num">${v.length}</span><span>Toplam Bildirim</span></div>
      <div class="pn-summary-card unread"><span class="pn-summary-num">${a}</span><span>Okunmam\u0131\u015F</span></div>
      <div class="pn-summary-card urgent"><span class="pn-summary-num">${n}</span><span>Acil</span></div>
    </div>

    <div class="pn-toolbar">
      <div class="pn-filters">
        <select class="sp-select sp-select-sm" id="pnTypeFilter">
          <option value="all">T\xFCm T\xFCrler</option>
          <option value="arrival" ${m==="arrival"?"selected":""}>Var\u0131\u015F</option>
          <option value="departure" ${m==="departure"?"selected":""}>Kalk\u0131\u015F</option>
          <option value="delay" ${m==="delay"?"selected":""}>Gecikme</option>
          <option value="absence" ${m==="absence"?"selected":""}>Devams\u0131zl\u0131k</option>
          <option value="route_change" ${m==="route_change"?"selected":""}>G\xFCzergah</option>
          <option value="emergency" ${m==="emergency"?"selected":""}>Acil</option>
          <option value="general" ${m==="general"?"selected":""}>Genel</option>
        </select>
        <select class="sp-select sp-select-sm" id="pnPriorityFilter">
          <option value="all">T\xFCm \xD6ncelikler</option>
          <option value="urgent" ${T==="urgent"?"selected":""}>Acil</option>
          <option value="high" ${T==="high"?"selected":""}>Y\xFCksek</option>
          <option value="medium" ${T==="medium"?"selected":""}>Orta</option>
          <option value="low" ${T==="low"?"selected":""}>D\xFC\u015F\xFCk</option>
        </select>
        <input type="text" class="sp-input sp-input-sm" id="pnSearch" placeholder="Bildirim ara..." value="${A}">
      </div>
      <div class="pn-actions">
        <button class="sp-btn sp-btn-sm sp-btn-primary" id="pnMarkAllRead">\u2713 T\xFCm\xFCn\xFC Oku</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="pnNewNotification">+ Yeni Bildirim</button>
      </div>
    </div>

    <div class="pn-list">
      ${t.length===0?'<div class="sp-empty-state">Bu filtre ile e\u015Fle\u015Fen bildirim yok.</div>':""}
      ${t.map(s=>`
        <div class="pn-item ${s.read?"read":"unread"} priority-${s.priority}" data-id="${s.id}">
          <div class="pn-item-icon">${Fe(s.type)}</div>
          <div class="pn-item-content">
            <div class="pn-item-header">
              <strong>${s.title}</strong>
              <div class="pn-item-meta">
                <span class="pn-type-badge" style="background:${me(s.priority)}20;color:${me(s.priority)}">${Ve(s.priority)}</span>
                <span class="pn-type-badge outline">${Oe(s.type)}</span>
              </div>
            </div>
            <p class="pn-item-message">${s.message}</p>
            <div class="pn-item-footer">
              <span>\u{1F464} ${s.studentName}</span>
              <span>\u{1F468}\u200D\u{1F469}\u200D\u{1F467} ${s.parentName}</span>
              <span>\u{1F4DE} ${s.parentPhone}</span>
              <span>\u{1F550} ${P(s.timestamp)}</span>
            </div>
          </div>
          <div class="pn-item-actions">
            <button class="pn-action-btn" data-action="toggle-read" data-id="${s.id}" title="${s.read?"Okunmad\u0131 \u0130\u015Faretle":"Okundu \u0130\u015Faretle"}">
              ${s.read?"\u{1F4ED}":"\u{1F4EC}"}
            </button>
            <button class="pn-action-btn" data-action="resend" data-id="${s.id}" title="Tekrar G\xF6nder">\u{1F4E4}</button>
            <button class="pn-action-btn delete" data-action="delete" data-id="${s.id}" title="Sil">\u{1F5D1}\uFE0F</button>
          </div>
        </div>
      `).join("")}
    </div>`,je(e)}function je(e){e.querySelector("#pnTypeFilter")?.addEventListener("change",t=>{m=t.target.value,M()}),e.querySelector("#pnPriorityFilter")?.addEventListener("change",t=>{T=t.target.value,M()}),e.querySelector("#pnSearch")?.addEventListener("input",t=>{A=t.target.value,M()}),e.querySelector("#pnMarkAllRead")?.addEventListener("click",()=>{v.forEach(t=>t.read=!0),d("T\xFCm bildirimler okundu olarak i\u015Faretlendi.","success"),M()}),e.querySelector("#pnNewNotification")?.addEventListener("click",()=>{_e()}),e.querySelectorAll(".pn-action-btn").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();let n=t.dataset.action,s=t.dataset.id,i=v.find(r=>r.id===s);i&&(n==="toggle-read"?(i.read=!i.read,d(i.read?"Bildirim okundu olarak i\u015Faretlendi.":"Bildirim okunmad\u0131 olarak i\u015Faretlendi.","info")):n==="resend"?d(`"${i.title}" bildirimi ${i.parentName} velisine tekrar g\xF6nderildi.`,"success"):n==="delete"&&(v=v.filter(r=>r.id!==s),d("Bildirim silindi.","warning")),M())})})}function _e(){let e=document.createElement("div");e.className="pn-modal-overlay",e.innerHTML=`
    <div class="pn-modal">
      <div class="pn-modal-header">
        <h3>Yeni Bildirim G\xF6nder</h3>
        <button class="pn-modal-close" id="pnModalClose">\u2715</button>
      </div>
      <form id="pnNewForm" class="pn-modal-body">
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">Bildirim T\xFCr\xFC *</label>
            <select class="sp-select" name="type" required>
              <option value="general">Genel</option>
              <option value="arrival">Var\u0131\u015F</option>
              <option value="departure">Kalk\u0131\u015F</option>
              <option value="delay">Gecikme</option>
              <option value="absence">Devams\u0131zl\u0131k</option>
              <option value="route_change">G\xFCzergah De\u011Fi\u015Fikli\u011Fi</option>
              <option value="emergency">Acil Durum</option>
            </select>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">\xD6ncelik *</label>
            <select class="sp-select" name="priority" required>
              <option value="low">D\xFC\u015F\xFCk</option>
              <option value="medium" selected>Orta</option>
              <option value="high">Y\xFCksek</option>
              <option value="urgent">Acil</option>
            </select>
          </div>
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Ba\u015Fl\u0131k *</label>
          <input class="sp-input" type="text" name="title" required placeholder="Bildirim ba\u015Fl\u0131\u011F\u0131">
        </div>
        <div class="sp-form-group">
          <label class="sp-label">Mesaj *</label>
          <textarea class="sp-input" name="message" rows="3" required placeholder="Bildirim mesaj\u0131"></textarea>
        </div>
        <div class="sp-form-row">
          <div class="sp-form-group">
            <label class="sp-label">\xD6\u011Frenci Ad\u0131 *</label>
            <input class="sp-input" type="text" name="studentName" required>
          </div>
          <div class="sp-form-group">
            <label class="sp-label">Veli Ad\u0131 *</label>
            <input class="sp-input" type="text" name="parentName" required>
          </div>
        </div>
        <div class="pn-modal-footer">
          <button type="button" class="sp-btn sp-btn-outline" id="pnModalCancel">\u0130ptal</button>
          <button type="submit" class="sp-btn sp-btn-primary">\u{1F4E4} G\xF6nder</button>
        </div>
      </form>
    </div>`,document.body.appendChild(e),requestAnimationFrame(()=>e.classList.add("active"));let t=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),300)};e.querySelector("#pnModalClose")?.addEventListener("click",t),e.querySelector("#pnModalCancel")?.addEventListener("click",t),e.addEventListener("click",a=>{a.target===e&&t()}),e.querySelector("#pnNewForm")?.addEventListener("submit",a=>{a.preventDefault();let n=a.target,s=new FormData(n),i={id:`n-${Date.now()}`,type:s.get("type"),title:s.get("title"),message:s.get("message"),studentName:s.get("studentName"),parentName:s.get("parentName"),parentPhone:"-",timestamp:new Date,read:!1,priority:s.get("priority")};v.unshift(i),d("Bildirim ba\u015Far\u0131yla g\xF6nderildi!","success"),t(),M()})}function ve(){v=J(),M()}var C="overview";function Ie(){let e=W();return`
    <div class="rp-stats-grid">
      <div class="rp-stat-card blue">
        <div class="rp-stat-icon">\u{1F393}</div>
        <div class="rp-stat-value">${e.totalStudents}</div>
        <div class="rp-stat-label">Toplam \xD6\u011Frenci</div>
      </div>
      <div class="rp-stat-card green">
        <div class="rp-stat-icon">\u{1F6E3}\uFE0F</div>
        <div class="rp-stat-value">${e.activeRoutes}</div>
        <div class="rp-stat-label">Aktif G\xFCzergah</div>
      </div>
      <div class="rp-stat-card yellow">
        <div class="rp-stat-icon">\u{1F4CA}</div>
        <div class="rp-stat-value">%${e.avgAttendance}</div>
        <div class="rp-stat-label">Ort. Devam</div>
      </div>
      <div class="rp-stat-card purple">
        <div class="rp-stat-icon">\u{1F68C}</div>
        <div class="rp-stat-value">${e.totalTripsToday}</div>
        <div class="rp-stat-label">Bug\xFCnk\xFC Sefer</div>
      </div>
      <div class="rp-stat-card teal">
        <div class="rp-stat-icon">\u23F1\uFE0F</div>
        <div class="rp-stat-value">%${e.onTimePercentage}</div>
        <div class="rp-stat-label">Zaman\u0131nda</div>
      </div>
      <div class="rp-stat-card orange">
        <div class="rp-stat-icon">\u{1F697}</div>
        <div class="rp-stat-value">${e.activeVehicles}</div>
        <div class="rp-stat-label">Aktif Ara\xE7</div>
      </div>
      <div class="rp-stat-card navy">
        <div class="rp-stat-icon">\u{1F468}\u200D\u2708\uFE0F</div>
        <div class="rp-stat-value">${e.totalDrivers}</div>
        <div class="rp-stat-label">Toplam \u015Eof\xF6r</div>
      </div>
      <div class="rp-stat-card gold">
        <div class="rp-stat-icon">\u2B50</div>
        <div class="rp-stat-value">${e.avgDriverRating}</div>
        <div class="rp-stat-label">Ort. Puan</div>
      </div>
    </div>

    <div class="rp-quick-insights">
      <h4>\u{1F4A1} H\u0131zl\u0131 Bilgiler</h4>
      <div class="rp-insights-grid">
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">\u{1F4C8}</span>
          <div>
            <strong>Devam Oran\u0131 Art\u0131\u015Fta</strong>
            <p>Bu hafta devam oran\u0131 ge\xE7en haftaya g\xF6re %1.4 artt\u0131.</p>
          </div>
        </div>
        <div class="rp-insight-card warning">
          <span class="rp-insight-icon">\u26A0\uFE0F</span>
          <div>
            <strong>Gecikme Uyar\u0131s\u0131</strong>
            <p>Sincan - Bat\u0131kent g\xFCzergah\u0131nda ortalama 4.1 dk gecikme var.</p>
          </div>
        </div>
        <div class="rp-insight-card good">
          <span class="rp-insight-icon">\u{1F3C6}</span>
          <div>
            <strong>En \u0130yi G\xFCzergah</strong>
            <p>Eryaman - Elvankent g\xFCzergah\u0131 %96.1 zaman\u0131nda var\u0131\u015F oran\u0131 ile lider.</p>
          </div>
        </div>
        <div class="rp-insight-card info">
          <span class="rp-insight-icon">\u{1F527}</span>
          <div>
            <strong>Bak\u0131m Plan\u0131</strong>
            <p>06 GHI 789 plakal\u0131 arac\u0131n periyodik bak\u0131m tarihi yakla\u015F\u0131yor.</p>
          </div>
        </div>
      </div>
    </div>`}function Ue(){let e=X(),t=Math.max(...e.map(a=>a.total));return`
    <div class="rp-chart-section">
      <h4>\u{1F4CA} Haftal\u0131k Devam Grafi\u011Fi</h4>
      <div class="rp-bar-chart">
        ${e.map(a=>{let n=a.present/t*100,s=a.absent/t*100,i=Math.round(a.present/a.total*100);return`
            <div class="rp-bar-group">
              <div class="rp-bar-label">${a.day.substring(0,3)}</div>
              <div class="rp-bar-stack">
                <div class="rp-bar present" style="height:${n}%" title="${a.present} mevcut"></div>
                <div class="rp-bar absent" style="height:${s}%" title="${a.absent} devams\u0131z"></div>
              </div>
              <div class="rp-bar-value">%${i}</div>
            </div>`}).join("")}
      </div>
      <div class="rp-chart-legend">
        <span class="rp-legend-item"><span class="rp-legend-color present"></span>Mevcut</span>
        <span class="rp-legend-item"><span class="rp-legend-color absent"></span>Devams\u0131z</span>
      </div>
    </div>

    <div class="rp-table-section">
      <h4>\u{1F4CB} G\xFCnl\xFCk Detay</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>G\xFCn</th>
            <th>Mevcut</th>
            <th>Devams\u0131z</th>
            <th>Toplam</th>
            <th>Devam Oran\u0131</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(a=>{let n=Math.round(a.present/a.total*100),s=n>=95?"#4caf50":n>=90?"#ff9800":"#e53935";return`
              <tr>
                <td><strong>${a.day}</strong></td>
                <td style="color:#4caf50">${a.present}</td>
                <td style="color:#e53935">${a.absent}</td>
                <td>${a.total}</td>
                <td><span class="rp-rate-badge" style="background:${s}20;color:${s}">%${n}</span></td>
              </tr>`}).join("")}
        </tbody>
      </table>
    </div>`}function Ze(){let e=Q();return`
    <div class="rp-routes-section">
      <h4>\u{1F6E3}\uFE0F G\xFCzergah Performans\u0131</h4>
      <div class="rp-route-cards">
        ${e.map(t=>{let a=t.onTimeRate>=95?"#4caf50":t.onTimeRate>=90?"#ff9800":"#e53935",n=Array.from({length:5},(s,i)=>`<span style="color:${i<Math.round(t.satisfaction)?"#ffc107":"#ddd"}">\u2605</span>`).join("");return`
            <div class="rp-route-card">
              <div class="rp-route-header">
                <strong>${t.routeName}</strong>
                <span class="rp-rate-badge" style="background:${a}20;color:${a}">%${t.onTimeRate}</span>
              </div>
              <div class="rp-route-stats">
                <div class="rp-route-stat">
                  <span>\xD6\u011Frenci</span>
                  <strong>${t.studentCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Sefer</span>
                  <strong>${t.tripCount}</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Ort. Gecikme</span>
                  <strong>${t.avgDelay} dk</strong>
                </div>
                <div class="rp-route-stat">
                  <span>Memnuniyet</span>
                  <strong>${n}</strong>
                </div>
              </div>
              <div class="rp-route-bar">
                <div class="rp-route-bar-fill" style="width:${t.onTimeRate}%;background:${a}"></div>
              </div>
            </div>`}).join("")}
      </div>
    </div>

    <div class="rp-comparison">
      <h4>\u{1F4CA} G\xFCzergah Kar\u015F\u0131la\u015Ft\u0131rmas\u0131</h4>
      <table class="rp-table">
        <thead>
          <tr>
            <th>G\xFCzergah</th>
            <th>Zaman\u0131nda %</th>
            <th>Ort. Gecikme</th>
            <th>\xD6\u011Frenci</th>
            <th>Sefer</th>
            <th>Memnuniyet</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(t=>{let a=t.onTimeRate>=95?"#4caf50":t.onTimeRate>=90?"#ff9800":"#e53935";return`
              <tr>
                <td><strong>${t.routeName}</strong></td>
                <td><span class="rp-rate-badge" style="background:${a}20;color:${a}">%${t.onTimeRate}</span></td>
                <td>${t.avgDelay} dk</td>
                <td>${t.studentCount}</td>
                <td>${t.tripCount}</td>
                <td>\u2B50 ${t.satisfaction}</td>
              </tr>`}).join("")}
        </tbody>
      </table>
    </div>`}function ge(){let e=l("#reportingContent");if(!e)return;let t=`
    <div class="rp-sub-tabs">
      <button class="rp-sub-tab ${C==="overview"?"active":""}" data-tab="overview">\u{1F4CA} Genel Bak\u0131\u015F</button>
      <button class="rp-sub-tab ${C==="attendance"?"active":""}" data-tab="attendance">\u{1F4CB} Devam Raporu</button>
      <button class="rp-sub-tab ${C==="routes"?"active":""}" data-tab="routes">\u{1F6E3}\uFE0F G\xFCzergah Raporu</button>
    </div>
    <div class="rp-sub-content">`;switch(C){case"overview":t+=Ie();break;case"attendance":t+=Ue();break;case"routes":t+=Ze();break}t+=`</div>
    <div class="rp-export-bar">
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportPDF">\u{1F4C4} PDF \u0130ndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-outline" id="rpExportExcel">\u{1F4CA} Excel \u0130ndir</button>
      <button class="sp-btn sp-btn-sm sp-btn-primary" id="rpPrint">\u{1F5A8}\uFE0F Yazd\u0131r</button>
    </div>`,e.innerHTML=t,Je(e)}function Je(e){e.querySelectorAll(".rp-sub-tab").forEach(t=>{t.addEventListener("click",()=>{C=t.dataset.tab,ge()})}),e.querySelector("#rpExportPDF")?.addEventListener("click",()=>{d("Rapor PDF olarak haz\u0131rlan\u0131yor...","info")}),e.querySelector("#rpExportExcel")?.addEventListener("click",()=>{d("Rapor Excel olarak haz\u0131rlan\u0131yor...","info")}),e.querySelector("#rpPrint")?.addEventListener("click",()=>{d("Yazd\u0131rma penceresi a\xE7\u0131l\u0131yor...","info")})}function fe(){ge()}function We(){let e=document.querySelectorAll(".sp-tab-btn"),t=document.querySelectorAll(".sp-tab-panel");e.forEach(a=>{a.addEventListener("click",()=>{let n=a.dataset.tab;if(!n)return;e.forEach(i=>i.classList.remove("active")),t.forEach(i=>i.classList.remove("active")),a.classList.add("active");let s=document.getElementById(`panel-${n}`);s&&s.classList.add("active")})})}function ye(){We(),ae(),se(),re(),oe(),le(),de(),ce(),ue(),ve(),fe()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ye):ye();})();

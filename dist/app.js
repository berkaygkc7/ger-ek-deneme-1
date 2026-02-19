"use strict";
var ServisApp = (() => {
  // src/demoData.ts
  var stopNames = [
    "\u015Eeyh \u015Eamil Mahallesi",
    "Ahi Evran Mahallesi",
    "Eryaman 1. Etap",
    "Eryaman 3. Etap",
    "Elvankent Meydan\u0131",
    "Etimesgut Sanayi",
    "Sincan Otogar",
    "Bat\u0131kent Metro",
    "Mesa Koru",
    "\xDCmitk\xF6y Migros",
    "\xC7ayyolu Caddesi",
    "Ya\u015Famkent",
    "\u0130ncek Kav\u015Fa\u011F\u0131",
    "T\xFCrkkonut",
    "Alacaatl\u0131",
    "Yaprac\u0131k",
    "Ba\u011Fl\u0131ca",
    "Temelli",
    "Yenikent",
    "Fatih Mahallesi"
  ];
  function makeStops(count) {
    const used = /* @__PURE__ */ new Set();
    const stops = [];
    for (let i = 0; i < count; i++) {
      let idx;
      do {
        idx = Math.floor(Math.random() * stopNames.length);
      } while (used.has(idx));
      used.add(idx);
      const hour = 7 + Math.floor(i * 0.6);
      const min = i * 12 % 60;
      stops.push({
        id: `stop-${idx}`,
        name: stopNames[idx],
        lat: 39.9 + Math.random() * 0.1,
        lng: 32.7 + Math.random() * 0.2,
        estimatedTime: `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`
      });
    }
    return stops;
  }
  var routes = [
    { id: "r1", name: "Etimesgut - Merkez G\xFCzergah", stops: makeStops(6), driverName: "Ahmet \xC7elik", vehiclePlate: "06 ABC 123" },
    { id: "r2", name: "Sincan - Bat\u0131kent G\xFCzergah", stops: makeStops(5), driverName: "Mustafa Demir", vehiclePlate: "06 DEF 456" },
    { id: "r3", name: "Eryaman - Elvankent G\xFCzergah", stops: makeStops(7), driverName: "Hasan Y\u0131ld\u0131z", vehiclePlate: "06 GHI 789" },
    { id: "r4", name: "\xC7ayyolu - \xDCmitk\xF6y G\xFCzergah", stops: makeStops(5), driverName: "Ali Kara", vehiclePlate: "06 JKL 012" },
    { id: "r5", name: "Ba\u011Fl\u0131ca - Yaprac\u0131k G\xFCzergah", stops: makeStops(4), driverName: "\xD6mer Aksoy", vehiclePlate: "06 MNO 345" }
  ];
  var firstNames = [
    "Elif",
    "Yusuf",
    "Zeynep",
    "Mehmet",
    "Ay\u015Fe",
    "Burak",
    "Defne",
    "Emre",
    "Selin",
    "Kaan",
    "Merve",
    "Arda",
    "Fatma",
    "Can",
    "Sude",
    "Berk",
    "\u0130rem",
    "Ege",
    "Ecrin",
    "Doruk"
  ];
  var lastNames = [
    "Y\u0131lmaz",
    "Kaya",
    "Demir",
    "\xC7elik",
    "\u015Eahin",
    "Arslan",
    "Do\u011Fan",
    "K\u0131l\u0131\xE7",
    "Aslan",
    "Ayd\u0131n",
    "\xD6zdemir",
    "Korkmaz",
    "Erdo\u011Fan",
    "G\xFCne\u015F",
    "Akta\u015F"
  ];
  var classes = ["1-A", "1-B", "2-A", "2-B", "3-A", "3-B", "4-A", "4-B", "5-A", "5-B"];
  var students = Array.from({ length: 30 }, (_, i) => {
    const route = routes[i % routes.length];
    const isOutside = i === 5 || i === 12 || i === 23;
    return {
      id: `stu-${i + 1}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      class: classes[i % classes.length],
      route: route.name,
      stopName: route.stops[i % route.stops.length]?.name ?? stopNames[0],
      isOutsideRoute: isOutside,
      parentPhone: `(5${30 + i}) ${100 + i * 3}-${4e3 + i * 7}`
    };
  });
  function generateActivities() {
    const now = Date.now();
    const items = [
      { id: "a1", type: "route_complete", title: "Sabah Seferi Tamamland\u0131", description: "Etimesgut - Merkez g\xFCzergah\u0131 sabah seferi ba\u015Far\u0131yla tamamland\u0131. 28 \xF6\u011Frenci ta\u015F\u0131nd\u0131.", timestamp: new Date(now - 25 * 6e4), icon: "\u2705" },
      { id: "a2", type: "attendance", title: "Yoklama Al\u0131nd\u0131", description: "3-A s\u0131n\u0131f\u0131 yoklamas\u0131 tamamland\u0131. 24/26 \xF6\u011Frenci mevcut.", timestamp: new Date(now - 45 * 6e4), icon: "\u{1F4CB}" },
      { id: "a3", type: "driver_rating", title: "\u015Eof\xF6r De\u011Ferlendirmesi", description: "Ahmet \xC7elik i\xE7in yeni bir de\u011Ferlendirme yap\u0131ld\u0131. Ortalama puan: 4.8/5", timestamp: new Date(now - 2 * 36e5), icon: "\u2B50" },
      { id: "a4", type: "alert", title: "G\xFCzergah D\u0131\u015F\u0131 Uyar\u0131s\u0131", description: "Burak \u015Eahin g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli bilgilendirildi.", timestamp: new Date(now - 3 * 36e5), icon: "\u26A0\uFE0F" },
      { id: "a5", type: "new_student", title: "Yeni \xD6\u011Frenci Kayd\u0131", description: "Ecrin Akta\u015F, Sincan - Bat\u0131kent g\xFCzergah\u0131na kay\u0131t edildi.", timestamp: new Date(now - 5 * 36e5), icon: "\u{1F195}" },
      { id: "a6", type: "route_change", title: "Rota G\xFCncellendi", description: "Eryaman - Elvankent g\xFCzergah\u0131na Yaprac\u0131k dura\u011F\u0131 eklendi.", timestamp: new Date(now - 8 * 36e5), icon: "\u{1F504}" },
      { id: "a7", type: "maintenance", title: "Ara\xE7 Bak\u0131m\u0131", description: "06 GHI 789 plakal\u0131 arac\u0131n periyodik bak\u0131m\u0131 tamamland\u0131.", timestamp: new Date(now - 12 * 36e5), icon: "\u{1F527}" },
      { id: "a8", type: "route_complete", title: "Ak\u015Fam Seferi Tamamland\u0131", description: "\xC7ayyolu - \xDCmitk\xF6y g\xFCzergah\u0131 ak\u015Fam seferi sorunsuz tamamland\u0131.", timestamp: new Date(now - 24 * 36e5), icon: "\u2705" },
      { id: "a9", type: "attendance", title: "Haftal\u0131k Yoklama Raporu", description: "Bu haftan\u0131n genel yoklama oran\u0131: %96.2 \u2014 Ge\xE7en haftaya g\xF6re %1.4 art\u0131\u015F.", timestamp: new Date(now - 28 * 36e5), icon: "\u{1F4CA}" },
      { id: "a10", type: "driver_rating", title: "Ayl\u0131k En \u0130yi \u015Eof\xF6r", description: "Mustafa Demir, 4.9/5 ortalama puan ile ay\u0131n \u015Fof\xF6r\xFC se\xE7ildi.", timestamp: new Date(now - 48 * 36e5), icon: "\u{1F3C6}" },
      { id: "a11", type: "alert", title: "Trafik Uyar\u0131s\u0131", description: "Bat\u0131kent Metro kav\u015Fa\u011F\u0131nda yo\u011Funluk nedeniyle Sincan g\xFCzergah\u0131nda 8 dk gecikme.", timestamp: new Date(now - 52 * 36e5), icon: "\u{1F6A6}" },
      { id: "a12", type: "new_student", title: "Toplu Kay\u0131t", description: "Fatih \u0130lkokulu ile anla\u015Fma yap\u0131ld\u0131. 15 yeni \xF6\u011Frenci sisteme eklendi.", timestamp: new Date(now - 72 * 36e5), icon: "\u{1F3EB}" }
    ];
    return items;
  }
  var driverList = [
    { id: "d1", name: "Ahmet \xC7elik", plate: "06 ABC 123", route: "Etimesgut - Merkez", avatar: "A\xC7" },
    { id: "d2", name: "Mustafa Demir", plate: "06 DEF 456", route: "Sincan - Bat\u0131kent", avatar: "MD" },
    { id: "d3", name: "Hasan Y\u0131ld\u0131z", plate: "06 GHI 789", route: "Eryaman - Elvankent", avatar: "HY" },
    { id: "d4", name: "Ali Kara", plate: "06 JKL 012", route: "\xC7ayyolu - \xDCmitk\xF6y", avatar: "AK" },
    { id: "d5", name: "\xD6mer Aksoy", plate: "06 MNO 345", route: "Ba\u011Fl\u0131ca - Yaprac\u0131k", avatar: "\xD6A" }
  ];

  // src/utils.ts
  function $(selector) {
    return document.querySelector(selector);
  }
  function createElement(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, val]) => {
        if (key === "className") el.className = val;
        else if (key === "innerHTML") el.innerHTML = val;
        else el.setAttribute(key, val);
      });
    }
    if (children) {
      children.forEach((child) => {
        if (typeof child === "string") el.appendChild(document.createTextNode(child));
        else el.appendChild(child);
      });
    }
    return el;
  }
  function formatDate(date) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    const days = Math.floor(diff / 864e5);
    if (minutes < 1) return "Az \xF6nce";
    if (minutes < 60) return `${minutes} dakika \xF6nce`;
    if (hours < 24) return `${hours} saat \xF6nce`;
    if (days < 7) return `${days} g\xFCn \xF6nce`;
    return date.toLocaleDateString("tr-TR");
  }
  function formatFullDate(date) {
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  }
  function showToast(message, type = "info") {
    const icons = {
      success: "\u2705",
      error: "\u274C",
      warning: "\u26A0\uFE0F",
      info: "\u2139\uFE0F"
    };
    const colors = {
      success: "#4caf50",
      error: "#e53935",
      warning: "#ff9800",
      info: "#1a3a5f"
    };
    const toast = createElement("div", {
      className: "sp-toast",
      innerHTML: `<span class="sp-toast-icon">${icons[type]}</span><span>${message}</span>`
    });
    toast.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${colors[type]};color:#fff;padding:0.85rem 1.5rem;border-radius:10px;
    box-shadow:0 6px 20px rgba(0,0,0,0.25);z-index:10001;display:flex;align-items:center;
    gap:0.6rem;font-size:0.95rem;opacity:0;transition:all 0.3s;max-width:90%;
    font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
  `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // src/routePlanner.ts
  var state = {
    step: "select-start",
    selectedRoute: null,
    startStop: null,
    endStop: null,
    time: null,
    history: []
  };
  function getStopsForRoute() {
    const route = routes.find((r) => r.id === state.selectedRoute);
    return route ? route.stops : routes.flatMap((r) => r.stops);
  }
  function pushStep(next) {
    state.history.push(state.step);
    state.step = next;
  }
  function goBack() {
    const prev = state.history.pop();
    if (!prev) return;
    if (state.step === "confirm") state.time = null;
    if (state.step === "select-time") state.endStop = null;
    if (state.step === "select-end") state.startStop = null;
    state.step = prev;
    render();
  }
  function cancelPlanning() {
    state.step = "select-start";
    state.selectedRoute = null;
    state.startStop = null;
    state.endStop = null;
    state.time = null;
    state.history = [];
    render();
    showToast("Rota planlamas\u0131 iptal edildi.", "warning");
  }
  function renderStepIndicator() {
    const steps = [
      { key: "select-start", label: "Ba\u015Flang\u0131\xE7" },
      { key: "select-end", label: "Var\u0131\u015F" },
      { key: "select-time", label: "Saat" },
      { key: "confirm", label: "Onay" }
    ];
    const currentIdx = steps.findIndex((s) => s.key === state.step);
    return `<div class="sp-steps">
    ${steps.map((s, i) => `
      <div class="sp-step ${i < currentIdx ? "completed" : ""} ${i === currentIdx ? "active" : ""}">
        <div class="sp-step-num">${i < currentIdx ? "\u2713" : i + 1}</div>
        <div class="sp-step-label">${s.label}</div>
      </div>
      ${i < steps.length - 1 ? '<div class="sp-step-line ' + (i < currentIdx ? "completed" : "") + '"></div>' : ""}
    `).join("")}
  </div>`;
  }
  function renderControls() {
    const canGoBack = state.history.length > 0;
    return `<div class="sp-planner-controls">
    ${canGoBack ? '<button class="sp-btn sp-btn-outline" id="rpBack">\u2190 Geri</button>' : "<div></div>"}
    <button class="sp-btn sp-btn-danger" id="rpCancel">\u2715 \u0130ptal Et</button>
  </div>`;
  }
  function renderSelectStart() {
    const routeOptions = routes.map(
      (r) => `<label class="sp-radio-card">
      <input type="radio" name="route" value="${r.id}" ${state.selectedRoute === r.id ? "checked" : ""}>
      <div class="sp-radio-body">
        <strong>${r.name}</strong>
        <small>${r.stops.length} durak \xB7 \u015Eof\xF6r: ${r.driverName} \xB7 ${r.vehiclePlate}</small>
      </div>
    </label>`
    ).join("");
    return `
    <h4>G\xFCzergah & Ba\u015Flang\u0131\xE7 Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-form-group">
      <label class="sp-label">G\xFCzergah</label>
      <div class="sp-radio-group">${routeOptions}</div>
    </div>
    <div class="sp-form-group" id="rpStartStops" style="${state.selectedRoute ? "" : "display:none"}">
      <label class="sp-label">Ba\u015Flang\u0131\xE7 Dura\u011F\u0131</label>
      <select class="sp-select" id="rpStartSelect">
        <option value="">Durak se\xE7in...</option>
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextStart" disabled>Devam Et \u2192</button>
    </div>`;
  }
  function renderSelectEnd() {
    const stops = getStopsForRoute().filter((s) => s.id !== state.startStop);
    const options = stops.map(
      (s) => `<option value="${s.id}" ${s.id === state.endStop ? "selected" : ""}>${s.name} (${s.estimatedTime})</option>`
    ).join("");
    const startName = getStopsForRoute().find((s) => s.id === state.startStop)?.name ?? "";
    return `
    <h4>Var\u0131\u015F Dura\u011F\u0131 Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} Ba\u015Flang\u0131\xE7: <strong>${startName}</strong></div>
    <div class="sp-form-group">
      <label class="sp-label">Var\u0131\u015F Dura\u011F\u0131</label>
      <select class="sp-select" id="rpEndSelect">
        <option value="">Durak se\xE7in...</option>
        ${options}
      </select>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextEnd" disabled>Devam Et \u2192</button>
    </div>`;
  }
  function renderSelectTime() {
    const timeSlots = ["06:30", "07:00", "07:30", "08:00", "08:30", "12:00", "13:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
    const cards = timeSlots.map(
      (t) => `<button class="sp-time-chip ${state.time === t ? "selected" : ""}" data-time="${t}">${t}</button>`
    ).join("");
    return `
    <h4>Sefer Saati Se\xE7in</h4>
    <div class="sp-info-box">\u{1F4CD} ${getStopsForRoute().find((s) => s.id === state.startStop)?.name} \u2192 ${getStopsForRoute().find((s) => s.id === state.endStop)?.name}</div>
    <div class="sp-time-grid">${cards}</div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-primary" id="rpNextTime" disabled>Devam Et \u2192</button>
    </div>`;
  }
  function renderConfirm() {
    const route = routes.find((r) => r.id === state.selectedRoute);
    const startName = getStopsForRoute().find((s) => s.id === state.startStop)?.name ?? "";
    const endName = getStopsForRoute().find((s) => s.id === state.endStop)?.name ?? "";
    return `
    <h4>Rota Onay\u0131</h4>
    <div class="sp-confirm-card">
      <div class="sp-confirm-row"><span>G\xFCzergah:</span><strong>${route?.name}</strong></div>
      <div class="sp-confirm-row"><span>\u015Eof\xF6r:</span><strong>${route?.driverName}</strong></div>
      <div class="sp-confirm-row"><span>Ara\xE7:</span><strong>${route?.vehiclePlate}</strong></div>
      <div class="sp-confirm-row"><span>Ba\u015Flang\u0131\xE7:</span><strong>${startName}</strong></div>
      <div class="sp-confirm-row"><span>Var\u0131\u015F:</span><strong>${endName}</strong></div>
      <div class="sp-confirm-row"><span>Saat:</span><strong>${state.time}</strong></div>
    </div>
    <div class="sp-planner-actions">
      <button class="sp-btn sp-btn-success" id="rpConfirm">\u2713 Rotay\u0131 Onayla</button>
    </div>`;
  }
  function render() {
    const container = $("#routePlannerContent");
    if (!container) return;
    let content = renderStepIndicator();
    switch (state.step) {
      case "select-start":
        content += renderSelectStart();
        break;
      case "select-end":
        content += renderSelectEnd();
        break;
      case "select-time":
        content += renderSelectTime();
        break;
      case "confirm":
        content += renderConfirm();
        break;
    }
    content += renderControls();
    container.innerHTML = content;
    bindEvents();
  }
  function bindEvents() {
    const backBtn = $("#rpBack");
    const cancelBtn = $("#rpCancel");
    backBtn?.addEventListener("click", goBack);
    cancelBtn?.addEventListener("click", cancelPlanning);
    if (state.step === "select-start") {
      document.querySelectorAll('input[name="route"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          state.selectedRoute = radio.value;
          const stopsDiv = $("#rpStartStops");
          const select = $("#rpStartSelect");
          if (stopsDiv) stopsDiv.style.display = "";
          if (select) {
            const stops = getStopsForRoute();
            select.innerHTML = '<option value="">Durak se\xE7in...</option>' + stops.map((s) => `<option value="${s.id}">${s.name} (${s.estimatedTime})</option>`).join("");
          }
        });
      });
      const startSelect = $("#rpStartSelect");
      const nextBtn = $("#rpNextStart");
      startSelect?.addEventListener("change", () => {
        state.startStop = startSelect.value || null;
        if (nextBtn) nextBtn.disabled = !state.startStop;
      });
      nextBtn?.addEventListener("click", () => {
        if (state.startStop) {
          pushStep("select-end");
          render();
        }
      });
    }
    if (state.step === "select-end") {
      const endSelect = $("#rpEndSelect");
      const nextBtn = $("#rpNextEnd");
      endSelect?.addEventListener("change", () => {
        state.endStop = endSelect.value || null;
        if (nextBtn) nextBtn.disabled = !state.endStop;
      });
      nextBtn?.addEventListener("click", () => {
        if (state.endStop) {
          pushStep("select-time");
          render();
        }
      });
    }
    if (state.step === "select-time") {
      document.querySelectorAll(".sp-time-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          document.querySelectorAll(".sp-time-chip").forEach((c) => c.classList.remove("selected"));
          chip.classList.add("selected");
          state.time = chip.dataset.time ?? null;
          const nextBtn2 = $("#rpNextTime");
          if (nextBtn2) nextBtn2.disabled = false;
        });
      });
      const nextBtn = $("#rpNextTime");
      nextBtn?.addEventListener("click", () => {
        if (state.time) {
          pushStep("confirm");
          render();
        }
      });
    }
    if (state.step === "confirm") {
      const confirmBtn = $("#rpConfirm");
      confirmBtn?.addEventListener("click", () => {
        showToast("Rota ba\u015Far\u0131yla onayland\u0131!", "success");
        cancelPlanning();
      });
    }
  }
  function initRoutePlanner() {
    const container = $("#routePlannerContent");
    if (!container) return;
    render();
  }

  // src/activities.ts
  var typeColors = {
    route_complete: "#4caf50",
    attendance: "#2196f3",
    new_student: "#9c27b0",
    driver_rating: "#ff9800",
    route_change: "#00bcd4",
    alert: "#e53935",
    maintenance: "#607d8b"
  };
  var typeLabels = {
    route_complete: "Sefer",
    attendance: "Yoklama",
    new_student: "Kay\u0131t",
    driver_rating: "De\u011Ferlendirme",
    route_change: "G\xFCzergah",
    alert: "Uyar\u0131",
    maintenance: "Bak\u0131m"
  };
  function initActivities() {
    const container = $("#activitiesContent");
    if (!container) return;
    const activities = generateActivities();
    const filterHtml = `
    <div class="sp-activity-filters">
      <button class="sp-filter-btn active" data-filter="all">T\xFCm\xFC</button>
      <button class="sp-filter-btn" data-filter="route_complete">Seferler</button>
      <button class="sp-filter-btn" data-filter="attendance">Yoklama</button>
      <button class="sp-filter-btn" data-filter="alert">Uyar\u0131lar</button>
      <button class="sp-filter-btn" data-filter="driver_rating">De\u011Ferlendirme</button>
    </div>`;
    function renderList(filter) {
      const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter);
      if (filtered.length === 0) {
        return '<div class="sp-empty-state">Bu kategoride aktivite bulunamad\u0131.</div>';
      }
      return filtered.map((a) => `
      <div class="sp-activity-item" data-type="${a.type}">
        <div class="sp-activity-icon" style="background:${typeColors[a.type] ?? "#757575"}">${a.icon}</div>
        <div class="sp-activity-body">
          <div class="sp-activity-header">
            <strong>${a.title}</strong>
            <span class="sp-activity-badge" style="background:${typeColors[a.type] ?? "#757575"}">${typeLabels[a.type] ?? ""}</span>
          </div>
          <p>${a.description}</p>
          <small>${formatDate(a.timestamp)}</small>
        </div>
      </div>
    `).join("");
    }
    container.innerHTML = filterHtml + `<div class="sp-activity-list" id="activityList">${renderList("all")}</div>`;
    container.querySelectorAll(".sp-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".sp-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const list = container.querySelector("#activityList");
        if (list) list.innerHTML = renderList(btn.dataset.filter ?? "all");
      });
    });
  }

  // src/attendance.ts
  var records = /* @__PURE__ */ new Map();
  var selectedClass = "all";
  var searchQuery = "";
  function getFilteredStudents() {
    return students.filter((s) => {
      const matchClass = selectedClass === "all" || s.class === selectedClass;
      const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSearch;
    });
  }
  function getClasses() {
    return [...new Set(students.map((s) => s.class))].sort();
  }
  function getStats() {
    const filtered = getFilteredStudents();
    const present = filtered.filter((s) => records.get(s.id) === true).length;
    const absent = filtered.filter((s) => records.get(s.id) === false).length;
    const unmarked = filtered.length - present - absent;
    return { total: filtered.length, present, absent, unmarked };
  }
  function render2() {
    const container = $("#attendanceContent");
    if (!container) return;
    const classes2 = getClasses();
    const stats = getStats();
    const filtered = getFilteredStudents();
    const today = formatFullDate(/* @__PURE__ */ new Date());
    const pct = stats.total > 0 ? Math.round(stats.present / stats.total * 100) : 0;
    container.innerHTML = `
    <div class="sp-attendance-header">
      <div class="sp-attendance-date">\u{1F4C5} ${today}</div>
      <div class="sp-attendance-stats-bar">
        <div class="sp-att-stat sp-att-present"><span>${stats.present}</span> Mevcut</div>
        <div class="sp-att-stat sp-att-absent"><span>${stats.absent}</span> Yok</div>
        <div class="sp-att-stat sp-att-unmarked"><span>${stats.unmarked}</span> Bekliyor</div>
        <div class="sp-att-stat sp-att-pct"><span>%${pct}</span> Kat\u0131l\u0131m</div>
      </div>
    </div>

    <div class="sp-attendance-toolbar">
      <div class="sp-att-filters">
        <select class="sp-select sp-select-sm" id="attClassFilter">
          <option value="all">T\xFCm S\u0131n\u0131flar</option>
          ${classes2.map((c) => `<option value="${c}" ${c === selectedClass ? "selected" : ""}>${c}</option>`).join("")}
        </select>
        <input type="text" class="sp-input sp-input-sm" id="attSearch" placeholder="\xD6\u011Frenci ara..." value="${searchQuery}">
      </div>
      <div class="sp-att-bulk">
        <button class="sp-btn sp-btn-sm sp-btn-success" id="attMarkAllPresent">T\xFCm\xFC Mevcut</button>
        <button class="sp-btn sp-btn-sm sp-btn-danger" id="attMarkAllAbsent">T\xFCm\xFC Yok</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="attReset">S\u0131f\u0131rla</button>
      </div>
    </div>

    <div class="sp-attendance-list">
      ${filtered.length === 0 ? '<div class="sp-empty-state">\xD6\u011Frenci bulunamad\u0131.</div>' : ""}
      ${filtered.map((s) => {
      const status = records.get(s.id);
      const isPresent = status === true;
      const isAbsent = status === false;
      return `
          <div class="sp-att-row ${isPresent ? "present" : ""} ${isAbsent ? "absent" : ""} ${s.isOutsideRoute ? "outside-route" : ""}">
            <div class="sp-att-student">
              <div class="sp-att-avatar">${s.name.split(" ").map((n) => n[0]).join("")}</div>
              <div class="sp-att-info">
                <strong>${s.name}</strong>
                <small>${s.class} \xB7 ${s.stopName}</small>
                ${s.isOutsideRoute ? '<span class="sp-att-warning">\u26A0\uFE0F G\xFCzergah d\u0131\u015F\u0131</span>' : ""}
              </div>
            </div>
            <div class="sp-att-actions">
              <button class="sp-att-btn present ${isPresent ? "active" : ""}" data-id="${s.id}" data-action="present" title="Mevcut">\u2713</button>
              <button class="sp-att-btn absent ${isAbsent ? "active" : ""}" data-id="${s.id}" data-action="absent" title="Yok">\u2715</button>
            </div>
          </div>`;
    }).join("")}
    </div>

    <div class="sp-attendance-footer">
      <button class="sp-btn sp-btn-primary sp-btn-lg" id="attSave">\u{1F4CB} Yoklamay\u0131 Kaydet</button>
    </div>`;
    bindAttendanceEvents(container);
  }
  function bindAttendanceEvents(container) {
    container.querySelector("#attClassFilter")?.addEventListener("change", (e) => {
      selectedClass = e.target.value;
      render2();
    });
    container.querySelector("#attSearch")?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render2();
    });
    container.querySelectorAll(".sp-att-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const current = records.get(id);
        if (action === "present" && current === true || action === "absent" && current === false) {
          records.delete(id);
        } else {
          records.set(id, action === "present");
          const student = students.find((s) => s.id === id);
          if (student?.isOutsideRoute && action === "present") {
            showToast(`\u26A0\uFE0F ${student.name} g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir. Veli ile ileti\u015Fime ge\xE7ilmesi \xF6nerilir.`, "warning");
          }
        }
        render2();
      });
    });
    container.querySelector("#attMarkAllPresent")?.addEventListener("click", () => {
      getFilteredStudents().forEach((s) => records.set(s.id, true));
      const outsiders = getFilteredStudents().filter((s) => s.isOutsideRoute);
      if (outsiders.length > 0) {
        showToast(`\u26A0\uFE0F ${outsiders.length} \xF6\u011Frenci g\xFCzergah d\u0131\u015F\u0131nda ikamet ediyor. Listede i\u015Faretlendi.`, "warning");
      }
      render2();
    });
    container.querySelector("#attMarkAllAbsent")?.addEventListener("click", () => {
      getFilteredStudents().forEach((s) => records.set(s.id, false));
      render2();
    });
    container.querySelector("#attReset")?.addEventListener("click", () => {
      getFilteredStudents().forEach((s) => records.delete(s.id));
      render2();
    });
    container.querySelector("#attSave")?.addEventListener("click", () => {
      const stats = getStats();
      if (stats.unmarked > 0) {
        showToast(`${stats.unmarked} \xF6\u011Frencinin yoklamas\u0131 hen\xFCz i\u015Faretlenmedi.`, "warning");
        return;
      }
      const saved = getFilteredStudents().map((s) => ({
        studentId: s.id,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        present: records.get(s.id) ?? false
      }));
      console.log("Yoklama kaydedildi:", saved);
      showToast(`Yoklama ba\u015Far\u0131yla kaydedildi! ${stats.present} mevcut, ${stats.absent} devams\u0131z.`, "success");
    });
  }
  function initAttendance() {
    render2();
  }

  // src/driverSurvey.ts
  var criteria = [
    { key: "safety", label: "G\xFCvenli S\xFCr\xFC\u015F", icon: "\u{1F6E1}\uFE0F" },
    { key: "punctuality", label: "Dakiklik", icon: "\u23F0" },
    { key: "friendliness", label: "\u0130leti\u015Fim & Samimiyet", icon: "\u{1F60A}" },
    { key: "driving", label: "S\xFCr\xFC\u015F Kalitesi", icon: "\u{1F68C}" },
    { key: "cleanliness", label: "Ara\xE7 Temizli\u011Fi", icon: "\u2728" }
  ];
  var selectedDriver = "";
  var ratings = {};
  var comment = "";
  var isOpen = false;
  function renderStars(criterionKey, current) {
    return Array.from(
      { length: 5 },
      (_, i) => `<span class="sp-star ${i < current ? "filled" : ""}" data-criterion="${criterionKey}" data-value="${i + 1}">\u2605</span>`
    ).join("");
  }
  function render3() {
    const overlay = $("#surveyOverlay");
    if (!overlay) return;
    if (!isOpen) {
      overlay.style.display = "none";
      return;
    }
    overlay.style.display = "flex";
    const content = overlay.querySelector(".sp-survey-content");
    if (!content) return;
    const driverOptions = driverList.map(
      (d) => `<option value="${d.id}" ${d.id === selectedDriver ? "selected" : ""}>${d.name} \u2014 ${d.route} (${d.plate})</option>`
    ).join("");
    const allRated = selectedDriver && criteria.every((c) => (ratings[c.key] ?? 0) > 0);
    const avg = criteria.length > 0 ? (criteria.reduce((sum, c) => sum + (ratings[c.key] ?? 0), 0) / criteria.length).toFixed(1) : "0.0";
    content.innerHTML = `
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
          ${driverOptions}
        </select>
      </div>
      ${selectedDriver ? `
        <div class="sp-survey-criteria">
          ${criteria.map((c) => `
            <div class="sp-criterion">
              <div class="sp-criterion-label">${c.icon} ${c.label}</div>
              <div class="sp-stars">${renderStars(c.key, ratings[c.key] ?? 0)}</div>
              <div class="sp-criterion-value">${ratings[c.key] ? ratings[c.key] + "/5" : "-"}</div>
            </div>
          `).join("")}
        </div>
        <div class="sp-survey-avg">Ortalama Puan: <strong>${avg}</strong>/5</div>
        <div class="sp-form-group">
          <label class="sp-label">Yorumunuz (\u0130ste\u011Fe ba\u011Fl\u0131)</label>
          <textarea class="sp-textarea" id="surveyComment" placeholder="\u015Eof\xF6r hakk\u0131ndaki g\xF6r\xFC\u015Flerinizi yazabilirsiniz..." rows="3">${comment}</textarea>
        </div>
        <button class="sp-btn sp-btn-primary sp-btn-lg" id="surveySubmit" ${!allRated ? "disabled" : ""}>
          De\u011Ferlendirmeyi G\xF6nder
        </button>
      ` : '<div class="sp-empty-state">De\u011Ferlendirmek istedi\u011Finiz \u015Fof\xF6r\xFC se\xE7in.</div>'}
    </div>`;
    bindSurveyEvents(overlay);
  }
  function bindSurveyEvents(overlay) {
    overlay.querySelector("#surveyClose")?.addEventListener("click", closeSurvey);
    overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("sp-survey-overlay")) closeSurvey();
    });
    overlay.querySelector("#surveyDriverSelect")?.addEventListener("change", (e) => {
      selectedDriver = e.target.value;
      criteria.forEach((c) => delete ratings[c.key]);
      comment = "";
      render3();
    });
    overlay.querySelectorAll(".sp-star").forEach((star) => {
      star.addEventListener("click", () => {
        const key = star.dataset.criterion;
        const val = parseInt(star.dataset.value, 10);
        ratings[key] = val;
        render3();
      });
    });
    overlay.querySelector("#surveyComment")?.addEventListener("input", (e) => {
      comment = e.target.value;
    });
    overlay.querySelector("#surveySubmit")?.addEventListener("click", () => {
      const driver = driverList.find((d) => d.id === selectedDriver);
      if (!driver) return;
      const survey = {
        driverId: driver.id,
        driverName: driver.name,
        ratings: {
          safety: ratings["safety"] ?? 0,
          punctuality: ratings["punctuality"] ?? 0,
          friendliness: ratings["friendliness"] ?? 0,
          driving: ratings["driving"] ?? 0,
          cleanliness: ratings["cleanliness"] ?? 0
        },
        comment,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      console.log("Anket g\xF6nderildi:", survey);
      showToast(`${driver.name} i\xE7in de\u011Ferlendirmeniz kaydedildi. Te\u015Fekk\xFCrler!`, "success");
      closeSurvey();
      selectedDriver = "";
      criteria.forEach((c) => delete ratings[c.key]);
      comment = "";
    });
  }
  function closeSurvey() {
    isOpen = false;
    render3();
  }
  function openSurvey() {
    isOpen = true;
    render3();
  }
  function initDriverSurvey() {
    document.querySelectorAll('[data-action="open-survey"]').forEach((btn) => {
      btn.addEventListener("click", openSurvey);
    });
    render3();
  }

  // src/demoRequest.ts
  function initDemoRequest() {
    const form = $("#demoRequestForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = {
        fullName: fd.get("demoName"),
        email: fd.get("demoEmail"),
        phone: fd.get("demoPhone"),
        company: fd.get("demoCompany"),
        studentCount: fd.get("demoStudentCount"),
        serviceType: fd.get("demoServiceType"),
        message: fd.get("demoMessage")
      };
      console.log("Demo talebi:", data);
      showToast("Demo talebiniz al\u0131nd\u0131! Ekibimiz en k\u0131sa s\xFCrede sizinle ileti\u015Fime ge\xE7ecek.", "success");
      form.reset();
    });
  }
  function initContactSection() {
    const mapContainer = $("#contactMapContainer");
    if (mapContainer && !mapContainer.querySelector("iframe")) {
      mapContainer.innerHTML = `
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.6!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
        width="100%" height="250" style="border:0;border-radius:10px;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
    }
  }

  // src/routeCheck.ts
  function initRouteCheck() {
    const container = $("#routeCheckContent");
    if (!container) return;
    const outsideStudents = students.filter((s) => s.isOutsideRoute);
    if (outsideStudents.length === 0) {
      container.innerHTML = '<div class="sp-empty-state">T\xFCm \xF6\u011Frenciler g\xFCzergah dahilinde.</div>';
      return;
    }
    container.innerHTML = `
    <div class="sp-route-check-alert">
      <div class="sp-alert-banner warning">
        \u26A0\uFE0F <strong>${outsideStudents.length} \xF6\u011Frenci</strong> kay\u0131tl\u0131 g\xFCzergah d\u0131\u015F\u0131nda ikamet etmektedir.
      </div>
      <div class="sp-outside-list">
        ${outsideStudents.map((s) => `
          <div class="sp-outside-card">
            <div class="sp-outside-info">
              <div class="sp-att-avatar">${s.name.split(" ").map((n) => n[0]).join("")}</div>
              <div>
                <strong>${s.name}</strong>
                <small>${s.class} \xB7 ${s.route}</small>
                <small>Durak: ${s.stopName}</small>
              </div>
            </div>
            <div class="sp-outside-actions">
              <button class="sp-btn sp-btn-sm sp-btn-outline" data-notify="${s.id}">\u{1F4F1} Veli Bilgilendir</button>
              <button class="sp-btn sp-btn-sm sp-btn-primary" data-reassign="${s.id}">\u{1F504} G\xFCzergah Ata</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`;
    container.querySelectorAll("[data-notify]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const student = students.find((s) => s.id === btn.dataset.notify);
        if (student) {
          showToast(`${student.name}'in velisine (${student.parentPhone}) bilgilendirme mesaj\u0131 g\xF6nderildi.`, "success");
          btn.textContent = "\u2713 Bilgilendirildi";
          btn.disabled = true;
        }
      });
    });
    container.querySelectorAll("[data-reassign]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const student = students.find((s) => s.id === btn.dataset.reassign);
        if (student) {
          showToast(`${student.name} i\xE7in yeni g\xFCzergah atama i\u015Flemi ba\u015Flat\u0131ld\u0131.`, "info");
        }
      });
    });
  }

  // src/main.ts
  function initTabSystem() {
    const tabBtns = document.querySelectorAll(".sp-tab-btn");
    const tabPanels = document.querySelectorAll(".sp-tab-panel");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabPanels.forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const panel = document.getElementById(`panel-${target}`);
        if (panel) panel.classList.add("active");
      });
    });
  }
  function init() {
    initTabSystem();
    initRoutePlanner();
    initActivities();
    initAttendance();
    initDriverSurvey();
    initDemoRequest();
    initContactSection();
    initRouteCheck();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

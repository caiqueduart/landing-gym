/* Academia Shalom Fitness — interações da landing page */
(function () {
  'use strict';

  /* ---------- Status "aberta agora" (horário de Brasília) ---------- */
  var HORARIO = { 1: [5, 23], 2: [5, 23], 3: [5, 23], 4: [5, 23], 5: [5, 23], 6: [7, 13], 0: null };
  var DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  function agora() {
    var now = new Date();
    var dia = now.getDay();
    var hora = now.getHours() + now.getMinutes() / 60;
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
      }).formatToParts(now);
      var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ''; };
      dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      hora = Number(get('hour')) + Number(get('minute')) / 60;
    } catch (e) { /* usa o horário do aparelho */ }

    var hoje = HORARIO[dia];
    if (hoje && hora >= hoje[0] && hora < hoje[1]) return { aberta: true, texto: 'Aberta agora · fecha às ' + hoje[1] + 'h' };
    if (hoje && hora < hoje[0]) return { aberta: false, texto: 'Fechada agora · abre hoje às ' + hoje[0] + 'h' };
    for (var i = 1; i <= 7; i++) {
      var d = (dia + i) % 7;
      if (HORARIO[d]) {
        return { aberta: false, texto: 'Fechada agora · abre ' + (i === 1 ? 'amanhã' : DIAS[d]) + ' às ' + HORARIO[d][0] + 'h' };
      }
    }
    return { aberta: false, texto: 'Fale com a gente no WhatsApp' };
  }

  function atualizarStatus() {
    var dot = document.getElementById('status-dot');
    var txt = document.getElementById('status-text');
    if (!dot || !txt) return;
    var st = agora();
    txt.textContent = st.texto;
    dot.classList.toggle('on', st.aberta);
  }
  atualizarStatus();
  setInterval(atualizarStatus, 30000);

  /* ---------- Menu do celular ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menu.hidden = !open;
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    atualizarBarra();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  }

  /* ---------- Barra fixa (celular) e botão do WhatsApp (desktop) ---------- */
  var heroCtas = document.getElementById('hero-cta-row');
  var bbar = document.getElementById('bbar');
  var fab = document.getElementById('fab');
  function atualizarBarra() {
    if (!heroCtas) return;
    var passou = heroCtas.getBoundingClientRect().bottom < 0;
    var menuAberto = menu && !menu.hidden;
    if (bbar) bbar.classList.toggle('show', passou && !menuAberto);
    if (fab) fab.classList.toggle('show', passou);
  }
  window.addEventListener('scroll', atualizarBarra, { passive: true });
  window.addEventListener('resize', atualizarBarra);
  atualizarBarra();

  /* ---------- Números que contam ---------- */
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counts = document.querySelectorAll('.count');
  function contar() {
    var t0 = performance.now();
    counts.forEach(function (el) { el.textContent = '0'; });
    function passo(t) {
      var k = Math.min(1, (t - t0) / 1400);
      var e = 1 - Math.pow(1 - k, 3);
      counts.forEach(function (el) { el.textContent = String(Math.round(Number(el.dataset.to) * e)); });
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  var nums = document.getElementById('nums');
  if (nums && counts.length && !reduz && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); contar(); }
    }, { threshold: 0.4 });
    io.observe(nums);
  }

  /* ---------- Bolinhas do carrossel de planos (celular) ---------- */
  var plans = document.getElementById('plans');
  var dots = document.querySelectorAll('#plan-dots i');
  if (plans && dots.length) {
    plans.addEventListener('scroll', function () {
      var max = Math.max(1, plans.scrollWidth - plans.clientWidth);
      var i = Math.round(plans.scrollLeft / max * (dots.length - 1));
      dots.forEach(function (d, n) { d.classList.toggle('on', n === i); });
    }, { passive: true });
  }
})();

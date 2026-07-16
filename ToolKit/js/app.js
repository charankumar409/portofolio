// ===== ECE Student Toolkit - Main Application =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== State =====
  const state = {
    theme: localStorage.getItem('ecet-theme') || 'light',
    semesters: JSON.parse(localStorage.getItem('ecet-semesters')) || [{ id: 1, subjects: [{ name: '', credits: 3, grade: 'A' }] }],
    currentSemester: 1,
    quotes: [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
      { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
      { text: "Engineering is the closest thing to magic that exists in the world.", author: "Elon Musk" },
      { text: "Logic will get you from A to B. Imagination will take you everywhere.", author: "Albert Einstein" },
      { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
    ],
    currentQuote: 0,
    gradeChart: null
  };

  // ===== Sample Data =====
  const notesData = [
    { id: 1, title: "Digital Electronics Fundamentals", desc: "Boolean algebra, logic gates, flip-flops, counters, and sequential circuits.", chapters: 8, category: "digital", subject: "DE" },
    { id: 2, title: "Analog Circuit Design", desc: "Op-amps, transistors, amplifiers, filters, and oscillator circuits.", chapters: 10, category: "analog", subject: "AE" },
    { id: 3, title: "Signals & Systems Analysis", desc: "Continuous and discrete signals, Fourier transform, Laplace transform, Z-transform.", chapters: 9, category: "signals", subject: "SS" },
    { id: 4, title: "Communication Engineering", desc: "AM, FM, digital modulation, noise analysis, and information theory.", chapters: 7, category: "communication", subject: "CE" },
    { id: 5, title: "Microprocessor & Interfacing", desc: "8085/8086 architecture, instruction set, programming, and peripheral interfacing.", chapters: 6, category: "microprocessor", subject: "MP" },
    { id: 6, title: "Embedded Systems Design", desc: "ARM Cortex-M, RTOS, GPIO, timers, interrupts, and low-power design.", chapters: 8, category: "embedded", subject: "ES" },
    { id: 7, title: "VLSI Design Principles", desc: "CMOS fabrication, layout design, stick diagrams, and design rules.", chapters: 5, category: "vlsi", subject: "VLSI" },
    { id: 8, title: "Digital Signal Processing", desc: "DFT, FFT, FIR/IIR filters, multirate DSP, and filter design techniques.", chapters: 9, category: "dsp", subject: "DSP" },
    { id: 9, title: "Advanced Digital Design", desc: "Verilog HDL, finite state machines, memory design, and FPGA implementation.", chapters: 7, category: "digital", subject: "DE" },
    { id: 10, title: "Analog Communication", desc: "Amplitude and frequency modulation, transmitters, receivers, and S/N ratio.", chapters: 6, category: "communication", subject: "CE" },
    { id: 11, title: "ARM Microcontroller", desc: "STM32 architecture, peripheral programming, DMA, ADC, and PWM generation.", chapters: 7, category: "embedded", subject: "ES" },
    { id: 12, title: "RF & Microwave Engineering", desc: "Waveguides, S-parameters, Smith chart, impedance matching, and antenna design.", chapters: 6, category: "analog", subject: "AE" }
  ];

  const formulasData = [
    { id: 1, title: "Ohm's Law", eq: "V = I × R", vars: "V = Voltage (V), I = Current (A), R = Resistance (Ω)", example: "If I = 2A, R = 10Ω, then V = 20V", category: "circuit" },
    { id: 2, title: "Kirchhoff's Current Law", eq: "∑ I_in = ∑ I_out", vars: "Sum of currents entering a node = Sum of currents leaving", example: "I1 + I2 = I3 + I4", category: "circuit" },
    { id: 3, title: "Kirchhoff's Voltage Law", eq: "∑ V = 0", vars: "Sum of voltage drops around a closed loop = 0", example: "V1 + V2 + V3 = Vsource", category: "circuit" },
    { id: 4, title: "Power Dissipation", eq: "P = V × I = I²R = V²/R", vars: "P = Power (W), V = Voltage, I = Current, R = Resistance", example: "If V=12V, I=2A, P=24W", category: "circuit" },
    { id: 5, title: "De Morgan's Theorem", eq: "¬(A·B) = ¬A + ¬B", vars: "¬(A·B) = ¬A + ¬B, ¬(A+B) = ¬A · ¬B", example: "¬(A·B·C) = ¬A + ¬B + ¬C", category: "digital" },
    { id: 6, title: "Boolean Identity", eq: "A + A·B = A", vars: "Absorption law in Boolean algebra", example: "X + X·Y = X", category: "digital" },
    { id: 7, title: "Op-Amp Gain (Inverting)", eq: "A_v = -R_f / R_in", vars: "A_v = Voltage Gain, R_f = Feedback Resistor, R_in = Input Resistor", example: "If Rf=100kΩ, Rin=10kΩ, Av=−10", category: "analog" },
    { id: 8, title: "Cutoff Frequency (RC)", eq: "f_c = 1 / (2πRC)", vars: "f_c = Cutoff frequency (Hz), R = Resistance (Ω), C = Capacitance (F)", example: "R=1kΩ, C=0.1μF, fc≈1.59kHz", category: "analog" },
    { id: 9, title: "Shannon's Channel Capacity", eq: "C = B log₂(1 + S/N)", vars: "C = Capacity (bps), B = Bandwidth (Hz), S/N = Signal-to-Noise ratio", example: "B=3kHz, S/N=1000, C≈30kbps", category: "communication" },
    { id: 10, title: "Free Space Path Loss", eq: "FSPL = (4πdf/c)²", vars: "d = Distance, f = Frequency, c = Speed of light", example: "d=1km, f=1GHz, FSPL≈92.4dB", category: "communication" },
    { id: 11, title: "Fourier Transform", eq: "X(ω) = ∫x(t)·e^(-jωt) dt", vars: "Continuous-time Fourier transform from -∞ to ∞", example: "Rect(t) ↔ sinc(ω/2)", category: "signals" },
    { id: 12, title: "Laplace Transform", eq: "F(s) = ∫f(t)·e^(-st) dt", vars: "s = σ + jω (complex frequency)", example: "L{1} = 1/s, L{e^(at)} = 1/(s-a)", category: "signals" },
    { id: 13, title: "Closed-Loop Transfer Function", eq: "T(s) = G(s) / (1 + G(s)H(s))", vars: "G(s) forward gain, H(s) feedback gain", example: "Unity feedback: T=G/(1+G)", category: "control" },
    { id: 14, title: "Maxwell's Equations (Faraday)", eq: "∇×E = -∂B/∂t", vars: "E = Electric field, B = Magnetic field", example: "Time-varying B induces E", category: "electromagnetics" },
    { id: 15, title: "Wave Impedance", eq: "Z₀ = √(μ/ε)", vars: "Z₀ = Intrinsic impedance (Ω), μ = Permeability, ε = Permittivity", example: "Free space Z₀ ≈ 377Ω", category: "electromagnetics" },
    { id: 16, title: "Signal Power", eq: "P = Vrms² / R", vars: "Vrms = root-mean-square voltage, R = resistance", example: "Vrms=10V, R=50Ω, P=2W", category: "signals" }
  ];

  const papersData = [
    { id: 1, subject: "Digital Electronics", semester: "Semester 3", year: "2024", regulation: "R2021", type: "End Semester" },
    { id: 2, subject: "Analog Electronics", semester: "Semester 3", year: "2024", regulation: "R2021", type: "End Semester" },
    { id: 3, subject: "Signals & Systems", semester: "Semester 4", year: "2024", regulation: "R2021", type: "End Semester" },
    { id: 4, subject: "Communication Systems", semester: "Semester 4", year: "2024", regulation: "R2021", type: "Mid Semester" },
    { id: 5, subject: "Digital Electronics", semester: "Semester 3", year: "2023", regulation: "R2019", type: "End Semester" },
    { id: 6, subject: "Microprocessors & Microcontrollers", semester: "Semester 4", year: "2023", regulation: "R2019", type: "End Semester" },
    { id: 7, subject: "Embedded Systems", semester: "Semester 5", year: "2024", regulation: "R2021", type: "Mid Semester" },
    { id: 8, subject: "VLSI Design", semester: "Semester 6", year: "2024", regulation: "R2021", type: "End Semester" },
    { id: 9, subject: "DSP", semester: "Semester 5", year: "2024", regulation: "R2021", type: "End Semester" },
    { id: 10, subject: "Analog Electronics", semester: "Semester 3", year: "2023", regulation: "R2019", type: "Mid Semester" },
    { id: 11, subject: "Signals & Systems", semester: "Semester 4", year: "2023", regulation: "R2019", type: "End Semester" },
    { id: 12, subject: "Communication Systems", semester: "Semester 4", year: "2022", regulation: "R2019", type: "End Semester" },
    { id: 13, subject: "Digital Electronics", semester: "Semester 3", year: "2022", regulation: "R2019", type: "End Semester" },
    { id: 14, subject: "Embedded Systems", semester: "Semester 5", year: "2023", regulation: "R2019", type: "End Semester" },
    { id: 15, subject: "VLSI Design", semester: "Semester 6", year: "2023", regulation: "R2019", type: "Mid Semester" },
    { id: 16, subject: "DSP", semester: "Semester 5", year: "2022", regulation: "R2019", type: "End Semester" },
    { id: 17, subject: "Microprocessors & Microcontrollers", semester: "Semester 4", year: "2024", regulation: "R2021", type: "Mid Semester" },
    { id: 18, subject: "Control Systems", semester: "Semester 5", year: "2024", regulation: "R2021", type: "End Semester" }
  ];

  // ===== Grade Point Mapping =====
  const gradePoints = { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0 };
  const gradeColors = { 'S': '#10b981', 'A': '#3b82f6', 'B': '#6366f1', 'C': '#f59e0b', 'D': '#f97316', 'E': '#ef4444', 'F': '#6b7280' };

  // ===== DOM References =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ===== Utility Functions =====
  function saveState() { localStorage.setItem('ecet-semesters', JSON.stringify(state.semesters)); }
  function getSemester(id) { return state.semesters.find(s => s.id === id); }

  // ===== Theme =====
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('ecet-theme', theme);
    const icon = $('#themeToggle i');
    if (theme === 'dark') { icon.className = 'fas fa-sun'; } else { icon.className = 'fas fa-moon'; }
    $$('.theme-option').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
  }
  applyTheme(state.theme);

  // ===== Navigation / Routing =====
  function navigate(page) {
    $$('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');
    if (window.innerWidth <= 768) { $('#sidebar').classList.remove('show'); $('#sidebarOverlay').classList.remove('show'); }
    if (page === 'cgpa-calculator') renderCGPA();
    if (page === 'notes') renderNotes();
    if (page === 'formulas') renderFormulas();
    if (page === 'papers') renderPapers();
  }

  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    navigate(hash);
  }

  window.addEventListener('hashchange', handleHash);
  document.querySelectorAll('[data-nav], .nav-item[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      const page = el.dataset.page || el.getAttribute('href')?.replace('#', '');
      if (page) { window.location.hash = page; }
    });
  });
  handleHash();

  // ===== Sidebar =====
  $('#sidebarOpen').addEventListener('click', () => {
    $('#sidebar').classList.add('show');
    $('#sidebarOverlay').classList.add('show');
  });
  $('#sidebarClose').addEventListener('click', () => {
    $('#sidebar').classList.remove('show');
    $('#sidebarOverlay').classList.remove('show');
  });
  $('#sidebarOverlay').addEventListener('click', () => {
    $('#sidebar').classList.remove('show');
    $('#sidebarOverlay').classList.remove('show');
  });

  // ===== Theme Toggle =====
  $('#themeToggle').addEventListener('click', () => {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
  });

  // ===== Dashboard =====
  function updateDate() {
    const now = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#currentDate').textContent = now.toLocaleDateString('en-US', opts);
  }
  updateDate();

  function showQuote() {
    const q = state.quotes[state.currentQuote % state.quotes.length];
    $('#dailyQuote').textContent = `"${q.text}"`;
    $('#quoteAuthor').textContent = `— ${q.author}`;
  }
  showQuote();
  $('#newQuoteBtn').addEventListener('click', () => {
    state.currentQuote = (state.currentQuote + 1) % state.quotes.length;
    showQuote();
  });

  // ===== CGPA Calculator =====
  function renderCGPA() {
    const sem = getSemester(state.currentSemester) || state.semesters[0];
    if (!sem) return;
    $('#semesterNumber').textContent = sem.id;
    const tbody = $('#cgpaTableBody');
    tbody.innerHTML = '';
    sem.subjects.forEach((subj, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td><input type="text" class="subj-name" value="${subj.name}" placeholder="Subject name"></td>
        <td><input type="number" class="subj-credits" value="${subj.credits}" min="1" max="10" step="1"></td>
        <td><select class="subj-grade">${['S','A','B','C','D','E','F'].map(g => `<option value="${g}" ${subj.grade === g ? 'selected' : ''}>${g}</option>`).join('')}</select></td>
        <td class="grade-points">${gradePoints[subj.grade]}</td>
        <td><i class="fas fa-times remove-row" data-index="${i}"></i></td>
      `;
      tbody.appendChild(tr);

      tr.querySelector('.subj-name').addEventListener('change', (e) => { subj.name = e.target.value; saveState(); });
      tr.querySelector('.subj-credits').addEventListener('change', (e) => { subj.credits = Math.max(1, parseInt(e.target.value) || 1); saveState(); updateCGPA(); });
      tr.querySelector('.subj-grade').addEventListener('change', (e) => { subj.grade = e.target.value; tr.querySelector('.grade-points').textContent = gradePoints[subj.grade]; saveState(); updateCGPA(); });
      tr.querySelector('.remove-row').addEventListener('click', () => {
        if (sem.subjects.length > 1) {
          sem.subjects.splice(i, 1);
          saveState();
          renderCGPA();
        }
      });
    });
    updateCGPA();
    renderSemesterList();
  }

  function updateCGPA() {
    const sem = getSemester(state.currentSemester);
    if (!sem) return;
    let totalCredits = 0, totalPoints = 0;
    $$('#cgpaTableBody tr').forEach((tr, i) => {
      const credits = parseInt(tr.querySelector('.subj-credits').value) || 0;
      const grade = tr.querySelector('.subj-grade').value;
      sem.subjects[i].credits = credits;
      sem.subjects[i].grade = grade;
      totalCredits += credits;
      totalPoints += credits * gradePoints[grade];
    });
    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    $('#totalCredits').textContent = totalCredits;
    $('#totalPoints').textContent = totalPoints;
    $('#sgpaResult').textContent = sgpa.toFixed(2);
    sem.sgpa = sgpa;
    sem.totalCredits = totalCredits;
    saveState();

    let totalAllCredits = 0, totalAllPoints = 0;
    state.semesters.forEach(s => {
      if (s.sgpa && s.totalCredits) {
        totalAllCredits += s.totalCredits;
        totalAllPoints += s.totalCredits * s.sgpa;
      }
    });
    const cgpa = totalAllCredits > 0 ? (totalAllPoints / totalAllCredits) : 0;
    $('#cgpaResult').textContent = cgpa.toFixed(2);
    updateGradeChart();
  }

  function renderSemesterList() {
    const list = $('#semesterList');
    list.innerHTML = '';
    state.semesters.forEach(s => {
      const div = document.createElement('div');
      div.className = 'semester-item' + (s.id === state.currentSemester ? ' active' : '');
      div.innerHTML = `<span>Semester ${s.id}</span><span class="sem-sgpa">${s.sgpa ? s.sgpa.toFixed(2) : '—'}</span>`;
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => {
        state.currentSemester = s.id;
        renderCGPA();
      });
      list.appendChild(div);
    });
  }

  function updateGradeChart() {
    const grades = {};
    state.semesters.forEach(s => s.subjects.forEach(subj => {
      grades[subj.grade] = (grades[subj.grade] || 0) + 1;
    }));
    const labels = Object.keys(grades).sort((a,b) => gradePoints[b] - gradePoints[a]);
    const data = labels.map(l => grades[l]);
    const colors = labels.map(l => gradeColors[l]);

    if (state.gradeChart) state.gradeChart.destroy();
    const canvas = $('#gradeChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (data.length === 0) { labels.push('No Data'); data.push(1); colors.push('#e2e8f0'); }
    state.gradeChart = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '65%' }
    });
    const legend = $('#gradeLegend');
    legend.innerHTML = labels.map((l, i) => `<span style="background:${colors[i]};color:#fff">${l}: ${data[i]}</span>`).join('');
  }

  $('#addSubjectBtn').addEventListener('click', () => {
    const sem = getSemester(state.currentSemester);
    if (sem) { sem.subjects.push({ name: '', credits: 3, grade: 'A' }); saveState(); renderCGPA(); }
  });

  $('#addSemesterBtn').addEventListener('click', () => {
    const newId = Math.max(...state.semesters.map(s => s.id)) + 1;
    state.semesters.push({ id: newId, subjects: [{ name: '', credits: 3, grade: 'A' }] });
    state.currentSemester = newId;
    saveState();
    renderCGPA();
  });

  $('#resetCGPABtn').addEventListener('click', () => {
    const sem = getSemester(state.currentSemester);
    if (sem) { sem.subjects = [{ name: '', credits: 3, grade: 'A' }]; delete sem.sgpa; delete sem.totalCredits; saveState(); renderCGPA(); }
  });

  // ===== Electronics Calculator =====
  const calcTabs = $$('.calc-tab');
  const calcPanels = $$('.calc-panel');
  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      calcPanels.forEach(p => p.classList.remove('active'));
      document.getElementById('calc-' + tab.dataset.calc).classList.add('active');
    });
  });

  function calcEl(id, value, precision) { const el = document.getElementById(id); if (el) el.textContent = value !== null && value !== undefined ? (typeof value === 'number' ? (precision !== undefined ? value.toFixed(precision) : value) : value) : '—'; }

  // Ohm's Law
  function calcOhm() {
    const v = parseFloat($('#ohmVoltage').value), i = parseFloat($('#ohmCurrent').value), r = parseFloat($('#ohmResistance').value);
    let inputs = 0;
    if (!isNaN(v)) inputs++; if (!isNaN(i)) inputs++; if (!isNaN(r)) inputs++;
    if (inputs < 2) return;
    if (isNaN(v) && !isNaN(i) && !isNaN(r)) { const V = i * r; calcEl('ohmResultV', V, 2); calcEl('ohmResultI', i, 3); calcEl('ohmResultR', r, 2); calcEl('ohmResultP', V * i, 2); }
    else if (isNaN(i) && !isNaN(v) && !isNaN(r)) { const I = v / r; calcEl('ohmResultV', v, 2); calcEl('ohmResultI', I, 3); calcEl('ohmResultR', r, 2); calcEl('ohmResultP', v * I, 2); }
    else if (isNaN(r) && !isNaN(v) && !isNaN(i)) { const R = v / i; calcEl('ohmResultV', v, 2); calcEl('ohmResultI', i, 3); calcEl('ohmResultR', R, 2); calcEl('ohmResultP', v * i, 2); }
  }
  $('#calcOhmBtn').addEventListener('click', calcOhm);
  $('#resetOhmBtn').addEventListener('click', () => { $('#ohmVoltage').value = ''; $('#ohmCurrent').value = ''; $('#ohmResistance').value = ''; ['ohmResultV','ohmResultI','ohmResultR','ohmResultP'].forEach(id => calcEl(id, null)); });

  // Voltage Divider
  function calcVd() {
    const vin = parseFloat($('#vdVin').value), r1 = parseFloat($('#vdR1').value), r2 = parseFloat($('#vdR2').value);
    if (isNaN(vin) || isNaN(r1) || isNaN(r2)) return;
    const vout = vin * (r2 * 1000) / (r1 * 1000 + r2 * 1000);
    const i = vin / ((r1 + r2) * 1000);
    const p = i * i * (r1 * 1000 + r2 * 1000);
    calcEl('vdResult', vout, 3); calcEl('vdCurrent', i * 1e6, 2); calcEl('vdPower', p, 6);
    $('#vdCurrent').parentElement.querySelector('span').textContent = 'Current (μA):';
    $('#vdPower').parentElement.querySelector('span').textContent = 'Power (W):';
  }
  $('#calcVdBtn').addEventListener('click', calcVd);
  $('#resetVdBtn').addEventListener('click', () => { $('#vdVin').value = ''; $('#vdR1').value = ''; $('#vdR2').value = ''; calcEl('vdResult', null); calcEl('vdCurrent', null); calcEl('vdPower', null); });

  // LED Resistor
  function calcLed() {
    const vs = parseFloat($('#ledVs').value), vf = parseFloat($('#ledVf').value), if_mA = parseFloat($('#ledIf').value);
    if (isNaN(vs) || isNaN(vf) || isNaN(if_mA)) return;
    const if_A = if_mA / 1000;
    const r = (vs - vf) / if_A;
    const standards = [10, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680, 1000, 1500, 2200, 3300, 4700, 6800, 10000];
    const nearest = standards.reduce((a, b) => Math.abs(a - r) < Math.abs(b - r) ? a : b);
    const p = (vs - vf) * if_A;
    calcEl('ledResult', r, 1); calcEl('ledStandard', nearest, 0); calcEl('ledPower', p, 3);
  }
  $('#calcLedBtn').addEventListener('click', calcLed);
  $('#resetLedBtn').addEventListener('click', () => { $('#ledVs').value = ''; $('#ledVf').value = ''; $('#ledIf').value = ''; calcEl('ledResult', null); calcEl('ledStandard', null); calcEl('ledPower', null); });

  // Power Calculator
  function calcPw() {
    const v = parseFloat($('#pwVoltage').value), i = parseFloat($('#pwCurrent').value), r = parseFloat($('#pwResistance').value);
    let p = null, formula = '';
    if (!isNaN(v) && !isNaN(i) && !isNaN(r)) { p = v * i; formula = 'P = V × I'; }
    else if (!isNaN(v) && !isNaN(i)) { p = v * i; formula = 'P = V × I'; }
    else if (!isNaN(i) && !isNaN(r)) { p = i * i * r; formula = 'P = I² × R'; }
    else if (!isNaN(v) && !isNaN(r)) { p = v * v / r; formula = 'P = V² / R'; }
    if (p !== null) { calcEl('pwResult', p, 3); calcEl('pwFormula', formula); } else { calcEl('pwResult', null); calcEl('pwFormula', null); }
  }
  $('#calcPwBtn').addEventListener('click', calcPw);
  $('#resetPwBtn').addEventListener('click', () => { $('#pwVoltage').value = ''; $('#pwCurrent').value = ''; $('#pwResistance').value = ''; calcEl('pwResult', null); calcEl('pwFormula', null); });

  // Frequency Calculator
  function calcFreq() {
    const period = parseFloat($('#freqPeriod').value), freq = parseFloat($('#freqValue').value);
    const unit = $('#freqUnit').value;
    const multipliers = { 'Hz': 1, 'kHz': 1e3, 'MHz': 1e6, 'GHz': 1e9 };
    const m = multipliers[unit];
    if (!isNaN(period) && isNaN(freq)) {
      const f = 1 / period;
      calcEl('freqResult', f / m, 4); calcEl('periodResult', period, 6); calcEl('angularResult', 2 * Math.PI * f, 4);
    } else if (isNaN(period) && !isNaN(freq)) {
      const f = freq * m;
      const t = 1 / f;
      calcEl('freqResult', freq, 4); calcEl('periodResult', t, 6); calcEl('angularResult', 2 * Math.PI * f, 4);
    }
  }
  $('#calcFreqBtn').addEventListener('click', calcFreq);
  $('#resetFreqBtn').addEventListener('click', () => { $('#freqPeriod').value = ''; $('#freqValue').value = ''; calcEl('freqResult', null); calcEl('periodResult', null); calcEl('angularResult', null); });

  // ===== Scientific Calculator =====
  let sciExpr = '';
  let sciResult = '0';
  let sciJustEvaluated = false;

  function updateSciDisplay() {
    $('#sciExpression').textContent = sciExpr;
    $('#sciResult').textContent = sciResult;
  }

  document.querySelectorAll('.sci-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const isNum = btn.classList.contains('sci-num');
      const isOp = btn.classList.contains('sci-op');
      const isFn = btn.classList.contains('sci-fn');
      const isClear = btn.classList.contains('sci-clear');
      const isEq = btn.classList.contains('sci-eq');

      if (isClear) {
        if (action === 'clear') { sciExpr = ''; sciResult = '0'; sciJustEvaluated = false; }
        else if (action === 'backspace') { sciExpr = sciExpr.slice(0, -1); }
        updateSciDisplay(); return;
      }

      if (isEq) {
        try {
          let evalExpr = sciExpr
            .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
            .replace(/π/g, `(${Math.PI})`).replace(/e(?![xp])/g, `(${Math.E})`)
            .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(')
            .replace(/√\(/g, 'Math.sqrt(').replace(/²/g, '**2').replace(/³/g, '**3')
            .replace(/\^/g, '**').replace(/!/g, '')
            .replace(/π/g, Math.PI);
          const result = Function('"use strict"; return (' + evalExpr + ')')();
          sciResult = String(parseFloat(result.toFixed(10)));
          sciExpr = sciResult;
          sciJustEvaluated = true;
        } catch (e) { sciResult = 'Error'; }
        updateSciDisplay(); return;
      }

      if (sciJustEvaluated && (isNum || isFn)) { sciExpr = ''; sciJustEvaluated = false; }
      if (sciJustEvaluated && isOp) { sciJustEvaluated = false; }

      if (isNum || action === '.') { sciExpr += action; }
      else if (isOp) {
        const opMap = { '+': '+', '-': '-', '*': '×', '/': '÷', '^': '^', '%': '%', '(': '(', ')': ')' };
        if (action === 'pm') {
          if (sciExpr.startsWith('-')) sciExpr = sciExpr.slice(1);
          else sciExpr = '-' + sciExpr;
        } else { sciExpr += opMap[action] || action; }
      }
      else if (isFn) {
        const fnMap = { 'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(', 'log': 'log(', 'ln': 'ln(', 'sqrt': '√(', 'square': '²', 'cube': '³', 'inv': '^(-1)', 'fact': '!', 'pi': 'π', 'e': 'e' };
        sciExpr += fnMap[action] || '';
      }
      updateSciDisplay();
    });
  });

  // ===== Unit Converter =====
  const unitData = {
    voltage: { name: 'Voltage', units: ['V', 'mV', 'kV'], toBase: [1, 0.001, 1000] },
    current: { name: 'Current', units: ['A', 'mA', 'μA', 'kA'], toBase: [1, 0.001, 0.000001, 1000] },
    resistance: { name: 'Resistance', units: ['Ω', 'kΩ', 'MΩ'], toBase: [1, 1000, 1000000] },
    power: { name: 'Power', units: ['W', 'mW', 'kW', 'MW'], toBase: [1, 0.001, 1000, 1000000] },
    frequency: { name: 'Frequency', units: ['Hz', 'kHz', 'MHz', 'GHz'], toBase: [1, 1000, 1000000, 1000000000] },
    length: { name: 'Length', units: ['m', 'cm', 'mm', 'km', 'in', 'ft', 'mi'], toBase: [1, 0.01, 0.001, 1000, 0.0254, 0.3048, 1609.34] },
    weight: { name: 'Weight', units: ['kg', 'g', 'mg', 'lb', 'oz'], toBase: [1, 0.001, 0.000001, 0.453592, 0.0283495] },
    temperature: { name: 'Temperature', units: ['°C', '°F', 'K'], toBase: null },
    area: { name: 'Area', units: ['m²', 'cm²', 'mm²', 'km²', 'ha', 'ac'], toBase: [1, 0.0001, 0.000001, 1000000, 10000, 4046.86] },
    volume: { name: 'Volume', units: ['L', 'mL', 'm³', 'gal', 'fl oz'], toBase: [1, 0.001, 1000, 3.78541, 0.0295735] },
    time: { name: 'Time', units: ['s', 'ms', 'μs', 'min', 'hr', 'day'], toBase: [1, 0.001, 0.000001, 60, 3600, 86400] },
    speed: { name: 'Speed', units: ['m/s', 'km/h', 'mph', 'kn'], toBase: [1, 0.277778, 0.44704, 0.514444] },
    digital: { name: 'Digital Storage', units: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'], toBase: [1, 1024, 1048576, 1073741824, 1099511627776, 1125899906842624] }
  };

  function updateConverterUnits() {
    const cat = $('#convCategory').value;
    const data = unitData[cat];
    if (!data) return;
    const fromSel = $('#convFromUnit'), toSel = $('#convToUnit');
    fromSel.innerHTML = data.units.map((u, i) => `<option value="${i}">${u}</option>`).join('');
    toSel.innerHTML = data.units.map((u, i) => `<option value="${i}" ${i === 1 ? 'selected' : ''}>${u}</option>`).join('');
    doConversion();
  }

  function doConversion() {
    const cat = $('#convCategory').value;
    const data = unitData[cat];
    const val = parseFloat($('#convInput').value);
    const fromIdx = parseInt($('#convFromUnit').value);
    const toIdx = parseInt($('#convToUnit').value);
    const resultEl = $('#convResult');
    const formulaEl = $('#convFormula');

    if (isNaN(val)) { resultEl.value = ''; formulaEl.textContent = ''; return; }

    if (cat === 'temperature') {
      let celsius;
      if (fromIdx === 0) celsius = val;
      else if (fromIdx === 1) celsius = (val - 32) * 5/9;
      else celsius = val - 273.15;

      let result;
      if (toIdx === 0) result = celsius;
      else if (toIdx === 1) result = celsius * 9/5 + 32;
      else result = celsius + 273.15;

      resultEl.value = result.toFixed(4);
      const fromName = data.units[fromIdx], toName = data.units[toIdx];
      formulaEl.textContent = `${val} ${fromName} = ${result.toFixed(4)} ${toName}`;
    } else {
      const base = val * data.toBase[fromIdx];
      const result = base / data.toBase[toIdx];
      resultEl.value = result.toFixed(6);
      const fromName = data.units[fromIdx], toName = data.units[toIdx];
      formulaEl.textContent = `${val} ${fromName} = ${result.toFixed(6)} ${toName}`;
    }
  }

  $('#convCategory').addEventListener('change', updateConverterUnits);
  $('#convInput').addEventListener('input', doConversion);
  $('#convFromUnit').addEventListener('change', doConversion);
  $('#convToUnit').addEventListener('change', doConversion);
  $('#swapUnitsBtn').addEventListener('click', () => {
    const from = $('#convFromUnit'), to = $('#convToUnit');
    const temp = from.value; from.value = to.value; to.value = temp;
    doConversion();
  });
  updateConverterUnits();

  // ===== Notes =====
  function renderNotes(filter = 'all', search = '') {
    const grid = $('#notesGrid');
    grid.innerHTML = '';
    const filtered = notesData.filter(n => {
      if (filter !== 'all' && n.category !== filter) return false;
      if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.desc.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (filtered.length === 0) { grid.innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center;padding:3rem"><p style="color:var(--text-light)">No notes found.</p></div>'; return; }
    filtered.forEach(n => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.innerHTML = `
        <div class="note-category"><i class="fas fa-tag"></i> ${n.category.charAt(0).toUpperCase() + n.category.slice(1)}</div>
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
        <div class="note-chapters"><i class="far fa-file-alt"></i> ${n.chapters} Chapters</div>
        <div class="note-actions">
          <button class="btn btn-primary btn-sm"><i class="fas fa-eye"></i> Read</button>
          <button class="btn btn-outline btn-sm"><i class="fas fa-download"></i> Download</button>
          <button class="btn btn-outline btn-sm"><i class="far fa-bookmark"></i></button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  $('#notesSearch').addEventListener('input', (e) => {
    const active = document.querySelector('#notesFilters .filter-tab.active');
    renderNotes(active ? active.dataset.filter : 'all', e.target.value);
  });
  document.querySelectorAll('#notesFilters .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#notesFilters .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderNotes(tab.dataset.filter, $('#notesSearch').value);
    });
  });

  // ===== Formulas =====
  function renderFormulas(filter = 'all', search = '') {
    const grid = $('#formulasGrid');
    grid.innerHTML = '';
    const filtered = formulasData.filter(f => {
      if (filter !== 'all' && f.category !== filter) return false;
      if (search && !f.title.toLowerCase().includes(search.toLowerCase()) && !f.eq.toLowerCase().includes(search.toLowerCase()) && !f.vars.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (filtered.length === 0) { grid.innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center;padding:3rem"><p style="color:var(--text-light)">No formulas found.</p></div>'; return; }
    filtered.forEach(f => {
      const card = document.createElement('div');
      card.className = 'formula-card';
      card.innerHTML = `
        <div class="formula-category"><i class="fas fa-folder"></i> ${f.category.charAt(0).toUpperCase() + f.category.slice(1)}</div>
        <h4>${f.title}</h4>
        <div class="formula-equation">${f.eq}</div>
        <div class="formula-vars"><span>${f.vars}</span></div>
        <div class="formula-example"><strong>Example:</strong> ${f.example}</div>
      `;
      grid.appendChild(card);
    });
  }

  $('#formulaSearch').addEventListener('input', (e) => {
    const active = document.querySelector('#formulaFilters .filter-tab.active');
    renderFormulas(active ? active.dataset.filter : 'all', e.target.value);
  });
  document.querySelectorAll('#formulaFilters .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#formulaFilters .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderFormulas(tab.dataset.filter, $('#formulaSearch').value);
    });
  });

  // ===== Papers =====
  function renderPapers(filter = 'all', search = '') {
    const grid = $('#papersGrid');
    grid.innerHTML = '';
    const filtered = papersData.filter(p => {
      if (filter !== 'all' && p.year !== filter && p.type.toLowerCase().replace(' ', '') !== filter && p.semester.toLowerCase().replace(' ', '') !== filter) return false;
      if (search && !p.subject.toLowerCase().includes(search.toLowerCase()) && !p.semester.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (filtered.length === 0) { grid.innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center;padding:3rem"><p style="color:var(--text-light)">No papers found.</p></div>'; return; }
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'paper-card';
      card.innerHTML = `
        <div class="paper-subject">${p.subject}</div>
        <div class="paper-meta">
          <span>Semester: <span>${p.semester}</span></span>
          <span>Year: <span>${p.year}</span></span>
          <span>Regulation: <span>${p.regulation}</span></span>
          <span>Type: <span>${p.type}</span></span>
        </div>
        <div class="paper-actions">
          <button class="btn btn-primary btn-sm"><i class="fas fa-eye"></i> View</button>
          <button class="btn btn-outline btn-sm"><i class="fas fa-download"></i> Download PDF</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  $('#papersSearch').addEventListener('input', (e) => {
    const active = document.querySelector('#papersFilters .filter-tab.active');
    renderPapers(active ? active.dataset.filter : 'all', e.target.value);
  });
  document.querySelectorAll('#papersFilters .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#papersFilters .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderPapers(tab.dataset.filter, $('#papersSearch').value);
    });
  });

  // ===== Settings =====
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  $('#resetSettingsBtn').addEventListener('click', () => {
    localStorage.removeItem('ecet-theme');
    localStorage.removeItem('ecet-semesters');
    applyTheme('light');
    state.semesters = [{ id: 1, subjects: [{ name: '', credits: 3, grade: 'A' }] }];
    state.currentSemester = 1;
    saveState();
    renderCGPA();
    alert('Settings reset to defaults.');
  });

  function updateStorageInfo() {
    let total = 0;
    for (let key in localStorage) {
      if (key.startsWith('ecet-')) total += localStorage[key].length * 2;
    }
    const size = total < 1024 ? total + ' B' : (total / 1024).toFixed(1) + ' KB';
    $('#storageUsed').textContent = size;
  }
  updateStorageInfo();

  // ===== Keyboard Shortcuts =====
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      e.preventDefault();
      const searchInput = document.querySelector('.topbar .search-box input');
      if (searchInput) searchInput.focus();
    }
  });

  // ===== Initial Load =====
  renderCGPA();
  renderNotes();
  renderFormulas();
  renderPapers();
});

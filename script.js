const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('[data-go]')];
const loader = document.querySelector('.loader');
const loaderLabel = document.querySelector('#loaderLabel');
const sectionCode = document.querySelector('#sectionCode');
const sectionName = document.querySelector('#sectionName');
const menu = document.querySelector('.mobile-menu');
const menuBtn = document.querySelector('.menu-button');
const progress = document.querySelector('#pageProgress');

let current = 0;
let busy = false;
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const projects = {
  scrum: { no: '01', type: 'WEB / ACADÊMICO',image: '', title: 'Scrum Dungeon', description: 'Portal gamificado para certificação interna em metodologias ágeis. A experiência transforma conteúdos e avaliações em uma jornada com capítulos, níveis de dificuldade e estética de RPG/dungeon.', tags: ['HTML', 'CSS', 'JavaScript', 'EJS', 'Express', 'PostgreSQL', 'JWT'], note: 'Cadastro, avaliações, progresso, banco de dados e rotas protegidas dentro de uma experiência temática.' },
  console: { no: '02', type: 'TCC / HARDWARE',image: '', title: 'Console portátil', description: 'Proposta de videogame portátil de baixo custo construída em torno de Raspberry Pi e Arduino, com uma interface própria de inicialização e seleção de jogos 2D e 3D.', tags: ['Raspberry Pi 3', 'Arduino', 'Qt Creator', 'Linux', '2D / 3D'], note: 'Explora hardware, software, interface e integração em um único produto.' },
  cube: { no: '03', type: 'ARDUINO / INTERAÇÃO',image: '', title: 'NeoPixel Game Cube', description: 'Plataforma experimental de jogos com matriz NeoPixel 16×16, Bluetooth, botões e sensor de movimento. Snake e Pong são exemplos da ideia.', tags: ['Arduino Uno', 'NeoPixel', 'Bluetooth', 'SoftwareSerial', 'MPU6050'], note: 'A lógica foi pensada para reaproveitar memória e manter os jogos como módulos.' },
  safe: { no: '04', type: 'ARDUINO / ELETRÔNICA',image: '', title: 'Cofre eletrônico', description: 'Protótipo de controle de acesso usando teclado 4×4, LCD 16×2, servo e LED RGB, com senha inicial e fluxo para alteração.', tags: ['Arduino', 'Keypad 4×4', 'LCD 16×2', 'Servo', 'RGB'], note: 'Entrada, processamento, feedback e atuação física em um projeto compacto.' },
  ecoa: { no: '05', type: 'WEB / PROJETO',image: '', title: 'ECOA', description: 'Projeto web construído para apresentar informação de forma organizada e profissional, com atenção à estrutura e à experiência de navegação.', tags: ['HTML', 'CSS', 'JavaScript', 'UI'], note: 'Personalidade visual sem esconder o conteúdo atrás dos efeitos.' },
  atelier: { no: '06', type: 'SOFTWARE / EM DESENVOLVIMENTO',image: '', title: 'Sistema para ateliê', description: 'Conceito de aplicação para um pequeno ateliê de cerâmica, pensado para produtos, serviços e diferentes perfis de acesso em um ambiente empresarial compartilhado.', tags: ['aplicação', 'perfis', 'gestão', 'produto'], note: 'Arquitetura pensada para separar espaços pessoais de uma área corporativa com acesso controlado.' }
};

function closeMenu() {
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
}

function openMenu() {
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
}

menuBtn.addEventListener('click', () => menu.classList.contains('is-open') ? closeMenu() : openMenu());

function setMeta(i) {
  sectionCode.textContent = String(i + 1).padStart(2, '0');
  sectionName.textContent = pages[i].dataset.name;
  if (progress) progress.style.setProperty('--progress', `${((i + 1) / pages.length) * 100}%`);
}

function goTo(target) {
  const next = Number(target);
  if (!Number.isInteger(next) || next < 0 || next >= pages.length || next === current || busy) return;

  busy = true;
  closeMenu();

  const from = pages[current];
  const to = pages[next];

  loaderLabel.innerHTML = `<span>${String(next + 1).padStart(2, '0')}</span><br><b>${to.dataset.name}</b>`;

  from.classList.add('page--leaving');
  to.classList.add('page--prepare');

  requestAnimationFrame(() => {
    to.classList.add('page--active', 'page--assembling');
    loader.classList.add('is-running');
  });

  setTimeout(() => {
    from.classList.remove('page--active', 'page--leaving');
    to.classList.remove('page--prepare', 'page--assembling');
    current = next;
    setMeta(current);
  }, 750);

  setTimeout(() => {
    loader.classList.remove('is-running');
    busy = false;
  }, 1500);
}

links.forEach(el => el.addEventListener('click', () => goTo(el.dataset.go)));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    const modal = document.querySelector('#projectModal');
    if (modal.open) closeModalAnimated();
  }
});

// MODAL DE PROJETOS
const modal = document.querySelector('#projectModal');

document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => {
  const p = projects[card.dataset.project];
  if (!p) return;

  document.querySelector('#modalNo').textContent = p.no;
  document.querySelector('#modalType').textContent = p.type;
  document.querySelector('#modalTitle').textContent = p.title;
  document.querySelector('#modalDescription').textContent = p.description;
  document.querySelector('#modalTags').innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  document.querySelector('#modalNote').textContent = p.note;

  // Remove classe de fechamento (caso exista) para reabrir limpo
  modal.classList.remove('closing');

  if (modal.showModal) {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
}));

// Fechar modal com animação
function closeModal() {
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('closing');
    modal.close();
  }, 250); // tempo igual ao da animação modalOut
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.open) closeModal();
});

// COPIAR E-MAIL
const copyBtn = document.querySelector('[data-copy]');
const toast = document.querySelector('.toast');
copyBtn?.addEventListener('click', async () => {
  const value = copyBtn.dataset.copy;
  if (value === 'SEU_EMAIL_AQUI') { showToast('adicione seu e-mail no HTML'); return; }
  try {
    await navigator.clipboard.writeText(value);
    showToast('e-mail copiado');
  } catch {
    showToast('não foi possível copiar');
  }
});

function showToast(t) {
  toast.textContent = t;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

// CODE RAIN (fundo)
const canvas = document.querySelector('#matrix'), ctx = canvas.getContext('2d');
if (!prefersReduced) {
  let w, h, cols, drops;
  const chars = '01<>/{}[];:+=*#';
  function resize() {
    const d = Math.min(devicePixelRatio || 1, 1.4);
    w = innerWidth; h = innerHeight;
    canvas.width = w * d; canvas.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    cols = Math.ceil(w / 24);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }
  function draw() {
    ctx.fillStyle = 'rgba(7,8,8,.13)'; ctx.fillRect(0, 0, w, h);
    ctx.font = '10px DM Mono,monospace';
    for (let i = 0; i < cols; i++) {
      const y = drops[i] * 14;
      ctx.fillStyle = i % 13 === 0 ? 'rgba(156,85,255,.25)' : 'rgba(117,229,47,.18)';
      ctx.fillText(chars[(Math.random() * chars.length) | 0], i * 24, y);
      if (y > h && Math.random() > .97) drops[i] = 0;
      drops[i] += .26;
    }
    requestAnimationFrame(draw);
  }
  resize();
  addEventListener('resize', resize);
  draw();
}

window.addEventListener('load', () => {
  setMeta(0);
  setTimeout(() => {
    loaderLabel.innerHTML = '<span>00</span><br><b>READY</b>';
    loader.classList.add('is-running');
    setTimeout(() => loader.classList.remove('is-running'), 1500);
  }, 260);
});
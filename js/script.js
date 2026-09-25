/* =========================================================
   ELEMENTOS
   ========================================================= */

const pages = [...document.querySelectorAll(".page")];

const links = [...document.querySelectorAll("[data-go]")];

const loader = document.querySelector(".loader");

const loaderLabel = document.querySelector("#loaderLabel");

const sectionCode = document.querySelector("#sectionCode");

const sectionName = document.querySelector("#sectionName");

const menu = document.querySelector(".mobile-menu");

const menuBtn = document.querySelector(".menu-button");

const progress = document.querySelector("#pageProgress");

let current = 0;

let busy = false;

const prefersReduced =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   DADOS DOS PROJETOS
   ========================================================= */

const projects = {

  scrum: {

    no: "01",

    type: "WEB / ACADÊMICO",

    image: "",

    title: "Scrum Dungeon",

    description:
      "Portal gamificado para certificação interna em metodologias ágeis. A experiência transforma conteúdos e avaliações em uma jornada com capítulos, níveis de dificuldade e estética de RPG/dungeon.",

    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "EJS",
      "Express",
      "PostgreSQL",
      "JWT"
    ],

    note:
      "Cadastro, avaliações, progresso, banco de dados e rotas protegidas dentro de uma experiência temática."

  },


  console: {

    no: "02",

    type: "TCC / HARDWARE",

    image: "",

    title: "Console portátil",

    description:
      "Proposta de videogame portátil de baixo custo construída em torno de Raspberry Pi e Arduino, com uma interface própria de inicialização e seleção de jogos 2D e 3D.",

    tags: [
      "Raspberry Pi 3",
      "Arduino",
      "Qt Creator",
      "Linux",
      "2D / 3D"
    ],

    note:
      "Explora hardware, software, interface e integração em um único produto."

  },


  cube: {

    no: "03",

    type: "ARDUINO / INTERAÇÃO",

    image: "",

    title: "NeoPixel Game Cube",

    description:
      "Plataforma experimental de jogos com matriz NeoPixel 16×16, Bluetooth, botões e sensor de movimento. Snake e Pong são exemplos da ideia.",

    tags: [
      "Arduino Uno",
      "NeoPixel",
      "Bluetooth",
      "SoftwareSerial",
      "MPU6050"
    ],

    note:
      "A lógica foi pensada para reaproveitar memória e manter os jogos como módulos."

  },


  safe: {

    no: "04",

    type: "ARDUINO / ELETRÔNICA",

    image: "",

    title: "Cofre eletrônico",

    description:
      "Protótipo de controle de acesso usando teclado 4×4, LCD 16×2, servo e LED RGB, com senha inicial e fluxo para alteração.",

    tags: [
      "Arduino",
      "Keypad 4×4",
      "LCD 16×2",
      "Servo",
      "RGB"
    ],

    note:
      "Entrada, processamento, feedback e atuação física em um projeto compacto."

  },


  ecoa: {

    no: "05",

    type: "WEB / PROJETO",

    image: "",

    title: "ECOA",

    description:
      "Projeto web construído para apresentar informação de forma organizada e profissional, com atenção à estrutura e à experiência de navegação.",

    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "UI"
    ],

    note:
      "Personalidade visual sem esconder o conteúdo atrás dos efeitos."

  },


  atelier: {

    no: "06",

    type: "SOFTWARE / EM DESENVOLVIMENTO",

    image: "",

    title: "Sistema para ateliê",

    description:
      "Conceito de aplicação para um pequeno ateliê de cerâmica, pensado para produtos, serviços e diferentes perfis de acesso em um ambiente empresarial compartilhado.",

    tags: [
      "aplicação",
      "perfis",
      "gestão",
      "produto"
    ],

    note:
      "Arquitetura pensada para separar espaços pessoais de uma área corporativa com acesso controlado."

  }

};


/* =========================================================
   MENU
   ========================================================= */

function closeMenu() {

  menu.classList.remove("is-open");

  menu.setAttribute(
    "aria-hidden",
    "true"
  );

  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );

}


function openMenu() {

  menu.classList.add("is-open");

  menu.setAttribute(
    "aria-hidden",
    "false"
  );

  menuBtn.setAttribute(
    "aria-expanded",
    "true"
  );

}


menuBtn.addEventListener(
  "click",
  () => {

    if (menu.classList.contains("is-open")) {

      closeMenu();

    } else {

      openMenu();

    }

  }
);


/* =========================================================
   META DO HEADER
   ========================================================= */

function setMeta(index) {

  const number =
    String(index + 1).padStart(2, "0");

  sectionCode.textContent =
    number;

  sectionName.textContent =
    pages[index].dataset.name;


  if (progress) {

    progress.style.setProperty(
      "--progress",
      `${((index + 1) / pages.length) * 100}%`
    );

  }

}


/* =========================================================
   NAVEGAÇÃO ENTRE PÁGINAS
   ========================================================= */

function goTo(target) {

  const next =
    Number(target);


  if (
    !Number.isInteger(next) ||
    next < 0 ||
    next >= pages.length ||
    next === current ||
    busy
  ) {

    return;

  }


  busy = true;

  closeMenu();


  const from =
    pages[current];

  const to =
    pages[next];


  /* ---------------------------------------------
     LABEL DO LOADER
     --------------------------------------------- */

  loaderLabel.innerHTML = `
        <span>
            ${String(next + 1).padStart(2, "0")}
        </span>

        <b>
            ${to.dataset.name}
        </b>
    `;


  /* ---------------------------------------------
     PREPARA SAÍDA
     --------------------------------------------- */

  from.classList.add(
    "page--leaving"
  );

  to.classList.add(
    "page--prepare"
  );


  /* ---------------------------------------------
     COMEÇA A MONTAR A NOVA PÁGINA
     --------------------------------------------- */

  requestAnimationFrame(() => {

    to.classList.add(
      "page--active",
      "page--assembling"
    );

    loader.classList.add(
      "is-running"
    );

  });


  /* ---------------------------------------------
     FINAL DA TRANSIÇÃO DA PÁGINA
     --------------------------------------------- */

  setTimeout(() => {

    from.classList.remove(
      "page--active",
      "page--leaving"
    );

    to.classList.remove(
      "page--prepare",
      "page--assembling"
    );

    current = next;

    setMeta(current);

  }, prefersReduced ? 50 : 750);


  /* ---------------------------------------------
     FINAL DO LOADER
     --------------------------------------------- */

  setTimeout(() => {

    loader.classList.remove(
      "is-running"
    );

    busy = false;

  }, prefersReduced ? 100 : 1500);

}


/* =========================================================
   BOTÕES DE NAVEGAÇÃO
   ========================================================= */

links.forEach((element) => {

  element.addEventListener(
    "click",
    () => {

      goTo(
        element.dataset.go
      );

    }
  );

});



/* =========================================================
   TECLADO
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeMenu();

      if (modal.open) {

        closeModalAnimated();

      }

    }

  }
);


/* =========================================================
   MODAL
   ========================================================= */

const modal =
  document.querySelector("#projectModal");


const modalNo =
  document.querySelector("#modalNo");


const modalType =
  document.querySelector("#modalType");


const modalTitle =
  document.querySelector("#modalTitle");


const modalDescription =
  document.querySelector("#modalDescription");


const modalTags =
  document.querySelector("#modalTags");


const modalNote =
  document.querySelector("#modalNote");


const modalImage =
  document.querySelector("#modalImage");


/* =========================================================
   ABRIR PROJETO
   ========================================================= */

document
  .querySelectorAll(".project-card")
  .forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const project =
          projects[
          card.dataset.project
          ];


        if (!project) {

          return;

        }


        modalNo.textContent =
          project.no;


        modalType.textContent =
          project.type;


        modalTitle.textContent =
          project.title;


        modalDescription.textContent =
          project.description;


        modalTags.innerHTML =
          project.tags
            .map(
              (tag) =>
                `<span>${tag}</span>`
            )
            .join("");


        modalNote.textContent =
          project.note;


        modal.classList.remove(
          "closing"
        );


        /*
         * Se futuramente houver imagem:
         */

        if (project.image) {

          modalImage.src =
            project.image;

          modalImage.style.display =
            "block";

        } else {

          modalImage.removeAttribute(
            "src"
          );

          modalImage.style.display =
            "none";

        }


        if (
          typeof modal.showModal ===
          "function"
        ) {

          modal.showModal();

        } else {

          modal.setAttribute(
            "open",
            ""
          );

        }

      }
    );

  });


/* =========================================================
   FECHAR MODAL
   ========================================================= */

function closeModalAnimated() {

  if (!modal.open) {

    return;

  }


  modal.classList.add(
    "closing"
  );


  setTimeout(() => {

    modal.classList.remove(
      "closing"
    );


    if (
      typeof modal.close ===
      "function"
    ) {

      modal.close();

    } else {

      modal.removeAttribute(
        "open"
      );

    }

  }, 250);

}


document
  .querySelector(".modal-close")
  .addEventListener(
    "click",
    closeModalAnimated
  );


modal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {

      closeModalAnimated();

    }

  }
);


/* =========================================================
   COPIAR E-MAIL
   ========================================================= */

const copyBtn =
  document.querySelector(
    "[data-copy]"
  );


const toast =
  document.querySelector(
    ".toast"
  );


copyBtn?.addEventListener(
  "click",
  async () => {

    const value =
      copyBtn.dataset.copy;


    if (
      value ===
      "SEU_EMAIL_AQUI"
    ) {

      showToast(
        "adicione seu e-mail no HTML"
      );

      return;

    }


    try {

      await navigator.clipboard.writeText(
        value
      );

      showToast(
        "e-mail copiado"
      );

    } catch {

      showToast(
        "não foi possível copiar"
      );

    }

  }
);


/* =========================================================
   TOAST
   ========================================================= */

function showToast(text) {

  toast.textContent =
    text;

  toast.classList.add(
    "is-visible"
  );


  setTimeout(() => {

    toast.classList.remove(
      "is-visible"
    );

  }, 1800);

}


/* =========================================================
   MATRIX / CODE RAIN
   ========================================================= */

const canvas =
  document.querySelector(
    "#matrix"
  );


const ctx =
  canvas.getContext(
    "2d"
  );


if (!prefersReduced) {

  let width;
  let height;
  let columns;
  let drops;


  const chars =
    "01<>/{}[];:+=*#";


  function resizeMatrix() {

    const d =
      Math.min(
        window.devicePixelRatio || 1,
        1.4
      );


    width =
      window.innerWidth;


    height =
      window.innerHeight;


    canvas.width =
      width * d;


    canvas.height =
      height * d;


    ctx.setTransform(
      d,
      0,
      0,
      d,
      0,
      0
    );


    columns =
      Math.ceil(
        width / 24
      );


    drops =
      Array.from(
        {
          length: columns
        },
        () =>
          Math.random() * -50
      );

  }


  function drawMatrix() {

    ctx.fillStyle =
      "rgba(7,8,8,.13)";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );


    ctx.font =
      "10px DM Mono, monospace";


    for (
      let i = 0;
      i < columns;
      i++
    ) {

      const y =
        drops[i] * 14;


      ctx.fillStyle =
        i % 13 === 0
          ? "rgba(156,85,255,.25)"
          : "rgba(117,229,47,.18)";


      ctx.fillText(
        chars[
        (Math.random() * chars.length) | 0
        ],
        i * 24,
        y
      );


      if (
        y > height &&
        Math.random() > .97
      ) {

        drops[i] = 0;

      }


      drops[i] += .26;

    }


    requestAnimationFrame(
      drawMatrix
    );

  }


  resizeMatrix();

  window.addEventListener(
    "resize",
    resizeMatrix
  );

  drawMatrix();

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    setMeta(0);


    setTimeout(() => {

      loaderLabel.innerHTML = `
                <span>00</span>
                <b>READY</b>
            `;


      loader.classList.add(
        "is-running"
      );


      setTimeout(() => {

        loader.classList.remove(
          "is-running"
        );

      }, 1500);

    }, 260);

  }
);

/* =========================================================
   PAGINAÇÃO / DESLIZE DOS PROJETOS
   ========================================================= */

(function () {
    'use strict';

    const grid = document.querySelector('.project-grid');
    if (!grid) return; // Segurança caso o elemento não exista

    const allCards = Array.from(grid.querySelectorAll('.project-card'));
    const btnPrev = document.querySelector('[data-project-prev]');
    const btnNext = document.querySelector('[data-project-next]');
    const indicatorCurrent = document.querySelector('[data-project-current]');
    const indicatorTotal = document.querySelector('[data-project-total]');

    let currentPage = 1;
    let cardsPerPage = 5;

    function updateCardsPerPage() {
        const width = window.innerWidth;
        if (width <= 650) {
            cardsPerPage = 4; // Mobile: 2x2
        } else if (width <= 1000) {
            cardsPerPage = 5; // Tablet
        } else {
            cardsPerPage = 6; // Desktop: 1 grande + 4 pequenos
        }
    }

    function getTotalPages() {
        return Math.max(1, Math.ceil(allCards.length / cardsPerPage));
    }

    function renderPage(page, animate = false) {
        const totalPages = getTotalPages();
        
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        allCards.forEach((card, index) => {
            const isVisible = index >= start && index < end;

            if (!isVisible) {
                card.hidden = true;
                card.classList.remove('project-page-in', 'featured');
            } else {
                card.hidden = false;
                card.classList.remove('featured');
                
                // Adiciona 'featured' APENAS no primeiro card da primeira página
                if (page === 1 && index === 0) {
                    card.classList.add('featured');
                }
                
                if (animate) {
                    card.classList.remove('project-page-in');
                    void card.offsetWidth; // Força reflow para reiniciar animação
                    card.classList.add('project-page-in');
                }
            }
        });

        if (indicatorCurrent) indicatorCurrent.textContent = String(currentPage).padStart(2, '0');
        if (indicatorTotal) indicatorTotal.textContent = String(totalPages).padStart(2, '0');

        if (btnPrev) btnPrev.disabled = currentPage <= 1;
        if (btnNext) btnNext.disabled = currentPage >= totalPages;
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) renderPage(currentPage - 1, true);
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (currentPage < getTotalPages()) renderPage(currentPage + 1, true);
        });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const oldPerPage = cardsPerPage;
            updateCardsPerPage();
            // Se a quantidade de cards por página mudou, reseta para a página 1
            if (cardsPerPage !== oldPerPage) {
                renderPage(1, false);
            } else {
                renderPage(currentPage, false);
            }
        }, 200);
    });

    // Inicialização
    updateCardsPerPage();
    renderPage(1, false);

})();

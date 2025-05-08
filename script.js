// Mostrar el scroll-to-top cuando se hace scroll
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.scroll-to-top');
  if (window.scrollY > 300) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// Formulario de contacto con validación visual y validación RUT
const form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input, select');
  let valido = true;
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.style.borderColor = 'red';
      valido = false;
    } else {
      input.style.borderColor = '#ccc';
    }
  });

  const rutInput = document.querySelector("input[placeholder='RUT']");
    const rutValue = rutInput.value.trim();
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(rutValue)) {
      alert("Por favor, ingresa un RUT válido. Ejemplo: 12345678-9");
      rutInput.focus();
      return;
    }

    if (valido) {
    document.getElementById('mensaje-cotizacion').classList.remove('hidden');
    document.getElementById('mensaje-cotizacion').textContent = '¡Gracias por enviar tu información! Te contactaremos pronto.';
    form.reset();
    setTimeout(() => {
      window.location.href = 'gracias.html';
    }, 2000);
  }
});

// Renderizar dinámicamente los servicios y popups
const servicios = [
  { id: "prescripcion", img: "images/prescripcion.png", texto: "Prescripción de Multas", detalle: "Elimina multas vencidas con gestión legal completa." },
  { id: "pago", img: "images/pago.png", texto: "Pago de Multas", detalle: "Te ayudamos a pagar tus multas sin trámites complicados." },
  { id: "descuentos", img: "images/descuento.png", texto: "Descuentos de Multas", detalle: "Accede a beneficios y rebajas en el pago de tus infracciones." },
  { id: "clonacion", img: "images/clonacion.png", texto: "Multas por Clonación", detalle: "Te defendemos ante multas injustas por patentes clonadas." },
  { id: "permiso", img: "images/permiso.png", texto: "Prescripción Permiso de Circulación", detalle: "Regulariza tu situación municipal evitando intereses y bloqueos." }
];

const contenedor = document.querySelector(".servicios-container");
if (contenedor) {
  servicios.forEach(serv => {
    const div = document.createElement("div");
    div.className = "servicio";
    div.innerHTML = `
      <img src="${serv.img}" alt="${serv.texto}">
      <p>${serv.texto}</p>
      <button class="info-btn" data-id="${serv.id}">Más Info +</button>
    `;
    contenedor.appendChild(div);

    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = `popup-${serv.id}`;
    popup.innerHTML = `
      <div class="popup-content">
        <span class="close-btn">&times;</span>
        <h3>${serv.texto}</h3>
        <p>${serv.detalle}</p>
      </div>
    `;
    document.body.appendChild(popup);
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("info-btn")) {
      const id = e.target.getAttribute("data-id");
      document.getElementById(`popup-${id}`).style.display = "flex";
    }
    if (e.target.classList.contains("close-btn") || e.target.classList.contains("popup")) {
      const popup = e.target.closest(".popup");
      if (popup) popup.style.display = "none";
    }
  });
}
const popupTriggers = document.querySelectorAll('.info-btn');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.close-btn');

popupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const target = trigger.getAttribute('data-info');
    document.getElementById(`popup-${target}`).classList.add('active');
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    e.target.classList.remove('active');
  }
});

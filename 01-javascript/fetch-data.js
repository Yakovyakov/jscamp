const container = document.querySelector('.jobs-listings')
const pagination = document.querySelector('.pagination')

const RESULTS_PER_PAGE = 3
let currentPage = 1

let jobsData = []


function generarPaginacion() {
  console.log('cantidad de elementos', jobsData)
  const totalPaginas = Math.ceil(jobsData.length / RESULTS_PER_PAGE);
  pagination.innerHTML = '';

  // Botón "Anterior"

  const prev = document.createElement('a');
  prev.href = '#';
  prev.innerHTML = `
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M15 6l-6 6l6 6" />
        </svg>
  `
  // agregar enlaces
  pagination.appendChild(prev);


  // Enlaces numéricos
  for (let i = 1; i <= totalPaginas; i++) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = i;
    if (i === currentPage) {
      link.classList.add('is-active'); // página actual resaltada
    }
    pagination.appendChild(link);
  }

  // Botón "Siguiente"

    const next = document.createElement('a');
    next.href = '#';
    next.innerHTML = `
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 6l6 6l-6 6" />
      </svg>
    `

    pagination.appendChild(next);

}

function mostrarPagina(numPage) {
  const inicio = (numPage - 1) * RESULTS_PER_PAGE
  const fin = inicio + RESULTS_PER_PAGE
  const pageData = jobsData.slice(inicio, fin)
  container.innerHTML =''

  pageData.forEach(job => {
      const article = document.createElement('article')
      article.className = 'job-listing-card'
      
      article.dataset.modalidad = job.data.modalidad
      article.dataset.nivel = job.data.nivel
      article.dataset.technology = job.data.technology

      article.innerHTML = `<div>
          <h3>${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`

      container.appendChild(article)
    })

    currentPage = numPage

    generarPaginacion()
}

fetch("./data.json") /* fetch es asíncrono */
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    jobsData = jobs
    mostrarPagina(1)
  });
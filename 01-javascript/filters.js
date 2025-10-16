//const filter = document.querySelector('#filter-location')
//const mensaje = document.querySelector('#filter-selected-value')
const filterTech = document.getElementById('filter-technology')
const filterLocation = document.getElementById('filter-location')
const filterExp = document.getElementById('filter-experience-level')


const inputSearch = document.getElementById('inputSearch')
const formSearch = document.querySelector('form')


function filterJobs() {
  const techValue = filterTech.value
  const locationValue = filterLocation.value
  const expLevelValue = filterExp.value
  const inputValue = inputSearch.value

   
  const jobs = document.querySelectorAll('.job-listing-card')

  jobs.forEach(job => {
    // const modalidad = job.dataset.modalidad
    console.log('job-listing-card', job)
    
    const dataModalidad = job.getAttribute('data-modalidad')
    const dataTech = job.getAttribute('data-technology')
    const dataExp = job.getAttribute('data-nivel')
    const titulo = job.querySelector('h3')?.textContent.toLowerCase() || ''
    
    let show = true

    console.log(expLevelValue, dataExp)
    show = show && (locationValue === '' || locationValue === dataModalidad)

    show = show && (expLevelValue === '' || expLevelValue === dataExp)

    show = show && (techValue === '' || dataTech.split(',').map(t => t.trim().toLowerCase()).includes(techValue))

    show = show && (inputValue.trim() === '' || titulo.includes(inputValue))
    
    job.style.display = show ? 'flex' : 'none'
  })

  // Ajustar css
  const visibleArticles = Array.from(jobs).filter(article => 
      article.style.display !== 'none'
  )

  console.log('Visible Articles', visibleArticles)
  // Quita la clase de todos
  jobs.forEach(article => article.classList.remove('no-border'))

  // Si hay al menos un artículo visible, quítale el borde al último
  if (visibleArticles.length > 0) {
      visibleArticles[visibleArticles.length - 1].classList.add('no-border')
  }
}


// Aplicar filtro al cambiar cualquier select
filterTech.addEventListener('change', filterJobs)
filterLocation.addEventListener('change', filterJobs)
filterExp.addEventListener('change', filterJobs)

// Debounce function
function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  };
}

formSearch.addEventListener('submit', (e) => e.preventDefault())

inputSearch.addEventListener('input', debounce(filterJobs, 300))
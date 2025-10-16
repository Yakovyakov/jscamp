// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.button-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// }

// const botones = document.querySelectorAll('.button-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentre
// // o una lista vacia [] si no encuentra ninguno

// botones.forEach(boton => {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function(event) {
  const element = event.target

  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const filterTech = document.querySelector('#filter-technology')
const filterLoc = document.querySelector('.filter-technology')
const filterExp = document.querySelector('.filter-technology')

filterTech.addEventListener('change', function () {
  console.log(filterTech.value)
})




document.addEventListener('DOMContentLoaded', () => {
  const filterTech = document.getElementById('filter-technology')
  const filterLocation = document.getElementById('location')
  const filterExp = document.getElementById('experience-level')
  const jobListings = document.querySelectorAll('.jobs-listings article')

  // Palabras clave asociadas a niveles de experiencia
  const expKeywords = {
    junior: ['junior', 'entry', 'principiante', 'recién', 'graduado'],
    mid: ['mid', 'intermedio', 'semi-senior'],
    senior: ['senior', 'experto', 'avanzado'],
    lead: ['lead', 'líder', 'jefe', 'head']
  }

  function normalize(text) {
    return text.toLowerCase().trim()
  }

  function matchesText(element, term) {
    if (!term) return true
    const text = normalize(element.textContent)
    return text.includes(normalize(term))
  }

  function matchesExperience(article, level) {
    if (!level) return true
    const text = normalize(article.textContent)
    const keywords = expKeywords[level] || []
    return keywords.some(word => text.includes(word))
  }

  function filterJobs() {
    const tech = filterTech.value
    const location = filterLocation.value
    const expLevel = filterExp.value

    jobListings.forEach(article => {
      const title = article.querySelector('h3')
      const meta = article.querySelector('small')
      const description = article.querySelector('p')

      let show = true

      if (tech) {
        const term = tech
        const inTitle = title ? matchesText(title, term) : false
        const inMeta = meta ? matchesText(meta, term) : false
        const inDesc = description ? matchesText(description, term) : false
        show = show && (inTitle || inMeta || inDesc)
      }
      
      console.log('location', location)
      if (location) {
        const locationText = location === 'remoto' ? 'remoto' : 
                             location === 'cdmx' ? 'ciudad de méxico' :
                             location === 'guadalajara' ? 'guadalajara' :
                             location === 'monterrey' ? 'monterrey' :
                             location === 'barcelona' ? 'barcelona' : ''
        const inMeta = meta ? normalize(meta.textContent).includes(locationText) : false
        show = show && inMeta
      }

      
      if (expLevel) {
        show = show && matchesExperience(article, expLevel)
      }

      article.style.display = show ? '' : 'none'
    })

    // Ajustar css
    const visibleArticles = Array.from(jobListings).filter(article => 
      article.style.display !== 'none'
    )

    console.log('Visible Articles', visibleArticles)
    // Quita la clase de todos
    jobListings.forEach(article => article.classList.remove('no-border'))

    // Si hay al menos un artículo visible, quítale el borde al último
    if (visibleArticles.length > 0) {
      visibleArticles[visibleArticles.length - 1].classList.add('no-border')
    }
  }

  // Aplicar filtro al cambiar cualquier select
  filterTech.addEventListener('change', filterJobs)
  filterLocation.addEventListener('change', filterJobs)
  filterExp.addEventListener('change', filterJobs)

  // filtrar al cargar por si hay preseleccion
  filterJobs()
})

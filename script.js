const button = document.getElementById('btn');      
const input = document.getElementById('buscar');    
const details = document.getElementById('detalhes');

button.addEventListener('click', () => {
  buscaPkm();
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    buscaPkm();
  }
});


function buscaPkm() {
  const nome = input.value.trim().toLowerCase();

  if (nome == false || nome == " " || nome == 0) {
    details.innerHTML = '<p>Pokémon não encontrado.</p>';
    details.style.display = 'block';
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon não encontrado.');
      }
      return response.json();
    })
    .then(pokemon => {
      details.innerHTML = `
      <div>
        <h2>${capitalizePrimeiraLetra(pokemon.name)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" /></div> <div>
        <p><strong>Tipo(s):</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Altura: </strong> ${(pokemon.height / 10).toFixed(1)} M</p>
        <p><strong>Peso: </strong> ${(pokemon.weight / 10).toFixed(1)} Kg</p></div>
      `;
      details.style.display = 'block';
    })
    .catch(error => {
      details.innerHTML = `<p>${error.message}</p>`;
    });

}


function capitalizePrimeiraLetra(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}"// For�ando o GitHub a identificar JS" 

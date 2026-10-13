const posterPlaceholder = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"><rect width="300" height="450" fill="#303030"/><text x="150" y="220" fill="#eeeeee" font-family="Arial" font-size="24" text-anchor="middle">Pôster</text><text x="150" y="255" fill="#bbbbbb" font-family="Arial" font-size="16" text-anchor="middle">não informado</text></svg>'
);

let filmes = [
  {
    titulo: "Homem-Aranha 2",
    ano: 2004,
    genero: "Ação",
    nota: 7.4,
    poster: "assets/Spider-Man_2_USA_poster.jpg"
  },
  {
    titulo: "Carros",
    ano: 2006,
    genero: "Animação",
    nota: 7.2,
    poster: "assets/MPW-45583.webp"
  },
  {
    titulo: "Spider-Man: Brand New Day",
    ano: 2026,
    genero: "Aventura",
    nota: 8.0,
    poster: "assets/Spider-Man_Brand_New_Day_poster.jpg"
  },
  {
    titulo: "Até o Último Homem",
    ano: 2016,
    genero: "Drama",
    nota: 8.1,
    poster: "assets/ate o utlimo homen.jpg"
  },
  {
    titulo: "Forest Gump: O Contador de histórias",
    ano: 1994,
    genero: "Drama",
    nota: 8.8,
    poster: "assets/71zvuvzh4IL.webp"
  },
  {
    titulo: "Toy Story",
    ano: 1995,
    genero: "Animação",
    nota: 8.3,
    poster: posterPlaceholder
  },
  {
    titulo: "Homem-Aranha no Aranhaverso",
    ano: 2018,
    genero: "Ficção científica",
    nota: 8.4,
    poster: posterPlaceholder
  },
  {
    titulo: "Vingadores: Ultimato",
    ano: 2019,
    genero: "Ação",
    nota: 8.4,
    poster: posterPlaceholder
  }
];

const favoritos = [];
const campoBusca = document.getElementById("busca");
const filtroGenero = document.getElementById("filtro-genero");
const areaCatalogo = document.getElementById("catalogo-filmes");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorFavoritos = document.getElementById("contador-favoritos");
const listaFavoritos = document.getElementById("lista-favoritos");

function mostrarFilmes(lista) {
  areaCatalogo.innerHTML = "";
  contador.textContent = lista.length;
  mensagemVazia.hidden = lista.length !== 0;

  for (const filme of lista) {
    const selo = filme.nota >= 8
      ? '<p class="selo">⭐ Recomendado</p>'
      : "";
    const indice = filmes.indexOf(filme);

    areaCatalogo.innerHTML +=
      '<article class="filme-card">' +
        '<img class="poster" src="' + filme.poster + '" alt="Pôster de ' + filme.titulo + '">' +
        '<h3>' + filme.titulo + '</h3>' +
        '<p>' + filme.ano + ' · ' + filme.genero + '</p>' +
        '<p>Nota: ' + filme.nota + '/10</p>' +
        selo +
        '<button type="button" onclick="favoritar(' + indice + ')">♥ Favoritar</button>' +
      '</article>';
  }
}

function atualizarCatalogo() {
  const termo = campoBusca.value.toLowerCase().trim();
  const generoEscolhido = filtroGenero.value;
  const resultado = [];

  for (const filme of filmes) {
    const tituloCorresponde = filme.titulo.toLowerCase().includes(termo);
    let generoCorresponde;

    if (generoEscolhido === "Todos") {
      generoCorresponde = true;
    } else {
      generoCorresponde = filme.genero === generoEscolhido;
    }

    if (tituloCorresponde && generoCorresponde) {
      resultado.push(filme);
    }
  }

  mostrarFilmes(resultado);
}

function favoritar(indice) {
  const titulo = filmes[indice].titulo;

  if (!favoritos.includes(titulo)) {
    favoritos.push(titulo);
  }

  atualizarFavoritos();
}

function atualizarFavoritos() {
  contadorFavoritos.textContent = favoritos.length;
  listaFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = "<li>Ainda não há favoritos.</li>";
    return;
  }

  for (const titulo of favoritos) {
    const item = document.createElement("li");
    item.textContent = titulo;
    listaFavoritos.appendChild(item);
  }
}

campoBusca.addEventListener("input", atualizarCatalogo);
filtroGenero.addEventListener("change", atualizarCatalogo);

document.getElementById("btn-inverter").addEventListener("click", function () {
  filmes.reverse();
  atualizarCatalogo();
});

document.getElementById("btn-limpar-favoritos").addEventListener("click", function () {
  favoritos.length = 0;
  atualizarFavoritos();
});

const tituloDestaque = document.getElementById("titulo-destaque");

tituloDestaque.addEventListener("mouseenter", function () {
  tituloDestaque.style.color = "turquoise";
});

tituloDestaque.addEventListener("mouseout", function () {
  tituloDestaque.style.color = "";
});

window.favoritar = favoritar;

mostrarFilmes(filmes);
atualizarFavoritos();

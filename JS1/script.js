// Catálogo interativo do Cine Mais.
// Os dados ficam no array; o HTML é atualizado pelo DOM.
// Este código não usa alert(), prompt() nem document.write().

// Alguns itens da tabela não têm pôster indicado no CSS2.
// Deixe poster vazio até adicionar um arquivo correspondente na pasta assets.
let filmes = [
  {
    titulo: "Spider-Man 2",
    ano: 2004,
    genero: "Ação, Aventura, Ficção Científica",
    nota: 7.4,
    poster: "assets/Spider-Man_2_USA_poster.jpg"
  },
  {
    titulo: "Spider-Man: Brand New Day",
    ano: 2026,
    genero: "Ação, Aventura, Ficção Científica",
    nota: 8.0,
    poster: "assets/Spider-Man_Brand_New_Day_poster.jpg"
  },
  {
    titulo: "Até o Último Homem",
    ano: 2016,
    genero: "Biografia, Drama, História",
    nota: 8.1,
    poster: "assets/ate o utlimo homen.jpg"
  },
  {
    titulo: "Forest Gump: O Contador de historias",
    ano: 1994,
    genero: "Drama, Romance, Comédia",
    nota: 8.8,
    poster: "assets/71zvuvzh4IL.webp"
  },
  {
    titulo: "Carros",
    ano: 2006,
    genero: "Animação, Aventura, Comédia",
    nota: 7.2,
    poster: "assets/MPW-45583.webp"
  },
  {
    titulo: "Toy Story",
    ano: 1995,
    genero: "Animação",
    nota: 8.3,
    poster: "assets/95325b49e6e47899e6f9f5f012bf2623.webp"
  },
  {
    titulo: "Homem-Aranha no Aranhaverso",
    ano: 2018,
    genero: "Animação",
    nota: 8.4,
    poster: "assets/poster-homem-aranha-no-aranhaverso-a-f052f158.webp"
  },
  {
    titulo: "Vingadores: Ultimato",
    ano: 2019,
    genero: "Ação, Aventura",
    nota: 8.4,
    poster: "assets/MoviePoster-c80cc47e-1e14-4419-bf3a-81f9f4959edb.webp"
  },
  {
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    ano: 2001,
    genero: "Aventura, Fantasia",
    nota: 8.8,
    poster: "assets/a8be15c0696b8658395be5d92dd0753c.webp"
  },
  {
    titulo: "O Exterminador do Futuro 2: O Julgamento Final",
    ano: 1991,
    genero: "Ação, Ficção Científica",
    nota: 8.6,
    poster: "assets/20190906-poster-209x300.webp"
  }
];

// O array guarda os títulos favoritados.
let favoritos = [];

// Cria os cards com os dados recebidos e atualiza a contagem.
function mostrarFilmes(lista) {
  const areaCatalogo = document.getElementById("catalogo");
  const contador = document.getElementById("contador");
  const mensagemVazia = document.getElementById("mensagem-vazia");

  areaCatalogo.innerHTML = "";
  contador.textContent = lista.length;
  mensagemVazia.hidden = lista.length !== 0;

  for (const filme of lista) {
    // O selo aparece quando a nota é 8 ou mais.
    const selo = filme.nota >= 8
      ? '<p class="selo-recomendado">* Recomendado</p>'
      : "";

    // Usa o índice do array principal para o botão de favoritos.
    const indice = filmes.indexOf(filme);

    // Se ainda não houver imagem, mantém a altura do pôster com um aviso simples.
    const poster = filme.poster
      ? '<img src="' + filme.poster + '" alt="Pôster do filme: ' + filme.titulo + '" style="width: 100%; height: 400px; object-fit: cover;">'
      : '<div class="poster-ausente">Pôster não cadastrado</div>';

    areaCatalogo.innerHTML +=
      '<div style="margin: 20px; padding: 30px; background-color: rgb(16, 16, 16); width: 267px; overflow: hidden; border-radius: 20px;">' +
        poster +
        '<h3 class="titulo-filme">' + filme.titulo + '</h3>' +
        '<p>' + filme.ano + ' · ' + filme.genero + '</p>' +
        '<p>Nota: ' + filme.nota + '/10</p>' +
        selo +
        '<button class="botao-favorito" type="button" onclick="favoritar(' + indice + ')"><3 Favoritar</button>' +
      '</div>';
  }
}

// Aplica busca e gênero juntos e monta uma nova lista com push().
function filtrarFilmes() {
  const textoBusca = document.getElementById("busca").value.toLowerCase();
  const generoEscolhido = document.getElementById("filtro-genero").value;
  const resultado = [];

  for (const filme of filmes) {
    const tituloCorresponde = filme.titulo.toLowerCase().includes(textoBusca);
    let generoCorresponde;

    // "Todos" não limita os gêneros; as outras opções procuram dentro da lista do filme.
    if (generoEscolhido === "Todos") {
      generoCorresponde = true;
    } else {
      generoCorresponde = filme.genero.toLowerCase().includes(generoEscolhido.toLowerCase());
    }

    if (tituloCorresponde && generoCorresponde) {
      resultado.push(filme);
    }
  }

  mostrarFilmes(resultado);
}

// Adiciona um título apenas uma vez e atualiza a lista visível.
function favoritar(indice) {
  const titulo = filmes[indice].titulo;

  if (!favoritos.includes(titulo)) {
    favoritos.push(titulo);
  }

  atualizarFavoritos();
}

// Atualiza a quantidade e os títulos favoritados na página.
function atualizarFavoritos() {
  const contador = document.getElementById("contador-favoritos");
  const lista = document.getElementById("lista-favoritos");

  contador.textContent = favoritos.length;
  lista.innerHTML = "";

  if (favoritos.length === 0) {
    lista.innerHTML = "<li>Nenhum favorito ainda.</li>";
    return;
  }

  for (const titulo of favoritos) {
    const item = document.createElement("li");
    item.textContent = titulo;
    lista.appendChild(item);
  }
}

// Cada letra digitada atualiza a busca; a troca do select atualiza o gênero.
document.getElementById("busca").addEventListener("input", filtrarFilmes);
document.getElementById("filtro-genero").addEventListener("change", filtrarFilmes);

// Inverte o array e redesenha o catálogo.
document.getElementById("btn-inverter").addEventListener("click", function () {
  filmes.reverse();
  filtrarFilmes();
});

// Esvazia os favoritos e atualiza a página.
document.getElementById("btn-limpar-favoritos").addEventListener("click", function () {
  favoritos.length = 0;
  atualizarFavoritos();
});

// Realça o título do destaque ao passar o mouse e restaura a cor ao sair.
const tituloDestaque = document.getElementById("titulo-destaque");

tituloDestaque.addEventListener("mouseenter", function () {
  tituloDestaque.style.color = "turquoise";
});

tituloDestaque.addEventListener("mouseout", function () {
  tituloDestaque.style.color = "white";
});

// O onclick dos botões de favoritos chama esta função.
window.favoritar = favoritar;

// Mostra o catálogo completo ao abrir a página.
mostrarFilmes(filmes);
atualizarFavoritos();


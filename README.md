# Academia Shalom Fitness — site

Landing page da **Academia Shalom Fitness**, em Nova Olinda, Aparecida de Goiânia (GO).

Site estático, sem build: HTML, CSS e JavaScript puros. Basta abrir o `index.html` ou publicar a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Estrutura

```
.
├── index.html              # a página
├── assets/
│   ├── css/style.css       # estilos (mobile-first, breakpoint em 900px)
│   ├── js/main.js          # status "aberta agora", menu, barra fixa, contador e carrossel
│   └── img/
│       ├── mascote.svg     # mascote provisório (redesenhado da fachada) — trocar pelo logo oficial
│       ├── mapa-nova-olinda.svg  # mapa das ruas (dados © OpenStreetMap)
│       ├── fotos/          # fotos usadas no topo e na seção de estrutura
│       └── posts/          # posts do Instagram usados na seção "Direto do Instagram"
└── README.md
```

## Seções

1. Topo com a fachada, título e botões (WhatsApp e planos), com status "aberta agora" calculado pelo horário de Brasília
2. Faixa vermelha animada com modalidades e horários
3. Números (horas por dia, dias por semana, seguidores)
4. Estrutura (carrossel no celular, mosaico no desktop) e a obra nova
5. Direto do Instagram (duas fileiras de posts em movimento)
6. Planos (carrossel no celular, com a oferta em destaque)
7. Como chegar (mapa, rota no Google Maps e Waze)
8. "Bora treinar?" e rodapé

## O que editar

- **Telefone / WhatsApp:** os links usam `https://wa.me/556235837689?text=...`. Para trocar o número, substitua `556235837689` no `index.html`.
- **Preços:** procure por `R$ 59,99`, `R$ 89,99` e `Consulte` no `index.html`.
- **Horário de funcionamento:** objeto `HORARIO` no topo do `assets/js/main.js` e os textos no `index.html`.
- **Fotos e posts:** troque os arquivos em `assets/img/` mantendo os nomes, ou atualize os caminhos no `index.html`.

## Pendências antes de publicar

- Trocar o mascote provisório pelo logo oficial.
- Substituir as fotos e posts (hoje recortados de capturas de tela, em baixa resolução) pelos originais.
- Confirmar os preços e o que cada plano inclui (o mensal está como "Consulte"; aplicativo e camiseta do anual são suposições).

## Créditos

Fotos: @shalom_fitness · Mapa: dados © colaboradores do OpenStreetMap (ODbL).

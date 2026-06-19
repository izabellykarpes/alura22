# Mercado Financeiro — Demo p5.js (PT/EN)

Esta é uma página demo bilíngue (Português e Inglês) que usa p5.js para desenhar um gráfico de preços e uma interface mínima. Foi projetada para ser leve, responsiva e fácil de integrar em um repositório novo.

Arquivos adicionados/atualizados:
- `index.html` — página principal com switch de idioma (PT/EN).
- `style.css` — estilos responsivos e simples.
- `sketch.js` — código p5.js otimizado para layout responsivo e interação.

Como funciona a tradução:
- Textos estáticos usam o atributo `data-i18n` e um pequeno objeto `i18n` em `index.html`.
- O site detecta o idioma do navegador e aplica PT ou EN automaticamente; você pode alternar usando os botões no cabeçalho.

Como usar:
1. Os arquivos já foram enviados para o branch `site-inicial`.
2. Abra `index.html` em um navegador ou publique via GitHub Pages.
3. Para usar dados reais, chame `updateData([array_de_numeros])` em `sketch.js` ou modifique `rawData` para carregar de uma API (fetch/async + updateData).

Deseja que eu:
- (A) Crie uma PR a partir do branch `site-inicial` para `main`? (sim / não)
- (B) Adicione um exemplo de fetch para uma API pública (ex.: Alpha Vantage) com instruções para inserir sua chave?
- (C) Gerar versões separadas estáticas `index_pt.html` e `index_en.html` ao invés do switch (se preferir páginas estáticas)?

Feito por: assistente — arquivos prontos no branch `site-inicial`.

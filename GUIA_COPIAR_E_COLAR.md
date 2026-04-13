# VitaCare reorganizado e profissionalizado

## O que foi feito
- CSS global criado em `css/global.css`
- JS global criado em `js/global.js`
- páginas principais mantidas com CSS e JS próprios
- remoção dos principais `onclick`, `onchange` e `onsubmit` inline
- navegação interna dos dashboards centralizada por JavaScript
- toasts globais padronizados
- consultas com filtro de período funcionando
- dashboard do corretor com tabela e acompanhamento realmente dinâmicos
- inscrição com dependentes e resumo atualizando sem handlers inline

## Como usar
1. Extraia o `.zip`
2. Abra a pasta `vitacare_com_navbar`
3. Substitua sua pasta antiga por esta
4. Abra `index.html`

## Estrutura importante
- `css/global.css`: variáveis, reset e toast global
- `js/global.js`: navegação, voltar e toast
- `css/*.css`: estilo específico de cada página
- `js/*.js`: comportamento específico de cada página

## Arquivos mais importantes para editar depois
- `vitacare_dashboard_usuario.html`
- `vitacare_dashboard_corretor.html`
- `js/vitacare_dashboard_usuario.js`
- `js/vitacare_dashboard_corretor.js`
- `css/global.css`
- `js/global.js`

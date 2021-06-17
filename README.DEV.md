# Special Hooks

```js
useReducer; // from react
useSelector; // from redux
useDispatch; // from redux
useContext; // from react
useStyles; // from material ui -> creates a simple theme
useTheme; // from  material ui --> theme.palette.type === 'dark' | 'light'
```

# Panorama:

:Components:

- BasicEditions (onde ficará armazenado se é frente|verso. Terá também os botões
  que irão disparar **triggers**)
  - Card de VISUALIZAÇÃO apenas (ONDE _ATUALMENTE_ estão os **DADOS**)
    - Menu que (Faz as chamadas para as **funções**)

:Pages:

## Criação:

- Dados: **MarkdownFrente setMarkdownFrente MarkdownAtras setMarkdownAtras**
- Funções: **submit clickFront clickBack exit**
  **changeMarkdownAtras changeMarkdownFrente**

## Edição

- Dados: **MarkdownFrente setMarkdownFrente MarkdownAtras setMarkdownAtras**
- Funções: **submit clickFront clickBack exit**
  **changeMarkdownAtras changeMarkdownFrente**

<!---------------------------------------------------------------------------->

# Comentários:

## Sobre criar um componente com os mappings de tag:

> É interessante pois, ao fazer isso, posso reaproveitar este mapping na hora
> ... exibir o card principal. **TODAVIA** tenho que checar sobre o alinhamento
> ... vertical antes.

## Sobre colocar lógica demais nos componentes de alto nível:

> Se passar o setMarkdown para os filhos como prop, vai dar bagunça

> Não é interessante manter as funções que alteram o Markdown no componente
> ... de criação, uma vez que este terá q ter as funções de submit e de
> ... aguardo dos

> É interessante ter acesso aos dados na **Criação/Edição** pois, a função de
> ... _submit_ irá alterar para ambos os cenários, no entanto, não é
> ... interessante manter os dados aqui, caso assim o fizesse, iria ter
> ... muita lógica neste componente e **ele ficaria muito complexo**

_POR FIM_, creio que, o melhor cenário, é usar um store:

- Usando Redux, ou:
- Usando meu próprio store, ou:
- ~~Usando a context API~~ -> Não é indicando pois, a ContextAPI tem desempenho
  ruim para cenários de muitas modificações, ela é mais indicada para guardar
  dados relacionados à sessão.

## Usando um único componente para edição e criação:

> A abordagem de usar um mesmo template filtrando pela query é "feia", uma vez
> ... que o componente vai ficar complexo demais, sendo mais interessante, a
> ... transformação em dois componentes (mais clean).

<!---------------------------------------------------------------------------->

# Updates futuros:

1. Consertar possíveis problemas de interface
2. Suporte à áudio (arquivo ou gravação)
3. Suporte à vídeo (arquivo ou gravação)
4. Syntax hightlighting durante a edição
5. Estatísticas
6. Modo App

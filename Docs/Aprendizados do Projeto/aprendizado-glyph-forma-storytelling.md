# Aprendizado — forma sem direção é ruído

## Ocorrido
Após blueprint + `forma` nos nós (circle/square/triangle), o radial ficou mais rico visualmente, mas triângulos apontavam sempre pra cima. Geometria interna do círculo era só anéis guia — sem eco do fluxo.

## Problema gerado
Usuário lia as formas como decoração arbitrária. Ápice do triângulo não reforçava a história das arestas. Olho sem guia além dos labels.

## O que funcionou
Tratar forma como gramática narrativa: circle = estado, square = estrutura, triangle = força com outflow (`apontar` ou primeira conexão `de`). Marcas internas (`gr-story`) só quando derivadas do grafo — chevrons no anel, framing se ≥3 tensões, ticks cardinais se o ciclo fecha.

## Solução / Lição
Comunicação > decoração. Nada por acaso: orientação do nó deve bater com o verbo da aresta. Refs Krebs/blueprint inspiram intenção, não clone de eixos órfãos.

## Data
12-07-26

# Aprendizado — labels simétricos + papel_semantico

## Ocorrido
Após storytelling geométrico (triângulos orientados), o glifo “Economia Invertida” ainda mostrava labels de aresta desalinhados (mesmo verbo `ancora` em raios diferentes) e formas circle/square/triangle que o user lia como escolha arbitrária. Síntese competia como 3ª coluna estreita.

## Problema gerado
Olho não confiava no desenho: texto “torto” + silhuetas sem motivo → falta indefinível (“algo falta”).

## O que funcionou
- Edge labels em raio/tangente constantes (sem nudge diagonal `+8/-8`).
- Contrato `papel_semantico` (`estado`/`motor`/`fluxo`) em vez de pedir forma; renderer mapeia ○□△ e legenda no REF.
- Síntese em row full-width abaixo de diagnóstico + prática.

## Solução / Lição
Simetria de label = mesma geometria para a mesma regra. Forma = papel narrativo nomeado, não silhueta. Quando o user não sabe o que pedir, dar vocabulário de papel — não mais opções de shape.

## Data
12-07-26

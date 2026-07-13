# Constituição do Glifo — primeiros princípios

Leis para **qualquer** tese (radial, arc ou venn). Caso de teste ≠ regra. Economia Invertida, Ikigai, jornada — todos obedecem isto.

## Por que existe

Um glifo **explica**. Se o olho não leva uma mensagem sem ler o JSON, falhou.

## Sete leis

1. **Comunicação > decoração**  
   Marca sem motivo = bug. Bonito sem história = ruído.

2. **Posição carrega significado**  
   Centro ≠ órbita. Visível ≠ oculto. Sobreposição ≠ periferia. Onde o nó está é parte do argumento.

3. **Aresta = verbo**  
   Ligação sem label (verbo curto) é muda. O verbo diz o que a linha *faz*.

4. **Forma = papel, não silhueta**  
   Não escolha “triângulo porque gostei”. Escolha o **papel** na história:

   | Papel | Forma | Significa |
   |-------|-------|-----------|
   | `estado` | ○ circle | presença estável, combustível, âncora |
   | `motor` | □ square | estrutura que transforma, contêiner |
   | `fluxo` | △ triangle | força / direção; ápice aponta o outflow |

5. **Direção = história**  
   Seta, chevron e ápice do triângulo apontam **de → para**. Orientação errada = mentira visual.

6. **O olho tem caminho**  
   Uma leitura dominante: núcleo → órbita → ciclo; ou início → marcos → fim; ou universos → interseções → core. Hierarquia visual reforça essa ordem.

7. **Geometria interna nasce do grafo**  
   Anéis, ticks, framing, chevrons só existem se conexões/nós os justificam. Zero eixos órfãos.

## Como cada modo aplica as leis

| Modo | Metáfora espacial | O que o olho lê primeiro |
|------|-------------------|---------------------------|
| `radial` | Sistema / ciclo em torno de um núcleo | Core → spokes nomeados → anel (ciclo) |
| `arc` | Jornada / transformação | Início → descida/fundo → subida → fim; zona = visível/oculto |
| `venn` | Overlap de universos | Lóbulos → pares → core (destino) |

## Checklist antes de shippar um JSON

- [ ] Sem `forma` solta: use `papel_semantico` (ou deixe o renderer inferir no radial fechado)
- [ ] Toda aresta (radial/arc) tem verbo ≤12 chars
- [ ] Triângulos apontam o outflow certo (`apontar` ou ordem das conexões)
- [ ] Narrativa tem diagnóstico + prática + síntese (síntese = frase que o olho leva)
- [ ] Nada no desenho que você não saiba explicar em uma frase

## Fora desta constituição

Clonar Krebs/Oxman pixel a pixel. Novos modos (`layers`, `polarity`). Export PNG.

## Renderer

`tools/glyph-renderer/` — skill `.agents/skills/glyph/SKILL.md` obedece esta página.

## Data

13-07-26

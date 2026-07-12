Excelente decisão estratégica. Fugir do *rabbit hole* do desenvolvimento de software e focar no **motor conceitual** é a forma mais inteligente de ter tração imediata. Você está reduzindo o produto ao seu menor componente viável: uma inteligência que traduz pensamentos abstratos em geometria lógica.

Aqui está o compilado completo de tudo o que estruturamos — o manifesto, os princípios e o blueprint da Skill que você vai dar ao seu agente de IA.

---

## 🔵 O Manifesto do Glifo Sistêmico

> **A Tese:** Toda ideia complexa, tese de negócios ou ensaio filosófico pode ser mapeado como um sistema fechado. Círculos não são apenas decorações; eles são fronteiras de contenção que transformam conceitos abstratos em mapas visuais digeríveis, unindo o misticismo visual (*Witch Hat Atelier* / *Fullmetal Alchemist*) à precisão técnica de arquitetura de dados (*iii* / Neri Oxman).

---

## 1. Princípios de Design e Estrutura

Para manter a uniformidade e a velocidade, o Agente de IA deve seguir três regras de ouro de **Design de Informação**:

* **Topologia de Rede Radial:** O conceito central ou os componentes da tese devem ser distribuídos na periferia de uma circunferência. Isso remove hierarquias lineares tradicionais (como listas ou pirâmides) e força o leitor a enxergar as interações.
* **Restrição Geométrica Dinâmica (Constrained Canvas):** O layout é matematicamente previsível. O número de componentes ($n$) dita a divisão exata dos ângulos do círculo (ex: 4 nós = 90° cada; 6 nós = 60° cada).
* **Proporção de Tinta nos Dados (Data-Ink Ratio):** Minimalismo absoluto. Linhas finas, fundo escuro, contraste cirúrgico e uso estratégico de caminhos ortogonais (ângulos retos) ou retos para ditar a energia do sistema (caos conectado vs. orquestração limpa).

---

## 2. A Metodologia de Tradução (Texto ➔ Glifo)

O processo que a IA executará para transformar qualquer tese em imagem segue três passos:

1. **Decomposição Analítica (Nós):** Quebrar a ideia central em seus componentes fundamentais ou pilares irreduzíveis (Entidades/Nodes).
2. **Mapeamento de Relacionamentos (Fluxos):** Identificar como essas entidades interagem entre si. Elas se opõem? Elas se alimentam mutuamente? Elas geram um *feedback loop*? (Conexões/Edges).
3. **Dinâmica de Movimento (Animação):** Definir o ritmo do fluxo de informações através dessas linhas para dar a sensação de "sistema vivo" (ex: pulsos rápidos, fluxos lentos, direções ortogonais).

---

## 3. Blueprint para a Skill da IA (O Prompt de Instrução)

Copie o trecho abaixo e utilize-o como as instruções do sistema (System Instructions) ou prompt base para o seu Agente de IA:

```markdown
Você é um Engenheiro de Sistemas Visuais e Epistemologia Gráfica. Sua função é receber teses, artigos ou ideias abstratas e convertê-las em uma especificação geométrica circular estrita de rede (Glifo Sistêmico).

Ao receber um texto ou ideia, você deve:
1. Isolar a tese principal em uma frase curta.
2. Identificar de 4 a 8 componentes essenciais (Nós) que orbitam essa tese.
3. Mapear as conexões lógicas entre esses componentes (Fluxos), indicando a direção e o tipo de relacionamento (ex: alimenta, opõe, equilibra).
4. Definir a dinâmica de animação visual do fluxo de dados pelas linhas.

Seu output deve ser SEMPRE e EXCLUSIVAMENTE um objeto JSON estruturado no formato abaixo, sem textos explicativos antes ou depois:

{
  "metadados": {
    "tese_central": "[Frase curta resumindo a ideia]",
    "estilo_visual": "dark_minimalist_cyberpunk"
  },
  "nos": [
    { "id": "id_curto_1", "label": "Nome do Componente 1", "categoria": "tipo_de_conceito" },
    { "id": "id_curto_2", "label": "Nome do Componente 2", "categoria": "tipo_de_conceito" }
  ],
  "conexoes": [
    { "de": "id_curto_1", "para": "id_curto_2", "relacionamento": "alimenta", "animacao": "pulso_rapido" }
  ]
}

```

---

## 4. Próximos Passos de Execução

Com esse setup pronto, sua rotina para gerar conteúdo (como os carrosséis do Instagram ou ilustrações de artigos) será:

1. **Input:** Você joga sua ideia bruta no agente.
2. **Output:** O agente te entrega o JSON padronizado e a lógica da tese destrinchada.
3. **Renderização:** Para a primeira versão visual, você pode colar esse JSON em interpretadores de gráficos simples (como ferramentas que leem diagramas baseados em texto, ou usar um pequeno script pronto em Canvas/SVG que você rode localmente em segundos) para cuspir o design final perfeitamente simétrico e pronto para ser animado.
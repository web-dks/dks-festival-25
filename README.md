# DKS Festival 25 - Lineup

Site front-end para exibição do lineup do **DKS Festival 25**, desenvolvido com Vite + React + TypeScript e a biblioteca Planby.

![DKS Festival 25](https://via.placeholder.com/800x400/2C2825/61B8DE?text=DKS+FESTIVAL+25)

## 🎵 Sobre o Projeto

Este projeto exibe o lineup oficial do DKS Festival 25 em formato de timeline vertical, com destaque para a atração atual e próxima.

### Características

- ✅ Timeline vertical com scroll natural
- ✅ Destaque visual para "AGORA" e "EM SEGUIDA"
- ✅ Cards com informações detalhadas de cada atração
- ✅ Design responsivo (mobile-first)
- ✅ Identidade visual oficial do DKS Festival 25
- ✅ Animações suaves e transições

## 🎨 Identidade Visual

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Preto | `#2C2825` | Fundo principal |
| Azul | `#61B8DE` | Destaques, títulos, CTAs |
| Branco | `#FFFFFF` | Textos principais |

### Tipografia

- **Títulos**: Bebas Neue (caixa alta)
- **Corpo**: Inter

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/dks-festival-2025.git

# Entre na pasta do projeto
cd dks-festival-2025

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
dks-festival-2025/
├── public/
├── src/
│   ├── assets/          # Imagens e recursos estáticos
│   ├── components/      # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LineupCard.tsx
│   │   ├── VerticalTimeline.tsx
│   │   └── PlanbyTimeline.tsx
│   ├── data/
│   │   └── lineup.ts    # Dados mockados do lineup
│   ├── hooks/           # Custom hooks
│   ├── styles/
│   │   ├── globals.css  # Estilos globais
│   │   └── theme.ts     # Tema do Planby
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📊 Dados do Lineup

Os dados do lineup estão em `src/data/lineup.ts`. A estrutura está preparada para futura integração com API:

```typescript
interface LineupItem {
  id: string;
  title: string;
  since: string;    // ISO 8601
  till: string;     // ISO 8601
  category: 'DJ' | 'Banda' | 'Atração Especial' | 'Abertura' | 'Encerramento';
  description?: string;
  image?: string;
}
```

### Exemplo de Integração com API

```typescript
// Exemplo futuro de integração
async function fetchLineup(): Promise<LineupItem[]> {
  const response = await fetch('/api/lineup');
  return response.json();
}
```

## 🛠 Tecnologias

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Planby](https://planby.app/) - EPG/Timeline base
- [date-fns](https://date-fns.org/) - Date utilities

## 📱 Responsividade

O layout é **mobile-first** e se adapta a diferentes tamanhos de tela:

- **Mobile** (< 768px): Layout compacto, cards empilhados
- **Tablet** (768px - 1024px): Cards expandidos
- **Desktop** (> 1024px): Layout centralizado com largura máxima

## 🎪 Evento

**DKS Festival 25**
- 📅 Sexta-feira, 19 de Dezembro de 2025
- 📍 Parque Burle Marx, São Paulo
- ⏰ Das 9h às 22h

---

*"Chegar no começo faz parte da experiência."*

**Nos vemos sexta, 9h em ponto.** 🎶

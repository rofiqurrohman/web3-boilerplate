# 🚀 Web3 Blockchain Boilerplate

Boilerplate production-ready untuk membangun aplikasi Web3 modern dengan Next.js 15, wagmi, RainbowKit, TanStack Query, Zustand, dan Hono.

## ✨ Fitur Utama

- ⚡ **Next.js 15** - App Router, Server Components, Server Actions
- 🔗 **wagmi + viem** - Type-safe Web3 hooks dan client
- 🌈 **RainbowKit** - Beautiful wallet connection UI
- 📊 **TanStack Query** - Powerful data fetching & caching
- 🗃️ **Zustand** - Lightweight state management
- 🎨 **Tailwind v4 + shadcn/ui** - Modern design system
- 🔥 **Hono** - Edge-first API microservices
- 📱 **Responsive** - Mobile-first design

## 📋 Prerequisites

- Node.js 18+ atau Bun
- npm, yarn, atau pnpm
- Git

## 🛠️ Quick Start

### 1. Clone & Install

```bash
# Clone boilerplate
git clone <repo-url> my-web3-app
cd my-web3-app

# Install dependencies
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local` di `apps/web/`:

```bash
# WalletConnect Project ID (Wajib)
# Dapatkan di: https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Alchemy API Key (Opsional tapi direkomendasikan)
# Dapatkan di: https://www.alchemy.com
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key_here

# API URL
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### 3. Jalankan Development

```bash
# Jalankan semua services (Next.js + Hono API)
npm run dev

# Atau jalankan individual:

# Next.js saja
cd apps/web && npm run dev

# Hono API saja
cd apps/api && npm run dev
```

Buka browser: `http://localhost:3000`

## 📁 Struktur Project

```
web3-boilerplate/
├── apps/
│   ├── web/                          # Next.js App
│   │   ├── src/
│   │   │   ├── app/                  # App Router
│   │   │   │   ├── layout.tsx        # Root layout
│   │   │   │   ├── page.tsx          # Homepage
│   │   │   │   └── dashboard/        # Dashboard page
│   │   │   ├── components/
│   │   │   │   ├── wallet/           # Wallet components
│   │   │   │   ├── ui/               # shadcn components
│   │   │   │   └── providers.tsx     # React providers
│   │   │   ├── hooks/                # Custom hooks
│   │   │   ├── lib/
│   │   │   │   ├── wagmi.ts          # wagmi config
│   │   │   │   └── store.ts          # Zustand stores
│   │   │   └── actions/              # Server actions
│   │   └── package.json
│   │
│   └── api/                          # Hono API
│       ├── src/
│       │   └── index.ts              # API routes
│       ├── wrangler.toml             # Cloudflare config
│       └── package.json
│
├── turbo.json                        # Turborepo config
├── package.json                      # Root package.json
└── README.md
```

## 🔧 Konfigurasi Detail

### wagmi Configuration

Edit `apps/web/src/lib/wagmi.ts` untuk customize chains:

```typescript
import { mainnet, polygon, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Your App Name',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, arbitrum],
  ssr: true,
});
```

### Zustand Stores

3 store sudah disiapkan:

- **useUIStore** - UI states (sidebar, modals, dll)
- **useWalletStore** - Wallet preferences (chain, address)
- **useTransactionStore** - Transaction history

### TanStack Query

Query client sudah dikonfigurasi dengan:

- Stale time: 1 minute
- Automatic refetch on window focus: disabled
- React Query Devtools di development

### Hono API Routes

API tersedia di `http://localhost:8787`:

- `GET /` - Health check
- `GET /transactions/:address` - Transaction history
- `POST /webhook/blockchain` - Blockchain event webhook
- `GET /vault/:vaultId/apy` - Vault APY calculation
- `GET /price/:tokenAddress` - Token price
- `GET /claims/:address` - Claim history
- `GET /donations/:address` - Donation history

## 📦 Component Usage

### Connect Wallet Button

```tsx
import { ConnectButton } from '@/components/wallet/connect-button';

export default function Page() {
  return <ConnectButton />;
}
```

### Wallet Info Card

```tsx
import { WalletInfo } from '@/components/wallet/wallet-info';

export default function Page() {
  return <WalletInfo />;
}
```

### Chain Switcher

```tsx
import { ChainSwitcher } from '@/components/wallet/chain-switcher';

export default function Page() {
  return <ChainSwitcher />;
}
```

## 🎣 Custom Hooks

### useContractRead

```tsx
const { data, isLoading } = useContractRead({
  address: '0x...',
  abi: MY_ABI,
  functionName: 'balanceOf',
  args: [userAddress],
  refetchInterval: 10000, // Refetch every 10s
});
```

### useContractWrite

```tsx
const { mutate: transfer, isPending } = useContractWrite({
  address: '0x...',
  abi: MY_ABI,
  functionName: 'transfer',
  onSuccess: (hash) => {
    console.log('Transaction:', hash);
  },
});

// Call mutation
transfer([recipientAddress, amount]);
```

### useTokenBalance

```tsx
const { data: balance } = useTokenBalance('0x...');

console.log(balance?.balance); // BigInt
console.log(balance?.symbol); // 'USDC'
```

## 🔐 Server Actions

Server Actions untuk secure server-side operations:

```tsx
'use client';

import { processClaim } from '@/actions/server-actions';
import { useMutation } from '@tanstack/react-query';

export default function ClaimButton() {
  const mutation = useMutation({
    mutationFn: processClaim,
  });

  return <button onClick={() => mutation.mutate({ amount: '100', token: 'USDC' })}>Claim</button>;
}
```

## 🚀 Deploy

### Deploy Next.js (Vercel)

```bash
cd apps/web
vercel
```

### Deploy Hono API (Cloudflare Workers)

```bash
cd apps/api

# Login ke Cloudflare
npx wrangler login

# Deploy
npm run deploy
```

### Environment Variables Production

Jangan lupa set environment variables di:

- Vercel Dashboard (untuk Next.js)
- Cloudflare Dashboard (untuk Workers)

## 🧪 Testing

```bash
# Test semua packages
npm run test

# Test specific app
cd apps/web && npm run test
```

## 📚 Resources & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [wagmi Docs](https://wagmi.sh)
- [RainbowKit Docs](https://www.rainbowkit.com)
- [TanStack Query Docs](https://tanstack.com/query)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Hono Docs](https://hono.dev)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Viem Docs](https://viem.sh)

## 💡 Tips & Best Practices

### 1. State Management

- **TanStack Query**: Untuk server/blockchain data
- **Zustand**: Untuk UI state dan preferences
- **wagmi hooks**: Untuk wallet dan contract state

### 2. Caching Strategy

```typescript
// Short cache untuk fast-changing data (price, balance)
refetchInterval: 10000, // 10 seconds

// Long cache untuk slow-changing data (metadata)
staleTime: 300000, // 5 minutes
```

### 3. Error Handling

Selalu handle errors di mutations:

```typescript
const mutation = useMutation({
  mutationFn: myFunction,
  onError: (error) => {
    toast.error(error.message);
  },
});
```

### 4. Transaction Management

Gunakan `useTransactionStore` untuk track pending transactions:

```typescript
const addTransaction = useTransactionStore((s) => s.addTransaction);

// Setelah submit transaction
addTransaction({
  hash: txHash,
  description: 'Token transfer',
});
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 🆘 Support

Jika ada pertanyaan atau issues:

1. Check [Issues](https://github.com/yourusername/repo/issues)
2. Buat issue baru jika belum ada
3. Join Discord community (link)

## 🎉 What's Next?

Setelah setup, kamu bisa:

1. **Customize design** - Edit Tailwind config dan shadcn components
2. **Add contracts** - Tambah smart contract ABIs di `src/lib/contracts`
3. **Build features** - Implement business logic kamu
4. **Add database** - Integrate Prisma atau Drizzle ORM
5. **Add authentication** - Implement SIWE (Sign-In with Ethereum)

Happy building! 🚀

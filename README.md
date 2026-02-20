# Regen Peru DAO 🌿

**Una DAO para el voluntariado y la regeneración en Perú.**

Regen Peru es una Organización Autónoma Descentralizada (DAO) que permite a la comunidad votar democráticamente por proyectos de impacto social usando tecnología blockchain en la red Base.

## Estructura del proyecto

```
regen-peru/
├── contracts/          # Smart contracts (Foundry/Solidity)
│   ├── src/
│   │   └── RegenMemberNFT.sol   # NFT soulbound de membresía
│   ├── test/
│   │   └── RegenMemberNFT.t.sol # Tests Foundry
│   └── script/
│       └── Deploy.s.sol         # Script de deploy
│
├── frontend/           # App Next.js 14 (App Router)
│   ├── src/app/        # Páginas (home, propuestas, perfil, aprender)
│   ├── components/     # Componentes UI y Web3
│   └── lib/            # Utilidades (snapshot.ts, contracts.ts)
│
└── docs/               # Documentación
    ├── snapshot-setup.md
    └── deployment.md
```

## Stack tecnológico

| Capa        | Tecnología                                |
|-------------|-------------------------------------------|
| Blockchain  | Base (L2 de Ethereum)                     |
| Smart Contract | Solidity 0.8.24 · Foundry · OpenZeppelin |
| NFT estándar | ERC-721 soulbound (ERC721Enumerable)      |
| Votación    | Snapshot (off-chain, gasless)              |
| Frontend    | Next.js 14 · TypeScript · Tailwind CSS    |
| Web3        | Wagmi v2 · Viem · RainbowKit              |

## Quickstart

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Completa las variables de entorno
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Smart Contracts

```bash
# Requiere Foundry instalado: https://getfoundry.sh
cd contracts

# Instalar OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts --no-git

# Correr tests
forge test -vvv

# Deploy a Base Sepolia
cp .env.example .env
forge script script/Deploy.s.sol --rpc-url base_sepolia --broadcast --verify -vvvv
```

## Variables de entorno

Crea `frontend/.env.local` con:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=  # https://cloud.walletconnect.com
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=      # Dirección del contrato desplegado
NEXT_PUBLIC_SNAPSHOT_SPACE=regenperu.eth
NEXT_PUBLIC_CHAIN_ID=8453              # 8453=Base, 84532=Base Sepolia
NEXT_PUBLIC_ALCHEMY_API_KEY=           # https://alchemy.com
```

## Páginas principales

| Ruta           | Descripción                              |
|----------------|------------------------------------------|
| `/`            | Inicio: hero, estadísticas, cómo funciona|
| `/propuestas`  | Lista de propuestas con filtros          |
| `/propuestas/:id` | Detalle + votación                    |
| `/aprender`    | Tutorial, glosario Web3, FAQ en español  |
| `/perfil`      | Dashboard: NFT, historial de votos       |

## Documentación

- [Configuración de Snapshot](docs/snapshot-setup.md)
- [Guía de deployment](docs/deployment.md)

## Contribuir

1. Abre un issue describiendo tu propuesta
2. Fork el repositorio
3. Crea un branch: `git checkout -b feature/mi-feature`
4. Commit: `git commit -m 'feat: descripción'`
5. Pull Request

## Licencia

MIT © 2024 Regen Peru DAO

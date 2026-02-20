# Guía de Deployment — Regen Peru

## Contratos (Base)

### 1. Instalar Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Instalar dependencias

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts --no-git
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `contracts/.env`:

```bash
DEPLOYER_PRIVATE_KEY=0xtu_clave_privada
OWNER_ADDRESS=0xtu_wallet_multisig
BASE_URI=ipfs://QmTuHashIPFS/
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_MAINNET_RPC_URL=https://mainnet.base.org
BASESCAN_API_KEY=tu_api_key_basescan
```

### 4. Deploy en Base Sepolia (testnet)

```bash
forge script script/Deploy.s.sol \
  --rpc-url base_sepolia \
  --broadcast \
  --verify \
  -vvvv
```

### 5. Correr tests

```bash
forge test -vvv
```

### 6. Deploy en Base Mainnet

```bash
forge script script/Deploy.s.sol \
  --rpc-url base_mainnet \
  --broadcast \
  --verify \
  -vvvv
```

Guarda la dirección del contrato desplegado para el frontend.

---

## Frontend (Vercel)

### 1. Configurar variables

En el panel de Vercel, agrega estas variables de entorno:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_direccion_contrato_mainnet
NEXT_PUBLIC_SNAPSHOT_SPACE=regenperu.eth
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_ALCHEMY_API_KEY=tu_api_key
```

### 2. Deploy

```bash
# Instalar Vercel CLI
pnpm add -g vercel

cd frontend
vercel --prod
```

O conecta el repositorio directamente en [vercel.com](https://vercel.com) y Vercel deployará automáticamente en cada push a `main`.

---

## Metadata IPFS (Opcional)

Para un NFT con metadata real, sube los archivos a IPFS via [Pinata](https://pinata.cloud):

```json
// 1.json (ejemplo para token ID 1)
{
  "name": "Regen Peru Member #1",
  "description": "Membresía oficial de Regen Peru DAO. Representa 1 voto en la gobernanza de la comunidad.",
  "image": "ipfs://QmImageHash/1.png",
  "attributes": [
    { "trait_type": "Tipo",        "value": "Miembro" },
    { "trait_type": "Red",         "value": "Base"    },
    { "trait_type": "Transferible","value": "No (Soulbound)" }
  ]
}
```

Luego actualiza el `BASE_URI` en el contrato:

```bash
cast send 0xTU_CONTRATO \
  "setBaseURI(string)" \
  "ipfs://QmTuNuevoHash/" \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --rpc-url base_mainnet
```

---

## Checklist de lanzamiento

- [ ] Contrato deployed y verificado en Basescan
- [ ] Tests pasando (`forge test -vvv`)
- [ ] Metadata IPFS subida y BASE_URI configurado
- [ ] Espacio Snapshot configurado con estrategia NFT
- [ ] Frontend deployed en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Primer batch de NFTs distribuido a la comunidad fundadora
- [ ] Primera propuesta de prueba en Snapshot

# Configuración de Snapshot para Regen Peru

Esta guía explica cómo crear y configurar el espacio de Snapshot para Regen Peru DAO.

## Prerequisitos

1. **Contrato NFT desplegado** en Base (o Base Sepolia para testnet)
2. **ENS name** o address para el espacio (ej. `regenperu.eth`)
3. **Wallet** con el ENS o que será admin del espacio

## Paso 1: Crear el espacio en Snapshot

1. Ve a [snapshot.box](https://snapshot.box/) y conecta tu wallet
2. Haz clic en **"Create space"**
3. Ingresa el ENS o subdomain (ej. `regenperu.eth`)
4. Completa el perfil del espacio:
   - **Name**: Regen Peru DAO
   - **About**: DAO para voluntariado y regeneración en Perú
   - **Network**: Base (chain ID: 8453)
   - **Symbol**: REGEN

## Paso 2: Configurar la estrategia de votación

En la sección **Strategies**, agrega:

```json
{
  "name": "erc721-balance-of",
  "network": "8453",
  "params": {
    "address": "0xTU_CONTRATO_NFT",
    "symbol": "REGEN"
  }
}
```

Esta estrategia asigna 1 voto por cada NFT REGEN que posea el votante.

## Paso 3: Configurar parámetros de votación

En **Settings > Voting**:

```yaml
Voting delay:  86400   # 24 horas (en segundos)
Voting period: 432000  # 5 días (en segundos)
Quorum:        30      # 30% del total de NFTs activos
Vote type:     single-choice
```

## Paso 4: Configurar propuestas

En **Settings > Proposal**:

- **Validation**: Solo holders del NFT pueden crear propuestas (recomendado)
  - O configurar validación básica y requerir aprobación de admins

```json
{
  "name": "basic",
  "params": {
    "minScore": 1
  }
}
```

## Paso 5: Agregar admins y moderadores

En **Settings > Members**, agrega las wallets del equipo multisig como admins.

## Paso 6: Customización de branding

- Logo: Imagen en PNG de 256x256px
- Color principal: `#2d6a2d` (forest green)
- Descripción: En español para la audiencia peruana

## Paso 7: Conectar al frontend

Copia el `snapshotSpaceId` (ej. `regenperu.eth`) y actualiza:

```bash
# frontend/.env.local
NEXT_PUBLIC_SNAPSHOT_SPACE=regenperu.eth
```

## Crear una propuesta de prueba

1. Conecta tu wallet en [snapshot.box](https://snapshot.box/)
2. Ve al espacio `regenperu.eth`
3. Clic **"New proposal"**
4. Completa:
   - Title, Body (markdown), Choices (Sí / No / Abstención)
   - Start / End date
5. Clic **"Publish"**

## Testnet vs Mainnet

Para testnet (Base Sepolia, chain ID: 84532):

```json
{
  "name": "erc721-balance-of",
  "network": "84532",
  "params": {
    "address": "0xTU_CONTRATO_SEPOLIA"
  }
}
```

Usa el subdomain `regenperu-test.eth` o un ENS de prueba durante desarrollo.

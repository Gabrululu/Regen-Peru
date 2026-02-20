import Snapshot from "@snapshot-labs/snapshot.js";

const hub = "https://hub.snapshot.org";
const client = new Snapshot.Client712(hub);

const SPACE = process.env.NEXT_PUBLIC_SNAPSHOT_SPACE || "regenperu.eth";

const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json",
  "Origin": "https://snapshot.org",
  "Referer": "https://snapshot.org/"
};

// Types
export interface SnapshotProposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  state: string;
  author: string;
  scores: number[];
  scores_total: number;
  votes: number;
  quorum: number;
  space: {
    id: string;
    name: string;
  };
}

export interface SnapshotVote {
  id: string;
  voter: string;
  choice: number | Record<string, number>;
  vp: number;
  created: number;
}

export interface SnapshotSpace {
  id: string;
  name: string;
  about: string;
  network: string;
  symbol: string;
  members: string[];
  followers: number;
}

// Fetch proposals from a Snapshot space
export async function getProposals(
  spaceId: string = SPACE,
  state: "active" | "closed" | "pending" | "all" = "all",
  limit = 20,
  skip = 0
): Promise<SnapshotProposal[]> {
  const query = `
    query Proposals($spaceIn: [String]!, $state: String, $first: Int!, $skip: Int!) {
      proposals(
        first: $first,
        skip: $skip,
        where: {
          space_in: $spaceIn,
          state: $state
        },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        state
        author
        scores
        scores_total
        votes
        quorum
        space {
          id
          name
        }
      }
    }
  `;

  const variables =
    state === "all"
      ? { spaceIn: [spaceId], state: undefined, first: limit, skip }
      : { spaceIn: [spaceId], state, first: limit, skip };

  const response = await fetch("https://hub.snapshot.org/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR every 60s
  });

  if (!response.ok) {
    console.error(`Snapshot API error: ${response.status} ${response.statusText}`);
    return [];
  }

  try {
    const { data } = await response.json();
    return data?.proposals ?? [];
  } catch (error) {
    console.error("Failed to parse Snapshot API response:", error);
    return [];
  }
}

// Fetch a single proposal by ID
export async function getProposal(proposalId: string): Promise<SnapshotProposal | null> {
  const query = `
    query Proposal($id: String!) {
      proposal(id: $id) {
        id
        title
        body
        choices
        start
        end
        state
        author
        scores
        scores_total
        votes
        quorum
        space {
          id
          name
        }
      }
    }
  `;

  const response = await fetch("https://hub.snapshot.org/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: proposalId } }),
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    console.error(`Snapshot API error: ${response.status} ${response.statusText}`);
    return null;
  }

  try {
    const { data } = await response.json();
    return data?.proposal ?? null;
  } catch (error) {
    console.error("Failed to parse Snapshot API response:", error);
    return null;
  }
}

// Fetch votes for a proposal
export async function getVotes(proposalId: string, first = 100): Promise<SnapshotVote[]> {
  const query = `
    query Votes($proposal: String!, $first: Int!) {
      votes(first: $first, where: { proposal: $proposal }) {
        id
        voter
        choice
        vp
        created
      }
    }
  `;

  const response = await fetch("https://hub.snapshot.org/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { proposal: proposalId, first } }),
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    console.error(`Snapshot API error: ${response.status} ${response.statusText}`);
    return [];
  }

  try {
    const { data } = await response.json();
    return data?.votes ?? [];
  } catch (error) {
    console.error("Failed to parse Snapshot API response:", error);
    return [];
  }
}

// Fetch Snapshot space info
export async function getSpace(spaceId: string = SPACE): Promise<SnapshotSpace | null> {
  const query = `
    query Space($id: String!) {
      space(id: $id) {
        id
        name
        about
        network
        symbol
        members
        followers
      }
    }
  `;

  const response = await fetch("https://hub.snapshot.org/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: spaceId } }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    console.error(`Snapshot API error: ${response.status} ${response.statusText}`);
    return null;
  }

  try {
    const { data } = await response.json();
    return data?.space ?? null;
  } catch (error) {
    console.error("Failed to parse Snapshot API response:", error);
    return null;
  }
}

// Cast a vote (requires connected wallet)
export async function castVote(
  web3Provider: object,
  voterAddress: string,
  proposalId: string,
  choiceIndex: number // 1-indexed
) {
  await client.vote(web3Provider as Parameters<typeof client.vote>[0], voterAddress, {
    space: SPACE,
    proposal: proposalId,
    type: "single-choice",
    choice: choiceIndex,
    reason: "",
    app: "regen-peru",
  });
}

export { SPACE };

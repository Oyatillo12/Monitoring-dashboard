import { Spirit } from "@/shared/lib/zod/schemas";

// Shared in-memory store for spirits
let spiritsStore: Spirit[] = [
  {
    id: "1",
    name: "Shadow Whisper",
    threatLevel: "Low",
    location: "Abandoned Warehouse",
    status: "Active",
  },
  {
    id: "2",
    name: "Echo Phantom",
    threatLevel: "Medium",
    location: "Old Library",
    status: "Active",
  },
  {
    id: "3",
    name: "Dark Wraith",
    threatLevel: "High",
    location: "Underground Tunnels",
    status: "Active",
  },
  {
    id: "4",
    name: "Nightmare Entity",
    threatLevel: "Critical",
    location: "Haunted Mansion",
    status: "Active",
  },
  {
    id: "5",
    name: "Misty Specter",
    threatLevel: "Low",
    location: "Forest Clearing",
    status: "Active",
  },
];

export function getSpiritsStore(): Spirit[] {
  return spiritsStore;
}

export function setSpiritsStore(newSpirits: Spirit[]): void {
  spiritsStore = [...newSpirits];
}

export function updateSpirit(id: string, updates: Partial<Spirit>): void {
  spiritsStore = spiritsStore.map((spirit) =>
    spirit.id === id ? { ...spirit, ...updates } : spirit
  );
}


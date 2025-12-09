export type ActionQuest = {
  id: string;
  category: string;
  title: string;
  description: string;
  timesCompleted: number;
  lastCompletedAt?: string;
};

export const initialActions: Omit<ActionQuest, 'timesCompleted' | 'lastCompletedAt'>[] = [
  {
    id: 'pollinator-garden',
    category: 'Pollinators',
    title: 'Plant Native Flowers',
    description: 'Add native flowering plants to support local pollinators',
  },
  {
    id: 'leave-stems',
    category: 'Pollinators',
    title: 'Leave Plant Stems',
    description: 'Keep dead plant stems standing through winter for hibernating insects',
  },
  {
    id: 'pesticide-free',
    category: 'Pollinators',
    title: 'Skip Pesticides',
    description: 'Maintain a pesticide-free zone to protect beneficial insects',
  },
  {
    id: 'bee-hotel',
    category: 'Pollinators',
    title: 'Create Bee Habitat',
    description: 'Set up a native bee hotel or leave bare ground patches',
  },
  {
    id: 'rain-barrel',
    category: 'Water',
    title: 'Collect Rainwater',
    description: 'Use rain barrel to reduce runoff and conserve water',
  },
  {
    id: 'native-plants',
    category: 'Water',
    title: 'Choose Drought-Tolerant Plants',
    description: 'Replace water-intensive species with native, drought-adapted plants',
  },
  {
    id: 'rain-garden',
    category: 'Water',
    title: 'Build a Rain Garden',
    description: 'Create a depression to capture and filter stormwater runoff',
  },
  {
    id: 'permeable-surface',
    category: 'Water',
    title: 'Add Permeable Surfaces',
    description: 'Replace impervious surfaces with gravel, pavers, or vegetation',
  },
  {
    id: 'compost',
    category: 'Waste',
    title: 'Compost Organics',
    description: 'Divert food scraps and yard waste from landfills',
  },
  {
    id: 'litter-pickup',
    category: 'Waste',
    title: 'Pick Up Litter',
    description: 'Remove trash from natural areas to protect wildlife',
  },
  {
    id: 'reduce-plastic',
    category: 'Waste',
    title: 'Refuse Single-Use Plastic',
    description: 'Avoid disposable plastics that harm ecosystems',
  },
  {
    id: 'recycle-right',
    category: 'Waste',
    title: 'Recycle Properly',
    description: 'Ensure materials are clean and sorted correctly',
  },
  {
    id: 'stay-on-trail',
    category: 'Trails',
    title: 'Stay on Marked Trails',
    description: 'Prevent soil erosion and habitat damage by following paths',
  },
  {
    id: 'respect-closures',
    category: 'Trails',
    title: 'Respect Wildlife Closures',
    description: 'Avoid sensitive areas during nesting or breeding seasons',
  },
  {
    id: 'leave-no-trace',
    category: 'Trails',
    title: 'Practice Leave No Trace',
    description: 'Pack out everything you bring, leave nature undisturbed',
  },
  {
    id: 'quiet-observation',
    category: 'Trails',
    title: 'Observe Quietly',
    description: 'Keep noise low to avoid disturbing wildlife',
  },
  {
    id: 'brush-pile',
    category: 'Habitat',
    title: 'Build a Brush Pile',
    description: 'Stack branches to create shelter for small mammals and reptiles',
  },
  {
    id: 'log-pile',
    category: 'Habitat',
    title: 'Leave Logs in Place',
    description: 'Let fallen trees decompose naturally to support insects and fungi',
  },
  {
    id: 'bird-window',
    category: 'Habitat',
    title: 'Prevent Window Strikes',
    description: 'Add decals or screens to windows to protect birds',
  },
  {
    id: 'night-sky',
    category: 'Habitat',
    title: 'Reduce Light Pollution',
    description: 'Shield outdoor lights to protect nocturnal wildlife',
  },
];

export type HabitatTrait =
  | 'dense-canopy'
  | 'open-sky'
  | 'standing-water'
  | 'flowing-water'
  | 'sandy-soil'
  | 'rocky-terrain'
  | 'tall-grass'
  | 'short-grass'
  | 'salt-presence'
  | 'elevation';

export type HabitatInput = {
  traits: HabitatTrait[];
};

export type HabitatResult = {
  biome: string;
  confidence: 'high' | 'medium' | 'low';
  species: string[];
};

export function identifyHabitat(input: HabitatInput): HabitatResult[] {
  const results: HabitatResult[] = [];
  const traits = new Set(input.traits);

  if (traits.has('dense-canopy')) {
    results.push({
      biome: 'Forest',
      confidence: 'high',
      species: ['White-tailed Deer', 'Pileated Woodpecker', 'Black Bear', 'Red Fox'],
    });
  }

  if (traits.has('standing-water') && !traits.has('salt-presence')) {
    results.push({
      biome: 'Wetland',
      confidence: 'high',
      species: ['Great Blue Heron', 'Beaver', 'Wood Duck', 'Painted Turtle'],
    });
  }

  if (traits.has('open-sky') && (traits.has('tall-grass') || traits.has('short-grass'))) {
    results.push({
      biome: 'Grassland',
      confidence: 'high',
      species: ['American Bison', 'Prairie Dog', 'Burrowing Owl', 'Western Meadowlark'],
    });
  }

  if (traits.has('salt-presence') && traits.has('standing-water')) {
    results.push({
      biome: 'Coast',
      confidence: 'high',
      species: ['Sea Otter', 'Brown Pelican', 'Hermit Crab'],
    });
  }

  if (traits.has('elevation') && traits.has('rocky-terrain')) {
    results.push({
      biome: 'Mountains',
      confidence: 'high',
      species: ['Mountain Goat', 'Golden Eagle', 'American Pika'],
    });
  }

  if (traits.has('sandy-soil') && traits.has('open-sky') && !traits.has('salt-presence')) {
    results.push({
      biome: 'Desert',
      confidence: 'high',
      species: ['Desert Tortoise', 'Greater Roadrunner'],
    });
  }

  if (traits.has('open-sky') && !traits.has('tall-grass') && !traits.has('elevation') && !traits.has('sandy-soil')) {
    results.push({
      biome: 'Urban Edge',
      confidence: 'medium',
      species: ['Coyote', 'Peregrine Falcon', 'Virginia Opossum'],
    });
  }

  if (results.length === 0) {
    results.push({
      biome: 'Mixed Habitat',
      confidence: 'low',
      species: ['Red Fox', 'Coyote'],
    });
  }

  return results;
}

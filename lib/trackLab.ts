type TrackShape = 'cloven' | 'paw' | 'bird' | 'hand';
type TrackSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge';
type ToeCount = '2' | '3' | '4' | '5' | 'more';

export type TrackInput = {
  shape: TrackShape;
  size: TrackSize;
  toes: ToeCount;
};

export type TrackResult = {
  species: string;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
};

export function identifyTrack(input: TrackInput): TrackResult[] {
  const results: TrackResult[] = [];

  if (input.shape === 'cloven') {
    if (input.size === 'medium') {
      results.push({
        species: 'White-tailed Deer',
        confidence: 'high',
        notes: 'Heart-shaped hoofprints, common in forests and edges',
      });
    }
    if (input.size === 'huge') {
      results.push({
        species: 'American Bison',
        confidence: 'high',
        notes: 'Very large cloven hooves in grassland habitats',
      });
    }
    if (input.size === 'large') {
      results.push({
        species: 'Elk or Moose',
        confidence: 'medium',
        notes: 'Large cloven tracks, check for size and habitat',
      });
    }
  }

  if (input.shape === 'paw' && input.toes === '4') {
    if (input.size === 'small' || input.size === 'medium') {
      results.push({
        species: 'Red Fox',
        confidence: 'high',
        notes: 'Diagonal walking pattern, oval overall shape',
      });
      results.push({
        species: 'Coyote',
        confidence: 'medium',
        notes: 'Larger than fox, more oval, often in straight line',
      });
    }
    if (input.size === 'large' || input.size === 'huge') {
      results.push({
        species: 'Black Bear',
        confidence: 'high',
        notes: 'Look for claw marks ahead of toes',
      });
    }
  }

  if (input.shape === 'paw' && input.toes === '5') {
    if (input.size === 'huge') {
      results.push({
        species: 'Black Bear',
        confidence: 'high',
        notes: 'Large 5-toed track with claws, hind foot looks human-like',
      });
    }
    if (input.size === 'small' || input.size === 'tiny') {
      results.push({
        species: 'Virginia Opossum',
        confidence: 'high',
        notes: 'Opposable thumb on hind foot, splayed toes',
      });
    }
  }

  if (input.shape === 'hand') {
    results.push({
      species: 'Virginia Opossum',
      confidence: 'high',
      notes: 'Hand-like hind tracks with opposable thumb',
    });
    results.push({
      species: 'Raccoon',
      confidence: 'medium',
      notes: 'Very hand-like with long fingers',
    });
  }

  if (input.shape === 'bird') {
    if (input.toes === '3') {
      if (input.size === 'large') {
        results.push({
          species: 'Great Blue Heron',
          confidence: 'high',
          notes: 'Large three-toed tracks in wetland mud',
        });
      }
      if (input.size === 'medium') {
        results.push({
          species: 'Greater Roadrunner',
          confidence: 'medium',
          notes: 'X-shaped track from running gait',
        });
      }
    }
    if (input.toes === '4') {
      results.push({
        species: 'Various songbirds',
        confidence: 'low',
        notes: 'Three forward toes, one back - typical perching bird',
      });
    }
  }

  if (results.length === 0) {
    results.push({
      species: 'Unknown',
      confidence: 'low',
      notes: 'Try different combinations or check for additional clues like scat or hair',
    });
  }

  return results;
}

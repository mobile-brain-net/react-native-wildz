import { HabitatCheck } from './storage';

export function calculateBiomeScore(check: Omit<HabitatCheck, 'score'>): number {
  let score = 0;

  switch (check.vegetation) {
    case 'lush':
      score += 30;
      break;
    case 'mixed':
      score += 20;
      break;
    case 'thin':
      score += 10;
      break;
    case 'bare':
      score += 0;
      break;
  }

  switch (check.water) {
    case 'abundant':
      score += 25;
      break;
    case 'limited':
      score += 15;
      break;
    case 'dry':
      score += 5;
      break;
  }

  switch (check.disturbance) {
    case 'low':
      score += 25;
      break;
    case 'medium':
      score += 15;
      break;
    case 'high':
      score += 5;
      break;
  }

  switch (check.litter) {
    case 'none':
      score += 20;
      break;
    case 'low':
      score += 15;
      break;
    case 'medium':
      score += 8;
      break;
    case 'high':
      score += 0;
      break;
  }

  return Math.min(score, 100);
}

export function getHealthColor(score: number): string {
  if (score >= 75) return '#5BBF6B';
  if (score >= 50) return '#F78A3B';
  return '#E85A5A';
}

export function getHealthLabel(score: number): string {
  if (score >= 75) return 'Healthy';
  if (score >= 50) return 'Fair';
  return 'At Risk';
}

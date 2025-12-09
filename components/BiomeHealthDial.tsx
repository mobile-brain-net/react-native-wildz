import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { getHealthColor } from '../lib/biomeScore';

type BiomeHealthDialProps = {
  score: number;
  size?: 'small' | 'large';
};

export function BiomeHealthDial({ score, size = 'small' }: BiomeHealthDialProps) {
  const healthColor = getHealthColor(score);
  const dialSize = size === 'small' ? 60 : 100;
  const fontSize = size === 'small' ? 18 : 32;

  return (
    <View
      style={[
        styles.dial,
        {
          width: dialSize,
          height: dialSize,
          borderColor: healthColor,
          shadowColor: healthColor,
          transform: [{ rotate: '45deg' }],
        },
      ]}
    >
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { fontSize, color: healthColor }]}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dial: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: colors.duskMoss,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreContainer: {
    transform: [{ rotate: '-45deg' }],
  },
  score: {
    fontFamily: typography.headerHeavy,
    letterSpacing: 1,
  },
});

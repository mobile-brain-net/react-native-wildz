import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Leaf } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type ImpactSummaryCardProps = {
  weeklyTotal: number;
  topCategory: string;
  streak: number;
};

export function ImpactSummaryCard({ weeklyTotal, topCategory, streak }: ImpactSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Leaf size={24} color={colors.leafGreen} />
        <Text style={styles.title}>This Week</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{weeklyTotal}</Text>
          <Text style={styles.statLabel}>Actions</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
      {topCategory && (
        <Text style={styles.footer}>Top focus: {topCategory}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.leafGreen + '60',
    shadowColor: colors.leafGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.leafGreen + '30',
  },
  title: {
    fontFamily: typography.header,
    fontSize: 20,
    color: colors.sunlitSand,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.headerHeavy,
    fontSize: 36,
    color: colors.leafGreen,
    marginBottom: 4,
    letterSpacing: 2,
  },
  statLabel: {
    fontFamily: typography.metadata,
    fontSize: 11,
    color: colors.skyMist,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  divider: {
    width: 2,
    height: 50,
    backgroundColor: colors.skyMist + '60',
  },
  footer: {
    fontFamily: typography.bodyRegular,
    fontSize: 13,
    color: colors.skyMist,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

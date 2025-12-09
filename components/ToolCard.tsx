import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type ToolCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
};

export function ToolCard({ icon, title, description, onPress }: ToolCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <View style={styles.iconRotate}>{icon}</View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <ChevronRight size={24} color={colors.skyMist} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.skyMist + '40',
    shadowColor: colors.skyMist,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.inkForest,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.emberOrange + '60',
    transform: [{ rotate: '45deg' }],
  },
  iconRotate: {
    transform: [{ rotate: '-45deg' }],
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: typography.header,
    fontSize: 18,
    color: colors.sunlitSand,
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  description: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
});

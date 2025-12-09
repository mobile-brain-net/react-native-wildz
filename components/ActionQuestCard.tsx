import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ActionQuest } from '../lib/actionsSeed';

type ActionQuestCardProps = {
  action: ActionQuest;
  onComplete: () => void;
  completedToday: boolean;
};

export function ActionQuestCard({ action, onComplete, completedToday }: ActionQuestCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.description}>{action.description}</Text>
        <Text style={styles.count}>Completed {action.timesCompleted} times</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, completedToday && styles.buttonCompleted]}
        onPress={onComplete}
        disabled={completedToday}
        activeOpacity={0.7}
      >
        {completedToday ? (
          <Check size={20} color={colors.inkForest} />
        ) : (
          <Text style={styles.buttonText}>Done</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
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
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.sunlitSand,
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  description: {
    fontFamily: typography.bodyRegular,
    fontSize: 13,
    color: colors.skyMist,
    lineHeight: 18,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  count: {
    fontFamily: typography.metadata,
    fontSize: 10,
    color: colors.emberOrange,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: colors.sunlitSand,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: colors.sunlitSand,
  },
  buttonCompleted: {
    backgroundColor: colors.leafGreen,
    borderColor: colors.leafGreen,
    shadowColor: colors.leafGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkForest,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

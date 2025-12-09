import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { storage } from '../../lib/storage';
import { initialActions, ActionQuest } from '../../lib/actionsSeed';
import { ActionQuestCard } from '../../components/ActionQuestCard';
import { ImpactSummaryCard } from '../../components/ImpactSummaryCard';

export default function ImpactScreen() {
  const [actions, setActions] = useState<ActionQuest[]>([]);

  useEffect(() => {
    loadActions();
  }, []);

  async function loadActions() {
    const saved = await storage.getActions();
    if (saved.length === 0) {
      const initialized = initialActions.map((a) => ({
        ...a,
        timesCompleted: 0,
      }));
      setActions(initialized);
      await storage.setActions(initialized);
    } else {
      setActions(saved);
    }
  }

  async function completeAction(actionId: string) {
    const now = new Date().toISOString().split('T')[0];
    const updated = actions.map((a) =>
      a.id === actionId
        ? { ...a, timesCompleted: a.timesCompleted + 1, lastCompletedAt: now }
        : a
    );
    setActions(updated);
    await storage.setActions(updated);
  }

  function isCompletedToday(action: ActionQuest): boolean {
    if (!action.lastCompletedAt) return false;
    const today = new Date().toISOString().split('T')[0];
    return action.lastCompletedAt === today;
  }

  function getWeeklyStats() {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyActions = actions.filter((a) => {
      if (!a.lastCompletedAt) return false;
      const completedDate = new Date(a.lastCompletedAt);
      return completedDate >= weekAgo;
    });

    const categoryCount: Record<string, number> = {};
    weeklyActions.forEach((a) => {
      categoryCount[a.category] = (categoryCount[a.category] || 0) + 1;
    });

    const topCategory =
      Object.keys(categoryCount).length > 0
        ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
        : '';

    return {
      weeklyTotal: weeklyActions.length,
      topCategory,
      streak: calculateStreak(),
    };
  }

  function calculateStreak(): number {
    const sortedActions = [...actions]
      .filter((a) => a.lastCompletedAt)
      .sort((a, b) => b.lastCompletedAt!.localeCompare(a.lastCompletedAt!));

    if (sortedActions.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const lastCompleted = sortedActions[0].lastCompletedAt!;
    if (lastCompleted !== today && lastCompleted !== yesterdayStr) return 0;

    let streak = 0;
    let checkDate = new Date(lastCompleted);

    const completionDates = new Set(sortedActions.map((a) => a.lastCompletedAt));

    while (completionDates.has(checkDate.toISOString().split('T')[0])) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return streak;
  }

  const categories = Array.from(new Set(initialActions.map((a) => a.category)));
  const stats = getWeeklyStats();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Conservation Impact</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
        <ImpactSummaryCard
          weeklyTotal={stats.weeklyTotal}
          topCategory={stats.topCategory}
          streak={stats.streak}
        />

        {categories.map((category) => {
          const categoryActions = actions.filter((a) => a.category === category);
          return (
            <View key={category} style={styles.section}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {categoryActions.map((action) => (
                <ActionQuestCard
                  key={action.id}
                  action={action}
                  onComplete={() => completeAction(action.id)}
                  completedToday={isCompletedToday(action)}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inkForest,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontFamily: typography.header,
    fontSize: 28,
    color: colors.sunlitSand,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: colors.sunlitSand,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: typography.header,
    fontSize: 20,
    color: colors.sunlitSand,
    marginBottom: 12,
  },
});

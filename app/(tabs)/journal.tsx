import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { storage, FieldLog } from '../../lib/storage';
import { biomeTypes, speciesData } from '../../lib/speciesData';
import { FieldLogCard } from '../../components/FieldLogCard';
import { DateSectionHeader } from '../../components/DateSectionHeader';
import { TagChip } from '../../components/TagChip';
import { EmptyState } from '../../components/EmptyState';

type LogSection = {
  title: string;
  data: FieldLog[];
};

const weatherOptions = ['Sunny', 'Partly Cloudy', 'Overcast', 'Rainy', 'Foggy', 'Snowy', 'Windy'];

export default function JournalScreen() {
  const [logs, setLogs] = useState<FieldLog[]>([]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [newLog, setNewLog] = useState<Partial<FieldLog>>({
    speciesName: '',
    biome: biomeTypes[0],
    weather: weatherOptions[0],
    locationNote: '',
    notes: '',
  });

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const saved = await storage.getJournal();
    setLogs(saved.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  async function saveLog() {
    if (!newLog.speciesName) return;

    const now = new Date();
    const log: FieldLog = {
      id: Date.now().toString(),
      speciesName: newLog.speciesName || '',
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      biome: newLog.biome || biomeTypes[0],
      weather: newLog.weather || weatherOptions[0],
      locationNote: newLog.locationNote,
      notes: newLog.notes,
    };

    const updated = [log, ...logs];
    setLogs(updated);
    await storage.setJournal(updated);
    setEditorVisible(false);
    resetForm();
  }

  function resetForm() {
    setNewLog({
      speciesName: '',
      biome: biomeTypes[0],
      weather: weatherOptions[0],
      locationNote: '',
      notes: '',
    });
  }

  function getDateLabel(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (daysAgo < 7) return `${daysAgo} days ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const sections: LogSection[] = logs.reduce((acc, log) => {
    const label = getDateLabel(log.date);
    let section = acc.find((s) => s.title === label);
    if (!section) {
      section = { title: label, data: [] };
      acc.push(section);
    }
    section.data.push(log);
    return acc;
  }, [] as LogSection[]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Field Journal</Text>
        </View>

        {logs.length === 0 ? (
          <EmptyState
            icon={<Plus size={48} color={colors.skyMist} />}
            title="No Observations Yet"
            message="Start logging wildlife sightings and field observations"
          />
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FieldLogCard log={item} />}
            renderSectionHeader={({ section }) => <DateSectionHeader label={section.title} />}
            contentContainerStyle={styles.list}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setEditorVisible(true)}
          activeOpacity={0.8}
        >
          <Plus size={24} color={colors.inkForest} />
        </TouchableOpacity>
      </SafeAreaView>

      <Modal
        visible={editorVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Log</Text>
            <TouchableOpacity onPress={() => setEditorVisible(false)}>
              <X size={24} color={colors.skyMist} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Species Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., White-tailed Deer"
              placeholderTextColor={colors.skyMist + '60'}
              value={newLog.speciesName}
              onChangeText={(text) => setNewLog({ ...newLog, speciesName: text })}
            />

            <Text style={styles.label}>Biome</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipRow}
              contentContainerStyle={styles.chipRowContent}
            >
              {biomeTypes.map((biome) => (
                <TagChip
                  key={biome}
                  label={biome}
                  selected={newLog.biome === biome}
                  onPress={() => setNewLog({ ...newLog, biome })}
                />
              ))}
            </ScrollView>

            <Text style={styles.label}>Weather</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipRow}
              contentContainerStyle={styles.chipRowContent}
            >
              {weatherOptions.map((weather) => (
                <TagChip
                  key={weather}
                  label={weather}
                  selected={newLog.weather === weather}
                  onPress={() => setNewLog({ ...newLog, weather })}
                />
              ))}
            </ScrollView>

            <Text style={styles.label}>Location Note</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Near creek crossing"
              placeholderTextColor={colors.skyMist + '60'}
              value={newLog.locationNote}
              onChangeText={(text) => setNewLog({ ...newLog, locationNote: text })}
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Observations, behavior, habitat details..."
              placeholderTextColor={colors.skyMist + '60'}
              value={newLog.notes}
              onChangeText={(text) => setNewLog({ ...newLog, notes: text })}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[styles.saveButton, !newLog.speciesName && styles.saveButtonDisabled]}
              onPress={saveLog}
              disabled={!newLog.speciesName}
            >
              <Text style={styles.saveButtonText}>Save Log</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.sunlitSand,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.sunlitSand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: colors.skyMist,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.inkForest,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.duskMoss,
  },
  modalTitle: {
    fontFamily: typography.header,
    fontSize: 24,
    color: colors.sunlitSand,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.sunlitSand,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.duskMoss,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: typography.bodyRegular,
    fontSize: 16,
    color: colors.skyMist,
    borderWidth: 1,
    borderColor: colors.skyMist + '20',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipRow: {
    maxHeight: 50,
  },
  chipRowContent: {
    gap: 8,
  },
  saveButton: {
    backgroundColor: colors.sunlitSand,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: colors.skyMist + '40',
  },
  saveButtonText: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.inkForest,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, BookMarked } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { speciesData, biomeTypes, Species } from '../../lib/speciesData';
import { storage } from '../../lib/storage';
import { SpeciesCard } from '../../components/SpeciesCard';
import { SpeciesDetailSheet } from '../../components/SpeciesDetailSheet';
import { TagChip } from '../../components/TagChip';
import { EmptyState } from '../../components/EmptyState';

export default function GuideScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBiome, setSelectedBiome] = useState<string>('All');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    const saved = await storage.getBookmarks();
    setBookmarks(saved);
  }

  async function toggleBookmark(speciesId: string) {
    const newBookmarks = bookmarks.includes(speciesId)
      ? bookmarks.filter((id) => id !== speciesId)
      : [...bookmarks, speciesId];
    setBookmarks(newBookmarks);
    await storage.setBookmarks(newBookmarks);
  }

  function openDetail(species: Species) {
    setSelectedSpecies(species);
    setDetailVisible(true);
  }

  const filteredSpecies = speciesData.filter((species) => {
    const matchesSearch =
      searchQuery === '' ||
      species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.latinName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBiome = selectedBiome === 'All' || species.biome === selectedBiome;
    return matchesSearch && matchesBiome;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Species Guide</Text>
          <View style={styles.searchContainer}>
            <Search size={18} color={colors.skyMist} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search species..."
              placeholderTextColor={colors.skyMist + '80'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              blurOnSubmit={true}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.biomeFilters}
          contentContainerStyle={styles.biomeFiltersContent}
        >
          <TagChip
            label="All"
            selected={selectedBiome === 'All'}
            onPress={() => setSelectedBiome('All')}
          />
          {biomeTypes.map((biome) => (
            <TagChip
              key={biome}
              label={biome}
              selected={selectedBiome === biome}
              onPress={() => setSelectedBiome(biome)}
            />
          ))}
        </ScrollView>

        {filteredSpecies.length === 0 ? (
          <EmptyState
            icon={<Search size={48} color={colors.skyMist} />}
            title="No Species Found"
            message="Try adjusting your search or filter to find species"
          />
        ) : (
          <FlatList
            data={filteredSpecies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <SpeciesCard
                  species={item}
                  bookmarked={bookmarks.includes(item.id)}
                  onPress={() => openDetail(item)}
                  onBookmark={() => toggleBookmark(item.id)}
                />
              </View>
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        <SpeciesDetailSheet
          species={selectedSpecies}
          visible={detailVisible}
          onClose={() => setDetailVisible(false)}
        />
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
    marginBottom: 16,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: colors.sunlitSand,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.duskMoss,
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.skyMist + '40',
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.bodyRegular,
    fontSize: 15,
    color: colors.skyMist,
    letterSpacing: 0.5,
  },
  biomeFilters: {
    maxHeight: 50,
    marginBottom: 12,
    flexGrow: 0,
  },
  biomeFiltersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 12,
  },
});

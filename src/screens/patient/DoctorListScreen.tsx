import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { DoctorCard } from '../../components/DoctorCard';
import { doctors } from '../../data/mockData';

const specialties = ['All', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'General Physician'];

export function DoctorListScreen({ navigation }: any) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = doctors.filter((d) => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || d.specialty === filter;
        return matchSearch && matchFilter;
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <View style={styles.headerRow}>
                    <ScreenHeader title="Find Doctors" rightElement={
                        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilters(!showFilters)}>
                            <SlidersHorizontal size={18} color={Colors.primary} />
                        </TouchableOpacity>
                    } />
                </View>
                <View style={styles.searchWrapper}>
                    <View style={styles.searchRow}>
                        <Search size={18} color={Colors.gray400} />
                        <TextInput
                            style={styles.searchInput}
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search by name or specialty"
                            placeholderTextColor={Colors.gray400}
                        />
                    </View>
                    {showFilters && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={{ gap: 8 }}>
                            {specialties.map((s) => (
                                <TouchableOpacity
                                    key={s}
                                    style={[styles.filterChip, filter === s && styles.filterChipActive]}
                                    onPress={() => setFilter(s)}
                                >
                                    <Text style={[styles.filterChipText, filter === s && styles.filterChipTextActive]}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </View>

            <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.count}>{filtered.length} doctors found</Text>
                {filtered.length === 0 ? (
                    <View style={styles.empty}>
                        <Search size={48} color={Colors.gray200} />
                        <Text style={styles.emptyTitle}>No doctors found</Text>
                        <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
                    </View>
                ) : (
                    filtered.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    headerArea: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
    headerRow: {},
    searchWrapper: { paddingHorizontal: 20, paddingBottom: 16 },
    searchRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50,
        borderRadius: 12, paddingHorizontal: 14, gap: 10, borderWidth: 1, borderColor: Colors.gray100,
    },
    searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: Colors.gray900 },
    filterBtn: {
        width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.blue50,
        alignItems: 'center', justifyContent: 'center',
    },
    filterRow: { marginTop: 12 },
    filterChip: {
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.gray100,
    },
    filterChipActive: { backgroundColor: Colors.primary },
    filterChipText: { fontSize: 12, color: Colors.gray600 },
    filterChipTextActive: { color: Colors.white },
    list: { flex: 1 },
    listContent: { padding: 20, gap: 12 },
    count: { fontSize: 13, color: Colors.gray500 },
    empty: { alignItems: 'center', paddingVertical: 64 },
    emptyTitle: { fontSize: 14, color: Colors.gray400, marginTop: 12 },
    emptySubtitle: { fontSize: 12, color: Colors.gray300, marginTop: 4 },
});

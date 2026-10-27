import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { AppointmentCard } from '../../components/AppointmentCard';
import { appointments } from '../../data/mockData';

export function AppointmentsScreen() {
    const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
    const filtered = appointments.filter((a) =>
        tab === 'upcoming' ? a.status === 'upcoming' : a.status === 'completed' || a.status === 'cancelled'
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Appointments</Text>
                <View style={styles.tabs}>
                    {(['upcoming', 'completed'] as const).map((t) => (
                        <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
                            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                                {t === 'upcoming' ? 'Upcoming' : 'Past'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {filtered.length === 0 ? (
                    <View style={styles.empty}>
                        <CalendarDays size={48} color={Colors.gray200} />
                        <Text style={styles.emptyTitle}>No {tab} appointments</Text>
                        <Text style={styles.emptySubtitle}>Your appointments will appear here</Text>
                    </View>
                ) : (
                    filtered.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    header: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
    title: { fontSize: 20, color: Colors.gray900, fontWeight: '700', marginBottom: 16 },
    tabs: { flexDirection: 'row', gap: 8 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', backgroundColor: Colors.gray100 },
    tabActive: { backgroundColor: Colors.primary },
    tabText: { fontSize: 13, color: Colors.gray500, fontWeight: '500' },
    tabTextActive: { color: Colors.white },
    list: { padding: 20, gap: 12 },
    empty: { alignItems: 'center', paddingVertical: 64 },
    emptyTitle: { fontSize: 14, color: Colors.gray400, marginTop: 12 },
    emptySubtitle: { fontSize: 12, color: Colors.gray300, marginTop: 4 },
});

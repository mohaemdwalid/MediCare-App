import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Search, Bell, Stethoscope, SmilePlus, Eye, Heart, Brain, Bone, Sparkles, Wind } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { DoctorCard } from '../../components/DoctorCard';
import { doctors, appointments, categories } from '../../data/mockData';

const iconMap: Record<string, any> = { Stethoscope, SmilePlus, Eye, Heart, Brain, Bone, Sparkles, Wind };

export function HomeScreen({ navigation }: any) {
    const [search, setSearch] = useState('');
    const upcoming = appointments.find((a) => a.status === 'upcoming');

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Good Morning</Text>
                        <Text style={styles.userName}>Ahmed Mostafa</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.bellBtn}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Bell size={20} color={Colors.white} />
                        <View style={styles.bellDot} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchRow}>
                    <Search size={18} color="#93C5FD" />
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search doctors, specialties..."
                        placeholderTextColor="#93C5FD"
                    />
                </View>
            </View>

            {/* Upcoming Appointment */}
            {upcoming && (
                <View style={styles.upcomingWrapper}>
                    <TouchableOpacity
                        style={styles.upcomingCard}
                        onPress={() => navigation.navigate('AppointmentDetail', { id: upcoming.id })}
                        activeOpacity={0.7}
                    >
                        <View style={styles.upcomingBadge}>
                            <Text style={styles.upcomingBadgeText}>Upcoming Appointment</Text>
                        </View>
                        <View style={styles.upcomingRow}>
                            <Image source={{ uri: upcoming.doctorImage }} style={styles.upcomingImg} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.upcomingName}>{upcoming.doctorName}</Text>
                                <Text style={styles.upcomingSpec}>{upcoming.specialty}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.upcomingDate}>{upcoming.date}</Text>
                                <Text style={styles.upcomingTime}>{upcoming.time}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {/* Categories */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>
                <View style={styles.catGrid}>
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon];
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.catItem}
                                onPress={() => navigation.navigate('DoctorList')}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.catIcon, { backgroundColor: cat.color + '15' }]}>
                                    {Icon && <Icon size={22} color={cat.color} />}
                                </View>
                                <Text style={styles.catName}>{cat.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Top Doctors */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Doctors</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('DoctorList')}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={doctors.slice(0, 4)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => <DoctorCard doctor={item} compact />}
                />
            </View>

            {/* Recommended */}
            <View style={[styles.section, { marginBottom: 24 }]}>
                <Text style={styles.sectionTitle}>Recommended</Text>
                <View style={{ gap: 12, marginTop: 12 }}>
                    {doctors.slice(0, 3).map((doc) => (
                        <DoctorCard key={doc.id} doctor={doc} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    header: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 24,
    },
    headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    greeting: { color: '#BFDBFE', fontSize: 13 },
    userName: { color: Colors.white, fontSize: 20, fontWeight: '700' },
    bellBtn: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center', justifyContent: 'center',
    },
    bellDot: {
        position: 'absolute', top: 4, right: 4, width: 10, height: 10,
        backgroundColor: Colors.red400, borderRadius: 5, borderWidth: 2, borderColor: Colors.primary,
    },
    searchRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12, paddingHorizontal: 14, gap: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    searchInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: Colors.white },
    upcomingWrapper: { paddingHorizontal: 20, marginTop: -16 },
    upcomingCard: {
        backgroundColor: Colors.white, borderRadius: 16, padding: 16,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
        borderWidth: 1, borderColor: Colors.gray100,
    },
    upcomingBadge: { marginBottom: 12 },
    upcomingBadgeText: {
        fontSize: 12, color: Colors.primary, backgroundColor: Colors.blue50,
        paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-start', overflow: 'hidden',
    },
    upcomingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    upcomingImg: { width: 48, height: 48, borderRadius: 12 },
    upcomingName: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    upcomingSpec: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
    upcomingDate: { fontSize: 13, color: Colors.gray900 },
    upcomingTime: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
    section: { paddingHorizontal: 20, marginTop: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    sectionTitle: { fontSize: 16, color: Colors.gray900, fontWeight: '700' },
    seeAll: { fontSize: 13, color: Colors.primary },
    catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
    catItem: { width: '25%', alignItems: 'center', paddingVertical: 12 },
    catIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    catName: { fontSize: 11, color: Colors.gray600, marginTop: 6 },
});

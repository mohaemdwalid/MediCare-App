import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CalendarDays, Clock, Users, CheckCircle, Bell, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { doctorImages } from '../../data/mockData';

const todayAppointments = [
    { id: '1', patient: 'يوسف عبد الله', time: '9:00 AM', type: 'In-Person', status: 'confirmed' },
    { id: '2', patient: 'مريم حسين', time: '10:30 AM', type: 'Video Call', status: 'confirmed' },
    { id: '3', patient: 'خالد سعيد', time: '1:00 PM', type: 'In-Person', status: 'pending' },
    { id: '4', patient: 'هبة محمود', time: '3:00 PM', type: 'Video Call', status: 'pending' },
];

export function DoctorDashboard({ navigation }: any) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.docRow}>
                        <Image source={{ uri: doctorImages[1] }} style={styles.docImg} />
                        <View>
                            <Text style={styles.greeting}>Good Morning</Text>
                            <Text style={styles.docName}>د. سارة المصري</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bellBtn}><Bell size={20} color={Colors.white} /></TouchableOpacity>
                </View>

                <View style={styles.statsGrid}>
                    {[
                        { icon: Users, val: '24', label: 'Patients' },
                        { icon: CalendarDays, val: '8', label: 'Today' },
                        { icon: CheckCircle, val: '4', label: 'Completed' },
                    ].map((s) => (
                        <View key={s.label} style={styles.statCard}>
                            <s.icon size={20} color={Colors.white} />
                            <Text style={styles.statVal}>{s.val}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.content}>
                {/* Quick Actions */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('ManageAvailability')}>
                        <Clock size={18} color={Colors.primary} />
                        <Text style={styles.actionText}>Manage Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('AppointmentRequests')}>
                        <CalendarDays size={18} color={Colors.orange500} />
                        <Text style={styles.actionText}>Requests (3)</Text>
                    </TouchableOpacity>
                </View>

                {/* Today's Appointments */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Appointments</Text>
                    <Text style={styles.dateText}>Feb 27, 2026 - القاهرة</Text>
                </View>

                <View style={{ gap: 12 }}>
                    {todayAppointments.map((apt) => (
                        <TouchableOpacity key={apt.id} style={styles.aptCard}
                            onPress={() => navigation.navigate('PatientDetails', { id: apt.id })} activeOpacity={0.7}>
                            <View style={styles.aptIcon}><Users size={18} color={Colors.primary} /></View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.aptName}>{apt.patient}</Text>
                                <View style={styles.aptMeta}>
                                    <Clock size={12} color={Colors.gray400} />
                                    <Text style={styles.aptTime}>{apt.time}</Text>
                                    <Text style={styles.aptType}>• {apt.type}</Text>
                                </View>
                            </View>
                            <View style={[styles.aptBadge, { backgroundColor: apt.status === 'confirmed' ? Colors.green50 : Colors.orange50 }]}>
                                <Text style={[styles.aptBadgeText, { color: apt.status === 'confirmed' ? Colors.green600 : Colors.orange500 }]}>{apt.status}</Text>
                            </View>
                            <ChevronRight size={16} color={Colors.gray300} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.switchBtn} onPress={() => navigation.replace('Login')}>
                    <Text style={styles.switchText}>Switch Account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    docRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    docImg: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
    greeting: { color: '#BFDBFE', fontSize: 12 },
    docName: { color: Colors.white, fontSize: 18, fontWeight: '700' },
    bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    statsGrid: { flexDirection: 'row', gap: 12 },
    statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, alignItems: 'center' },
    statVal: { color: Colors.white, fontSize: 18, fontWeight: '700', marginTop: 4 },
    statLabel: { color: '#BFDBFE', fontSize: 10, marginTop: 2 },
    content: { paddingHorizontal: 20, paddingVertical: 20 },
    actionsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.white, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    actionText: { fontSize: 13, color: Colors.gray700 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 16, color: Colors.gray900, fontWeight: '700' },
    dateText: { fontSize: 12, color: Colors.gray400 },
    aptCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    aptIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center' },
    aptName: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    aptMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    aptTime: { fontSize: 12, color: Colors.gray500 },
    aptType: { fontSize: 11, color: Colors.gray400 },
    aptBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
    aptBadgeText: { fontSize: 11, fontWeight: '500' },
    switchBtn: { backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginTop: 24 },
    switchText: { fontSize: 14, color: Colors.gray400 },
});

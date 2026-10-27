import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { User, Phone, Mail, CalendarDays, FileText, AlertCircle } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

export function PatientDetails() {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Patient Details" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Patient Info */}
                <View style={[styles.card, { alignItems: 'center' }]}>
                    <View style={styles.avatar}><User size={32} color={Colors.primary} /></View>
                    <Text style={styles.name}>يوسف عبد الله</Text>
                    <Text style={styles.info}>Male, 35 years</Text>
                    <View style={styles.contactRow}>
                        <TouchableOpacity style={[styles.contactBtn, { backgroundColor: Colors.blue50 }]}>
                            <Phone size={16} color={Colors.primary} /><Text style={[styles.contactText, { color: Colors.primary }]}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.contactBtn, { backgroundColor: Colors.green50 }]}>
                            <Mail size={16} color={Colors.green600} /><Text style={[styles.contactText, { color: Colors.green600 }]}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Medical Info */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Medical Information</Text>
                    {[
                        { icon: AlertCircle, color: Colors.red500, bg: Colors.red50, label: 'Allergies', val: 'Penicillin, Peanuts' },
                        { icon: FileText, color: Colors.primary, bg: Colors.blue50, label: 'Blood Type', val: 'A+' },
                        { icon: CalendarDays, color: Colors.purple500, bg: Colors.purple50, label: 'Last Visit', val: 'Jan 15, 2026' },
                    ].map((item) => (
                        <View key={item.label} style={styles.medRow}>
                            <View style={[styles.medIcon, { backgroundColor: item.bg }]}><item.icon size={16} color={item.color} /></View>
                            <View><Text style={styles.medLabel}>{item.label}</Text><Text style={styles.medVal}>{item.val}</Text></View>
                        </View>
                    ))}
                </View>

                {/* Visit History */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Visit History</Text>
                    {[
                        { date: 'Jan 15, 2026', reason: 'Follow-up checkup', notes: 'Blood pressure normal' },
                        { date: 'Dec 10, 2025', reason: 'Chest pain', notes: 'ECG normal, stress test recommended' },
                        { date: 'Oct 5, 2025', reason: 'Annual checkup', notes: 'All vitals within range' },
                    ].map((visit, i) => (
                        <View key={i} style={styles.visitItem}>
                            <Text style={styles.visitDate}>{visit.date}</Text>
                            <Text style={styles.visitReason}>{visit.reason}</Text>
                            <Text style={styles.visitNotes}>{visit.notes}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 16, paddingBottom: 40 },
    card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    name: { fontSize: 18, color: Colors.gray900, fontWeight: '700' },
    info: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
    contactRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
    contactBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderRadius: 12 },
    contactText: { fontSize: 13, fontWeight: '500' },
    cardTitle: { fontSize: 14, color: Colors.gray900, fontWeight: '600', marginBottom: 12 },
    medRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    medIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    medLabel: { fontSize: 12, color: Colors.gray400 },
    medVal: { fontSize: 13, color: Colors.gray900, marginTop: 2 },
    visitItem: { borderLeftWidth: 2, borderLeftColor: Colors.blue200, paddingLeft: 12, paddingVertical: 4, marginBottom: 12 },
    visitDate: { fontSize: 12, color: Colors.primary },
    visitReason: { fontSize: 13, color: Colors.gray900, marginTop: 2 },
    visitNotes: { fontSize: 11, color: Colors.gray400, marginTop: 2 },
});

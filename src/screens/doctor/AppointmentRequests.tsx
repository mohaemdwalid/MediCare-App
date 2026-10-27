import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Check, X, Clock, CalendarDays, User } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

const requestsData = [
    { id: '1', patient: 'إيمان محمد', age: 28, time: 'Mar 1 at 10:00 AM', type: 'Video Call', reason: 'Annual checkup' },
    { id: '2', patient: 'رامي عادل', age: 45, time: 'Mar 1 at 2:00 PM', type: 'In-Person', reason: 'Follow-up consultation' },
    { id: '3', patient: 'ياسمين علي', age: 33, time: 'Mar 2 at 11:00 AM', type: 'Video Call', reason: 'Chest pain evaluation' },
];

export function AppointmentRequests() {
    const [items, setItems] = useState(requestsData);
    const handleAction = (id: string) => setItems(items.filter((r) => r.id !== id));

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Appointment Requests" rightElement={
                <View style={styles.badge}><Text style={styles.badgeText}>{items.length} pending</Text></View>
            } />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {items.length === 0 ? (
                    <View style={styles.empty}>
                        <CalendarDays size={48} color={Colors.gray200} />
                        <Text style={styles.emptyText}>No pending requests</Text>
                    </View>
                ) : (
                    items.map((req) => (
                        <View key={req.id} style={styles.card}>
                            <View style={styles.patientRow}>
                                <View style={styles.patientIcon}><User size={20} color={Colors.primary} /></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.patientName}>{req.patient}</Text>
                                    <Text style={styles.patientAge}>Age: {req.age}</Text>
                                </View>
                            </View>
                            <View style={styles.detailsList}>
                                <View style={styles.detailItem}><Clock size={13} color={Colors.gray400} /><Text style={styles.detailText}>{req.time}</Text></View>
                                <View style={styles.detailItem}><CalendarDays size={13} color={Colors.gray400} /><Text style={styles.detailText}>{req.type}</Text></View>
                                <Text style={styles.reasonText}>Reason: {req.reason}</Text>
                            </View>
                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.declineBtn} onPress={() => handleAction(req.id)}>
                                    <X size={16} color={Colors.red500} /><Text style={styles.declineText}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAction(req.id)}>
                                    <Check size={16} color={Colors.white} /><Text style={styles.acceptText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: { backgroundColor: Colors.orange50, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12 },
    badgeText: { fontSize: 12, color: Colors.orange500 },
    content: { padding: 20, gap: 12 },
    card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    patientRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    patientIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center' },
    patientName: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    patientAge: { fontSize: 12, color: Colors.gray400, marginTop: 2 },
    detailsList: { gap: 6, marginBottom: 12, paddingLeft: 8 },
    detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    detailText: { fontSize: 12, color: Colors.gray600 },
    reasonText: { fontSize: 12, color: Colors.gray500 },
    actionRow: { flexDirection: 'row', gap: 12 },
    declineBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.red50, paddingVertical: 10, borderRadius: 12 },
    declineText: { fontSize: 13, color: Colors.red500 },
    acceptBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, paddingVertical: 10, borderRadius: 12 },
    acceptText: { fontSize: 13, color: Colors.white },
    empty: { alignItems: 'center', paddingVertical: 64 },
    emptyText: { fontSize: 14, color: Colors.gray400, marginTop: 12 },
});

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { CalendarDays, Clock, Video, MapPin, Phone, MessageCircle, X } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { appointments } from '../../data/mockData';

export function AppointmentDetailScreen({ route, navigation }: any) {
    const { id } = route.params;
    const appointment = appointments.find((a) => a.id === id);
    const [showCancel, setShowCancel] = useState(false);

    if (!appointment) return null;

    const statusStyle = appointment.status === 'upcoming' ? { bg: Colors.blue50, text: Colors.primary }
        : appointment.status === 'completed' ? { bg: Colors.green50, text: Colors.green600 }
            : { bg: Colors.red50, text: Colors.red500 };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Appointment Details" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Doctor Info */}
                <View style={styles.card}>
                    <View style={styles.docRow}>
                        <Image source={{ uri: appointment.doctorImage }} style={styles.docImg} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.docName}>{appointment.doctorName}</Text>
                            <Text style={styles.docSpec}>{appointment.specialty}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                                <Text style={[styles.statusText, { color: statusStyle.text }]}>{appointment.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Schedule */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Schedule</Text>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.blue50 }]}><CalendarDays size={18} color={Colors.primary} /></View>
                        <Text style={styles.detailText}>{appointment.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.green50 }]}><Clock size={18} color={Colors.green500} /></View>
                        <Text style={styles.detailText}>{appointment.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.purple50 }]}>
                            {appointment.type === 'Video Call' ? <Video size={18} color={Colors.purple500} /> : <MapPin size={18} color={Colors.purple500} />}
                        </View>
                        <Text style={styles.detailText}>{appointment.type}</Text>
                    </View>
                </View>

                {/* Actions */}
                {appointment.status === 'upcoming' && (
                    <View style={{ gap: 12 }}>
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.blue50 }]}
                                onPress={() => navigation.navigate('Chat', { id: appointment.doctorId })}>
                                <MessageCircle size={18} color={Colors.primary} /><Text style={[styles.actionText, { color: Colors.primary }]}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.green50 }]}>
                                <Phone size={18} color={Colors.green600} /><Text style={[styles.actionText, { color: Colors.green600 }]}>Call</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowCancel(true)}>
                            <Text style={styles.cancelBtnText}>Cancel Appointment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Cancel Modal */}
            <Modal visible={showCancel} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Cancel Appointment</Text>
                            <TouchableOpacity onPress={() => setShowCancel(false)}><X size={20} color={Colors.gray400} /></TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Are you sure you want to cancel this appointment? This action cannot be undone.</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalGoBack} onPress={() => setShowCancel(false)}>
                                <Text style={styles.modalGoBackText}>Go Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalCancel} onPress={() => { setShowCancel(false); navigation.goBack(); }}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 16 },
    card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    docRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    docImg: { width: 64, height: 64, borderRadius: 12 },
    docName: { fontSize: 15, color: Colors.gray900, fontWeight: '600' },
    docSpec: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-start', marginTop: 4 },
    statusText: { fontSize: 11, fontWeight: '500', textTransform: 'capitalize' },
    cardTitle: { fontSize: 14, color: Colors.gray900, fontWeight: '600', marginBottom: 12 },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    detailIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    detailText: { fontSize: 13, color: Colors.gray700 },
    actionRow: { flexDirection: 'row', gap: 12 },
    actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 12 },
    actionText: { fontSize: 13, fontWeight: '500' },
    cancelBtn: { backgroundColor: Colors.red50, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
    cancelBtnText: { fontSize: 14, color: Colors.red500 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 18, color: Colors.gray900, fontWeight: '700' },
    modalText: { fontSize: 14, color: Colors.gray500, marginBottom: 24 },
    modalActions: { flexDirection: 'row', gap: 12 },
    modalGoBack: { flex: 1, backgroundColor: Colors.gray100, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    modalGoBackText: { fontSize: 14, color: Colors.gray700 },
    modalCancel: { flex: 1, backgroundColor: Colors.red500, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    modalCancelText: { fontSize: 14, color: Colors.white },
});

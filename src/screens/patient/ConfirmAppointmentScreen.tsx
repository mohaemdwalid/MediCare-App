import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CalendarDays, Clock, MapPin, Video, CreditCard } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { doctors } from '../../data/mockData';

export function ConfirmAppointmentScreen({ route, navigation }: any) {
    const { id, date, time, type } = route.params;
    const doctor = doctors.find((d) => d.id === id);
    if (!doctor) return null;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Confirm Appointment" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Doctor Card */}
                <View style={styles.card}>
                    <View style={styles.docRow}>
                        <Image source={{ uri: doctor.image }} style={styles.docImg} />
                        <View>
                            <Text style={styles.docName}>{doctor.name}</Text>
                            <Text style={styles.docSpec}>{doctor.specialty}</Text>
                            <Text style={styles.docHos}>{doctor.hospital}</Text>
                        </View>
                    </View>
                </View>

                {/* Details */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Appointment Details</Text>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.blue50 }]}>
                            <CalendarDays size={18} color={Colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.detailVal}>{date}</Text>
                            <Text style={styles.detailLabel}>Date</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.green50 }]}>
                            <Clock size={18} color={Colors.green500} />
                        </View>
                        <View>
                            <Text style={styles.detailVal}>{time}</Text>
                            <Text style={styles.detailLabel}>Time</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={[styles.detailIcon, { backgroundColor: Colors.purple50 }]}>
                            {type === 'Video Call' ? <Video size={18} color={Colors.purple500} /> : <MapPin size={18} color={Colors.purple500} />}
                        </View>
                        <View>
                            <Text style={styles.detailVal}>{type}</Text>
                            <Text style={styles.detailLabel}>Appointment Type</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Summary */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Payment Summary</Text>
                    <View style={styles.payRow}>
                        <Text style={styles.payLabel}>Consultation Fee</Text>
                        <Text style={styles.payVal}>{doctor.fee} EGP</Text>
                    </View>
                    <View style={styles.payRow}>
                        <Text style={styles.payLabel}>Service Charge</Text>
                        <Text style={styles.payVal}>25 EGP</Text>
                    </View>
                    <View style={[styles.payRow, styles.payTotal]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalVal}>{doctor.fee + 25} EGP</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.payBtn}
                    onPress={() => navigation.navigate('Payment', { id: doctor.id, date, time, type })}
                    activeOpacity={0.8}
                >
                    <CreditCard size={18} color={Colors.white} />
                    <Text style={styles.payBtnText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 16, paddingBottom: 100 },
    card: {
        backgroundColor: Colors.white, borderRadius: 16, padding: 16,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
    },
    docRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    docImg: { width: 64, height: 64, borderRadius: 12 },
    docName: { fontSize: 15, color: Colors.gray900, fontWeight: '600' },
    docSpec: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
    docHos: { fontSize: 12, color: Colors.gray400, marginTop: 2 },
    cardTitle: { fontSize: 14, color: Colors.gray900, fontWeight: '600', marginBottom: 12 },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    detailIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    detailVal: { fontSize: 13, color: Colors.gray900 },
    detailLabel: { fontSize: 11, color: Colors.gray400, marginTop: 2 },
    payRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    payLabel: { fontSize: 13, color: Colors.gray500 },
    payVal: { fontSize: 13, color: Colors.gray900 },
    payTotal: { borderTopWidth: 1, borderTopColor: Colors.gray100, paddingTop: 8, marginTop: 4 },
    totalLabel: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    totalVal: { fontSize: 16, color: Colors.primary, fontWeight: '700' },
    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray100,
        paddingHorizontal: 20, paddingVertical: 16,
    },
    payBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    payBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

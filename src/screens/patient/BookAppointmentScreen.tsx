import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TimeSlotSelector } from '../../components/TimeSlotSelector';
import { doctors } from '../../data/mockData';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getWeekDays(offset: number) {
    const today = new Date();
    today.setDate(today.getDate() + offset * 7);
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        return d;
    });
}

export function BookAppointmentScreen({ route, navigation }: any) {
    const { id } = route.params;
    const doctor = doctors.find((d) => d.id === id);
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [appointmentType, setAppointmentType] = useState<'In-Person' | 'Video Call'>('In-Person');
    const days = getWeekDays(weekOffset);

    if (!doctor) return null;

    const handleConfirm = () => {
        if (selectedSlot) {
            navigation.navigate('ConfirmAppointment', {
                id: doctor.id,
                date: selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                time: selectedSlot,
                type: appointmentType,
            });
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScreenHeader title="Book Appointment" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Doctor Info */}
                <View style={styles.doctorRow}>
                    <Image source={{ uri: doctor.image }} style={styles.docImg} />
                    <View>
                        <Text style={styles.docName}>{doctor.name}</Text>
                        <Text style={styles.docSpec}>{doctor.specialty}</Text>
                    </View>
                </View>

                {/* Appointment Type */}
                <Text style={styles.sectionTitle}>Appointment Type</Text>
                <View style={styles.typeRow}>
                    {(['In-Person', 'Video Call'] as const).map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.typeBtn, appointmentType === type && styles.typeBtnActive]}
                            onPress={() => setAppointmentType(type)}
                        >
                            <Text style={[styles.typeText, appointmentType === type && styles.typeTextActive]}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Calendar */}
                <View style={styles.calHeader}>
                    <Text style={styles.sectionTitle}>Select Date</Text>
                    <View style={styles.calNav}>
                        <TouchableOpacity style={styles.calNavBtn} onPress={() => setWeekOffset(weekOffset - 1)}>
                            <ChevronLeft size={16} color={Colors.gray600} />
                        </TouchableOpacity>
                        <Text style={styles.calMonth}>
                            {days[0].toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </Text>
                        <TouchableOpacity style={styles.calNavBtn} onPress={() => setWeekOffset(weekOffset + 1)}>
                            <ChevronRight size={16} color={Colors.gray600} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.daysGrid}>
                    {days.map((day) => {
                        const isSelected = day.toDateString() === selectedDate.toDateString();
                        const isToday = day.toDateString() === new Date().toDateString();
                        return (
                            <TouchableOpacity
                                key={day.toISOString()}
                                style={[styles.dayBtn, isSelected && styles.dayBtnSelected, !isSelected && isToday && styles.dayBtnToday]}
                                onPress={() => setSelectedDate(day)}
                            >
                                <Text style={[styles.dayLabel, isSelected && { color: '#BFDBFE' }]}>
                                    {daysOfWeek[day.getDay()]}
                                </Text>
                                <Text style={[styles.dayNum, isSelected && { color: Colors.white }]}>
                                    {day.getDate()}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Time Slots */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Available Time</Text>
                <TimeSlotSelector slots={doctor.availableSlots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.continueBtn, !selectedSlot && styles.continueBtnDisabled]}
                    onPress={handleConfirm}
                    disabled={!selectedSlot}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.continueBtnText, !selectedSlot && { color: Colors.gray400 }]}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { paddingHorizontal: 20, paddingBottom: 100 },
    doctorRow: {
        flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.gray50,
        borderRadius: 16, padding: 12, marginBottom: 24,
    },
    docImg: { width: 56, height: 56, borderRadius: 12 },
    docName: { fontSize: 15, color: Colors.gray900, fontWeight: '600' },
    docSpec: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
    sectionTitle: { fontSize: 15, color: Colors.gray900, fontWeight: '600', marginBottom: 12 },
    typeRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    typeBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', backgroundColor: Colors.gray50 },
    typeBtnActive: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
    },
    typeText: { fontSize: 13, color: Colors.gray600 },
    typeTextActive: { color: Colors.white },
    calHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    calNav: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    calNavBtn: {
        width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.gray50,
        alignItems: 'center', justifyContent: 'center',
    },
    calMonth: { fontSize: 13, color: Colors.gray600, minWidth: 80, textAlign: 'center' },
    daysGrid: { flexDirection: 'row', gap: 4 },
    dayBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12 },
    dayBtnSelected: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
    },
    dayBtnToday: { backgroundColor: Colors.blue50 },
    dayLabel: { fontSize: 10, color: Colors.gray400, marginBottom: 4 },
    dayNum: { fontSize: 15, color: Colors.gray700, fontWeight: '500' },
    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray100,
        paddingHorizontal: 20, paddingVertical: 16,
    },
    continueBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    continueBtnDisabled: { backgroundColor: Colors.gray200, shadowOpacity: 0 },
    continueBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

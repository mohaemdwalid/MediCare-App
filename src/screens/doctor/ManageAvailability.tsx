import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const initialSchedule: Record<string, { enabled: boolean; slots: string[] }> = {
    Monday: { enabled: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    Tuesday: { enabled: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    Wednesday: { enabled: true, slots: ['09:00', '10:00', '11:00'] },
    Thursday: { enabled: true, slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    Friday: { enabled: true, slots: ['09:00', '10:00', '14:00', '15:00'] },
    Saturday: { enabled: false, slots: [] },
    Sunday: { enabled: false, slots: [] },
};

export function ManageAvailability() {
    const [schedule, setSchedule] = useState(initialSchedule);

    const toggleDay = (day: string) => {
        setSchedule({ ...schedule, [day]: { ...schedule[day], enabled: !schedule[day].enabled } });
    };

    const removeSlot = (day: string, slot: string) => {
        setSchedule({ ...schedule, [day]: { ...schedule[day], slots: schedule[day].slots.filter((s) => s !== slot) } });
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Manage Availability" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {daysOfWeek.map((day) => (
                    <View key={day} style={styles.card}>
                        <View style={styles.dayHeader}>
                            <Text style={styles.dayName}>{day}</Text>
                            <Switch value={schedule[day].enabled} onValueChange={() => toggleDay(day)}
                                trackColor={{ false: Colors.gray300, true: Colors.primary }} thumbColor={Colors.white} />
                        </View>
                        {schedule[day].enabled && (
                            <View style={styles.slotsRow}>
                                {schedule[day].slots.map((slot) => (
                                    <View key={slot} style={styles.slotChip}>
                                        <Text style={styles.slotText}>{slot}</Text>
                                        <TouchableOpacity onPress={() => removeSlot(day, slot)}><X size={12} color={Colors.blue300} /></TouchableOpacity>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.addChip}>
                                    <Plus size={12} color={Colors.gray400} /><Text style={styles.addText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
                    <Text style={styles.saveBtnText}>Save Schedule</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 12, paddingBottom: 40 },
    card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    dayHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    dayName: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    slotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    slotChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.blue50, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
    slotText: { fontSize: 12, color: Colors.primary },
    addChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.gray50, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
    addText: { fontSize: 12, color: Colors.gray400 },
    saveBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    saveBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface TimeSlotSelectorProps {
    slots: string[];
    selectedSlot: string | null;
    onSelect: (slot: string) => void;
}

export function TimeSlotSelector({ slots, selectedSlot, onSelect }: TimeSlotSelectorProps) {
    if (slots.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No available slots for this date</Text>
            </View>
        );
    }

    return (
        <View style={styles.grid}>
            {slots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                    <TouchableOpacity
                        key={slot}
                        style={[styles.slot, isSelected && styles.slotSelected]}
                        onPress={() => onSelect(slot)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>{slot}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    slot: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: Colors.gray50,
        minWidth: '30%',
        alignItems: 'center',
    },
    slotSelected: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    slotText: {
        fontSize: 13,
        color: Colors.gray700,
        fontWeight: '500',
    },
    slotTextSelected: {
        color: Colors.white,
    },
    empty: {
        paddingVertical: 32,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: Colors.gray400,
    },
});

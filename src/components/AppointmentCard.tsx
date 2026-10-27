import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarDays, Clock, Video, MapPin } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { Appointment } from '../data/mockData';

const statusColors: Record<string, { bg: string; text: string }> = {
    upcoming: { bg: Colors.blue50, text: Colors.primary },
    completed: { bg: Colors.green50, text: Colors.green600 },
    cancelled: { bg: Colors.red50, text: Colors.red500 },
};

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
    const navigation = useNavigation<any>();
    const sc = statusColors[appointment.status];

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AppointmentDetail', { id: appointment.id })}
            activeOpacity={0.7}
        >
            <View style={styles.topRow}>
                <Image source={{ uri: appointment.doctorImage }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{appointment.doctorName}</Text>
                    <Text style={styles.specialty}>{appointment.specialty}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: sc.bg }]}>
                    <Text style={[styles.badgeText, { color: sc.text }]}>{appointment.status}</Text>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <View style={styles.metaItem}>
                    <CalendarDays size={14} color={Colors.gray400} />
                    <Text style={styles.metaText}>{appointment.date}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Clock size={14} color={Colors.gray400} />
                    <Text style={styles.metaText}>{appointment.time}</Text>
                </View>
                <View style={styles.metaItem}>
                    {appointment.type === 'Video Call' ? (
                        <Video size={14} color={Colors.primary} />
                    ) : (
                        <MapPin size={14} color={Colors.green500} />
                    )}
                    <Text style={styles.metaText}>{appointment.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: Colors.gray50,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        fontSize: 14,
        color: Colors.gray900,
        fontWeight: '600',
    },
    specialty: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.gray50,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: Colors.gray600,
    },
});

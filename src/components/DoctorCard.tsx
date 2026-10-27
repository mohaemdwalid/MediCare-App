import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { Doctor } from '../data/mockData';

interface DoctorCardProps {
    doctor: Doctor;
    compact?: boolean;
}

export function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
    const navigation = useNavigation<any>();

    if (compact) {
        return (
            <TouchableOpacity
                style={styles.compactCard}
                onPress={() => navigation.navigate('DoctorProfile', { id: doctor.id })}
                activeOpacity={0.7}
            >
                <Image source={{ uri: doctor.image }} style={styles.compactImage} />
                <Text style={styles.compactName} numberOfLines={1}>{doctor.name}</Text>
                <Text style={styles.compactSpecialty}>{doctor.specialty}</Text>
                <View style={styles.ratingRow}>
                    <Star size={11} color={Colors.yellow400} fill={Colors.yellow400} />
                    <Text style={styles.metaText}>{doctor.rating}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DoctorProfile', { id: doctor.id })}
            activeOpacity={0.7}
        >
            <Image source={{ uri: doctor.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{doctor.name}</Text>
                <Text style={styles.specialty}>{doctor.specialty}</Text>
                <View style={styles.metaRow}>
                    <View style={styles.ratingRow}>
                        <Star size={12} color={Colors.yellow400} fill={Colors.yellow400} />
                        <Text style={styles.metaText}>{doctor.rating}</Text>
                        <Text style={styles.metaLight}>({doctor.reviews})</Text>
                    </View>
                    <View style={styles.ratingRow}>
                        <MapPin size={12} color={Colors.gray400} />
                        <Text style={styles.metaLight}>{doctor.hospital}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.fee}>{doctor.fee} EGP</Text>
                <Text style={styles.feeLabel}>per visit</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: Colors.gray50,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        fontSize: 15,
        color: Colors.gray900,
        fontWeight: '600',
    },
    specialty: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 2,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: Colors.gray600,
    },
    metaLight: {
        fontSize: 11,
        color: Colors.gray400,
    },
    feeContainer: {
        alignItems: 'flex-end',
    },
    fee: {
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '600',
    },
    feeLabel: {
        fontSize: 10,
        color: Colors.gray400,
    },
    compactCard: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 12,
        minWidth: 140,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: Colors.gray50,
    },
    compactImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 8,
    },
    compactName: {
        fontSize: 13,
        color: Colors.gray900,
        fontWeight: '600',
        textAlign: 'center',
    },
    compactSpecialty: {
        fontSize: 11,
        color: Colors.gray500,
        marginTop: 2,
    },
});

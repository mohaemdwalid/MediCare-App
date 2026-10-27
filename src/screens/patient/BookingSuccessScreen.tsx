import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { CheckCircle, CalendarDays } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

export function BookingSuccessScreen({ navigation }: any) {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
        Animated.timing(opacity, { toValue: 1, delay: 300, duration: 500, useNativeDriver: true }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.iconCircle, { transform: [{ scale }] }]}>
                <CheckCircle size={48} color={Colors.green500} />
            </Animated.View>
            <Animated.View style={{ opacity, alignItems: 'center' }}>
                <Text style={styles.title}>Booking Successful!</Text>
                <Text style={styles.subtitle}>
                    Your appointment has been booked successfully. You will receive a confirmation email shortly.
                </Text>
            </Animated.View>
            <Animated.View style={{ opacity, width: '100%', gap: 12 }}>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('PatientTabs', { screen: 'Appointments' })} activeOpacity={0.8}>
                    <CalendarDays size={18} color={Colors.white} />
                    <Text style={styles.primaryBtnText}>View Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('PatientTabs', { screen: 'Home' })} activeOpacity={0.8}>
                    <Text style={styles.secondaryBtnText}>Back to Home</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
    iconCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.green50, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
    title: { fontSize: 22, color: Colors.gray900, fontWeight: '700', marginBottom: 8 },
    subtitle: { fontSize: 14, color: Colors.gray500, textAlign: 'center', maxWidth: 260, marginBottom: 32 },
    primaryBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    primaryBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
    secondaryBtn: { backgroundColor: Colors.gray100, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
    secondaryBtnText: { color: Colors.gray700, fontSize: 15, fontWeight: '500' },
});

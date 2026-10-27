import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CreditCard, Lock } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { doctors } from '../../data/mockData';

export function PaymentScreen({ route, navigation }: any) {
    const { id } = route.params;
    const doctor = doctors.find((d) => d.id === id);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [method, setMethod] = useState<'card' | 'apple' | 'google'>('card');

    if (!doctor) return null;

    const formatCard = (val: string) => {
        const digits = val.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Payment" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Card Preview */}
                <View style={styles.cardPreview}>
                    <View style={styles.cardTop}>
                        <CreditCard size={28} color={Colors.white} />
                        <Text style={styles.cardBrand}>VISA</Text>
                    </View>
                    <Text style={styles.cardNum}>{cardNumber || '•••• •••• •••• ••••'}</Text>
                    <View style={styles.cardBottom}>
                        <View><Text style={styles.cardLabel}>CARD HOLDER</Text><Text style={styles.cardVal}>Ahmed Mostafa</Text></View>
                        <View><Text style={styles.cardLabel}>EXPIRES</Text><Text style={styles.cardVal}>{expiry || 'MM/YY'}</Text></View>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.methodRow}>
                    {(['card', 'apple', 'google'] as const).map((m) => (
                        <TouchableOpacity key={m} style={[styles.methodBtn, method === m && styles.methodBtnActive]} onPress={() => setMethod(m)}>
                            <Text style={[styles.methodText, method === m && styles.methodTextActive]}>
                                {m === 'card' ? 'Credit Card' : m === 'apple' ? 'Apple Pay' : 'Google Pay'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Card Form */}
                {method === 'card' && (
                    <View style={styles.formCard}>
                        <View>
                            <Text style={styles.label}>Card Number</Text>
                            <TextInput style={styles.input} value={cardNumber} onChangeText={(v) => setCardNumber(formatCard(v))} placeholder="1234 5678 9012 3456" placeholderTextColor={Colors.gray400} keyboardType="number-pad" />
                        </View>
                        <View style={styles.formRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>Expiry Date</Text>
                                <TextInput style={styles.input} value={expiry} onChangeText={setExpiry} placeholder="MM/YY" placeholderTextColor={Colors.gray400} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput style={styles.input} value={cvv} onChangeText={setCvv} placeholder="123" placeholderTextColor={Colors.gray400} secureTextEntry keyboardType="number-pad" />
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.secureRow}>
                    <Lock size={14} color={Colors.gray400} />
                    <Text style={styles.secureText}>Your payment information is encrypted and secure</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('BookingSuccess')} activeOpacity={0.8}>
                    <Text style={styles.payBtnText}>Pay {doctor.fee + 25} EGP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 16, paddingBottom: 100 },
    cardPreview: {
        borderRadius: 16, padding: 20, backgroundColor: Colors.primary,
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8,
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    cardBrand: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
    cardNum: { fontSize: 18, color: Colors.white, letterSpacing: 4, marginBottom: 16 },
    cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
    cardLabel: { fontSize: 10, color: '#93C5FD' },
    cardVal: { fontSize: 13, color: Colors.white, marginTop: 2 },
    methodRow: { flexDirection: 'row', gap: 8 },
    methodBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.gray200, backgroundColor: Colors.white },
    methodBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    methodText: { fontSize: 12, color: Colors.gray600 },
    methodTextActive: { color: Colors.white },
    formCard: {
        backgroundColor: Colors.white, borderRadius: 16, padding: 16, gap: 12,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
    },
    label: { fontSize: 13, color: Colors.gray600, marginBottom: 6 },
    input: {
        backgroundColor: Colors.gray50, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16,
        fontSize: 14, color: Colors.gray900, borderWidth: 1, borderColor: Colors.gray100,
    },
    formRow: { flexDirection: 'row', gap: 12 },
    secureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    secureText: { fontSize: 11, color: Colors.gray400 },
    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray100,
        paddingHorizontal: 20, paddingVertical: 16,
    },
    payBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    payBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

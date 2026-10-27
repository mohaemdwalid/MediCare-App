import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Mail, CheckCircle } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

export function ForgotPasswordScreen({ navigation }: any) {
    const [sent, setSent] = useState(false);

    if (sent) {
        return (
            <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                    <CheckCircle size={40} color={Colors.green500} />
                </View>
                <Text style={styles.successTitle}>Email Sent!</Text>
                <Text style={styles.successText}>We've sent a password reset link to your email address.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScreenHeader title="" />
            <View style={styles.content}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

                <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputRow}>
                        <Mail size={18} color={Colors.gray400} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={Colors.gray400}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => setSent(true)} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    content: { paddingHorizontal: 24, paddingTop: 8 },
    title: { fontSize: 24, color: Colors.gray900, fontWeight: '700', marginBottom: 8 },
    subtitle: { fontSize: 14, color: Colors.gray500, marginBottom: 32 },
    fieldWrapper: { marginBottom: 24 },
    label: { fontSize: 13, color: Colors.gray600, marginBottom: 6 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50,
        borderRadius: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.gray100, gap: 10,
    },
    input: { flex: 1, paddingVertical: 14, fontSize: 14, color: Colors.gray900 },
    button: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    buttonText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
    successContainer: { flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
    successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.green50, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    successTitle: { fontSize: 20, color: Colors.gray900, fontWeight: '700', marginBottom: 8 },
    successText: { fontSize: 14, color: Colors.gray500, textAlign: 'center', marginBottom: 32 },
});

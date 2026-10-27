import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Heart, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

export function SignUpScreen({ navigation }: any) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <Heart size={28} color={Colors.white} fill={Colors.white} />
                </View>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputRow}>
                        <User size={18} color={Colors.gray400} />
                        <TextInput style={styles.input} placeholder="Enter your full name" placeholderTextColor={Colors.gray400} />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputRow}>
                        <Mail size={18} color={Colors.gray400} />
                        <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor={Colors.gray400} keyboardType="email-address" autoCapitalize="none" />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.inputRow}>
                        <Phone size={18} color={Colors.gray400} />
                        <TextInput style={styles.input} placeholder="Enter your phone number" placeholderTextColor={Colors.gray400} keyboardType="phone-pad" />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputRow}>
                        <Lock size={18} color={Colors.gray400} />
                        <TextInput style={styles.input} placeholder="Create a password" placeholderTextColor={Colors.gray400} secureTextEntry={!showPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} color={Colors.gray400} /> : <Eye size={18} color={Colors.gray400} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.replace('PatientTabs')} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.loginRow}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: Colors.white },
    container: { paddingHorizontal: 24, paddingTop: 52 },
    header: { alignItems: 'center', marginBottom: 32 },
    iconBox: {
        width: 56, height: 56, backgroundColor: Colors.primary, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center', marginBottom: 12,
    },
    title: { fontSize: 24, color: Colors.gray900, fontWeight: '700' },
    subtitle: { fontSize: 14, color: Colors.gray500, marginTop: 4 },
    form: { gap: 14 },
    label: { fontSize: 13, color: Colors.gray600, marginBottom: 6 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50,
        borderRadius: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.gray100, gap: 10,
    },
    input: { flex: 1, paddingVertical: 14, fontSize: 14, color: Colors.gray900 },
    button: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    buttonText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
    loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, marginBottom: 32 },
    loginText: { fontSize: 13, color: Colors.gray500 },
    loginLink: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
});

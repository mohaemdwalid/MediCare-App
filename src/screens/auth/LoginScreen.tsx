import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Heart, Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

export function LoginScreen({ navigation }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email.toLowerCase().includes('doctor')) {
            navigation.replace('DoctorStack');
        } else {
            navigation.replace('PatientTabs');
        }
    };

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <View style={styles.iconBox}>
                    <Heart size={28} color={Colors.white} fill={Colors.white} />
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputRow}>
                        <Mail size={18} color={Colors.gray400} />
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            placeholderTextColor={Colors.gray400}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputRow}>
                        <Lock size={18} color={Colors.gray400} />
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            placeholderTextColor={Colors.gray400}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} color={Colors.gray400} /> : <Eye size={18} color={Colors.gray400} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.forgotRow} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Text style={styles.socialIcon}>G</Text>
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Text style={styles.socialIcon}>f</Text>
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.tip}>Tip: Type "doctor" in email to access doctor dashboard</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: Colors.white },
    container: { paddingHorizontal: 24, paddingTop: 60 },
    header: { alignItems: 'center', marginBottom: 40 },
    iconBox: {
        width: 56, height: 56, backgroundColor: Colors.primary, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center', marginBottom: 12,
    },
    title: { fontSize: 24, color: Colors.gray900, fontWeight: '700' },
    subtitle: { fontSize: 14, color: Colors.gray500, marginTop: 4 },
    form: { gap: 16 },
    label: { fontSize: 13, color: Colors.gray600, marginBottom: 6 },
    inputRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50,
        borderRadius: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.gray100, gap: 10,
    },
    input: { flex: 1, paddingVertical: 14, fontSize: 14, color: Colors.gray900 },
    forgotRow: { alignSelf: 'flex-end' },
    forgotText: { fontSize: 13, color: Colors.primary },
    button: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    buttonText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
    divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
    dividerLine: { flex: 1, height: 1, backgroundColor: Colors.gray200 },
    dividerText: { fontSize: 12, color: Colors.gray400 },
    socialRow: { flexDirection: 'row', gap: 12 },
    socialBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderWidth: 1, borderColor: Colors.gray200, borderRadius: 12, paddingVertical: 14,
    },
    socialIcon: { fontSize: 18, color: Colors.gray700, fontWeight: '700' },
    socialText: { fontSize: 13, color: Colors.gray700 },
    signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
    signupText: { fontSize: 13, color: Colors.gray500 },
    signupLink: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
    tip: { textAlign: 'center', fontSize: 11, color: Colors.gray400, marginTop: 16, marginBottom: 32 },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { User, Camera } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

export function EditProfileScreen({ navigation }: any) {
    const [form, setForm] = useState({
        name: 'Ahmed Mostafa', email: 'ahmed.mostafa@email.com', phone: '+20 (100) 123-4567',
        dob: '1990-01-15', gender: 'Male', address: 'مدينة نصر، القاهرة',
    });

    const fieldLabels: Record<string, string> = { name: 'Name', email: 'Email', phone: 'Phone', dob: 'Date of Birth', gender: 'Gender', address: 'Address' };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Edit Profile" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}><User size={40} color={Colors.primary} /></View>
                    <TouchableOpacity style={styles.cameraBtn}><Camera size={14} color={Colors.white} /></TouchableOpacity>
                </View>

                <View style={{ gap: 12 }}>
                    {Object.entries(form).map(([key, value]) => (
                        <View key={key}>
                            <Text style={styles.label}>{fieldLabels[key] || key}</Text>
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={(v) => setForm({ ...form, [key]: v })}
                            />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, paddingBottom: 40 },
    avatarWrapper: { alignItems: 'center', marginBottom: 24 },
    avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center' },
    cameraBtn: { position: 'absolute', bottom: 0, right: '35%', width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white },
    label: { fontSize: 13, color: Colors.gray600, marginBottom: 6, textTransform: 'capitalize' },
    input: { backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, fontSize: 14, color: Colors.gray900, borderWidth: 1, borderColor: Colors.gray200 },
    saveBtn: {
        backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24,
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    saveBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

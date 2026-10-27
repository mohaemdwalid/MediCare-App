import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { Bell, Moon, Globe, Lock, Shield, Trash2 } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';

export function SettingsScreen({ navigation }: any) {
    const [notifs, setNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
            <ScreenHeader title="Settings" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.row}>
                    <Bell size={18} color={Colors.primary} /><Text style={styles.label}>Notifications</Text>
                    <Switch value={notifs} onValueChange={setNotifs} trackColor={{ false: Colors.gray300, true: Colors.primary }} thumbColor={Colors.white} />
                </View>
                <View style={styles.row}>
                    <Moon size={18} color={Colors.primary} /><Text style={styles.label}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: Colors.gray300, true: Colors.primary }} thumbColor={Colors.white} />
                </View>
                <TouchableOpacity style={styles.row}>
                    <Globe size={18} color={Colors.primary} /><Text style={styles.label}>Language</Text>
                    <Text style={styles.val}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Lock size={18} color={Colors.primary} /><Text style={styles.label}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <Shield size={18} color={Colors.primary} /><Text style={styles.label}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row, { backgroundColor: Colors.red50, marginTop: 16 }]}>
                    <Trash2 size={18} color={Colors.red500} /><Text style={[styles.label, { color: Colors.red500 }]}>Delete Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20, gap: 8 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: 12, padding: 16 },
    label: { flex: 1, fontSize: 14, color: Colors.gray700 },
    val: { fontSize: 13, color: Colors.gray400 },
});

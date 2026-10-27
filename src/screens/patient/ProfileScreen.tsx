import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { User, Settings, Edit, ChevronRight, LogOut, CreditCard, Bell, Shield, CircleHelp } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const menuItems = [
    { icon: Edit, label: 'Edit Profile', screen: 'EditProfile' },
    { icon: CreditCard, label: 'Payment Methods', screen: '' },
    { icon: Bell, label: 'Notifications', screen: 'Notifications' },
    { icon: Shield, label: 'Privacy & Security', screen: '' },
    { icon: CircleHelp, label: 'Help & Support', screen: '' },
    { icon: Settings, label: 'Settings', screen: 'Settings' },
];

export function ProfileScreen({ navigation }: any) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.userRow}>
                    <View style={styles.avatar}><User size={36} color={Colors.white} /></View>
                    <View>
                        <Text style={styles.userName}>Ahmed Mostafa</Text>
                        <Text style={styles.userEmail}>ahmed.mostafa@email.com</Text>
                        <Text style={styles.userPhone}>+20 (100) 123-4567</Text>
                    </View>
                </View>
            </View>

            {/* Stats */}
            <View style={styles.statsWrapper}>
                <View style={styles.statsCard}>
                    <View style={styles.statItem}><Text style={styles.statVal}>12</Text><Text style={styles.statLabel}>Appointments</Text></View>
                    <View style={[styles.statItem, styles.statBorder]}><Text style={styles.statVal}>4</Text><Text style={styles.statLabel}>Doctors</Text></View>
                    <View style={styles.statItem}><Text style={styles.statVal}>2</Text><Text style={styles.statLabel}>Reviews</Text></View>
                </View>
            </View>

            {/* Menu */}
            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity key={item.label} style={styles.menuItem}
                        onPress={() => item.screen && navigation.navigate(item.screen)}>
                        <View style={styles.menuIcon}><item.icon size={18} color={Colors.primary} /></View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <ChevronRight size={16} color={Colors.gray300} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
                    <View style={styles.logoutIcon}><LogOut size={18} color={Colors.red500} /></View>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 32, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerTitle: { color: Colors.white, fontSize: 20, fontWeight: '700', marginBottom: 24 },
    userRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    userName: { color: Colors.white, fontSize: 18, fontWeight: '700' },
    userEmail: { color: '#BFDBFE', fontSize: 13, marginTop: 2 },
    userPhone: { color: '#93C5FD', fontSize: 12, marginTop: 2 },
    statsWrapper: { paddingHorizontal: 20, marginTop: -16, marginBottom: 16 },
    statsCard: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, flexDirection: 'row', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    statItem: { flex: 1, alignItems: 'center' },
    statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.gray100 },
    statVal: { fontSize: 18, color: Colors.gray900, fontWeight: '700' },
    statLabel: { fontSize: 11, color: Colors.gray400, marginTop: 2 },
    menu: { paddingHorizontal: 20, gap: 8, paddingBottom: 32 },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: 12, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
    menuIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center' },
    menuLabel: { flex: 1, fontSize: 14, color: Colors.gray700 },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.red50, borderRadius: 12, padding: 14, marginTop: 8 },
    logoutIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center' },
    logoutText: { flex: 1, fontSize: 14, color: Colors.red500 },
});

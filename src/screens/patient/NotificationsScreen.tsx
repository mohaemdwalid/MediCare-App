import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Bell, CalendarDays, AlertCircle } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { ScreenHeader } from '../../components/ScreenHeader';
import { notifications } from '../../data/mockData';

const iconMap: Record<string, any> = { appointment: CalendarDays, reminder: Bell, system: AlertCircle };
const colorMap: Record<string, { bg: string; text: string }> = {
    appointment: { bg: Colors.blue50, text: Colors.primary },
    reminder: { bg: Colors.orange50, text: Colors.orange500 },
    system: { bg: Colors.gray50, text: Colors.gray500 },
};

export function NotificationsScreen() {
    return (
        <View style={styles.container}>
            <ScreenHeader title="Notifications" />
            <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
                {notifications.map((notif) => {
                    const Icon = iconMap[notif.type];
                    const color = colorMap[notif.type];
                    return (
                        <View key={notif.id} style={[styles.card, !notif.read && styles.cardUnread]}>
                            <View style={styles.row}>
                                <View style={[styles.iconBox, { backgroundColor: color.bg }]}>
                                    <Icon size={18} color={color.text} />
                                </View>
                                <View style={{ flex: 1, minWidth: 0 }}>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.title}>{notif.title}</Text>
                                        {!notif.read && <View style={styles.dot} />}
                                    </View>
                                    <Text style={styles.message}>{notif.message}</Text>
                                    <Text style={styles.time}>{notif.time}</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.gray50 },
    list: { padding: 20, gap: 12 },
    card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.gray50, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    cardUnread: { borderColor: Colors.blue100 },
    row: { flexDirection: 'row', gap: 12 },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
    message: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
    time: { fontSize: 11, color: Colors.gray400, marginTop: 4 },
});

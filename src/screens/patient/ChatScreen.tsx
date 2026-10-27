import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ArrowLeft, Send, Paperclip, Phone, Video } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { doctors } from '../../data/mockData';

interface Message { id: string; text: string; sender: 'patient' | 'doctor'; time: string; }

const initialMessages: Message[] = [
    { id: '1', text: 'Hello! How can I help you today?', sender: 'doctor', time: '10:00 AM' },
    { id: '2', text: "Hi Doctor, I've been having some headaches lately.", sender: 'patient', time: '10:02 AM' },
    { id: '3', text: 'I understand. How long have you been experiencing them? And can you describe the pain?', sender: 'doctor', time: '10:03 AM' },
    { id: '4', text: "For about a week now. It's a dull pain mostly in the afternoon.", sender: 'patient', time: '10:05 AM' },
    { id: '5', text: 'That could be tension headaches. Are you getting enough sleep and staying hydrated?', sender: 'doctor', time: '10:06 AM' },
];

export function ChatScreen({ route, navigation }: any) {
    const { id } = route.params;
    const doctor = doctors.find((d) => d.id === id) || doctors[0];
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const listRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(), text: input, sender: 'patient',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMsg]);
        setInput('');
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.gray50 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={18} color={Colors.gray700} />
                </TouchableOpacity>
                <Image source={{ uri: doctor.image }} style={styles.docImg} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.docName}>{doctor.name}</Text>
                    <Text style={styles.online}>Online</Text>
                </View>
                <TouchableOpacity style={styles.iconBtn}><Phone size={16} color={Colors.primary} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}><Video size={16} color={Colors.primary} /></TouchableOpacity>
            </View>

            {/* Messages */}
            <FlatList
                ref={listRef}
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.msgList}
                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
                renderItem={({ item: msg }) => (
                    <View style={[styles.msgRow, msg.sender === 'patient' ? styles.msgRight : styles.msgLeft]}>
                        <View style={[styles.bubble, msg.sender === 'patient' ? styles.bubblePatient : styles.bubbleDoctor]}>
                            <Text style={[styles.msgText, msg.sender === 'patient' && { color: Colors.white }]}>{msg.text}</Text>
                            <Text style={[styles.msgTime, msg.sender === 'patient' ? { color: '#BFDBFE' } : { color: Colors.gray400 }]}>{msg.time}</Text>
                        </View>
                    </View>
                )}
            />

            {/* Input */}
            <View style={styles.inputBar}>
                <TouchableOpacity style={styles.attachBtn}><Paperclip size={16} color={Colors.gray400} /></TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.gray400}
                    onSubmitEditing={handleSend}
                    returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                    <Send size={16} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
    },
    backBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.gray50, alignItems: 'center', justifyContent: 'center' },
    docImg: { width: 40, height: 40, borderRadius: 20 },
    docName: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    online: { fontSize: 11, color: Colors.green500 },
    iconBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center' },
    msgList: { padding: 16, gap: 12 },
    msgRow: { marginBottom: 4 },
    msgRight: { alignItems: 'flex-end' },
    msgLeft: { alignItems: 'flex-start' },
    bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
    bubblePatient: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
    bubbleDoctor: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
    msgText: { fontSize: 13, color: Colors.gray700 },
    msgTime: { fontSize: 10, marginTop: 4 },
    inputBar: {
        backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray100,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 8,
    },
    attachBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.gray50, alignItems: 'center', justifyContent: 'center' },
    input: { flex: 1, backgroundColor: Colors.gray50, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13, color: Colors.gray900 },
    sendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
});

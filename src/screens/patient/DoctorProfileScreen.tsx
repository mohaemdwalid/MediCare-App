import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, Star, Clock, Award, MapPin, MessageCircle, Phone, Video } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { RatingStars } from '../../components/RatingStars';
import { doctors, reviews } from '../../data/mockData';

export function DoctorProfileScreen({ route, navigation }: any) {
    const { id } = route.params;
    const doctor = doctors.find((d) => d.id === id);

    if (!doctor) {
        return (
            <View style={styles.notFound}><Text style={{ color: Colors.gray400 }}>Doctor not found</Text></View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Image */}
                <View>
                    <Image source={{ uri: doctor.image }} style={styles.heroImage} />
                    <View style={styles.gradient} />
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={20} color={Colors.gray700} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.name}>{doctor.name}</Text>
                        <Text style={styles.specialty}>{doctor.specialty}</Text>
                        <View style={styles.ratingRow}>
                            <Star size={14} color={Colors.yellow400} fill={Colors.yellow400} />
                            <Text style={styles.ratingVal}>{doctor.rating}</Text>
                            <Text style={styles.reviewCount}>({doctor.reviews} reviews)</Text>
                        </View>

                        <View style={styles.statsGrid}>
                            <View style={[styles.statCard, { backgroundColor: Colors.blue50 }]}>
                                <Award size={20} color={Colors.primary} />
                                <Text style={styles.statVal}>{doctor.experience}+</Text>
                                <Text style={styles.statLabel}>Years Exp.</Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: Colors.green50 }]}>
                                <Clock size={20} color={Colors.green500} />
                                <Text style={styles.statVal}>{doctor.availableSlots.length}</Text>
                                <Text style={styles.statLabel}>Slots Today</Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: Colors.orange50 }]}>
                                <MapPin size={20} color={Colors.orange500} />
                                <Text style={styles.statVal} numberOfLines={1}>{doctor.hospital.split(' ')[0]}</Text>
                                <Text style={styles.statLabel}>Hospital</Text>
                            </View>
                        </View>
                    </View>

                    {/* About */}
                    <Text style={styles.sectionTitle}>About Doctor</Text>
                    <Text style={styles.bio}>{doctor.bio}</Text>

                    {/* Communication */}
                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Communication</Text>
                    <View style={styles.commRow}>
                        <TouchableOpacity style={[styles.commBtn, { backgroundColor: Colors.blue50 }]}
                            onPress={() => navigation.navigate('Chat', { id: doctor.id })}>
                            <MessageCircle size={18} color={Colors.primary} />
                            <Text style={[styles.commText, { color: Colors.primary }]}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.commBtn, { backgroundColor: Colors.green50 }]}>
                            <Phone size={18} color={Colors.green600} />
                            <Text style={[styles.commText, { color: Colors.green600 }]}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.commBtn, { backgroundColor: Colors.purple50 }]}>
                            <Video size={18} color={Colors.purple600} />
                            <Text style={[styles.commText, { color: Colors.purple600 }]}>Video</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Reviews */}
                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Reviews</Text>
                    <View style={{ gap: 12 }}>
                        {reviews.map((r) => (
                            <View key={r.id} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewName}>{r.name}</Text>
                                    <Text style={styles.reviewDate}>{r.date}</Text>
                                </View>
                                <RatingStars rating={r.rating} size={12} />
                                <Text style={styles.reviewComment}>{r.comment}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.feeLabel}>Consultation Fee</Text>
                    <Text style={styles.feeVal}>{doctor.fee} EGP</Text>
                </View>
                <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => navigation.navigate('BookAppointment', { id: doctor.id })}
                    activeOpacity={0.8}
                >
                    <Text style={styles.bookBtnText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    heroImage: { width: '100%', height: 288 },
    gradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 100, backgroundColor: 'rgba(0,0,0,0.15)' },
    backBtn: {
        position: 'absolute', top: 52, left: 16, width: 40, height: 40, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
    },
    content: { paddingHorizontal: 20, marginTop: -24 },
    infoCard: {
        backgroundColor: Colors.white, borderRadius: 16, padding: 20,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 6,
        borderWidth: 1, borderColor: Colors.gray100,
    },
    name: { fontSize: 20, color: Colors.gray900, fontWeight: '700' },
    specialty: { fontSize: 14, color: Colors.primary, marginTop: 4 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
    ratingVal: { fontSize: 14, color: Colors.gray900, fontWeight: '600' },
    reviewCount: { fontSize: 12, color: Colors.gray400 },
    statsGrid: { flexDirection: 'row', gap: 12, marginTop: 20 },
    statCard: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center' },
    statVal: { fontSize: 14, color: Colors.gray900, fontWeight: '600', marginTop: 4 },
    statLabel: { fontSize: 10, color: Colors.gray500, marginTop: 2 },
    sectionTitle: { fontSize: 16, color: Colors.gray900, fontWeight: '700', marginTop: 24, marginBottom: 8 },
    bio: { fontSize: 13, color: Colors.gray500, lineHeight: 20 },
    commRow: { flexDirection: 'row', gap: 12 },
    commBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 12 },
    commText: { fontSize: 13, fontWeight: '500' },
    reviewCard: { backgroundColor: Colors.gray50, borderRadius: 12, padding: 12 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    reviewName: { fontSize: 13, color: Colors.gray900, fontWeight: '500' },
    reviewDate: { fontSize: 11, color: Colors.gray400 },
    reviewComment: { fontSize: 12, color: Colors.gray500, marginTop: 4 },
    bottomBar: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray100,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 16,
    },
    feeLabel: { fontSize: 11, color: Colors.gray400 },
    feeVal: { fontSize: 20, color: Colors.primary, fontWeight: '700' },
    bookBtn: {
        flex: 1, backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
    },
    bookBtnText: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});

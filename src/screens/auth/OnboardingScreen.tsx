import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Calendar, MessageCircle, Shield } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const slides = [
    {
        icon: Calendar,
        title: 'Easy Booking',
        description: 'Book appointments with top doctors in just a few taps. Choose your preferred time slot easily.',
        color: '#2F80ED',
    },
    {
        icon: MessageCircle,
        title: 'Chat with Doctors',
        description: 'Connect with your doctor anytime through secure in-app messaging and video consultations.',
        color: '#27AE60',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your health data is encrypted and protected. We prioritize your privacy and security.',
        color: '#9B51E0',
    },
];

export function OnboardingScreen({ navigation }: any) {
    const [current, setCurrent] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleNext = () => {
        if (current < slides.length - 1) {
            Animated.sequence([
                Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
                Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();
            setTimeout(() => setCurrent(current + 1), 150);
        } else {
            navigation.replace('Login');
        }
    };

    const Icon = slides[current].icon;

    return (
        <View style={styles.container}>
            <View style={styles.skipRow}>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
                    <View style={[styles.iconCircle, { backgroundColor: slides[current].color + '15' }]}>
                        <Icon size={48} color={slides[current].color} />
                    </View>
                    <Text style={styles.title}>{slides[current].title}</Text>
                    <Text style={styles.description}>{slides[current].description}</Text>
                </Animated.View>
            </View>

            <View style={styles.bottom}>
                <View style={styles.dots}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, i === current ? styles.dotActive : styles.dotInactive]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>
                        {current < slides.length - 1 ? 'Next' : 'Get Started'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    skipRow: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 56,
    },
    skipText: {
        fontSize: 14,
        color: Colors.gray400,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    center: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 112,
        height: 112,
        borderRadius: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 22,
        color: Colors.gray900,
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: Colors.gray500,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 280,
    },
    bottom: {
        paddingHorizontal: 32,
        paddingBottom: 48,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.primary,
    },
    dotInactive: {
        width: 8,
        backgroundColor: Colors.gray200,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: '600',
    },
});

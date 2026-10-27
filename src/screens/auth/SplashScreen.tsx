import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

export function SplashScreen({ navigation }: any) {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const textY = useRef(new Animated.Value(20)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(textY, { toValue: 0, duration: 500, useNativeDriver: true }),
                Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
            ]),
        ]).start();

        const timer = setTimeout(() => navigation.replace('Onboarding'), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.center, { transform: [{ scale }], opacity }]}>
                <View style={styles.iconBox}>
                    <Heart size={40} color={Colors.primary} fill={Colors.primary} />
                </View>
                <Animated.Text style={[styles.title, { transform: [{ translateY: textY }], opacity: textOpacity }]}>
                    MediCare
                </Animated.Text>
                <Animated.Text style={[styles.subtitle, { transform: [{ translateY: textY }], opacity: textOpacity }]}>
                    Your Health, Our Priority
                </Animated.Text>
            </Animated.View>
            <ActivityIndicator size="small" color="rgba(255,255,255,0.6)" style={styles.loader} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
    },
    iconBox: {
        width: 80,
        height: 80,
        backgroundColor: Colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    title: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    subtitle: {
        color: '#BFDBFE',
        fontSize: 14,
        marginTop: 4,
    },
    loader: {
        position: 'absolute',
        bottom: 60,
    },
});

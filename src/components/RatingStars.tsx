import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { Colors } from '../theme/colors';

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
    return (
        <View style={styles.row}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    color={star <= Math.round(rating) ? Colors.yellow400 : Colors.gray300}
                    fill={star <= Math.round(rating) ? Colors.yellow400 : 'transparent'}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
});

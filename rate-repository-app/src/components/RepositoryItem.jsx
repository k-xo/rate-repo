import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 16
    },
    flexRow: {
        flexDirection: 'row'
    },
    languageContainer: {
        marginVertical: 10,
        flexDirection: 'row'
    },

    language: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 5,
        overflow: 'hidden',
        borderRadius: 3
    },

    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 4
    },
    statsItem: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 4
    }
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                <View style={{ marginTop: 4 }}>
                    <Text fontWeight='bold' fontSize='subheading'>
                        {item.fullName}
                    </Text>
                    <Text style={{ paddingTop: 5, width: 275 }} color='textSecondary'>
                        {item.description}
                    </Text>
                    <View style={styles.languageContainer}>
                        <Text style={styles.language}>{item.language}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsItem}>
                    <Text fontWeight='bold'>{item.stargazersCount}</Text>
                    <Text>Stars</Text>
                </View>

                <View style={styles.statsItem}>
                    <Text fontWeight='bold'>{item.forksCount}</Text>
                    <Text>Forks</Text>
                </View>

                <View style={styles.statsItem}>
                    <Text fontWeight='bold'>{item.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>

                <View style={styles.statsItem}>
                    <Text fontWeight='bold'>{item.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;

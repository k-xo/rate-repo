import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Pressable, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    separator: {
        height: 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading } = useRepository();
    const navigation = useNavigation();

    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    return (
        <View style>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ index, item }) => (
                    <Pressable onPress={() => navigation.navigate('Details', { item })}>
                        <RepositoryItem key={index} item={item} />
                    </Pressable>
                )}
            />
        </View>
    );
};

export default RepositoryList;

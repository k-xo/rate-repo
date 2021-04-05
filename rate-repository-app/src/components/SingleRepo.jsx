import React, { Fragment } from 'react';
import {
    View,
    Text,
    Pressable,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Button,
    TextInput
} from 'react-native';
import theme from '../theme';
import RepositoryItem from '../components/RepositoryItem';
import { GET_SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const renderHeader = () => {
    const styles = StyleSheet.create({
        header: {
            backgroundColor: '#f7f9fc',

            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        panelHeader: {
            alignItems: 'center'
        },
        panelHandle: {
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#00000040',
            marginBottom: 10
        }
    });
    return (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );
};

const RepositoryInfo = ({ item }) => {
    return (
        <Fragment>
            <RepositoryItem item={item} />
            <View style={{ padding: 20, backgroundColor: 'white', marginTop: -20 }}>
                <Pressable>
                    <View
                        style={{
                            padding: 10,
                            alignItems: 'center',
                            backgroundColor: theme.colors.primary,
                            overflow: 'hidden',
                            borderRadius: 3
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Open in Github</Text>
                    </View>
                </Pressable>
            </View>
        </Fragment>
    );
};

const ReviewItem = ({ review }) => {
    // Single review item
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            padding: 5,
            marginTop: 10
        },
        reviewContainer: {
            flexDirection: 'row',
            padding: 8
        },
        ratingContainer: {
            padding: 2,
            marginRight: 10
        },

        reviewRatingText: {
            overflow: 'hidden',
            borderRadius: 20,
            borderColor: 'blue',
            borderWidth: 2,
            padding: 10
        },

        reviewText: {
            fontSize: 17
        },

        reviewTextContainer: {
            flexShrink: 1
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.reviewContainer}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
                <View style={styles.reviewTextContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{review.user.username}</Text>
                    <Text style={{ marginBottom: 3, marginTop: 2 }}>05.05.20</Text>
                    <Text style={styles.reviewText}>{review.text}</Text>
                </View>
            </View>
        </View>
    );
};

const SingleRepo = ({ route }) => {
    const { item } = route.params;
    const { data, loading } = useQuery(GET_SINGLE_REPO, { variables: { id: item.id } });
    const sheetRef = React.useRef(null);

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }
    const reviewNodes = data?.repository.reviews.edges.map((edge) => edge.node);

    const renderContent = () => {
        const styles = StyleSheet.create({
            input: {
                borderWidth: 1,
                borderRadius: 3,
                borderColor: 'black',
                fontSize: 18,
                padding: 10,
                marginTop: 20
            },
            button: {
                backgroundColor: theme.colors.primary,
                color: 'white',
                padding: 5,
                overflow: 'hidden',
                borderRadius: 3,
                textAlign: 'center',
                marginTop: 80,
                padding: 13
            }
        });
        return (
            <View
                style={{
                    backgroundColor: '#f7f9fc',
                    padding: 16,
                    height: 650
                }}
            >
                <Text>Review the repo</Text>
                <Formik
                    initialValues={{ rating: '', review: '' }}
                    // validationSchema={validationSchema}
                    onSubmit={() => console.log(item)}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <View style={{ marginTop: 40 }}>
                                <TextInput
                                    placeholder='Rating'
                                    onChangeText={handleChange('rating')}
                                    value={values.username}
                                    style={styles.input}
                                />
                                <Text color='error'>{errors.username}</Text>
                                <TextInput
                                    placeholder='Review'
                                    onChangeText={handleChange('review')}
                                    value={values.password}
                                    style={styles.input}
                                />
                            </View>
                            {/* <Text color='error'>{errors.password}</Text> */}
                            <Pressable onPress={handleSubmit}>
                                <Text style={styles.button}>Submit</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </View>
        );
    };

    return (
        <Fragment>
            <View>
                <FlatList
                    data={reviewNodes}
                    keyExtractor={({ id }) => id}
                    // item here refers to the item in the single repo and not
                    // item in flatlist
                    ListHeaderComponent={() => <RepositoryInfo item={item} />}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                />
            </View>

            <View
                style={{
                    backgroundColor: theme.colors.primary,
                    maxHeight: 50,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    flexShrink: 1
                }}
            >
                <Button
                    color='white'
                    title='Add a Review'
                    onPress={() => sheetRef.current.snapTo(2)}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[0, 300, 650]}
                borderRadius={10}
                renderContent={renderContent}
                renderHeader={renderHeader}
                initialSnap={0}
            />
        </Fragment>
    );
};

export default SingleRepo;

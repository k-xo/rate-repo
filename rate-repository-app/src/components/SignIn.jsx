import React, { Fragment } from 'react';
import { TextInput, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import * as yup from 'yup';

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        padding: 16,
        flexDirection: 'column',
        flex: 1
    },
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
        marginTop: 20,
        padding: 13
    }
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters '),
    password: yup.string().required('Password is required')
});

const SignIn = ({ navigation }) => {
    const [signIn] = useSignIn();
    const { data, loading } = useQuery(AUTHORIZED_USER);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const onSubmit = async ({ username, password }) => {
        try {
            await signIn({ username, password });
            // navigation.navigate('Repositories');
        } catch (err) {
            console.log(err);
        }
    };

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        // navigation.navigate('Repositories');
    };

    // if (loading) {
    // 	return (
    // 		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    // 			<ActivityIndicator size='large' color='#0000ff' />
    // 		</View>
    // 	);
    // }

    return (
        <View style={styles.container}>
            {data?.authorizedUser ? (
                <View>
                    <Text>Welcome {data.authorizedUser.username}</Text>
                    <Pressable onPress={signOut}>
                        <Text>Sign Out</Text>
                    </Pressable>
                </View>
            ) : (
                <Fragment>
                    <View>
                        <Text fontSize='heading' fontWeight='bold'>
                            Login
                        </Text>
                    </View>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View>
                                <TextInput
                                    placeholder='Username'
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                    style={styles.input}
                                />
                                <Text color='error'>{errors.username}</Text>
                                <TextInput
                                    secureTextEntry
                                    placeholder='Password'
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    style={styles.input}
                                />
                                <Text color='error'>{errors.password}</Text>
                                <Pressable onPress={handleSubmit}>
                                    <Text style={styles.button}>Sign in</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </Fragment>
            )}
        </View>
    );
};

export default SignIn;

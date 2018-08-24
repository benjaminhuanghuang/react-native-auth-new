import React from "react";
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Dimensions from 'Dimensions';
import { Constants, Location, Permissions } from 'expo';

let width = Dimensions.get('window').width;

export default class LoginScreen extends React.Component {
    state = {
        username: '',
        password: '',
        message: 'Loing failed'
    }

    getInputHandler = key => val => {
        this.setState({ [key]: val })
    }

    onLogin() {
        console.log('Mouse click');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messages}>
                    {
                        this.state.message && (
                            <Text>{this.state.message}</Text>
                        )
                    }
                </View>
                <View style={styles.fields}>
                    <TextInput style={styles.textInput}
                        name="username"
                        placeholder='user name'
                        autoFocus
                        value={this.state.username}
                        onChangeText={this.getInputHandler('username')}
                    />
                    <TextInput style={styles.textInput}
                        name="password"
                        placeholder={'password'}
                        value={this.state.password}
                        onChangeText={this.getInputHandler('password')}
                        secureTextEntry />
                    <TouchableOpacity activeOpacity={0.5}>
                        <View style={styles.login} onPress={() => this.onLogin()}>
                            <Text style={{ color: '#FFF' }}>Log in</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.settings}>
                    <Text style={{ color: '#1E90FF' }}>
                        Forget password
                    </Text>
                    <Text style={{ color: '#1E90FF' }}>
                        Create account
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  // all sub items align to center
        paddingTop: Constants.statusBarHeight
    },
    messages: {
        alignItems: 'flex-start',
    },
    fields: {
        marginTop: 230,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        // alignSelf: 'center',   // only single sum item
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white'
    },

    textInput: {
        backgroundColor: '#FFF',
        width: width * 0.8,
        height: 38,
        marginBottom: 2,
        fontSize: 15,
        textAlign: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5
    },

    login: {
        height: 40,
        width: width * 0.8,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#1E90FF',
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',    // align sum items
        alignItems: 'center'          // align sum items
    },
    loginInnerView: {
        backgroundColor: 'red',
    },
    settings: {
        width: width * 0.8,
        flexDirection: 'row',
        marginTop: 13,
        justifyContent: 'space-between'
    },

    loginMethods: {
        flexDirection: 'row',
        marginTop: 13,
        // alignItems: 'flex-end'     // sub itmes align to bottom in the cross direction,
        alignItems: 'center',     // sub itmes align to center in the cross direction,
        position: 'absolute',
        bottom: 10,
        left: 10
    },

    loginIcon: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 20
    }
});
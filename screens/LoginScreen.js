import React from "react";
import PropTypes from 'prop-types';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Dimensions from 'Dimensions';
import { Constants, Location, Permissions } from 'expo';
//
import { connect } from 'react-redux';
//
import { logInUser } from '../redux/actions';

let screenWidth = Dimensions.get('window').width;

class LoginScreen extends React.Component {
    static propTypes = {
        err: PropTypes.string,
        token: PropTypes.string,
        logInUser: PropTypes.func,
    }

    state = {
        username: 'tutorial',
        password: 'tutorial',
    }

    getInputHandler = key => val => {
        this.setState({ [key]: val })
    }
    
    componentWillReceivePorp(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('Main');
        }
    }

    onLogin() {
        this.props.logInUser(this.state.username, this.state.password);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messages}>
                    <Text style={styles.error}>{this.props.err}</Text>
                </View>
                <View style={styles.fields}>
                    <TextInput style={styles.textInput}
                        name="username"
                        placeholder='user name'
                        autoFocus
                        autoCapitalize='none'
                        value={this.state.username}
                        onChangeText={this.getInputHandler('username')}
                    />
                    <TextInput style={styles.textInput}
                        name="password"
                        placeholder={'password'}
                        autoCapitalize='none'
                        value={this.state.password}
                        onChangeText={this.getInputHandler('password')}
                        secureTextEntry />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.onLogin()}>
                        <View style={styles.login} >
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
        paddingTop: Constants.statusBarHeight,
    },
    messages: {
        alignItems: 'flex-start',
        marginTop: 180,
        width: screenWidth * 0.8
    },
    fields: {
        marginTop: 30,
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
        width: screenWidth * 0.8,
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
        width: screenWidth * 0.8,
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
        width: screenWidth * 0.8,
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

const mapStateToProps = state => ({
    err: state.user.loginErr,
    token: state.user.token
});

const mapActionsToProps = {
    logInUser: logInUser
}
export default connect(mapStateToProps, mapActionsToProps)(LoginScreen);
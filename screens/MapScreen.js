import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Expo from 'expo';
import { Constants, Location, Permissions } from 'expo';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={`ios-map${focused ? '' : '-outline'}`} size={25} color={tintColor} />
        ),
      }

    state = {
        location: null,
        errorMessage: null,
        info: ''
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        // Query permission
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        // Geocode, address to acoordinate
        let location = await Location.getCurrentPositionAsync({});
        let officeLocation = (await Location.geocodeAsync("7575 Gateway Blvd, Newark, CA 94560"))[0];

        // reverse geocode
        let where = (await Location.reverseGeocodeAsync(location.coords))[0];

        this.setState({
            location,
            places: {
                officeLocation
            },
            where,
        });
    };

    render() {
        if (!this.state.location) {
            return <View />
        }
        return (
            <Expo.MapView style={{ flex: 1 }} provider={Expo.MapView.PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.01,
                }}
            >
                <Expo.MapView.Marker coordinate={this.state.location.coords}
                    title="You are here"
                    description={this.state.where.name} />

                <Expo.MapView.Marker coordinate={this.state.places.officeLocation}
                    title="RMS Office"
                    description="RMS is here"
                    pinColor="blue" />
            </Expo.MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Expo.Constants.statusBarHeight
    },
});
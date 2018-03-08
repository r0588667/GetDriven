import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { AppRegistry, Text, View } from 'react-native';

var styles = StyleSheet.create({
    Header: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#a00f14',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        maxHeight: 100,
    },
    HeaderText:
        {
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
        },
    Container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        height: 400,
    },
    headerImageContainer: {
        marginLeft: '2.5%',
    },
    DHeader: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#303030',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        height: 100,
        maxHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#a00f14',
        borderBottomWidth: 0.3,
    },
    canvasContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position: 'relative'
    },
    HomePageImage: {
        maxWidth: '100%',
        width: '100%',
        height : 'auto',
        flex: 1,
    },
    Logo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
        height: 70,
        width: 80,
    },
    LogoutLogo:
        {
            height: 60,
            width: 50,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 10,
        },
    BodyText:
        {
            flex: 1,
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 20,
        },
    alineaText: {
        fontSize: 18
    },
    Drawer: {
        backgroundColor: '#303030',
        flex: 1,
        height: '100%',
        width: '100%',
    },
    DrawerButton: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderBottomWidth: 0.2,
        borderBottomColor: 'white'
    },
    ScrollView:
        {
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: 'transparent',
        },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: '100%',
        backgroundColor: 'transparent',
    },
    BackgroundImage:
        {
            width: '100%',
            height: 'auto',
            flex: 1,
            backgroundColor: 'transparent',
        },
    MenuButton:
        {
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '95%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#a00f14',

        },
    EndRideButton:
        {
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '95%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#a00f14',

        },
    OptionalButton:
        {
            marginLeft: '5%',
            height: 20,
            width: '90%',
            paddingLeft: 'auto',
            paddingRight: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#a00f14',

        },
    OptionalButtonText: {
        color: 'white'
    },
    OptionalText: {
        fontSize: 16,
        marginLeft: '5%',
    },
    InputView:
        {
            flex: 1,
            flexDirection: 'row',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    Modal: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Dropdown: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        borderColor : 'transparent',
        backgroundColor: 'transparent'
    },
    DropdownText: {
        flex: 1,
        width: '50%',
        backgroundColor: '#a00f14',
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        textAlign: 'center',
        borderColor : 'transparent',
    },
    DefaultModalText:
        {
            marginTop: 2,
            color: '#a00f14',
            fontSize: 20,
            textAlign: 'left',
        },
    InputViewAdres:
        {
            flex: 1,
            flexDirection: 'row',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    StreetInput:
        {
            width: '62.5%',
            marginTop: 2,
            color: '#a00f14',
            fontSize: 20,
            textAlign: 'left',

        },
    StreetText:
        {
            width: '70%',
            marginTop: 2,
            color: '#a00f14',
            fontSize: 20,
            textAlign: 'left',
        },
    NrInput:
        {
            width: '22%',
        },
    ButtonText:
        {
            color: '#ffffff',
            fontSize: 20
        },
    CheckerImage:
        {
            width: 20,
            height: 20,
            borderRadius: 50,
            marginTop: 15,
            marginLeft: 10,
        },
    Phone:
        {
            backgroundColor: 'transparent',
            width: '90%',
        },
    DefaultText:
        {
            marginTop: 2,
            marginLeft: '5%',
            color: '#a00f14',
            fontSize: 20,
            textAlign: 'left',
        },
    NrText: {
        marginTop: 2,
        color: '#a00f14',
        fontSize: 20,
        textAlign: 'left',
    },
    ExtraText:
        {
            marginTop: 2,
            marginLeft: '2.5%',
            color: "#a00f14",
            fontSize: 16,
            textAlign: 'left'
        },
    DefaultTextInput:
        {
            marginTop: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '93%',
            color: '#a00f14',
        },
    OptionsView:
        {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#a00f14'
        },
    TableHead:
        {
            flex: 1,
            width: '100%',
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
        },
    TableEntry:
        {
            flex: 1,
            flexDirection: 'row',
        },
    headDate:
        {
            width: '25%',
            fontSize: 20,
            backgroundColor: '#a00f14',
            color: '#D8DAEC',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            borderTopLeftRadius: 10,
        },
    headTime:
        {
            width: '15%',
            fontSize: 20,
            backgroundColor: '#ffffff',
            color: '#a00f14',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            overflow: 'hidden',
        },
    headPlace:
        {
            width: '60%',
            fontSize: 20,
            backgroundColor: '#a00f14',
            color: '#D8DAEC',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            overflow: 'hidden',
            borderTopRightRadius: 10,
        },
    TableText: {
        textAlign: 'center',
        fontSize: 18,
    },
    headName:
        {
            width: '60%',
            fontSize: 20,
            color: '#D8DAEC',
            textAlign: 'center',
            borderTopRightRadius: 10,
            backgroundColor: '#a00f14',
        },
    headKmAway:
        {
            width: '40%',
            fontSize: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            borderTopRightRadius: 10,
            backgroundColor: '#ffffff',
            color: '#a00f14',
        },
    NoteColumn: {
        flex: 1,
        flexDirection: 'column',
        width: '50%',
        alignItems: 'center',
    },

    NoteRow: {
        flex: 1,
        flexDirection: 'row',
        width: '25%',
        alignItems: 'center',
    },
    Note: {
        flex: 1,
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#a00f14',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between',
    },
    NoteButton: {
        flex: 1,
        width: '50%',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        backgroundColor: '#303030',
    },
    NoteButtonRed: {
        flex: 1,
        width: '50%',
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        backgroundColor: '#a00f14',
    },
    CheckedButton:
        {
            flex: 1,
            width: '100%',
            height: '100%',
            borderRightWidth: 1,
            borderRightColor: 'white',
            backgroundColor: '#303030',
        },
    NoteButtonText: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
    },
    NoteTimeRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    NoteText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
    InfoText:
        {
            fontSize: 24,
            textAlign: 'center',
        },
    DetailsHeader:
        {
            fontSize: 24,
            color: '#a00f14',
            marginLeft: '2.5%',
        },
    DetailsBody:
        {
            fontSize: 20,
            marginLeft: '4%',
        },
    chosen:
        {
            backgroundColor: '#2ccc31',
        },
    titleRideR: {
        marginTop: 20,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    HeaderRideR:
        {
            fontSize: 32,
            marginLeft: '5%',
        },
    HomeButton:
        {
            marginLeft: 10,
            borderRadius: 100,
            width: 50,
            height: 50,
            backgroundColor: '#a00f14',
            borderWidth: 1.0,
            borderColor: 'black',
        },
    Wrapper:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    HomeImage:
        {
           
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 25,
        height: 25,
        },
    TimerText:
        {
            flex: 1,
            textAlign: 'center',
            fontSize: 32,
        },

});
module.exports = styles;
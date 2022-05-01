import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';

export default function CreateContact({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [phoneNumbers, setPhoneNumbers] = useState(['']);

    useEffect(() => {
        if (phoneNumbers[phoneNumbers.length - 1].length > 0) {
            setPhoneNumbers(prevState => [...prevState, '']);
        }
        try {
            if (
                phoneNumbers[phoneNumbers.length - 2].length === 0 &&
                phoneNumbers.length >= 2
            ) {
                setPhoneNumbers(prevState => {
                    const newState = prevState.slice();
                    newState.pop();
                    return newState;
                });
            }
        } catch { }
    }, [phoneNumbers]);

    function addContact() {
        if (
            (!userName && !userEmail && !userAddress && !jobRole && !userStatus) ||
            phoneNumbers.length === 1
        ) {
            Alert.alert('Something went wrong', 'Please fill the all fields');
            return;
        }
        const myPhonenumbers = phoneNumbers.map(ph => {
            return { label: 'mobile', number: ph };
        });

        const contactInfo = {
            displayName: userName,
            givenName: userName,
            phoneNumbers: myPhonenumbers,
        };
        Contacts.addContact(contactInfo)
            .then(() => navigation.navigate('MyContacts'))
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.text}> Create Employee </Text>
                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    value={userName}
                    onChangeText={text => setUserName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={userEmail}
                    onChangeText={text => setUserEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={userAddress}
                    onChangeText={text => setUserAddress(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Job Role"
                    value={jobRole}
                    onChangeText={text => setJobRole(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Status"
                    value={userStatus}
                    onChangeText={text => setUserStatus(text)}
                />
            </View>
            {phoneNumbers.map((phoneNumber, index) => (
                <View style={{ ...styles.inputContainer, marginVertical: 0 }} key={index}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        value={phoneNumber}
                        onChangeText={text =>
                            setPhoneNumbers(prevState => {
                                const newState = prevState.slice();
                                newState[index] = text;
                                return newState;
                            })
                        }
                    />
                </View>
            ))}
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => addContact()}
            >
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        padding: 10,
        margin: 10,
    },
    input: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#000',
        padding: 10,
        fontSize: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 100,
        backgroundColor: '#4ea8de',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        color: '#000',
    }
});

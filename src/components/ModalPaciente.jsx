import React, { useEffect, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatearFecha } from '../helpers';

const ModalPaciente = ({openModal,setOpenModal,paciente,setPacienteVer}) => {

    return (
        <Modal
            animationType='slide'
            visible={openModal}
        >
            <View style={styles.container}>
                <ScrollView style={styles.containerScroll}>
                    <Pressable
                        onPress={() => {
                            setPacienteVer({});
                            setOpenModal(!openModal);
                        }}
                        style={styles.btnCerrar}
                        >
                        <Text style={styles.textoCerrar}>✕</Text>
                    </Pressable>

                    <Text style={styles.textoCita}>
                        Información del {""}
                        <Text style={styles.textoCitaBold}>Paciente</Text>
                    </Text>

                    <View style={styles.contenedorInfo}>
                        <View style={styles.contenedorPaciente}>
                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Nombre del Paciente:</Text>
                                <Text style={styles.textoPacienteBold}>{paciente.nombrePaciente}</Text>
                            </View>
                            
                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Nombre del Propietario:</Text>
                                <Text style={styles.textoPacienteBold}>{paciente.nombrePropietario}</Text>
                            </View>

                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Email de Contacto:</Text>
                                <Text style={styles.textoPacienteBold}>{paciente.emailPropietario}</Text>
                            </View>

                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Télefono de Contacto:</Text>
                                <Text style={styles.textoPacienteBold}>{paciente.telefono}</Text>
                            </View>

                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Fecha de Alta:</Text>
                                <Text style={styles.textoPacienteBold}>{formatearFecha(paciente.fecha)}</Text>
                            </View>
                            
                            <View style={styles.campo}>
                                <Text style={styles.textoPaciente}>Síntomas del Paciente:</Text>
                                <Text style={styles.textoPacienteBold}>{paciente.sintomas}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ModalPaciente

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4D5D6F',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'normal',
    },
    containerScroll:{
        width: '100%',
        marginHorizontal: 'auto',
        display: 'flex',
    },
    btnCerrar: {
        position: "absolute",
        top: 0,
        right: 15,
        padding: 10,
        display: "flex",
        borderRadius: 10,
        alignItems: "center",
    },
    textoCerrar:{
        color: '#9FE88D',
        fontWeight: '900',
        fontSize: 20,
    },
    textoCita:{
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 10,
        color: 'white',
        textTransform: 'capitalize'
    },
    textoCitaBold: {
        fontWeight: '900',
        color: '#FF7D5C'
    },
    contenedorInfo:{
        width: '100%',
        marginTop: 15,
        alignItems: 'center'
    },
    contenedorPaciente:{
        width: "90%",
        padding: 20,
        backgroundColor: '#0284C7',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        gap: 15,
        justifyContent: 'center'
    },
    campo: {
        marginBottom: 10
    },
    textoPaciente:{
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: '700',
        color: 'white',
    },
    textoPacienteBold:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9FE88D'
    }
  });
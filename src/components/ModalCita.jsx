import React, { useEffect, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const ModalCita = ({openModal,setOpenModal,handleNuevoPaciente, paciente, setPaciente,handleEditarPaciente}) => {

    const [cita,setCita] = useState({
        id: Date.now(),
        nombrePaciente: '',
        nombrePropietario: '',
        emailPropietario: '',
        telefono: '',
        fecha: new Date(),
        sintomas: ''
    });

    const [alerta,setAlerta] = useState({
        mensaje: "",
        tipo: ""
    });
    const [showDate,setShowDate] = useState(false);
 
    const handlerChange = (dato) =>{
        setCita({
            ...cita,
            [dato?.tipo] : dato?.valor
        });
        if(dato.tipo === "fecha"){
            setShowDate(false);
        }

    }

    const handleShowDate = () =>{
        setShowDate(!showDate);
    }

    const handleCita = () =>{
        if(!Object.values(cita).includes('')){
            if(!paciente?.id){
                handleNuevoPaciente({
                    id: Date.now(),
                    ...cita
                });
                setAlerta({
                    mensaje: 'Paciente creado correctamente',
                    tipo: 'Exito'
                });

                setCita({
                    nombrePaciente: '',
                    nombrePropietario: '',
                    emailPropietario: '',
                    telefono: '',
                    fecha: new Date(),
                    sintomas: ''
                });

                setTimeout(() => {
                    setAlerta({
                        mensaje: '',
                        tipo: ''
                    });
                }, 2000);
            } else{
                handleEditarPaciente(cita);
                setAlerta({
                    mensaje: 'Paciente editado correctamente',
                    tipo: 'Exito'
                });

                setCita({
                    nombrePaciente: '',
                    nombrePropietario: '',
                    emailPropietario: '',
                    telefono: '',
                    fecha: new Date(),
                    sintomas: ''
                });
                setPaciente({});

                setTimeout(() => {
                    setAlerta({
                        mensaje: '',
                        tipo: ''
                    });
                }, 2000);
            }
        }
        else{
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                [{text: 'Aceptar',style: 'cancel'}]
            );
        }
    }

    useEffect(() => {
        if(paciente?.id){
            setCita(paciente);
        }
    },[paciente]);

    return (
        <Modal
            animationType='slide'
            visible={openModal}
        >
            <View style={styles.container}>
                <ScrollView style={styles.containerScroll}>
                    <Pressable
                        onPress={() => {
                            setCita({
                                nombrePaciente: '',
                                nombrePropietario: '',
                                emailPropietario: '',
                                telefono: '',
                                fecha: new Date(),
                                sintomas: ''
                            });
                            setPaciente({});
                            setOpenModal(!openModal);
                        }}
                        style={styles.btnCerrar}
                        >
                        <Text style={styles.textoCerrar}>✕</Text>
                    </Pressable>

                    <Text style={styles.textoCita}>
                        {paciente.id ? "Editar" : "Nueva"} {""}
                        <Text style={styles.textoCitaBold}>Cita</Text>
                    </Text>

                    {alerta.mensaje && (
                        <Text style={styles.textoAlerta}>
                            {alerta.mensaje}
                        </Text>
                    )}

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre del Paciente</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Ingrese el nombre del Paciente'
                            placeholderTextColor={'#bbbbbb'}
                            id='nombrePaciente'
                            value={cita.nombrePaciente}
                            onChangeText={(e) => handlerChange({tipo: "nombrePaciente",valor:e})}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre del Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Ingrese el nombre del Propietario'
                            placeholderTextColor={'#bbbbbb'}
                            id='nombrePropietario'
                            value={cita.nombrePropietario}
                            onChangeText={(e) => handlerChange({tipo: "nombrePropietario",valor:e})}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email del Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            keyboardType='email-address'
                            placeholder='Ingrese el email del Propietario'
                            placeholderTextColor={'#bbbbbb'}
                            id='emailPropietario'
                            value={cita.emailPropietario}
                            onChangeText={(e) => handlerChange({tipo: "emailPropietario",valor: e})}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Télefono del Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            keyboardType='number-pad'
                            placeholder='Ingrese el télefono del Propietario'
                            placeholderTextColor={'#bbbbbb'}
                            id='telefono'
                            value={cita.telefono}
                            onChangeText={(e) => handlerChange({tipo: "telefono",valor:e})}
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Pressable
                            onPress={handleShowDate}
                            style={styles.btnFecha}
                        >
                            <Text style={[styles.label,styles.labelFecha]}>Ingresar Fecha de Alta</Text>
                        </Pressable>
                        {showDate && (
                            <DateTimePicker 
                                value={cita.fecha}
                                mode='date'
                                is24Hour={true}
                                locale='es'
                                onChange={(e,date) => handlerChange({tipo: "fecha", valor: date})}
                            />
                        )}
                        <Text style={styles.textoFecha}>Fecha de Alta: {cita?.fecha?.toLocaleDateString('es-ES')}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas del Paciente</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Ingrese los síntomas del Paciente'
                            placeholderTextColor={'#bbbbbb'}
                            id='sintomas'
                            value={cita.sintomas}
                            onChangeText={(e) => handlerChange({tipo: "sintomas",valor:e})}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.contenedorBtn}>
                        <Pressable
                            style={styles.btnNuevaCita}
                            onPress={() => handleCita()}
                        >
                            <Text style={styles.btnNuevaCitaTexto}>
                                {paciente.id ? "Guardar Cambios" : "Ingresar Cita"}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ModalCita

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#334155',
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
        color: '#FF7D5C',
        fontWeight: '900',
        fontSize: 20,
    },
    textoCita:{
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10,
        color: 'white',
        textTransform: 'uppercase'
    },
    textoCitaBold: {
        fontWeight: '900',
        color: '#9FE88D'
    },
    textoAlerta:{
        fontWeight: '800',
        padding: 15,
        marginVertical:10,
        textAlign: 'center',
        backgroundColor: '#2D9964',
        color: 'white'
    },
    campo:{
        marginTop: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 15
    },
    label:{
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        width: '90%'
    },
    labelFecha:{
        textAlign: "center",
        textTransform: 'uppercase',
        fontWeight: '900',
        width: 'auto'
    },
    input:{
        backgroundColor: '#4D5D6F',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        fontSize: 15,
        color: 'white'
    },
    textoFecha:{
        color:'white',
        fontSize: 20,
        width: '90%',
        textAlign: 'left'
    },
    btnFecha:{
        backgroundColor: '#FF7D5C',
        padding: 15,
        width: '90%',
        borderRadius: 10,
    },
    contenedorBtn:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    btnNuevaCita:{
        width: "90%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#0284C7'
    },
    btnNuevaCitaTexto:{
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: 'white'
    }
  });
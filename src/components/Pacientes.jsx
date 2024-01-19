import React from 'react'
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import { formatearFecha } from '../helpers';

const Pacientes = ({item,editarPaciente, eliminarPaciente,verPaciente}) => {

    const quiereEliminar = (id) =>{
        Alert.alert(
            '¿Deseas eliminar este paciente?',
            'Un paciente eliminado no podrá ser recuperado',
            [{text: "No", style: "default"},{text: 'Sí, eliminar',style: 'cancel',onPress: () => {
                eliminarPaciente(id);
            }}]
        );
    }

    return (
        <Pressable
            onPress={() => verPaciente(item)}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{item.nombrePaciente}</Text>
                <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>

                <View style={styles.contenedorBtn}>
                    <Pressable
                        style={[styles.btn,styles.btnEditar]}
                        onPress={() => editarPaciente(item)}
                    >
                        <Text style={styles.textobtn}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn,styles.btnEliminar]}
                        onPress={() => quiereEliminar(item.id)}
                    >
                        <Text style={styles.textobtn}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

export default Pacientes


const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#4D5D6F',
        padding: 15,
        borderRadius: 5,
        marginTop: 15
    },
    label:{
        fontSize: 18,
        color: '#E3E3E3',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 5
    },
    texto:{ 
        color: '#9FE88D',
        fontWeight: '900',
        fontSize: 25
    },
    fecha:{
        textTransform: 'capitalize',
        fontSize: 18,
        marginTop: 5,
        color: '#E3E3E3'
    },
    contenedorBtn:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnEditar:{
        backgroundColor: '#0284C7'
    },
    textobtn:{
        fontSize: 15,
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 'bold'
    },
    btnEliminar:{
        backgroundColor: '#DC503F'
    },
});
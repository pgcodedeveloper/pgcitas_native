import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react'
import ModalCita from './src/components/ModalCita';
import Pacientes from './src/components/Pacientes';
import ModalPaciente from './src/components/ModalPaciente';

export default function App() {

    const [openModal,setOpenModal] = useState(false);
    const [openModalPaciente,setOpenModalPaciente] = useState(false);
    const [pacientes,setPacientes] = useState([]);
    const [paciente,setPaciente] = useState({});
    const [pacienteVer,setPacienteVer] = useState({});


    const handleNuevoPaciente = (paciente) =>{
        setPacientes([
            ...pacientes,
            paciente
        ]);
    }

    const handleEditarPaciente = (pacienteE) =>{
        const pacientesEditados = pacientes.map(pac => pac.id === pacienteE.id ? pacienteE : pac);
        setPacientes(pacientesEditados);
    }
 
    const editarPaciente = (paciente) =>{
        setOpenModal(!openModal);
        setPaciente(paciente);
    }

    const eliminarPaciente = (id) =>{
        const pacientesAct = pacientes.filter(pac => pac.id !== id);
        setPacientes(pacientesAct);
    }

    const verPaciente = (paciente) =>{
        setOpenModalPaciente(!openModalPaciente);
        setPacienteVer(paciente);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>
                Administrador de Citas {""}
                <Text style={styles.titulo2}>Veterinaria</Text>
            </Text>

            <Pressable
                onPress={() => setOpenModal(!openModal)}
                style={styles.btnNuevaCita}
            >
                <Text style={styles.btnTextCita}>Nueva Cita</Text>
            </Pressable>

            {pacientes.length > 0 ? (
                <View style={styles.listaPacientes}>
                    <Text style={styles.textoListado}>Listado de Pacientes</Text>
                    <FlatList 
                        style={styles.listado}
                        data={pacientes}
                        keyExtractor={(item) => item?.id}
                        renderItem={({item}) => {
                            return (
                                <Pacientes item={item} editarPaciente={editarPaciente} eliminarPaciente={eliminarPaciente} verPaciente={verPaciente}/>
                            )
                        }}
                    />
                </View>
            ): (
                <Text style={styles.noPacientes}>Aún no tienes pacientes</Text>
            )}

            <ModalCita openModal={openModal} setOpenModal={setOpenModal} handleNuevoPaciente={handleNuevoPaciente} paciente={paciente} setPaciente={setPaciente} handleEditarPaciente={handleEditarPaciente}/>
            <ModalPaciente openModal={openModalPaciente} setOpenModal={setOpenModalPaciente} paciente={pacienteVer} setPacienteVer={setPacienteVer}/>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A303C',
    paddingTop: 60,
    padding: 10,
    justifyContent: 'normal',
  },
  titulo: {
    textAlign: "center",
    color: 'white',
    fontSize: 35,
    fontWeight: "bold"
  },
  titulo2: {
    fontWeight: "900",
    color: '#9FE88D'
  },
  btnNuevaCita: {
    backgroundColor: '#9FE88D',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  btnTextCita:{
    textAlign: "center",
    color: "black",
    fontWeight: "900",
    fontSize: 20,
    textTransform: "uppercase"
  },
  noPacientes:{
    marginTop: 40,
    color: '#FBBD23',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '800',
  },
  listaPacientes:{
    marginTop: 50,
    marginHorizontal: 20
  },
  textoListado: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700'
  },
  listado: {
    marginTop: 20,
    display: 'flex',
  }
});

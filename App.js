import { StyleSheet, Text, Button, View, TextInput, Picker, Switch} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

//CREAMOS LA PESTAÑA DE LOGIN 
function UserScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if (email == "tv@gmail.com") {
      setEmail("");
      setFullname("")
      navigation.navigate('Profile', { fullname: fullname })
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.inputs}
	      placeholder="Nombre Completo"
        onChangeText={value => setFullname(value)}
        value={fullname}
      />

      <Picker
        selectedValue ={rol}
        onValueChange ={(itemValue, itemIndex) => setRol(itemValue)}
        style={{ height: 50, width: 150, borderRadius:20, marginBottom:20}}
      >
        <Picker.Item label="Seleccione el tipo de Usuario 1" value="" />
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Cliente" value="user" />

      </Picker>

      <TextInput
        style={styles.inputs}
	      placeholder="Correo Electrónico"
        onChangeText={value => setEmail(value)}
        value={email}
      />

      <Button
        title="Iniciar Sesion"
        //onPress={() => navigation.navigate('Settings')}
        //onPress={validate}
        onPress={() => {
          if (email == "tv@gmail.com") {
            setEmail("");
            setFullname("")
            navigation.navigate('Profile', { fullname: fullname })
          }
        }}

      />
    </View>
  );
}

//CREAMOS LA PESTAÑA DE CUENTAS
function AccountScreen() {
  const[accounttype,setAccounttype] = useState('')
  const [isfourth, setIsfourth] = useState(false)
  const toggleSwitch = () => setIsfourth(isActive => !isActive);


  return (
    <View style={styles.container}>
      <Text style={{marginBottom:10, textSize:30}}>Cuentas</Text>
      <Picker
        selectedValue ={accounttype}
        sytle={{height: 50, with: 150, borderRadius:10 }}
        onValueChange ={(itemValue, itemIndex) => setAccounttype(itemValue)}
      >
        <Picker.Item label="Seleccione el tipo de Cuenta" value="" />
        <Picker.Item label="Cuenta de Ahorros" value="saccount" />
        <Picker.Item label="Cuenta Corriente" value="caccount" />
        <Picker.Item label="Tarjeta de Credito" value="dcart" />

      </Picker>

      <View style={{flexDirection:'row', marginBottom:20, marginTop:10}}>
        <Text>Exenta de 4 por mil</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isfourth}
        />

      </View>
      <Button 
        title='Chequear'
        onPress={()=>{
          alert(`Tipo de cuenta: ${accounttype}, Exent: ${isfourth}`)
        }}      
      />
    </View>
  );
}

//CREAMOS LA PESTAÑA DE PERFIL 
function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.fullname}</Text>
    </View>
  );
}

//CREAMOS LA FUNCION Y PESTAÑA DE LOS SETTINGS O CONFIGURACION
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
}

//CREAMOS LA FUNCION
function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen name="User" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  },
  pickers:{
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  }
});

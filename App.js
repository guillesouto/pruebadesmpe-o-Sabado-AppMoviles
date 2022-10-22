import { StyleSheet, Text, Button, View, TextInput, Picker, Switch} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useForm, Controller} from 'react-hook-form';
import { useCallback, useState } from 'react';

//CREAMOS LA PESTAÑA DE LOGIN 
function UserScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  const{control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      fullname:'',
      rol:'',
      password:''
    }
  })

  const onSubmit = data => {
    if (rol == "admin") {
      setFullname(""),
      setRol(""),
      setPassword("")
      navigation.navigate('Cuentas', { fullname: fullname })
    }
    console.log(data)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g ,
          maxLength:30,
          minLength:3 
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.fullname?.type == "required" || errors.fullname?.type == "pattern" || errors.fullname?.type == "maxLength" || errors.fullname?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Nombre Completo"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='fullname'
        />
        {errors.fullname?.type == "required" && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.fullname?.type == "maxLength" && <Text style={{color:'red'}}>El nombre no puede superar los 30 caracteres</Text>}
        {errors.fullname?.type == "minLength" && <Text style={{color:'red'}}>El nombre no puede ser menor a 3 caracteres</Text>}
        {errors.fullname?.type == "pattern" && <Text style={{color:'red'}}>El nombre solo puede tener letras y/o espacios</Text>}
        

      <Picker
        selectedValue ={rol}
        onValueChange ={(itemValue, itemIndex) => setRol(itemValue)}
        style={{ height: 50, width: 150, borderRadius:20, marginBottom:20}}
      >
        <Picker.Item label="Seleccione el tipo de Usuario 1" value="" />
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Cliente" value="user" />

      </Picker>

      <Controller
        control={control}
        rules={{
          required:true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/ ,
          maxLength:15,
          minLength:8
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.password?.type == "required" || errors.password?.type == "pattern" || errors.password?.type == "maxLength" || errors.password?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Contraseña"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='password'
        />
        {errors.password?.type == "required" && <Text style={{color:'red'}}>La contraseña es obligatoria</Text>}
        {errors.password?.type == "maxLength" && <Text style={{color:'red'}}>La contraseña no puede superar los 15 digitos</Text>}
        {errors.password?.type == "minLength" && <Text style={{color:'red'}}>La contraseña no puede ser menor a 8 digitos</Text>}
        {errors.password?.type == "pattern" && <Text style={{color:'red'}}>La contraseña debe tener Almenos una letra Mayuscula y una minuscula , almenos un digito, sin espacios en blanco y un caracter especial</Text>}


      <Button
        title="Iniciar Sesion"
        style={{backgroundColor:'green', borderRadius:10, padding:5, width:200}}
        //onPress={() => navigation.navigate('Settings')}
        //onPress={validate}
        onPress = {handleSubmit(onSubmit)}

      />
    </View>
  );
}

//CREAMOS LA PESTAÑA DE Movimiento
function MovimientoScreen() {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.fullname}</Text>
    </View>
  );  
}

//CREAMOS LA PESTAÑA DE Cuentas
function CuentasScreen({ route }) {
  const [numcuenta,setNumcuenta] = useState('')
  const [id,setId] = useState('')
  const [titular,setTitular] = useState('')
  const [fecha,setFecha] = useState('')
  const [saldo,setSaldo] = useState('')
  

  const{control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      numcuenta:'',
      id:'',
      titular:'',
      fecha:'',
      saldo:''
    }
  })


  return (
    <View style={styles.container}>
      <Text style={{marginBottom:10, textSize:30}}>Cuentas</Text>
      {/*Creamos el apartado de Numero de Cuenta -----------------------------------------------------------------------------*/}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern: /^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/ ,
          maxLength:13,
          minLength:7 
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.salary?.type == "required" || errors.salary?.type == "pattern" || errors.salary?.type == "maxLength" || errors.salary?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Numero de Cuenta"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='numcuenta'
        />
        {errors.salary?.type == "required" && <Text style={{color:'red'}}>El Salario es obligatorio</Text>}
        {errors.salary?.type == "maxLength" && <Text style={{color:'red'}}>El Salario no puede superar los 17 digitos</Text>}
        {errors.salary?.type == "minLength" && <Text style={{color:'red'}}>El Salario no puede ser menor a 4 digitos</Text>}
        {errors.salary?.type == "pattern" && <Text style={{color:'red'}}>El Salario debe tener un monto valido</Text>}

      {/*Creamos el apartado de identificacion -----------------------------------------------------------------------------*/}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern: /^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/ ,
          maxLength:20,
          minLength:3 
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.fullname?.type == "required" || errors.fullname?.type == "pattern" || errors.fullname?.type == "maxLength" || errors.fullname?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Identificador"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='id'
        />
        {errors.salary?.type == "required" && <Text style={{color:'red'}}>El Salario es obligatorio</Text>}
        {errors.salary?.type == "maxLength" && <Text style={{color:'red'}}>El Salario no puede superar los 17 digitos</Text>}
        {errors.salary?.type == "minLength" && <Text style={{color:'red'}}>El Salario no puede ser menor a 4 digitos</Text>}
        {errors.salary?.type == "pattern" && <Text style={{color:'red'}}>El Salario debe tener un monto valido</Text>}
        
      {/*Creamos el apartado de Nombre -------------------------------------------------------------------------------------*/}
        <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/g ,
          maxLength:30,
          minLength:3 
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.fullname?.type == "required" || errors.fullname?.type == "pattern" || errors.fullname?.type == "maxLength" || errors.fullname?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Nombre Completo del Titular"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='titular'
        />
        {errors.fullname?.type == "required" && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.fullname?.type == "maxLength" && <Text style={{color:'red'}}>El nombre no puede superar los 30 caracteres</Text>}
        {errors.fullname?.type == "minLength" && <Text style={{color:'red'}}>El nombre no puede ser menor a 3 caracteres</Text>}
        {errors.fullname?.type == "pattern" && <Text style={{color:'red'}}>El nombre solo puede tener letras y/o espacios</Text>}
        


      {/*Creamos el apartado de Saldo de cuenta -------------------------------------------------------------------------------------*/}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern: /^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/ ,
          maxLength:13,
          minLength:7 
        }}
        render={({field: {onChange, onBlur, value}})=>(
          <TextInput
          style={[styles.inputs,{borderColor: errors.salary?.type == "required" || errors.salary?.type == "pattern" || errors.salary?.type == "maxLength" || errors.salary?.type == "minLength" ? 'red' : 'green'}]}
          placeholder="Saldo"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          />
        )}
        name='salary'
        />
        {errors.salary?.type == "required" && <Text style={{color:'red'}}>El Salario es obligatorio</Text>}
        {errors.salary?.type == "maxLength" && <Text style={{color:'red'}}>El Salario no puede superar los 17 digitos</Text>}
        {errors.salary?.type == "minLength" && <Text style={{color:'red'}}>El Salario no puede ser menor a 4 digitos</Text>}
        {errors.salary?.type == "pattern" && <Text style={{color:'red'}}>El Salario debe tener un monto valido</Text>}

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
      <Tab.Screen name="Inic. Sesión" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Cuentas" component={CuentasScreen} />
      <Tab.Screen name="Movimiento" component={MovimientoScreen} />

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

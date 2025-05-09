import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';

export default function CriarConta({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!isTermsAccepted) {
      setError('Você precisa aceitar os termos de uso e a política de privacidade!');
      return;
    }
  
    if (!name || !phone || !email || !password || password !== confirmPassword) {
      setError('Preencha todos os campos corretamente!');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          telefone: phone,
          email: email,
          senha: password,
          confirmarSenha: confirmPassword,
        }),            
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('TelaLogin');
      } else {
        setError(data.error || 'Erro ao registrar');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao conectar ao servidor');
    }
  };  

  return (
    <View style={stylesCriarConta.container}>
      <View style={stylesCriarConta.top}>
        <TouchableOpacity 
          style={stylesCriarConta.backIcon}
          onPress={() => navigation.navigate('TelaInicial')} >
          <Ionicons name="arrow-back" size={24} color="yellow" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/logo.png')}
          style={stylesCriarConta.logo}
          resizeMode="contain"
        />
        <Text style={stylesCriarConta.title}>
          Bem-vindo! Crie sua <Text style={stylesCriarConta.highlight}>conta</Text>
        </Text>
      </View>

      <View style={stylesCriarConta.formWrapper}>
        <ScrollView
          contentContainerStyle={stylesCriarConta.bottom}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={stylesCriarConta.input}
            placeholder="Nome Completo"
            placeholderTextColor="#666"
            onChangeText={setName}
          />
          <TextInput
            style={stylesCriarConta.input}
            placeholder="Número de Telefone"
            keyboardType="phone-pad"
            placeholderTextColor="#666"
            onChangeText={setPhone}
          />
          <TextInput
            style={stylesCriarConta.input}
            placeholder="E-mail"
            placeholderTextColor="#666"
            onChangeText={setEmail}
          />
          <TextInput
            style={stylesCriarConta.input}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#666"
            onChangeText={setPassword}
          />
          <TextInput
            style={stylesCriarConta.input}
            secureTextEntry
            placeholder="Confirmar Senha"
            placeholderTextColor="#666"
            onChangeText={setConfirmPassword}
          />

          <View style={stylesCriarConta.termsContainer}>
            <Checkbox 
              value={isTermsAccepted} 
              onValueChange={setIsTermsAccepted} 
              style={stylesCriarConta.checkbox}
              color={isTermsAccepted ? '#1e1a1a' : undefined}
            />
            <Text style={stylesCriarConta.termsText}>
              Li e concordo com os{' '}
              <Text 
                style={stylesCriarConta.linkText} 
                onPress={() => navigation.navigate('TermosUsuario')} 
              >
                termos de uso
              </Text>{' '}
              e a{' '}
              <Text style={stylesCriarConta.linkText}>
                política de privacidade
              </Text>.
            </Text>
          </View>

          {error ? <Text style={stylesCriarConta.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={stylesCriarConta.button} 
            onPress={handleRegister}
          >
            <Text style={stylesCriarConta.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('TelaLogin')}>
            <Text style={stylesCriarConta.buttonText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const stylesCriarConta = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1a1a',
    paddingTop: StatusBar.currentHeight || 40,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#fff',
  },
  formWrapper: {
    flex: 1,
    backgroundColor: '#f2c300',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  bottom: {
    padding: 30,
    alignItems: 'center',
    gap: 20,
  },
  input: {
    backgroundColor: '#f2c300',
    borderWidth: 1,
    borderColor: '#1e1a1a',
    borderRadius: 30,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e1a1a',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#f2c300',
    fontWeight: '600',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 10,
    padding: 1,
    zIndex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  linkText: {
    color: '#1e1a1a',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

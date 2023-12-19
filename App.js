import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, Keyboard, Switch } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Pessoa from './Pessoa';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.25;

export default class hubcenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      idade: null,
      sexo: null,
      limite: 0,
      estudante: false,
      isKeyboardVisible: false,
    };
    this.alerta = this.alerta.bind(this);
  }

  souEstudante(estudante) {
    return estudante ? "Sou estudante" : "Não sou estudante";
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardVisible: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardVisible: false });
  };

  alerta() {

    if (this.state.nome && this.state.idade && this.state.sexo && this.state.limite > 0) {

      this.setState({ nome: this.state.nome.trim() });

      nome = this.state.nome;
      idade = this.state.idade;
      sexo = this.state.sexo;
      limite = "R$ " + this.state.limite + ",00";
      estudante = this.state.estudante ? "É estudante" : "Não é estudante";

      mensagem = ("Nome: " + nome +
        "\nIdade: " + idade +
        "\nSexo: " + sexo +
        "\nLimite: " + limite +
        "\nEstudante: " + estudante);

      Alert.alert(
        "Sucesso",
        mensagem,
        [
          //{ text: 'Voltar ao Menu', onPress: () => console.log('Return Pressed') },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false },
      );
    } else {
      mensagem = 'Faltam os seguintes campos:'
      this.state.nome ? null : mensagem += "\n• Nome";
      this.state.idade ? null : mensagem += "\n• Idade";
      this.state.sexo ? null : mensagem += "\n• Sexo";
      this.state.limite > 0 ? null : mensagem += "\n• Limite";

      Alert.alert(
        "Falha",
        "Todos os campos devem ser preenchidos\n\n" + mensagem,
        [
          //{ text: 'Voltar ao Menu', onPress: () => console.log('Return Pressed') },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false },
      );
    }
  }

  ajustaNome(nome) {
    nomeFormatado = nome.split(' ').map((palavra) => {
      if (palavra.length >= 4) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
      }
      return palavra;
    }).join(' ');
    this.setState({ nome: nomeFormatado });
  }

  onChanged(idade) {

    if (idade) {
      idade = idade.toString().replace(/[^0-9]/g, '');

      let numIdade = parseInt(idade, 10);

      if (numIdade >= 1 && numIdade <= 150) {
        this.setState({
          idade: idade
        });
      } else if (idade === '') {
        this.setState({
          idade: ''
        });
      } else {
        if (numIdade >= 76) {
          this.setState({
            idade: '150'
          });
        } else {
          this.setState({
            idade: '1'
          });
        }
      }
    } else {
      this.setState({
        idade: '1'
      });
    }
  }

  teste() {
    alert('teste');
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.container}>

          <ScrollView>

            <Text style={styles.logo}>Banco React</Text>

            <Image source={require('./src/banco.png')} style={styles.img}></Image>

            <View style={styles.divisoria} />

            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder='Digite seu nome'
              placeholderTextColor="rgba(238, 238, 238, 0.5)"
              value={this.state.nome}
              onChangeText={(nome) => this.ajustaNome(nome)}
            />

            <View style={styles.divisoria} />

            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={() => this.onChanged((parseInt(this.state.idade) ? parseInt(this.state.idade) - 1 : 1))}
                style={styles.botaoPequeno}
              >
                <Text style={styles.botaoTexto}>-</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.inputNumerico}
                underlineColorAndroid="transparent"
                placeholder='Digite sua idade'
                placeholderTextColor="rgba(238, 238, 238, 0.5)"
                value={this.state.idade}
                onChangeText={(idade) => this.onChanged(idade)}
                keyboardType='numeric'
              />

              <TouchableOpacity
                onPress={() => this.onChanged((parseInt(this.state.idade) ? parseInt(this.state.idade) + 1 : 1))}
                style={styles.botaoPequeno}
              >
                <Text style={styles.botaoTexto}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divisoria} />

            <View style={styles.pickerWrapper}>
              <Picker style={styles.picker} placeholder="Sexo" selectedValue={this.state.sexo} onValueChange={(itemLabel) => this.setState({ sexo: itemLabel })}>
                <Picker.Item key={null} value={null} label="Selecione seu sexo" />
                <Picker.Item key={1} value={"Masculino"} label="Masculino" />
                <Picker.Item key={2} value={"Feminino"} label="Feminino" />
                <Picker.Item key={3} value={"Outro"} label="Outro" />
                <Picker.Item key={4} value={"Indefinido"} label="Indefinido" />
                <Picker.Item key={5} value={"Prefiro não dizer"} label="Prefiro não dizer" />
              </Picker>
            </View>

            <View style={styles.divisoria} />

            <View style={styles.sliderContainer}>
              <Slider
                value={parseInt(this.state.limite || '0', 10)}
                style={styles.inputSlider}
                minimumValue={0}
                maximumValue={10000}
                onValueChange={(sliderValue) => this.setState({ limite: sliderValue.toFixed(0) })}
                minimumTrackTintColor="#eee"
                thumbTintColor="#eee"
              />

              <Text style={styles.texto}>Limite de R$ {this.state.limite},00</Text>
            </View>

            <View style={styles.divisoria} />

            <View style={styles.switchContainer}>
              <Switch
                value={this.state.estudante}
                onValueChange={(valueSwitch) => this.setState({ estudante: valueSwitch })}
                thumbColor={this.state.switchStatus ? "#eee" : "#767577"}
                trackColor={{ false: "rgba(238, 238, 238, 0.2)", true: "rgba(255, 255, 255, 0.4)" }}
                style={styles.switch}
              />
              <Text style={styles.textoSwitch}>{this.souEstudante(this.state.estudante)}</Text>
            </View>
          </ScrollView>
        </View>

        {!this.state.isKeyboardVisible && (
          <View style={styles.containerBotaoFinish}>


            <TouchableOpacity
              onPress={this.alerta}
              style={styles.botaoFinish}
            >
              <Text style={styles.botaoTextoFinish}>Abrir a conta</Text>
            </TouchableOpacity>

          </View>
        )}

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 93,
    backgroundColor: '#1f1f1f',
    /*justifyContent: 'center',
    alignItems: 'center',*/
  },
  containerBotaoFinish: {
    flex: 7,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    paddingLeft: screenWidth / 4.6,
    //paddingTop: 50
  },
  picker: {
    padding: 1,
    width: 250,
    height: 90,
    alignSelf: 'center',
    
  },
  img: {
    width: 211,
    height: 164,
    margin: 30,
    alignSelf: 'center',
  },
  input: {
    margin: 25,
    height: 45,
    marginHorizontal: 10,
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
    color: '#eee',
    width: screenWidth * 0.8,
    alignSelf: 'center',
    textAlign: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  inputContainer: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputNumerico: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    fontSize: 20,
    borderRadius: 12,
    color: '#eee',
    width: screenWidth * 0.45,
    textAlign: 'center',
  },
  botaoPequeno: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  inputSlider: {
    width: screenWidth * 0.6,
    alignSelf: 'center',
    textAlign: 'center',
  },
  texto: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoMaior: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 20,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoUltimoTempo: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 2,
    color: '#eee',
    fontWeight: 'bold'
  },
  botao: {
    margin: 30,
    width: buttonWidth,
    height: buttonWidth,
    backgroundColor: 'transparent',
    borderColor: '#eee',
    borderWidth: 1,
    color: '#eee',
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoFinish: {
    width: 200,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000',
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTextoFinish: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  botaoTexto: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  switch: {
    alignSelf: 'center',
  },
  textoSwitch: {
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    color: '#eee',
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  box1: {
    backgroundColor: 'red',
    height: 250,
    width: 150
  },
  box2: {
    backgroundColor: 'yellow',
    height: 250,
    width: 150
  },
  box3: {
    backgroundColor: 'green',
    height: 250,
    width: 150
  },
  box4: {
    backgroundColor: 'blue',
    height: 250,
    width: 150
  },

  logo: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15
  },
  pizzas: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center'
  },

  pickerWrapper: {
    marginHorizontal: '20%',
    marginVertical: 30,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 12,
  },
  divisoria: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  sliderContainer: {
    margin: 25,
  }
});


/*
flexDirection: 'column',
justifyContent:'center'
*/

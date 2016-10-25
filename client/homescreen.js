import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS,
  AsyncStorage,
  TouchableHighlight,
  Image
} from 'react-native';

var STORAGE_KEY = 'id_token';

export default class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image
    };
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  logout() {
    console.log('logout called');
    this._userLogout()
    .then(()=> {
      this.props.navigator.pop();
    })
    .catch((err)=>{
      console.log('error logging out', err);
    });
  }

  getImage() {
    // console.log('get image called');
    var oneImage = async function(){
      return Exponent.ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:[1, 1]});
    };
    oneImage().then((image)=> { 
      console.log('image returned was', image);
      this.setState({
        image: image
      });
    });
  }

  takeImage() {
    // Cannot be run on simulator as it does not have access to a camera
    // console.log('take image called');
    var newImage = async function() {
      return Exponent.ImagePicker.launchCameraAsync({allowsEditing: true, aspect: [1, 1]});
    };
    newImage().then((image) => {
      this.setState({
        image: image
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <Text style={styles.textbox}>View All</Text>
        </TouchableHighlight> 

        <TouchableHighlight onPress={this.getImage.bind(this)}>
          <Text style={styles.textbox}>Upload Photo</Text>
        </TouchableHighlight> 

        <TouchableHighlight onPress={this.takeImage.bind(this)}>
          <Text style={styles.textbox}>Take Photo</Text>
        </TouchableHighlight> 

        <TouchableHighlight>
          <Text style={styles.textbox} onPress={this.logout.bind(this)}>Logout</Text>
        </TouchableHighlight> 

        <Image style={{width:200, height:200}} source={{uri: this.state.image.uri}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textbox: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});
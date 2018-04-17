import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , View , Fab } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StoreCard from './components/StoreCard';
import Expo from "expo";
import App from '../App'
import {fetchBalance} from './utils/balance'

var ownedStore = [ ];

export default class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {isReady: false, active: 'true', balances: [], titles: [], imgSRCs: [] };
  }


  _updateStoreState = async() => {
    let balances = this.state.balances.slice();
    let titles = this.state.titles.slice();
    let imgSRCs = this.state.imgSRCs.slice();

    //populate the state arrays
    for( var i in ownedStore ) {
      balances.push(await fetchBalance(ownedStore[i].contractAddr));
      titles.push(ownedStore[i].title);
      imgSRCs.push(ownedStore[i].image);
      this.setState({balances: balances, titles: titles, imgSRCs: imgSRCs});
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
    this._updateStoreState();
  }


  addNewStore = (newStore) => {
    ownedStore.push(newStore);
  }

  createStoreCards(){
    var storeCards = [];
    for( var i = 0; i < this.state.balances.length ; i++ )
    {
      storeCards.push( <StoreCard balance={this.state.balances[i]} title={this.state.titles[i]} image={this.state.imgSRCs[i]} /> );
    }
    return storeCards;
  }

  render() {
    if (!this.state.isReady) {return <Expo.AppLoading />;}

    return( 
      <Container>
        <Header><Body><Title>Point</Title></Body></Header>  
        {this.createStoreCards()}
        <View style={{ flex: 1 }}>
          <Fab
            active={!this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <MaterialCommunityIcons name="qrcode-scan" size={20} onPress={()=>this.props.navigation.navigate('QRScanPage')}/>
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }}>
              <FontAwesome name="search" size={20} onPress={()=>this.props.navigation.navigate('AddPage')}/>
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
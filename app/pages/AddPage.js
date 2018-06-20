import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, Container, Title, Header, Content, Text, Right , View , List, ListItem } from 'native-base';
import {Font} from "expo";
import SearchBar from '../components/SearchBar';
import App from '../../App';
import {getAllMerchants} from '../utils/Merchants';
import {createBalance} from '../utils/Balance';


export default class AddPage extends Component {

	constructor (props){
		super(props);
		this.state = {allMerchants:[]}
	}

	componentDidMount() {
		this.setAllMerchantsState(this.props.screenProps.state.token);
	}

	setAllMerchantsState = async(token) => {
		var allMerchants = await getAllMerchants(token);
		this.setState({allMerchants:allMerchants});
	}


// this function handles when a store listitem is clicked on
	_onPressed = async (merchant) => {
    	await createBalance(this.props.screenProps.state.token,merchant.merchantId);
    	this.props.navigation.navigate('HomePage');
		console.log(merchant);
	}


	render(){
		return (
			<Container>
				<SearchBar placeholder="Search for a store" navigation={this.props.navigation} />
		        <Content>
					<List dataArray={this.state.allMerchants} renderRow={(merchant) =>
		              <ListItem onPress={()=>{this._onPressed(merchant)}}>
		                <Text>{merchant.name}</Text>
		              </ListItem>
		            }>
		          </List>
		        </Content>
		    </Container>
		   	);
	}
}

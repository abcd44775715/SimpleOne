'use strict'

import React from 'react'
import {AppRegistry} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import Main from './js/Main'
import Constants from './js/Constants'
// import Test from './js/store/Test';
// import Test from './js/view/Test';
class SimpleOne extends React.Component {
  render() {
    return (
        <Navigator
            initialRoute={{name:'首页',component:Main}}
            configureScene={()=>{
                return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route,navigator)=>{
                let Component = route.component;
                return <Component {...route.passProps} navigator={navigator} route={route}/>;
            }}
        />
    )
  }
}
//是否关闭log日志
if(!Constants.DEBUG){
    console.log = function() {}
}
// console.disableYellowBox = true 忽略警告弹窗
AppRegistry.registerComponent('SimpleOne', () => SimpleOne);

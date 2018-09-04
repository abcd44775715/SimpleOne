/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 中间分类导航
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import constants from '../Constants';
import SearchCategory from '../search/SearchCategory';
let {width, height} = constants.ScreenWH;
let key=0;
class AllCategoryGuide extends Component{
    render() {
        return (
            <View style={[styles.container,{backgroundColor:constants.nightMode ? constants.nightModeGrayLight : 'white'}]}>
                <Text style={[styles.categoryTitle,{color: constants.nightMode ? 'white' : constants.normalTextColor}]}>
                    分类导航
                </Text>

                {this.renderItem()}

            </View>
        );
    }

    /**
     *  渲染分类item
     */
    renderItem() {
        return(
            <View style={styles.itemsView}>
                {this.renderItemSpan1('img_text')}
                {this.renderItemSpan1('qa')}
                {this.renderItemSpan2('read')}
                {this.renderItemSpan1('serialize')}
                {this.renderItemSpan1('movie')}
                {this.renderItemSpan1('music')}
                {this.renderItemSpan1('audio')}
            </View>
        );
    }

    /**
     * 跳转到搜索分类
     * @param url
     */
    pushToSearchCategory(iconName){
        let id=0;
        switch (iconName){
            case 'img_text':
                id=0;
                break;
            case 'qa':
                id=3;
                break;
            case 'read':
                id=1;
                break;
            case 'serialize':
                id=2;
                break;
            case 'movie':
                id=5;
                break;
            case 'music':
                id=4;
                break;
            case 'audio':
                id=8;
                break;
        }
        this.props.navigator.push(
            {
                component: SearchCategory,
                title:'搜索分类',
                params:{
                    categoryId:id
                }
            }
        )
    }

    /**
     * 单个跨度item
     */
    renderItemSpan1(iconName) {
        key++;
        return (
            <TouchableOpacity
                onPress={() => this.pushToSearchCategory(iconName)}>
                <Image source={{uri: iconName}} style={styles.iconSpan1} key={key}/>
            </TouchableOpacity>
        );
    }

    /**
     * 两个跨度item
     */
    renderItemSpan2(iconName) {
        key++;
        return (
            <TouchableOpacity
                onPress={() => this.pushToSearchCategory(iconName)}>
                <Image source={{uri: iconName}} style={styles.iconSpan2} key={key}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    categoryTitle: {
        marginLeft:width*0.07,
        fontSize: width * 0.04,
        marginTop:width*0.03,
    },
    itemsView:{
        marginTop:width * 0.05,
        marginLeft:width * 0.007,
        marginBottom:width * 0.07,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width:width,
    },
    iconSpan1: {
        width: width * 0.84 / 4,
        height: width * 0.84 / 4,
        marginRight: width * 0.015,
        marginBottom: width * 0.015,
    },
    iconSpan2: {
        width: width * 0.84 / 2 + width * 0.015,
        height: width * 0.84 / 4,
        marginRight: width * 0.015,
        marginBottom: width * 0.015,
    }
});

export default AllCategoryGuide;

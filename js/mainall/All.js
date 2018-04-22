/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 主界面-all分页
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Platform,

} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import PullScollView from '../view/PullScollView';
import constants from "../Constants";
import MusicControl from '../musiccontrol/MusicControl';
import Search from '../search/Search';
import LoadingMore from  '../view/LoadingMore';// 加载更多的view
import AllListTopic from './AllListTopic';// 专题列表
import AllCategoryGuide from './AllCategoryGuide';// 分类导航
import AllListAuthor from './AllListAuthor';// 热门作者
import AllListQuestion from './AllListQuestion';// 问所有人
import AllListBanner from './AllListBanner'; //顶部banner
let {width, height} = constants.ScreenWH;
// 顶部的banner
let key = 9;
let bottomList = [];
class All extends Component{
    constructor(props){
        super(props);
        this.onScroll=this.onScroll.bind(this);
        this.onPullRelease=this.onPullRelease.bind(this);
        this.state={
            isRefreshing: false,
            loadMore: false, //底部是否显示更多列表
            loading: false,//是否正在加载
            startId: 0, //主题请求开始id
            lastId: 0, //记录上一次请求id
            isEnd: false,//是否到末尾标记
            showMusicControl:false,
        };
    }

    onPullRelease(resolve) {
        //更改刷新状态
        this.setState({isRefreshing: true});
        //do something
        setTimeout(() => {
            resolve();
            this.setState({
                isRefreshing: false,
                loadMore: false
            });
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                <PullScollView onPullRelease={this.onPullRelease} onScroll={this.onScroll}>

                    {this.renderAllItem()}
                    {this.renderLoadMoreList()}
                    {this.renderLoading()}
                </PullScollView>
                {constants.renderAudioPlay(()=>{
                    this.setState({
                        showMusicControl:true,
                    });
                })}
                <MusicControl navigator={this.props.navigator} isVisible={this.state.showMusicControl} onCancel={()=>{
                    this.setState({
                        showMusicControl:false,
                    });
                }}/>
                <Toast
                    ref="toast"
                    style={{backgroundColor: 'gray'}}
                    position='top'
                    positionValue={height * 0.24}
                    textStyle={{color: 'white'}}
                />

            </View>
        );
    }

    /**
     * scrollview滑动回调
     */
    onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        // console.log('滑动距离' + y);
        let height = event.nativeEvent.layoutMeasurement.height;
        // console.log('列表高度' + height);
        let contentHeight = event.nativeEvent.contentSize.height;
        // console.log('内容高度' + contentHeight);
        // console.log('判断条件' + (y + height));
        if (y + height >= contentHeight - 20) {
            console.log('触发加载更多');
            //如果列表没有结束
            if (this.state.isEnd != true) {
                //如果最后一次请求起始id为0或者当前请求起始id不等于最后一次请求起始id,添加更多列表
                if (this.state.lastId == 0 || (this.state.lastId !== 0 && this.state.lastId !== this.state.startId)) {
                    //放入长度为5的列表
                    key++;
                    this.setState({
                        lastId: this.state.startId,
                    });
                    bottomList.push(
                        <AllListTopic key={key} showNum={5} startId={this.state.startId} loading={this.state.loading}
                                      getEndId={(endId, end) => {
                                          console.log('回调了' + endId + end);
                                          this.setState({
                                              startId: endId,
                                              loading: false,
                                              isEnd: end,
                                          });

                                      }}/>
                    );
                    //设置正在加载和更多列表标记
                    this.setState({
                        loadMore: true,
                        loading: true,
                    });
                }
            }
        }
    }


    /**
     * 添加尾部专题列表
     * @returns {Array}
     */
    renderLoadMoreList() {
        //如果当前列表无数据直接返回
        if (this.state.oneData === null) {
            return;
        } else {
            //如果正在加载更多,添加这个专题列表
            if (this.state.loadMore) {
                console.log('最底部列表起始id' + this.state.startId);
                return bottomList;

            }
        }
    }

    /**
     * 显示正在加载
     */
    renderLoading() {
        return (
            <LoadingMore loading={this.state.loading}/>
        );
    }

    /**
     * 渲染顶部导航
     */
    renderNavBar() {
        return (
            // 顶部导航bar
            <View style={styles.outNav}>

                <Image source={{uri: 'one_is_all'}} style={styles.allTitle}/>

                {/*右边按钮*/}
                <TouchableOpacity style={styles.rightBtn}
                                  onPress={() => this.pushToSearch()}>
                    <Image source={{uri: 'search_night'}} style={styles.navRightBar}/>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 跳转到搜索页
     * @param url
     */
    pushToSearch() {
        this.props.navigator.push(
            {
                component: Search,
            }
        )
    }

    /**
     * 渲染所有的item
     */
    renderAllItem() {
        var itemArr = [];
        itemArr.push(
            <AllListBanner key={0} refreshView={this.state.isRefreshing} navigator={this.props.navigator}/>
        );
        itemArr.push(
            <View key={1} style={styles.bottomLine}/>
        );
        // 渲染分类导航
        itemArr.push(
            <AllCategoryGuide key={2} navigator={this.props.navigator} />
        );
        itemArr.push(
            <View key={3} style={styles.bottomLine}/>
        );
        // 渲染专题列表
        itemArr.push(
            <AllListTopic key={4} showNum={14} refreshView={this.state.isRefreshing} startId={0} navigator={this.props.navigator}
                          getEndId={(endId, end) => {
                              this.setState({
                                  startId: endId
                              })
                          }}/>
        );

        // 渲染热门作者
        itemArr.push(
            <AllListAuthor key={5} refreshView={this.state.isRefreshing} navigator={this.props.navigator}/>
        );

        itemArr.push(
            <View key={6} style={styles.bottomLine}/>
        );

        //问所有人
        itemArr.push(
            <AllListQuestion key={7} refreshView={this.state.isRefreshing} navigator={this.props.navigator}/>
        );

        itemArr.push(
            <View key={8} style={styles.bottomLine}/>
        );
        return itemArr;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
    },
    outNav: {
        height: Platform.OS == 'ios' ? height * 0.07 : height * 0.08,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        borderBottomColor:'#dddddd',
        borderBottomWidth:constants.divideLineWidth
    },

    navRightBar: {
        width: width * 0.05,
        height: width * 0.05,
    },
    rightBtn: {
        position: 'absolute',
        right: width * 0.05,
    },
    allTitle: {
        width: width * 0.36,
        height: width * 0.04,
    },
    bottomLine: {
        backgroundColor: '#EEEEEE',
        height: width * 0.028,
        width: width
    },
});

export default All;

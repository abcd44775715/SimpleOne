/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 主界面分页－所有－顶部水平滚动列表
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import NetUtils from "../util/NetUtil"
import Read from '../read/Read'
import constants from '../Constants'
import ServerApi from '../ServerApi'
import PropTypes from 'prop-types'
let {width, height} = constants.ScreenWH
let page
let toast = NativeModules.ToastNative
class AllListBanner extends Component{
    constructor(props){
        super(props);
        this.state={
            curPage: '0',
            banner: null,
        }
        page=this
    }

    /**
     * 发起网络请求
     */
    componentDidMount() {
        this.getBannerData()
    }

    /**
     * 父组件传参变化回调
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        this.getBannerData()
    }

    /**
     * 开启计时器
     */
    startTimer() {
        //获得scrollView
        let scrollView = this.refs.sv_banner
        this.stopTimer()
        this.timer = setInterval(function () {
            //计算当前所在页数
            let activePage;
            // console.log("curPage:" + this.state.curPage);
            if (page.state.banner!== 'undefined' && page.state.curPage + 1 >= page.state.banner.data.length) {
                activePage = 0;
            } else {
                activePage = parseInt(page.state.curPage + 1);
            }
            // console.log("activePage:" + activePage);
            //更新
            page.setState({
                curPage: activePage
            });
            //设置偏移量，实现滚动
            let offsetx = activePage * width;
            // console.log("offsetx:" + offsetx);
            scrollView.scrollResponderScrollTo({x: offsetx, y: 0, animated: true})
        }, this.props.duration)
    }

    /**
     * 停止计时器
     */
    stopTimer() {
        if(this.timer!=null){
            clearInterval(this.timer)
        }
    }

    /**
     * 获取banner列表
     * @param url 请求地址
     * @param id  id值
     */
    getBannerData() {
        NetUtils.get(ServerApi.AllBanner, null, (result) => {
            this.setState({
                banner: result,
            })
            this.props.onSuccess && this.props.onSuccess()
            //开启定时器
            this.startTimer()
        }, (error) => {
            console.log('error' + error)
            this.props.onError && this.props.onError()
        })
    }

    render() {
        return (
            <View style={styles.banner}>

                <ScrollView ref='sv_banner'
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            scrollEnabled={this.props.scrollEnabled}
                            onScrollBeginDrag={
                                (e) => this.stopTimer()
                            }
                            onScrollEndDrag={
                                (e) => this.startTimer()
                            }
                            onMomentumScrollEnd={
                                (e) => this.onAnimationEnd(e)
                                // this.onScrollEndDrag()

                            }
                >
                    {this.renderChildView()}
                </ScrollView>
                <View style={styles.pageView}>
                    {this.renderPageCircle()}
                </View>

            </View>
        )
    }

    /**
     * 渲染banner图片
     * @returns {Array}
     */
    renderChildView() {
        if (this.state.banner != null) {
            let allchild = []
            let itemDatas = this.state.banner.data

            for (let i = 0; i < itemDatas.length; i++) {
                let itemData = itemDatas[i]
                allchild.push(
                    <TouchableOpacity key={i}
                                      onPress={() => this.pushToRead()}>
                        <Image source={{uri: itemData.cover}} style={styles.img}/>
                    </TouchableOpacity>
                )
            }
            return allchild
        }
    }

    /**
     * 渲染顶部圆点
     * @returns {Array}
     */
    renderPageCircle() {
        if (this.state.banner != null) {
            //定义一个数组放置所有的圆点
            let indicatorArr = []
            for (let i = 0; i < this.state.banner.data.length; i++) {
                indicatorArr.push(
                    <Text key={i}
                          style={[{fontSize: width * 0.04}, {color: 'white'}, {marginLeft: width * 0.02}, {color: 'white'}]}>
                        {this.renderCicle(i)}
                    </Text>
                )
            }
            return indicatorArr
        }
    }

    /**
     * 根据状态渲染当前圆点
     * @param index
     * @returns {*}
     */
    renderCicle(index) {
        if (index === this.state.curPage) {
            return '●'
        } else {
            return '○'
        }
    }

    /**
     * 滚动回调
     * @param e
     */
    onAnimationEnd(e) {
        //水平方向偏移量
        let offset = e.nativeEvent.contentOffset.x
        //当前页数
        let currentPage = Math.floor(offset / width);

        this.setState({
            curPage: currentPage
        })
    }

    /**
     * 跳转到阅读页
     * @param url
     */
    pushToRead() {
        if(this.state.banner.data[this.state.curPage].category.toString() !== constants.CategoryBannerAd.toString() ){
            this.props.navigator.push(
                {
                    component: Read,
                    title:'阅读',
                    params:{
                        contentId:this.state.banner.data[this.state.curPage].content_id,
                        contentType:this.state.banner.data[this.state.curPage].category,
                        entry:constants.AllRead
                    }
                }
            )
        }else{
            toast.showMsg('这是一个广告跳转',toast.SHORT)
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer)
    }
}

AllListBanner.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    duration: PropTypes.number,
    scrollEnabled: PropTypes.bool
}
AllListBanner.defaultProps={
    duration: 4000,
    scrollEnabled: true //解决滑动冲突外部控制
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    banner: {
        height: height * 0.36,
        width: width
    },
    img: {
        width: width,
        height: height * 0.36
    },
    pageView: {
        height: width * 0.04,
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        right: width * 0.02,
        alignItems: 'center'
    }
})

export default AllListBanner


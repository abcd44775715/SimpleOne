/**
 * @date : 6/28/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 帧动画view
 */

import React, {Component} from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import MyImage from '../view/MyImage'
import PropTypes from 'prop-types'
let page
let flag = 0

class FrameAnimationView extends Component{

    constructor(props){
        super(props);
        this.state={
            rotate: this.props.loading
        };
        this.loadingIndex=0;
        page=this;
    }

    render() {
        if (this.state.rotate) {
            return (
                <TouchableOpacity style={this.props.style} onPress={() => {
                    this.props.clickEvent && this.props.clickEvent()
                }}>
                    <MyImage ref={"img"} source={{uri: this.props.loadingArr[this.loadingIndex]}}
                             style={[{width: this.props.width, height: this.props.height }]}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    componentDidMount(){
        if (!this.props.loading) {
            console.log('停止动画')
            this.stopTimer()
        } else {
            console.log('开始动画')
            this.startTimer()
        }
    }

    /**
     * 父组件传参变化回调
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            console.log('停止动画')
            this.stopTimer()
        } else {
            console.log('开始动画')
            this.startTimer()
        }
        this.setState({
            rotate: nextProps.loading,
        })
    }

    /**
     * 开启计时器
     */
    startTimer() {
        this.stopTimer()
        this.timer = setInterval(function () {
            if (page.state.rotate) {
                requestAnimationFrame(() => {
                    //移动下标
                    flag ++
                    if(flag > page.props.refreshTime){
                        if (page.refs.img + '' !== 'undefined' && page.loadingIndex >= 0 && page.loadingIndex < page.props.loadingArr.length) {
                            page.refs.img.setNativeProps({
                                source:{uri: page.props.loadingArr[page.loadingIndex]},
                            })
                            // console.log('刷新下标' + page.props.loadingArr[page.loadingIndex])
                            page.loadingIndex++
                            if(page.loadingIndex >= page.props.loadingArr.length){
                                page.loadingIndex=0
                            }
                        }
                        flag = 0
                    }
                })
            } else {
                page.stopTimer()
            }
        }, 10)
    }

    /**
     * 停止计时器
     */
    stopTimer() {
        if (this.timer != null) {
            clearInterval(this.timer)
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer)
    }
}

FrameAnimationView.propTypes={
    width: PropTypes.number.isRequired, //高度
    height:PropTypes.number.isRequired, //宽度
    loading: PropTypes.bool.isRequired, //是否在加载
    refreshTime: PropTypes.number.isRequired, //刷新频率
    clickEvent: PropTypes.func, //点击事件回调
    loadingArr: PropTypes.array.isRequired //载入动画数组
}

export default FrameAnimationView

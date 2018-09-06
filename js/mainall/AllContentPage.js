/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : all分页内容渲染
 */

import React, {Component} from 'react'
import {View} from 'react-native'
import PullScollView from '../view/PullScollView'
import AllListTopic from './AllListTopic'// 专题列表
import AllCategoryGuide from './AllCategoryGuide'// 分类导航
import AllListAuthor from './AllListAuthor'// 热门作者
import AllListQuestion from './AllListQuestion'// 问所有人
import AllListBanner from './AllListBanner' //顶部横幅
import LoadMoreState from "../view/LoadMoreState" //加载更多状态
import constants from "../Constants"
import CommStyles from "../CommStyles" // 顶部横幅滚动
import PropTypes from 'prop-types'
// 顶部的banner
let key = 9;
let bottomList = []

class AllContentPage extends Component {

    static propTypes = {
        onError: PropTypes.func,
        onSuccess: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false, //是否刷新所有页面
            loadMore: false, //底部是否显示更多列表
            startId: 0, //主题请求开始id
            lastId: 0, //记录上一次请求id
            isEnd: false,//是否到末尾标记
            scrollEnabled: true // 是否允许横幅滚动（scrollview嵌套冲突）
        }
        this.onPullRelease = this.onPullRelease.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
        this.onError = this.onError.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.itemArr = []
        this.loadNum = 0
    }

    render() {
        return (
            <PullScollView
                onRetry={() => {
                    this.errCallback()
                }}
                onPullRelease={this.onPullRelease}
                onLoadMore={this.onLoadMore}
                loadMoreState={this.state.loadingState}
                onPulling={() => {
                    this.setState({
                        scrollEnabled: false
                    })
                }}>

                {this.renderAllItem()}
                {this.renderLoadMoreList()}
            </PullScollView>
        )
    }

    onPullRelease(resolve) {
        //更改刷新状态
        this.setState({isRefreshing: true})
        //刷新完毕，重置下拉刷新，再次更新刷新和加载更多状态
        setTimeout(() => {
            resolve()
            this.setState({
                isRefreshing: false,
                loadMore: false,
                scrollEnabled: true
            })
        }, 3000)
    }

    /**
     * scrollview滑动回调
     */
    onLoadMore() {
        //如果列表没有结束
        if (!this.state.isEnd) {
            //如果最后一次请求起始id为0或者当前请求起始id不等于最后一次请求起始id,添加更多列表
            if (this.state.lastId === 0 || (this.state.lastId !== 0 && this.state.lastId !== this.state.startId)) {
                //放入长度为5的列表
                key++
                this.setState({
                    lastId: this.state.startId,
                })
                bottomList.push(
                    <AllListTopic key={key} showNum={5} startId={this.state.startId}
                                  onError={(callback) => {
                                      this.errCallback = callback
                                      this.setState({
                                          loadingState: LoadMoreState.state.error,
                                      })
                                      // 删除这个list
                                      bottomList.pop()
                                      key--
                                  }}
                                  getEndId={(endId, end) => {
                                      console.log('回调了' + endId + end);
                                      this.setState({
                                          startId: endId,
                                          loadingState: LoadMoreState.state.tip,
                                          isEnd: end,
                                      })
                                  }}/>
                )
                //设置正在加载和显示更多标记
                this.setState({
                    loadMore: true,
                    loadingState: LoadMoreState.state.loading,
                })
            }
        } else {
            this.setState({
                loadMore: true,
                loadingState: LoadMoreState.state.noMore,
            })
        }
    }


    /**
     * 添加尾部专题列表
     * @returns {Array}
     */
    renderLoadMoreList() {
        //如果当前列表无数据直接返回
        if (this.state.oneData) {
            //如果当前是加载更多列表状态，直接返回
            if (this.state.loadMore) {
                console.log('最底部列表起始id' + this.state.startId);
                return bottomList
            }
        }
    }

    onError() {
        this.props.onError && this.props.onError()
    }

    onSuccess() {
       this.loadNum ++
        if (this.loadNum === 4) {
            this.props.onSuccess && this.props.onSuccess()
        }
    }

    /**
     * 首次加载渲染
     */
    renderAllItem() {
        this.itemArr.push(
            <AllListBanner
                onError={this.onError}
                onSuccess={this.onSuccess}
                key={0}
                refreshView={this.state.isRefreshing}
                navigator={this.props.navigator}
                scrollEnabled={this.state.scrollEnabled}/>
        )
        this.itemArr.push(
            <View key={1}
                  style={[CommStyles.bottomLineAll, {backgroundColor: constants.nightMode ? constants.nightModeGrayDark : constants.itemDividerColor}]}/>
        )
        // 渲染分类导航
        this.itemArr.push(
            <AllCategoryGuide key={2} navigator={this.props.navigator}/>
        )
        this.itemArr.push(
            <View key={3}
                  style={[CommStyles.bottomLineAll, {backgroundColor: constants.nightMode ? constants.nightModeGrayDark : constants.itemDividerColor}]}/>
        )
        // 渲染专题列表
        this.itemArr.push(
            <AllListTopic
                onError={this.onError}
                onSuccess={this.onSuccess}
                key={4}
                showNum={14}
                refreshView={this.state.isRefreshing} startId={0}
                navigator={this.props.navigator}
                getEndId={(endId, end) => {
                    this.setState({
                        startId: endId
                    })
                }}/>
        )

        // 渲染热门作者
        this.itemArr.push(
            <AllListAuthor
                key={5}
                refreshView={this.state.isRefreshing}
                navigator={this.props.navigator}
                onError={this.onError}
                onSuccess={this.onSuccess}/>
        )

        this.itemArr.push(
            <View key={6}
                  style={[CommStyles.bottomLineAll, {backgroundColor: constants.nightMode ? constants.nightModeGrayDark : constants.itemDividerColor}]}/>
        )

        //问所有人
        this.itemArr.push(
            <AllListQuestion
                key={7}
                refreshView={this.state.isRefreshing}
                navigator={this.props.navigator}
                onError={this.onError}
                onSuccess={this.onSuccess}/>
        )

        this.itemArr.push(
            <View key={8}
                  style={[CommStyles.bottomLineAll, {backgroundColor: constants.nightMode ? constants.nightModeGrayDark : constants.itemDividerColor}]}/>
        )
        return this.itemArr
    }
}

export default AllContentPage
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow　主界面分页－一个－广播item
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    NativeModules,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import Read from '../read/Read'
import constants from '../Constants'
import Share from '../share/Share'
import FrameAnimation from '../view/FrameAnimationView'
import CommStyles from "../CommStyles"
import PropTypes from 'prop-types'
let {width, height} = constants.ScreenWH
let media = NativeModules.MediaPlayer
let toast = NativeModules.ToastNative

class OneListAudio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            like: false,
            likeNum: this.props.data.like_count,
            isPlay: false,
            resizeMode: 'contain',
            loading: false,
        }
    }

    componentDidMount() {
        // 播放进度监听
        DeviceEventEmitter.addListener(constants.PLAY_PROGRESS, () => {
            if (this.props.page === constants.curPage && constants.CURRENT_TYPE === constants.AUDIO_TYPE) {
                this.setState({
                    loading: true
                })
                if (!constants.appState.state) {
                    constants.appState.startPlay()
                }
            } else { //不是播放的页面，播放按钮重置
                if (this.state.isPlay) {
                    this.setState({
                        isPlay: false
                    })
                }
            }
        })
        // 播放状态监听
        DeviceEventEmitter.addListener(constants.PLAY_STATE, (reminder) => {
            console.log('当前状态' + reminder.state)
            if (reminder.state === constants.STOP_PLAY_MEDIA || reminder.state === constants.PLAY_EXCEPTION || reminder.state === constants.PLAY_COMPLETE) {
                this.setState({
                    isPlay: false,
                    loading: false
                })
            }
        })
    }

    // 组件卸载逻辑
    componentWillUnmount() {
        // 去除监听
        DeviceEventEmitter.removeAllListeners(constants.PLAY_PROGRESS)
        DeviceEventEmitter.removeAllListeners(constants.PLAY_STATE)
        // 停止播放器
        media.stop()
    }

    //渲染
    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.pushToRead()}>
                <View
                    style={[CommStyles.containerItem, {backgroundColor: constants.nightMode ? constants.nightModeGrayLight : 'white'}]}>
                    {this.renderContent()}
                    {/*最下面的bar*/}
                    <View
                        style={[styles.bar, {backgroundColor: this.props.data.author.user_name === undefined ? 'transparent' : 'rgba(0, 0, 0, 0.5)'}]}>
                        {this.renderLeftView()}

                        {/*右边的按钮*/}
                        <View style={CommStyles.rightBtnItem}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: width * 0.1,
                                marginRight: width * 0.03
                            }}>
                                <TouchableOpacity
                                    onPress={() => this.likeClick()}>
                                    <Image source={{uri: this.showLikeIcon()}}
                                           style={CommStyles.barRightBtnsIconItem1}/>
                                </TouchableOpacity>

                                {constants.renderlikeNum(this.state.likeNum)}

                            </View>
                            <TouchableOpacity
                                onPress={() => this.pushToShare()}>
                                <Image source={{uri: 'share_image'}} style={CommStyles.barRightBtnsIconItem2}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    renderLeftView() {
        //播出过有音频，渲染带图的
        if (this.props.data.author.user_name !== undefined) {
            return (
                <View style={{
                    flexDirection: 'row',
                    marginLeft: width * 0.04,
                    height: height * 0.07,
                    alignItems: 'center'
                }}>
                    <Image style={styles.avatar} source={{uri: this.props.data.author.web_url}}/>
                    <Text style={styles.name}>{this.props.data.author.user_name}</Text>
                </View>
            )
        } else {
            // 没播放时，渲染播放按钮
            if (!this.state.isPlay) {
                return (
                    <TouchableOpacity
                        onPress={() => this.playMusic()}>
                        {/*左边的按钮*/}
                        <Image source={{uri: 'voice_fm_00'}} style={styles.leftIcon}/>
                    </TouchableOpacity>
                );
            } else {
                /*播放时，渲染动画按钮*/
                return (
                    <FrameAnimation
                        clickEvent={() => {
                            this.stopMusic()
                        }}
                        loadingArr={this.getLoadingIcon()}
                        width={width * 0.06} height={width * 0.06}
                        refreshTime={30}
                        loading={this.state.isPlay} style={styles.leftIcon}/>
                )
            }

        }
    }

    /**
     * 渲染内容
     */
    renderContent() {
        //播出过有音频，渲染带图的
        if (this.props.data.author.user_name !== undefined) {
            return (
                <View>
                    <Image source={{uri: this.props.data.img_url}} style={styles.bg}/>

                    <Image source={{uri: 'fm_logo_white'}} style={styles.audioLogo}/>

                    <View style={styles.playView}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!this.state.isPlay) {
                                    this.playMusic()
                                } else {
                                    this.stopMusic()
                                }
                            }}>
                            <Image source={{uri: this.state.isPlay ? 'feeds_radio_pause' : 'feeds_radio_play'}}
                                   style={styles.playBtn}/>
                        </TouchableOpacity>
                        <View style={styles.titles}>
                            <Text style={styles.volume}>{this.props.data.volume}</Text>
                            <Text style={styles.volumeTitle}>{this.props.data.title}</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Image source={{uri: this.props.data.img_url}} style={styles.bg}/>
                    <Text style={styles.title}>{this.props.data.title}</Text>
                </View>
            )
        }
    }

    /**
     * 载入图标名称初始化
     */
    getLoadingIcon() {
        let loadingArr = []
        for (let i = 0; i < 3; i++) {
            loadingArr.push(('voice_fm_0' + i).toString())
        }
        return loadingArr
    }

    // 播放音乐逻辑
    playMusic() {
        constants.curPage = this.props.page
        constants.CURRENT_MUSIC_DATA = this.props.data
        constants.CURRENT_TYPE = constants.AUDIO_TYPE

        if (this.props.data.default_audios !== undefined && this.props.data.default_audios.length > 0) {
            console.log('播放地址' , this.props.data.default_audios[0])
            media.start(this.props.data.default_audios[0]);
            this.setState({
                isPlay: true
            })
        } else {
            if (this.props.data.audio_url.toString().contains('http://music.wufazhuce.com/')) {
                // media.start('http://music.wufazhuce.com/lmVsrwGEgqs8pQQE3066e4N_BFD4');
                console.log('播放地址' , this.props.data.audio_url);
                media.start(this.props.data.audio_url);
                this.setState({
                    isPlay: true
                })
            } else {
                toast.showMsg('今晚22:30主播在这里等你', toast.SHORT);
            }
        }
    }

    // 停止播放
    stopMusic() {
        media.stop()
        this.setState({
            isPlay: false,
        })
    }

    /**
     * 跳转到阅读页
     * @param url
     */
    pushToRead() {
        if (this.props.data.content_type === 8 && this.props.page === 0) {
            this.props.todayRadio()
            return
        }
        this.props.navigator.push(
            {
                component: Read,
                title: '阅读',
                params: {
                    data: this.props.data,
                    entry: constants.OneRead
                }
            }
        )
    }

    /**
     * 跳转到分享
     * @param url
     */
    pushToShare() {
        this.props.navigator.push(
            {
                component: Share,
                title: '分享',
                params: {
                    showlink: true,
                    shareInfo: this.props.data.share_info,
                    shareList: this.props.data.share_list
                }
            }
        )
    }

    /**
     * 点击喜欢
     */
    likeClick() {
        this.setState({
            likeNum: this.state.like ? this.props.data.like_count : this.props.data.like_count + 1,
            like: !this.state.like
        })
    }

    /**
     * 根据当前状态，显示喜欢图标
     * @returns {*}
     */
    showLikeIcon() {
        //喜欢
        if (this.state.like) {
            return 'bubble_liked'
        } else {
            return 'bubble_like'
        }
    }
}

OneListAudio.propsType = {
    data: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    todayRadio: PropTypes.func,
}

const styles = StyleSheet.create({
    title: {
        fontSize: width * 0.034,
        color: '#c3c2c7',
        width: width,
        textAlign: 'center',
        position: 'absolute',
        bottom: height * 0.1,
    },

    bg: {
        width: width,
        height: width * 0.66,
    },

    bar: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: width,
        borderTopColor: '#dddddd',
        borderTopWidth: constants.divideLineWidth,
        height: height * 0.07,

    },
    leftIcon: {
        marginLeft: width * 0.04,
        width: width * 0.06,
        height: width * 0.06,
    },
    playView: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.1
    },
    playBtn: {
        width: width * 0.08,
        height: width * 0.08,
        marginLeft: width * 0.06,
    },
    audioLogo: {
        width: width * 0.08,
        height: width * 0.08,
        position: 'absolute',
        left: width * 0.06,
        top: width * 0.06
    },
    titles: {
        marginLeft: width * 0.02
    },
    volume: {
        color: 'white',
        fontSize: width * 0.03,
    },
    volumeTitle: {
        color: 'white',
        fontSize: width * 0.05
    },
    avatar: {
        resizeMode: 'stretch',
        width: width * 0.062,
        height: width * 0.062,
        borderRadius: width,
    },
    name: {
        color: '#939192',
        fontSize: width * 0.032,
        marginLeft: width * 0.02
    }
})

export default OneListAudio;

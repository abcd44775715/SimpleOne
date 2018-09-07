/**
 * @date : 6/28/18
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 单选菜单
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native'
import constants from '../Constants'
let {width, height} = constants.ScreenWH

export default class SingleChoiceDialog extends Component {
    static propTypes = {
        isSelected: PropTypes.string, // 默认选中项,
        isVisible: PropTypes.bool, // 是否显示Dialog
        dataSource: PropTypes.array, // 数据源
        onConfirm: PropTypes.func.isRequired, // 确认回调
        onCancel: PropTypes.func.isRequired, // 取消回调
    }

    static defaultProps = {
        isSelected: '', // 默认语言为中文
        isVisible: false, // 默认关闭组件
        dataSource: [], // 默认数据源为空数组
    }

    render() {
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={() => {
                    this.props.onCancel()
                }}>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        flex:1
                    }}
                    onPress={() => {
                        this.props.onCancel()
                    }}>
                    <View style={{backgroundColor: '#fff', borderRadius: 2 ,height:width*0.136*this.props.dataSource.length}}>
                        <ScrollView>
                            {this.renderOptionsList()}
                        </ScrollView>

                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderOptionsList() {
        let key = 0
        return this.props.dataSource.map(option => {
            key++
            return (
                <TouchableOpacity key={key} onPress={() => {
                    this.optionSelected(option)
                }}>
                    <Text style={{
                        paddingLeft:width*0.06,
                        height:width*0.136,
                        width: width * 0.72,  fontSize: width * 0.044, textAlignVertical: 'center',
                        borderBottomColor: '#dddddd', borderBottomWidth: constants.divideLineWidth,
                        color: this.props.isSelected === option.value ? '#009ad6' : '#333333'
                    }}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    onCancel() {
        this.props.onCancel()
    }

    optionSelected(option) {
        // 通过回调传递数据
        this.props.onConfirm(option)
        // 关闭Dialog对话框
        this.onCancel()
    }
}
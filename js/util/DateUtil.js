import React,{Component} from 'react'

/**
 * @date :2017/12/15 0015
 * @author :JessieK
 * @email :lyj1246505807@gmail.com
 * @description : 时间工具类
 */

export default class DateUtil extends Component{

    static chnNumChar=['〇','一','二','三','四','五','六','七','八','九']


    /**
     * 获取当前系统时间 yyyyMMdd
     */
    static getCurrentDateFormat(){
        let space = "-"
        let dates = new Date()
        let years = dates.getFullYear()
        let months = dates.getMonth()+1
        if(months<10){
            months = "0"+months
        }

        let days = dates.getDate()
        if(days<10){
            days = "0"+days
        }
        let time = years+space+months+space+days
        return time
    }


    /**
     * 得到当前中文年月日
     * @returns {string}
     */
    static getCurrentDateChinese() {
        let dates = new Date()
        let years = dates.getFullYear()
        let months = dates.getMonth() + 1
        let days = dates.getDate()
        let time = this.getYearChinese(years) + '年' +this.getMonthChinese(months) +'月'+ this.getDayChinese(days)+'日'
        return time
    }

    /**
     * 得到当前年份中文
     * @param year
     * @returns {string}
     */
    static getYearChinese(year) {
        let str = year.toString()
        for(let i=0;i<10;i++){
            str = str.replace(i+'', this.chnNumChar[i])
        }

        return str
    }

    /**
     * 得到当前月份中文
     * @param month
     * @returns {string}
     */
    static getMonthChinese(month){
        if(month/10>1 ){
            let numStr=''
            if(month%10!==0){
                numStr=this.chnNumChar[month%10]
            }
            return '十'+ numStr
        }else{
            return this.chnNumChar[month%10]
        }
    }

    /**
     * 得到当前日中文
     * @param day
     * @returns {string}
     */
    static getDayChinese(day){
        if(day/10>=1){
            let numStr=''
            let numFirstStr=''
            if(day%10!==0){
                numStr=this.chnNumChar[day%10]
            }
            if(day/10>=2){
                numFirstStr=this.chnNumChar[parseInt(day/10)]
            }
            return numFirstStr+'十'+ numStr
        }else{
            return this.chnNumChar[day%10]
        }
    }
    /**
     * 获取当前星期几
     * @param time
     * @returns {*}
     */
    static getweek() {
        let dates = new Date()
        let d = dates.getDay()
        return d
    }


    /**
     * 日期显示
     * @returns {*}
     */
    static showDate(curdate) {
        let tempStr = curdate.split(' ')
        //是今天
        if (DateUtil.getCurrentDateFormat() === tempStr[0]) {
            return '今天'
        } else {
            return tempStr[0]
        }
    }

    /**
     * 获取后一天日期
     * @param curDate
     * @returns {string}
     */
    static getNextDate(curDate, num){
        // console.log('当前curDate'+curDate);
        let array =  curDate.split("-")
        let dt = new Date(array[0], array[1]-1, array[2])
        let dateStr
        if(arguments.length === 1){
            dateStr  = DateUtil.dateConverStr(DateUtil.getDateForAddDay(dt, 1))//设置天数 -1 天
        }else{
            dateStr  = DateUtil.dateConverStr(DateUtil.getDateForAddDay(dt, num))//设置天数 num 天
        }

        return dateStr
    }
    /**
     * 获取前一天日期
     * @param curDate 当前日期string
     */
    static getLastDate(curDate, num){
        // console.log('当前日期'+curDate);
        let array =  curDate.split("-")
        let dt = new Date(array[0], array[1]-1, array[2])
        let dateStr
        if(arguments.length === 1){
            dateStr  = DateUtil.dateConverStr(DateUtil.getDateForAddDay(dt, -1))//设置天数 -1 天
        }else{
            dateStr  = DateUtil.dateConverStr(DateUtil.getDateForAddDay(dt, -num))//设置天数 num 天
        }
        return dateStr
    }

    /**
     * 在指定日期上加减
     * @param AddDayCount 加减参数
     * @returns {Date}
     */
    static getDateForAddDay(date, AddDayCount) {
        date.setDate(date.getDate()+AddDayCount)//获取AddDayCount天后的日期
        return date
    }

    /**
     *  date转sting
     * @param date
     * @returns {string}
     */
    static dateConverStr(date){
        // console.log(date)
        let y = date.getFullYear()
        let m = date.getMonth()+1//获取当前月份的日期
        let d = date.getDate()
        // console.log(y+"-"+m+"-"+d)
        if(m < 10) {
            m='0'+m
        }
        if(d < 10) {
            d="0"+d
        }
        return y+"-"+m+"-"+d
    }

}
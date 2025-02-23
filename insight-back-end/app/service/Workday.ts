/**
 * 工作日 Service 假期查询链接 
 * 2019 http://www.gov.cn/zhengce/content/2018-12/06/content_5346276.htm
 * 2019调整 http://www.gov.cn/zhengce/content/2019-03/22/content_5375877.htm
 * 2020 http://www.gov.cn/zhengce/content/2019-11/21/content_5454164.htm
 * 2021 http://www.gov.cn/zhengce/content/2020-11/25/content_5564127.htm
 */
const moment = require('moment');
// 放假时间
const HOLIDAYS = {
    2019: {
        '2019-01-01': '元旦',
        '2019-02-04': '春节',
        '2019-02-05': '春节',
        '2019-02-06': '春节',
        '2019-02-07': '春节',
        '2019-02-08': '春节',
        '2019-02-09': '春节',
        '2019-02-10': '春节',
        '2019-04-05': '清明节',
        '2019-04-06': '清明节',
        '2019-04-07': '清明节',
        '2019-05-01': '劳动节',
        '2019-05-02': '劳动节',
        '2019-05-03': '劳动节',
        '2019-05-04': '劳动节',
        '2019-06-07': '端午节',
        '2019-06-08': '端午节',
        '2019-06-09': '端午节',
        '2019-09-13': '中秋节',
        '2019-09-14': '中秋节',
        '2019-09-15': '中秋节',
        '2019-10-01': '国庆节',
        '2019-10-02': '国庆节',
        '2019-10-03': '国庆节',
        '2019-10-04': '国庆节',
        '2019-10-05': '国庆节',
        '2019-10-06': '国庆节',
        '2019-10-07': '国庆节',
    },
    2020: {
        '2020-01-01': '元旦',
        '2020-01-24': '春节',
        '2020-01-25': '春节',
        '2020-01-26': '春节',
        '2020-01-27': '春节',
        '2020-01-28': '春节',
        '2020-01-29': '春节',
        '2020-01-30': '春节',
        '2020-04-04': '清明节',
        '2020-04-05': '清明节',
        '2020-04-06': '清明节',
        '2020-05-01': '劳动节',
        '2020-05-02': '劳动节',
        '2020-05-03': '劳动节',
        '2020-05-04': '劳动节',
        '2020-05-05': '劳动节',
        '2020-06-25': '端午节',
        '2020-06-26': '端午节',
        '2020-06-27': '端午节',
        '2020-10-01': '国庆节',
        '2020-10-02': '国庆节',
        '2020-10-03': '国庆节',
        '2020-10-04': '国庆节',
        '2020-10-05': '国庆节',
        '2020-10-06': '国庆节',
        '2020-10-07': '国庆节',
        '2020-10-08': '国庆节',
    },
    2021: {
        '2021-01-01': '元旦',
        '2021-01-02': '元旦',
        '2021-01-03': '元旦',
        '2021-02-11': '春节',
        '2021-02-12': '春节',
        '2021-02-13': '春节',
        '2021-02-14': '春节',
        '2021-02-15': '春节',
        '2021-02-16': '春节',
        '2021-02-17': '春节',
        '2021-04-03': '清明节',
        '2021-04-04': '清明节',
        '2021-04-05': '清明节',
        '2021-05-01': '劳动节',
        '2021-05-02': '劳动节',
        '2021-05-03': '劳动节',
        '2021-05-04': '劳动节',
        '2021-05-05': '劳动节',
        '2021-06-12': '端午节',
        '2021-06-13': '端午节',
        '2021-06-14': '端午节',
        '2021-09-19': '中秋节',
        '2021-09-20': '中秋节',
        '2021-09-21': '中秋节',
        '2021-10-01': '国庆节',
        '2021-10-02': '国庆节',
        '2021-10-03': '国庆节',
        '2021-10-04': '国庆节',
        '2021-10-05': '国庆节',
        '2021-10-06': '国庆节',
        '2021-10-07': '国庆节',
    },
    2022: {
        '2022-01-01': '元旦',
        '2022-01-02': '元旦',
        '2022-01-03': '元旦',
        '2022-01-31': '春节',
        '2022-02-01': '春节',
        '2022-02-02': '春节',
        '2022-02-03': '春节',
        '2022-02-04': '春节',
        '2022-02-05': '春节',
        '2022-02-06': '春节',
        '2022-04-03': '清明节',
        '2022-04-04': '清明节',
        '2022-04-05': '清明节',
        '2022-04-30': '劳动节',
        '2022-05-01': '劳动节',
        '2022-05-02': '劳动节',
        '2022-05-03': '劳动节',
        '2022-05-04': '劳动节',
        '2022-06-03': '端午节',
        '2022-06-04': '端午节',
        '2022-06-05': '端午节',
        '2022-09-10': '中秋节',
        '2022-09-11': '中秋节',
        '2022-09-12': '中秋节',
        '2022-10-01': '国庆节',
        '2022-10-02': '国庆节',
        '2022-10-03': '国庆节',
        '2022-10-04': '国庆节',
        '2022-10-05': '国庆节',
        '2022-10-06': '国庆节',
        '2022-10-07': '国庆节',
    },

// 补班（需要上班的周末）
const REPAIR_WORKDAY = {
    2019: {
        '2019-02-02': '补春节',
        '2019-02-03': '补春节',
        '2019-04-28': '补劳动节',
        '2019-05-05': '补劳动节',
        '2019-09-29': '补国庆节',
        '2019-10-12': '补国庆节',
    },
    2020: {
        '2020-01-19': '补春节',
        '2020-02-01': '补春节',
        '2020-04-26': '补劳动节',
        '2020-05-09': '补劳动节',
        '2020-06-28': '补端午节',
        '2020-09-27': '补国庆节',
        '2020-10-10': '补国庆节',
    },
    2021: {
        '2021-02-07': '补春节',
        '2021-02-20': '补春节',
        '2021-04-25': '补劳动节',
        '2021-05-08': '补劳动节',
        '2021-09-18': '补中秋节',
        '2021-09-26': '补国庆节',
        '2021-10-09': '补国庆节',
    },
    2022: {
        '2022-01-29': '补春节',
        '2022-01-30': '补春节',
        '2022-04-02': '补清明节',
        '2022-04-24': '补劳动节',
        '2022-05-07': '补劳动节',
        '2022-10-08': '补国庆节',
        '2022-10-09': '补国庆节',
    },
};

export default class Workday {

    /**
     * 今天是否是工作日（若无配置信息，则默认使用周一到周五）
     */
    static getWorkday() {

        const year = moment().year();
        const weekday = moment().weekday();
        const formatedDay = moment().format('YYYY-MM-DD');

        const holidays_list = Object.keys(HOLIDAYS[year] || {});
        const repair_workday_list = Object.keys(REPAIR_WORKDAY[year] || {});

        const isHoliday = holidays_list.includes(formatedDay); // 是否是假期
        const isRepairWorkday = repair_workday_list.includes(formatedDay); // 是否是补班
        const isExist = HOLIDAYS[year] && REPAIR_WORKDAY[year]; // 是否存在今年的配置
        const isWeekday = weekday === 6 || weekday === 0; // 是否是周末 周六：6  周日：0
        let isWorkday = true; // 是否是工作日

        if (!isExist) {
            console.log(`注意：无法查到${year}年的节假日数据，已为您切换到周一到周五，请尽快补充假日信息`);
        }

        // 判断今年是否存在配置，如果不存在则判断是否是周末
        if (!isExist && isWeekday) {
            isWorkday = false;
            return isWorkday;
        }

        // 存在配置，则需要排除节假日，以及周末（不包含补班）
        if (isExist && (isHoliday || (isWeekday && !isRepairWorkday))) {
            isWorkday = false;
            return isWorkday;
        }

        return isWorkday;

    }

}

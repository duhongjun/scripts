/*
------------------------------------------
@Description: 瑷尔博士官方云商城小程序
------------------------------------------
变量名AIRBOSHI_TOKEN
变量值 https://xapi.weimob.com/api3/ 域名下的Headers请求头的X-WX-Token 多账号&或换行或新增同名变量
[Script]
http-response

[MITM]
hostname = 


*/
import { Env } from '../utils/index.js'
import axios from 'axios';

const $ = new Env('瑷尔博士官方云商城')

async function signIn() {
    const config = {
        method: 'post',
        url: 'https://xapi.weimob.com/api3/onecrm/mactivity/sign/misc/sign/activity/c/signMainInfo',
        headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            Connection: 'keep-alive',
            'Content-Type': 'application/json',
            Host: 'xapi.weimob.com',
            Referer:
                'https://servicewechat.com/wx0399cf391f15b422/46/page-frame.html',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x6309092b) XWEB/8555',
            'X-WX-Token': $.token,
            xweb_xhr: '1'
        },
        data: JSON.stringify({
            appid: 'wx0399cf391f15b422',
            basicInfo: {
                vid: 6015569623153,
                vidType: 2,
                bosId: 4021407433153,
                productId: 146,
                productInstanceId: 6351100153,
                productVersionId: '14026',
                merchantId: 2000150059153,
                tcode: 'weimob',
                cid: 376411153
            },
            extendInfo: {
                wxTemplateId: 7579,
                analysis: [],
                bosTemplateId: 1000001485,
                childTemplateIds: [
                    {
                        customId: 90004,
                        version: 'crm@0.1.17'
                    },
                    {
                        customId: 90002,
                        version: 'ec@43.9'
                    },
                    {
                        customId: 90006,
                        version: 'hudong@0.0.205'
                    },
                    {
                        customId: 90008,
                        version: 'cms@0.0.429'
                    }
                ],
                quickdeliver: {
                    enable: false
                },
                youshu: {
                    enable: false
                },
                source: 1,
                channelsource: 5,
                refer: 'onecrm-signgift'
                //"mpScene": 1256
            },
            queryParameter: null,
            i18n: {
                language: 'zh',
                timezone: '8'
            },
            pid: '',
            storeId: '',
            customInfo: {
                source: 0
                //"wid": 11167663828
            }
        })
    }
    let { data: result } = await Request(config)
    if (result?.errcode == '0') {
        $.log(`签到成功`)
    } else {
        $.log(`签到失败`)
        $.log(JSON.stringify(result))
    }
}

async function Request(options) {
    Request = async options => {
        try {
            return await axios.request(options)
        } catch (error) {
            return error && error.error ? error.error : '请求失败'
        }
    }
    return await Request(options)
}

async function main() {
    console.log(
        `==================================================\n 脚本执行 - 北京时间(UTC+8): ${new Date(
            new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000 +
            8 * 60 * 60 * 1000
        ).toLocaleString()} \n==================================================`
    )
    const userCookie = process.env.AIRBOSHI_TOKEN

    if (!userCookie?.length) return console.log(`没有找到CK哦`)

    $.token = userCookie
    await signIn()

    $.done();
}

export default main;
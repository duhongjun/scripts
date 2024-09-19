/**
 * 植物星球
 * 注册：https://www.pftp2012.com
 */
// ============================================================================================================
import { Env, wait } from '../utils/index.js';
import axios from 'axios';
import md5 from 'md5';

const $ = new Env("植物星球");

//==================================脚本入口函数main()==============================================================
async function main() {
    const userName = process.env.ZWXQ_USERNAME
    const userPwd = process.env.ZWXQ_PASSWORD

    let user = {
        index: 1,
        userName,
        userPwd,
    };
    try {
        //开始账号任务
        await userTask(user);
    } catch (e) {
        $.logErr(e)
    }
    $.done();
}
// ======================================开始任务=========================================
async function userTask(user) {
    console.log(`\n============= 账号[${user.index}]开始任务 =============`);
    let ck = await Login(user);
    await wait(1);
    await Sign(user, ck);
    await wait(1);
    await mission(user, "10", ck);
    await wait(1);
    await mission(user, "60", ck);
}
// =============================================================================================================================
//登入
async function Login(user) {
    try {
        let userPwd = md5(user.userPwd);
        let urlObject = {
            method: "post",
            url: `https://api.pftp2012.com/api/Member/Login`,
            headers: {
                Host: "api.pftp2012.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b11) XWEB/9129",
            },
            data: {
                userName: user.userName,
                userPwd: userPwd,
                keepAlive: true,
                channel: 10,
            },
        };
        let { data: result } = await axios.request(urlObject);
        if (result?.Data) {
            console.log(
                `🌸账号[${result.Data.MemberInfo.MemberName}]` +
                `🕊登入成功-当前[${result.Data.MemberInfo.MemberPollen}]积分🎉`
            );
        } else {
            console.log(`🌸账号[${user.index}]登入-失败:${result.Msg}❌`);
        }
        return result.Data.MemberInfo.Token;
    } catch (e) {
        console.log('Login error:', e);
    }
}
//签到
async function Sign(user, Token) {
    try {
        let urlObject = {
            method: "get",
            url: `https://api.pftp2012.com/api/Member/SignIn?channel=10`,
            headers: {
                Host: "api.pftp2012.com",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer" + " " + Token,
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b11) XWEB/9129",
            },
        };
        let { data: result } = await axios.request(urlObject);
        if (result.Status == 100) {
            console.log(
                `🌸账号[${user.index}]🕊签到成功-获得${result.Data.PollenNum}积分-连续签到${result.Data.ContinuouNum}天🎉`
            );
        } else {
            console.log(`🌸账号[${user.index}]🕊签到:${result.Msg}❌`);
        }
    } catch (e) {
        console.log('Sign error:', e);
    }
}
//任务
async function mission(user, id, Token) {
    try {
        let urlObject = {
            method: "post",
            url: `https://api.pftp2012.com/api/Member/CompleteMemberMission`,
            headers: {
                Host: "api.pftp2012.com",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer" + " " + Token,
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b11) XWEB/9129",
            },
            data: {
                type: id,
                channel: 40,
            },
        };
        let { data: result } = await axios.request(urlObject);
        if (result?.Status == "100") {
            console.log(
                `🌸账号[${user.index}]` +
                `🕊浏览任务id:${id}成功,获得${result.Data}积分🎉`
            );
        } else {
            console.log(`🌸账号[${user.index}]浏览任务失败:${result.Msg}❌`);
        }
    } catch (e) {
        //打印错误信息
        console.log('mission error:', e.response.data);
    }
}

export default main;
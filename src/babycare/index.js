import axios from "axios";

console.log("===============================================");
console.log("脚本开始执行时间:", new Date().toLocaleString());
console.log("Node.js 版本:", process.version);
console.log("===============================================");

const drawPrize = async (headers) => {
  try {
    console.log("开始抽奖...");
    const res = await axios.post(
      "https://api.bckid.com.cn/operation/front/bonus/userSign/v3/draw",
      {},
      {
        headers: {
          ...headers,
          "content-type": "application/json",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );
    console.log("抽奖响应数据:", res.data);
    if (res.data.code === "200") {
      console.log("抽奖成功", JSON.stringify(res.data.body));
      console.log("抽奖结果", res.data.body?.signDrawPrizeResps?.find((item) => item.dragFlag)?.prizeName);
    }
  } catch (error) {
    console.log("err", error);
  }
};

const signIn = async () => {
  try {
    console.log("开始旗舰店签到...");

    const response = await axios({
      method: "post",
      url: "https://api.bckid.com.cn/operation/front/bonus/userSign/v3/sign",
      headers: {
        "content-type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        authorization: process.env.BC_TOKEN,
        "user-agent-bckid": "bckid; miniProgram; 3.0.74; microsoft microsoft; Windows Unknown x64; ;1002;",
        referer: "https://servicewechat.com/wxab5642d7bced2dcc/472/page-frame.html",
      },
      data: {},
      validateStatus: function (status) {
        return true;
      },
    });
    console.log("响应数据:", response.data);
    if (response.data.code === "200") {
      console.log("旗舰店签到成功");
      const is7Days = response.data?.body?.signDaysCountMod === 7;
      if (is7Days) {
        console.log("连续签到7天，抽取大奖");

        await drawPrize({
          authorization: process.env.BC_TOKEN,
          referer: "https://servicewechat.com/wxab5642d7bced2dcc/472/page-frame.html",
          "user-agent-bckid": "bckid; miniProgram; 3.0.74; microsoft microsoft; Windows Unknown x64; ;1002;",
        });
      }
    }
  } catch (error) {
    console.log("请求过程中发生错误:", error);
  }
};

const getSuperSignInInfo = async () => {
  try {
    console.log("开始获取超级门店签到信息...");

    const res = await axios.post(
      "https://api.bckid.com.cn/operation/front/bonus/userSign/v3/getSignInfo",
      {},
      {
        headers: {
          authorization: process.env.BC_SUPER_TOKEN,
          "content-type": "application/json",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "user-agent-bckid": "bckid; miniProgram; 1.12.132; microsoft microsoft; Windows Unknown x64; ;1005_1001514;",
          referer: "https://servicewechat.com/wx0e31d878c0fcb362/162/page-frame.html",
        },
        validateStatus: function (status) {
          return true;
        },
      }
    );
    console.log("超级门店签到信息获取成功:", res.data);
    if (res.data.code === "200") {
      const skipSignIn = res.data.body?.signDaysCountMod === 2;
      if (skipSignIn) {
        console.log("已签到两天，跳过签到");
        return;
      }
      console.log("开始超级门店签到");
      await superSignIn();
    }
  } catch (error) {
    console.log("err", error);
  }
};

const superSignIn = async () => {
  try {
    const res = await axios.post(
      "https://api.bckid.com.cn/operation/front/bonus/userSign/v3/sign",
      {},
      {
        headers: {
          authorization: process.env.BC_SUPER_TOKEN,
          "content-type": "application/json",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "user-agent-bckid": "bckid; miniProgram; 1.12.132; microsoft microsoft; Windows Unknown x64; ;1005_1001514;",
          referer: "https://servicewechat.com/wx0e31d878c0fcb362/162/page-frame.html",
        },
      }
    );
    console.log("超级门店签到响应数据:", res.data);

    if (res.data.code === "200") {
      console.log("超级门店签到成功");
      const is7Days = res.data.body?.signDaysCountMod === 7;
      if (is7Days) {
        console.log("已签到7天，抽取大奖");
        await drawPrize({
          authorization: process.env.BC_SUPER_TOKEN,
          "user-agent-bckid": "bckid; miniProgram; 1.12.132; microsoft microsoft; Windows Unknown x64; ;1005_1001514;",
          referer: "https://servicewechat.com/wx0e31d878c0fcb362/162/page-frame.html",
        });
      }
    }
  } catch (error) {
    console.log("err", error);
  }
};

export default async function main() {
  await signIn();
  await getSuperSignInInfo();
}

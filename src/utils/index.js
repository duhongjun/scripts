import axios from 'axios';

export async function sendToServerChan(title, desp) {
    console.log("process.env.SERVERCHAN_KEY", process.env.SERVERCHAN_KEY);
    const url = `https://sctapi.ftqq.com/${process.env.SERVERCHAN_KEY}.send`;
    console.log("url", url);
    try {
      const response = await axios.post(url, {
        title,
        desp,
      });
      console.log('推送成功:', response.data);
    } catch (error) {
      console.error('推送失败:', error.message);
    }
  }
import Zhiwuxingqiu from './zhiwuxingqiu/index.js';

try {
    await Zhiwuxingqiu();
    process.exit(0);
} catch (error) {
    process.exit(1);
}

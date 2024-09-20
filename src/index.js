import Zhiwuxingqiu from './zhiwuxingqiu/index.js';
import Airboshi from './airboshi/index.js'



try {
    await Zhiwuxingqiu();
    await Airboshi();
} catch (error) {
    process.exit(1);
}

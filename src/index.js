import Zhiwuxingqiu from './zhiwuxingqiu/index.js';
import Airboshi from './airboshi/index.js'



try {
    await Zhiwuxingqiu();
    await Airboshi();
    process.exit(0);
} catch (error) {
    process.exit(1);
}

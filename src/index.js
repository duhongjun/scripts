import Babycare from './babycare/index.js';
try {
    await Babycare();   
    process.exit(0);
} catch (error) {
    process.exit(1);
}

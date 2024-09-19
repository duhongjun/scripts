function Env(t, e) {
    return new (class {
        constructor(t, e) {
            (this.name = t),
                (this.logs = []),
                (this.logSeparator = "\n"),
                (this.startTime = new Date().getTime()),
                Object.assign(this, e),
                this.log("", `🔔${this.name},开始!`);
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator));
        }
        logErr(t) {
            this.log("", `❗️${this.name},错误!`, t.stack)
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t));
        }

        done() {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name},结束!🕛${s}秒`)
            process.exit(0);
        }
    })(t, e);
}


function wait(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

export {
    Env,
    wait,
}
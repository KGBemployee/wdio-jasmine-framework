import { JasmineAdapter } from '../lib/adapter'

const syncSpecs = [__dirname + '/fixtures/tests.sync.spec.js']
const asyncSpecs = [__dirname + '/fixtures/tests.async.spec.js']
const NOOP = () => {}

const WebdriverIO = class {}
WebdriverIO.prototype = {
    pause: (ms = 500) => new Promise((r) => {
        setTimeout(() => r(), ms)
    }),
    command: (ms = 500) => new Promise((r) => {
        setTimeout(() => r('foo'), ms)
    })
}

process.send = NOOP

describe('JasmineAdapter', () => {
    describe('executes specs syncronous', () => {
        before(async () => {
            global.browser = new WebdriverIO()
            const adapter = new JasmineAdapter(0, {}, syncSpecs, {})
            await adapter.run()
        })

        it('should run async commands in beforeEach blocks', () => {
            global._____wdio.beforeEach.should.be.greaterThan(499)
        })

        it('should run async commands in beforeAll blocks', () => {
            global._____wdio.beforeAll.should.be.greaterThan(499)
        })

        it('should run async commands in it blocks', () => {
            global._____wdio.it.should.be.greaterThan(499)
        })

        it('should run async commands in nested it blocks', () => {
            global._____wdio.nestedit.should.be.greaterThan(499)
        })

        it('should run async commands in afterAll blocks', () => {
            global._____wdio.afterAll.should.be.greaterThan(499)
        })

        it('should run async commands in afterEach blocks', () => {
            global._____wdio.afterEach.should.be.greaterThan(499)
        })
    })

    describe('executes specs asynchronous', () => {
        before(async () => {
            global.browser = new WebdriverIO()
            global.browser.options = { sync: false }
            const adapter = new JasmineAdapter(0, {}, asyncSpecs, {});
            (await adapter.run()).should.be.equal(0, 'actual test failed')
        })

        it('should run async commands in beforeEach blocks', () => {
            global.______wdio.beforeEach.should.be.greaterThan(499)
        })

        it('should run async commands in beforeAll blocks', () => {
            global.______wdio.beforeAll.should.be.greaterThan(499)
        })

        it('should run async commands in it blocks', () => {
            global.______wdio.it.should.be.greaterThan(499)
        })

        it('should run async commands in nested it blocks', () => {
            global.______wdio.nestedit.should.be.greaterThan(499)
        })

        it('should run async commands in afterAll blocks', () => {
            global.______wdio.afterAll.should.be.greaterThan(499)
        })

        it('should run async commands in afterEach blocks', () => {
            global.______wdio.afterEach.should.be.greaterThan(499)
        })
    })
})
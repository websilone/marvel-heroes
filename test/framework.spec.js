describe('(Framework) Karma Plugins', () => {
    it('Should expose "expect" globally.', () => {
        expect(typeof expect).toEqual('function')
    })

    it('Should expose "jasmine" globally.', () => {
        expect(typeof jasmine).toBeDefined()
    })
})

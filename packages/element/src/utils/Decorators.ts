// import * as debugFactory from 'debug'
// const debug = debugFactory('element:sandbox:decorators')

/**
 * Defines a Function Decorator which wraps a method with class local before and after
 * hooks, as well as custom error handling.
 */
export function wrapWithCallbacks() {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		let originalFn = descriptor.value

		descriptor.value = async function(...args: any[]) {
			let ret

			// try {
			if (this.beforeFunc instanceof Function) await this.beforeFunc(propertyKey)

			// let argsDesciption = args
			// 	.filter(arg => arg['toString'])
			// 	.map(arg => {
			// 		let s = arg.toString()
			// 		if (s === '[object Object]') {
			// 			s = JSON.stringify(arg)
			// 		}
			// 		return s
			// 	})
			// 	.join(', ')

			ret = await originalFn.apply(this, args)
			if (this.afterFunc instanceof Function) await this.afterFunc(propertyKey)
			return ret
		}

		return descriptor
	}
}

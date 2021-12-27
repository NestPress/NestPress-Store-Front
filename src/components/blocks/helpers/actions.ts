/* TODO fix type */
// @ts-ignore
// @ts-nocheck

/*
	actions:

	key								| 	value
	-----------------------------------------------------------
	router.push						|	path as const (with ${})
	-----------------------------------------------------------
	block.~id.addClass				| 	this (all form fields)
									|   this.name (specyfic target by path)
	-----------------------------------------------------------
	block.~id.changeAttrs.~path		| 	this (all form fields)
	(path is changing attr target)	|   this.name (specyfic target by path)
									|	else text (set as const)(with ${})

*/

/* 
	parse key steps:

	1. find shordcodes and replace data by ${shortcodeDataType.path} where:
		shortcodeDataType is type of datasource: "this", "router", "metchod"
		path is path to data storage in shortcodeDataType
	2. check first part of key (before first dot) example: block...
		if block. then action will modify block
		if router. then action will modify router
		
	parse value steps:

	1. find shordcodes and replace data by ${shortcodeDataType.path} where:
		shortcodeDataType is type of datasource: "this" or "router"
		path is path to data storage in shortcodeDataType
	2. check first part of value (before first dot) example: this.name
		if this. then value are storage in dataSource (example in form component) 
		if router. then value are storage in router
		else value is directly from string 

	examples:

	form change routing
	key: router.push 
	value: /Page/home/${this.input1}/${this.input2}


*/

import { get, set } from "helpers/io"
export const actionsParser = (actions, data, blocks, setBlockAttrs, router) => {
	for (const [key, value] of Object.entries(actions)) {
		const setter = key.split('.')

		if(setter[0]==='block'){
			const blockId = setter[1]
			const action = setter[2]

			// if(action == 'addClass'){}
			// if(action == 'removeClass'){}

			if(action == 'changeAttrs'){
				const path = prepareValueType(parseShortString(value, data))
				path.type === 'this' 
					? setBlockAttrs({id:blockId, key:setter[3], value:get(data, path.value)}) : null
				path.type === 'string' 
					? setBlockAttrs({id:blockId, key:setter[3], value:value}) : null
			}
		}
		if(setter[0]==='router'){
			const action = setter[1]
			if(action === 'push'){
				router.push(parseShortString(value, data))
			}
		}
	}
}

/* 
  Parse short with string
*/
export const parseShortString = (string, dataPart) => {
	const matches = string.match(/(?<=\$\{).+?(?=\})/g);
	if(matches){
		for (const i in matches) {
			const path = prepareValueType(matches[i])
			path.type === 'string' ? string = string.replaceAll('${'+matches[i]+'}', path.value) : null
			path.type === 'this' ? string = string.replaceAll('${'+matches[i]+'}', get(dataPart, path.value)) : null
		}
	}
	return string
}
/* 
  prepare value type
*/
export const prepareValueType = (val) => {
	const arr = val.split('.');
	return arr[0] === 'this' 
		? { type:'this', value: val.substring(5) }
		: arr[0]==='router' 
			? { type:'router', value: val.substring(7) }
			: { type:'string', value: val }
}
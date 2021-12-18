/*
	actions:

	key					| 	value
	-----------------------------------------------------------
	block[id].addClass	| 	this (all form fields)
						|   this.name (specyfic target by path)

*/
// import { useBlocks } from "store/blocksStore";
import { get, set } from "helpers/io"

export const actionsParser = (actions, data, blocks, setBlockAttrs) => {

	for (const [key, value] of Object.entries(actions)) {
		// console.log(key, value)
		const setter = key.split('.')
		
		if(setter[0]==='block'){
			const blockId = setter[1]
			const action = setter[2]

			if(action == 'addClass'){				
				if(value.slice(0, 5) == 'this.'){
					setBlockAttrs(
						{id:blockId, key:'classes', value:get(data, value.substring(5))
					})
				}
			}

			if(action == 'removeClass'){
				console.log('remove class', setter)
			}

			if(action == 'changeAttrs'){
				setter.splice(0, 3);
				if(value.slice(0, 5) == 'this.'){
					setBlockAttrs(
						{id:blockId, key:setter[0], value:get(data, value.substring(5))
					})
				}
			}

		}
		
	}

}
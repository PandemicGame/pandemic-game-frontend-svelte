import WebSocketData from './WebSocketData';

const classNameToConstructorAssociation = new Map<string, new () => WebSocketData>();
const constructorToClassNameAssociation = new Map<new () => WebSocketData, string>();

function registerType(className: string, clazz: new () => WebSocketData) {
	classNameToConstructorAssociation.set(className, clazz);
	constructorToClassNameAssociation.set(clazz, className);
}

export function TypeInfo(className: string) {
	return function (target: new () => WebSocketData) {
		registerType(className, target);
	};
}

export function addTypeInfo<T>(obj: unknown, clazz: new () => T): T {
	Object.setPrototypeOf(obj, clazz.prototype);
	return obj as T;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function addTypeInfoRecursively<T extends WebSocketData>(obj: any): T {
	if (obj && typeof obj === 'object') {
		const className = obj[WebSocketData.TYPE_INFO_PROPERTY];

		if (typeof className === 'string') {
			const constructor = classNameToConstructorAssociation.get(className);
			if (constructor) {
				Object.setPrototypeOf(obj, constructor.prototype);
			} else {
				console.warn('Unknown class:', className);
			}
		}

		remapPropertiesOfObject(obj, addTypeInfoRecursively);
	}

	return obj;
}

export function addTypeInfoPropertyRecursively<T extends WebSocketData>(obj: T): T {
	const className = constructorToClassNameAssociation.get(
		obj.constructor as new () => WebSocketData
	);
	if (className) {
		obj[WebSocketData.TYPE_INFO_PROPERTY] = className;
	}

	remapPropertiesOfObject(obj, addTypeInfoPropertyRecursively);

	return obj;
}

function remapPropertiesOfObject(obj: any, mapper: (val: any) => any) {
	for (const key of Object.keys(obj)) {
		const val = obj[key];
		if (Array.isArray(val)) {
			obj[key] = val.map((item: any) => mapper(item));
		} else if (val && typeof val === 'object') {
			obj[key] = mapper(val);
		}
	}
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function loadAllWebSocketDataTypes() {
	const modules = import.meta.glob('../**/*.type.ts');

	for (const path in modules) {
		await modules[path]();
	}
}

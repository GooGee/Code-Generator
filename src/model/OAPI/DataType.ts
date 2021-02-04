
export enum DataType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    array = 'array',
    boolean = 'boolean',
    integer = 'integer',
    number = 'number',
    object = 'object',
    oneOf = 'oneOf',
    reference = 'reference',
    string = 'string',
}

const list = Object.values(DataType).map(one => {
    return { name: one }
})
export function dataTypeList() {
    return list
}

export function isComposition(type: DataType) {
    return ['allOf', 'anyOf', 'oneOf'].includes(type)
}

export function isPrimitive(type: DataType) {
    return ['boolean', 'integer', 'number', 'string'].includes(type)
}

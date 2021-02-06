
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

export const dataTypeList = Object.values(DataType).map(one => {
    return { name: one }
})

export const simpleTypeList = dataTypeList.filter(type => {
    return ['boolean', 'integer', 'number', 'reference', 'string'].includes(type.name)
})

export function isComposition(type: DataType) {
    return ['allOf', 'anyOf', 'oneOf'].includes(type)
}

export function isPrimitive(type: DataType) {
    return ['boolean', 'integer', 'number', 'string'].includes(type)
}

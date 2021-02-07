
export enum ComplexType {
    allOf = 'allOf',
    anyOf = 'anyOf',
    object = 'object',
    oneOf = 'oneOf',
}

export enum SimpleType {
    array = 'array',
    boolean = 'boolean',
    integer = 'integer',
    number = 'number',
    reference = 'reference',
    string = 'string',
}

const typexx = { ...ComplexType, ...SimpleType }

export type DataType = typeof typexx

export const dataTypeList = Object.values(typexx).map(one => {
    return { name: one }
})

export const simpleTypeList = Object.values(SimpleType).map(one => {
    return { name: one }
})

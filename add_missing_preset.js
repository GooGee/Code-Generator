function run(text) {
    // find missing item in preset
    /** @type {string[]} */
    const data = text.split('\n')
    const list = [
        {
            name: 'bigIncrements',
            data: {},
            tag: 'integer',
            value: '',
        },
    ]

    for (const name of data) {
        if (list.find(item => item.name === name)) {
            continue
        }
        list.push({ name })
    }
    return JSON.stringify(list)
}

function run(text) {
    // find deprecated item in preset
    /** @type {string[]} */
    const data = text.split('\n')
    const list = [
        {
            name: 'bigIncrements',
            data: {},
            tag: 'integer',
            value: '',
        },
    ]

    const deprecated = []
    for (const item of list) {
        if (data.includes(item.name)) {
            continue
        }
        deprecated.push(item.name)
    }
    return deprecated.join('\n')
}

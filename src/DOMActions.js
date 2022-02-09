const _getDOMElem = (id) => {
    return document.getElementById(id)
}

export const mapListToDOMElements = listOfId => {
    const _vievElems = {}

    for (const id of listOfId) {
        _vievElems[id] = _getDOMElem(id)
    }
    return _vievElems
}

const resource = [
    { id: 0, parentId: null, name: 'one' },
    { id: 1, parentId: null, name: 'two' },
    { id: 2, parentId: null, name: 'three' },
    { id: 3, parentId: 0, name: 'one-one' },
    { id: 4, parentId: 0, name: 'one-two' },
    { id: 5, parentId: 0, name: 'one-three' },
    { id: 6, parentId: 1, name: 'two-one' },
    { id: 7, parentId: 1, name: 'two-two' },
    { id: 8, parentId: 2, name: 'three-one' },
    { id: 9, parentId: 2, name: 'three-two' },
    { id: 10, parentId: 2, name: 'three-three' },
    { id: 11, parentId: null, name: 'four' },
    { id: 12, parentId: 3, name: 'one-one-one' },
    { id: 13, parentId: 12, name: 'one-one-one-one' },
    { id: 14, parentId: 13, name: 'one-one-one-one-one' },
    { id: 15, parentId: 14, name: 'one-one-one-one-one' },
    { id: 16, parentId: 15, name: 'one-one-one-one-one' },
];

function arrayToTree(array) {
    const mapper = {};
    array.forEach(it => {
        it.children = [];
        it.open = false;
        it.choose = false;
        mapper[it.id] = it;
    });

    array.forEach(it => {
        if (it.parentId !== null) {
            mapper[it.parentId].children.push(it);
        }
    });
    return array.filter(it => it.parentId == null);
}

export const getForest = (data = resource) => {
    return arrayToTree(data);
};

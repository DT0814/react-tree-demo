import arrayToTree from 'array-to-tree'
const resource = [
    { id: 1, parentId: 0, name: 'one' },
    { id: 2, parentId: 0, name: 'two' },
    { id: 3, parentId: 0, name: 'three' },
    { id: 4, parentId: 1, name: 'one-one' },
    { id: 5, parentId: 1, name: 'one-two' },
    { id: 6, parentId: 1, name: 'one-three' },
    { id: 7, parentId: 2, name: 'two-one' },
    { id: 8, parentId: 2, name: 'two-two' },
    { id: 9, parentId: 3, name: 'three-one' },
    { id: 10, parentId: 3, name: 'three-two' },
    { id: 11, parentId: 3, name: 'three-three' },
    { id: 12, parentId: 0, name: 'four' },
];
export const getTree = (data = resource) => {
    let resultTree =arrayToTree(data, {
        parentProperty: 'parentId',
        customID: 'id'
    });
    return resultTree;
};

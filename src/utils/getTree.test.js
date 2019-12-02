import { getTree } from "./getTree";

test('should be return tree', () => {
    const arr = [
        { id: 100, parentId: null, name: 'root' },
        { id: 1, parentId: 100, name: 'one' }
    ];
    let actual = getTree(arr)[0].children[0];
    expect(actual.name).toBe('one');
});

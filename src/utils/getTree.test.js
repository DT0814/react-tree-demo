import { getTree } from "./getTree";

test('should be return tree', () => {
    const arr = [
        { id: 100, parentId: null, name: 'root' },
        { id: 1, parentId: 100, name: 'one' }
    ];
    const actual = getTree(arr)[0].children[0];
    expect(actual.name).toBe('one');
});
test('should be return empty tree when give empty array', () => {
    const actual = getTree([]);
    expect(actual).toBeEmpty();
});

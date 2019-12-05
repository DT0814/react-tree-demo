import React from "react";
import { getTree } from "../../../../utils/getTree";

const forest = getTree();
forest.forEach(it => it.openChildren = false);
export const TreeContext = React.createContext({forest});

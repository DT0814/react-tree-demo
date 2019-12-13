import React, { useContext, useEffect, useState } from "react";
import { last, range, remove, indexOf, reverse, min, sortBy, max } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";

const ShowFiles = () => {
    const context = useContext(SysContext);
    const [chooseState, setChooseState] = useState({ indexArray: [], shiftStartIndex: 0, lastClickIndex: 0 });
    const [files, setFiles] = useState([]);

    const calculationShiftStartIndex = (indexArray, currentClickIndex) => {
        const thanCurrentClickIndex = indexArray.filter((it) => it >= currentClickIndex);
        const minThanCurrentClickIndex = min(thanCurrentClickIndex);
        return minThanCurrentClickIndex === undefined ? max(indexArray) : minThanCurrentClickIndex;
    }

    const calculationLastClickIndex = (indexArray, currentClickIndex) => {
        const thanCurrentClickIndex = indexArray.filter((it) => it >= currentClickIndex);
        if (thanCurrentClickIndex.length > 0) {
            const thanCurrentClickIndexMaxContinuous = thanCurrentClickIndex.find((it, index) => {
                if (index + 1 < thanCurrentClickIndex.length) {
                    return (thanCurrentClickIndex[index + 1] - it) !== 1;
                }
                return false;
            });
            return thanCurrentClickIndexMaxContinuous === undefined ? max(indexArray) : thanCurrentClickIndexMaxContinuous;
        } else {
            const lessCurrentClickIndex = indexArray;
            const lessCurrentClickIndexMaxContinuous = reverse(lessCurrentClickIndex).find((it, index) => {
                if (index + 1 < lessCurrentClickIndex.length) {
                    return (it - lessCurrentClickIndex[index + 1]) !== 1;
                }
                return false;
            });
            return lessCurrentClickIndexMaxContinuous === undefined ? min(indexArray) : lessCurrentClickIndexMaxContinuous;
        }
    }

    const handleClick = (event, currentClickIndex) => {
        event.stopPropagation();
        const copyChooseState = chooseState;
        if (event.metaKey) {
            if (copyChooseState.indexArray.indexOf(currentClickIndex) !== -1) {
                remove(copyChooseState.indexArray, (it) => it === currentClickIndex);
            } else {
                copyChooseState.indexArray.push(currentClickIndex);
            }
            const isChoose = indexOf(copyChooseState.indexArray, currentClickIndex) !== -1;
            const shiftStartIndex = isChoose
                ? currentClickIndex
                : calculationShiftStartIndex(copyChooseState.indexArray, currentClickIndex);
            const lastClickIndex = isChoose
                ? currentClickIndex
                : calculationLastClickIndex(copyChooseState.indexArray, currentClickIndex);
            setChooseState({ indexArray: sortBy(copyChooseState.indexArray), shiftStartIndex, lastClickIndex });

        } else if (event.shiftKey) {
            const oldChooseIndexArray = range(copyChooseState.shiftStartIndex, copyChooseState.lastClickIndex);
            oldChooseIndexArray.push(copyChooseState.lastClickIndex);

            remove(copyChooseState.indexArray, (it) => oldChooseIndexArray.indexOf(it) !== -1);

            copyChooseState.indexArray.push(...range(copyChooseState.shiftStartIndex, currentClickIndex), currentClickIndex);

            setChooseState({ ...copyChooseState, indexArray: sortBy(copyChooseState.indexArray), lastClickIndex: currentClickIndex });

        } else {

            remove(copyChooseState.indexArray, () => true);

            copyChooseState.indexArray.push(currentClickIndex);

            setChooseState({ indexArray: sortBy(copyChooseState.indexArray), shiftStartIndex: currentClickIndex, lastClickIndex: currentClickIndex });

        }

        updateFileChooseAndChooseState(copyChooseState.indexArray)
    };

    const updateFileChooseAndChooseState = (indexArray) => {
        setFiles(files.map((it) => {
            if (indexArray.indexOf(it.index) !== -1) {
                return { ...it, choose: true };
            }
            if (it.choose !== false) {
                return { ...it, choose: false };
            }
            return it;
        }));
    };

    const initState = () => {
        setChooseState({ indexArray: [], shiftStartIndex: 0, lastClickIndex: 0 });
    }
    useEffect(() => {
        initState();
        setFiles(context.currentFiles.map((it, index) => { return { ...it, index: index } }));
    }, [context.currentFiles]);

    const handleClickWhiteSpace = () => {
        initState();
        updateFileChooseAndChooseState([]);
    }
    return <div className="show-files-div" onClick={handleClickWhiteSpace}>
        {
            files.map(file => {
                return <FileItem handleClick={handleClick} file={file} />
            })
        }
    </div>
};

export default ShowFiles;

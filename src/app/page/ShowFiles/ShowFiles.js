import React, { useContext, useEffect, useState } from "react";
import { last, range, remove } from 'lodash'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";

const ShowFiles = () => {
    const context = useContext(SysContext);
    const [chooseIndex, setChooseIndex] = useState([]);
    const [files, setFiles] = useState([]);
    const [commandLastClickIndex, setCommandLastClickIndex] = useState(0);
    const [lastClickIndex, setLastClickIndex] = useState(0);

    const handleClick = (event, index) => {
        const copyChooseIndex = chooseIndex;
        if (event.metaKey) {
            if (copyChooseIndex.indexOf(index) !== -1) {
                remove(copyChooseIndex, (it) => it === index);
            } else {
                copyChooseIndex.push(index);
            }
            setCommandLastClickIndex(index);
        } else if (event.shiftKey) {
            const preChooseIndex = range(commandLastClickIndex, lastClickIndex);
            preChooseIndex.push(lastClickIndex);
            remove(copyChooseIndex, (it) => preChooseIndex.indexOf(it) !== -1);
            copyChooseIndex.push(...range(commandLastClickIndex, index), index);
        } else {
            remove(copyChooseIndex, () => true);
            copyChooseIndex.push(index);
            setCommandLastClickIndex(index);
        }
        setLastClickIndex(index);
        updateFileChooseAndChooseIndex(copyChooseIndex)
    };

    const updateFileChooseAndChooseIndex = (chooseIndex) => {
        setFiles(files.map((it) => {
            if (chooseIndex.indexOf(it.index) !== -1) {
                return { ...it, choose: true };
            }
            if (it.choose !== false) {
                return { ...it, choose: false };
            }
            return it;
        }));
        setChooseIndex(chooseIndex);
    };

    useEffect(() => {
        setFiles(context.currentFiles);
        setChooseIndex([]);
        setCommandLastClickIndex(0);
        setLastClickIndex(0);
    }, [context.currentFiles]);

    return <div className="show-files-div">
        {
            files.map(file => {
                return <FileItem handleClick={handleClick} file={file}/>
            })
        }
    </div>
};

export default ShowFiles;

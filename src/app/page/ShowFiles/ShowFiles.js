import React, { useContext, useEffect, useState } from "react";
import remove from 'lodash/remove'
import './ShowFiles.css'
import { SysContext } from "../../App";
import FileItem from "../../components/FileItem/FileItem";

const supportKeys = ['Meta', 'Shift'];
const ShowFiles = () => {
    const context = useContext(SysContext);
    const [pressKeys, setPressKeys] = useState([]);
    const [chooseIndex, setChooseIndex] = useState([]);
    const [files, setFiles] = useState([]);
    const keyboardEvent = (event) => {
        const keyName = event.key;
        if (supportKeys.indexOf(keyName) !== -1) {
            console.log(event);
            if (event.type === "keydown") {
                const copyPressKeys = pressKeys;
                copyPressKeys.push(keyName);
                setPressKeys(copyPressKeys);
            }
            if (event.type === "keyup") {
                const newPressKeys = remove(pressKeys, (it) => it !== keyName);
                console.log(newPressKeys);
                setPressKeys(newPressKeys);
            }
            console.log(pressKeys);
        }
    };
    const handleClick = (index) => {
        console.log(pressKeys);
        if (pressKeys.indexOf("Meta") !== -1) {
            const copyChooseIndex= chooseIndex;
            copyChooseIndex.push(index);
            setFiles(files.map((it) => {
                if (copyChooseIndex.indexOf(it.index) !== -1) {
                    return { ...it, choose: true };
                }
                if (it.choose !== false) {
                    return { ...it, choose: false };
                }
                return it;
            }));
            setChooseIndex(copyChooseIndex);
        } else {
            setFiles(files.map((it) => {
                if (index === it.index) {
                    return { ...it, choose: true };
                }
                if (it.choose !== false) {
                    return { ...it, choose: false };
                }
                return it;
            }));
            setChooseIndex([index]);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyboardEvent);
        window.addEventListener("keyup", keyboardEvent);
    }, []);
    useEffect(() => {
        setFiles(context.currentFiles)
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

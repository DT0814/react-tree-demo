import range from 'lodash/range'
import mp3 from '../app/resource/filesIcon/mp3.png'
import cannotIdentify from '../app/resource/filesIcon/cannot-identify.png'
import excel from '../app/resource/filesIcon/excel.png'
import gif from '../app/resource/filesIcon/gif.png'
import jpeg from '../app/resource/filesIcon/jpeg.png'
import pdf from '../app/resource/filesIcon/pdf.png'
import png from '../app/resource/filesIcon/png.png'
import ppt from '../app/resource/filesIcon/ppt.png'
import txt from '../app/resource/filesIcon/txt.png'
import video from '../app/resource/filesIcon/video.png'
import zip from '../app/resource/filesIcon/zip.png'
import { getUUID } from './UUID'

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,".split('');
const types = ['excel', 'gif', 'jpeg', 'mp3', 'pdf', 'png', 'ppt', 'txt', 'video', 'zip', 'cannot-identify'];
const iconMapper = {
    'mp3': mp3,
    'cannot-identify': cannotIdentify,
    'excel': excel,
    'gif': gif,
    'jpeg': jpeg,
    'pdf': pdf,
    'png': png,
    'ppt': ppt,
    'txt': txt,
    'video': video,
    'zip': zip,
};
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateType = () => {
    return types[getRandom(0, types.length - 1)];
};

const generateFile = (id) => {
    const type = generateType();
    return {
        id: getUUID(),
        name: generateName(type),
        size: getRandom(1, 100000) / 1000 + 'kb',
        folderId: id,
        type,
        icon: iconMapper[type],
    };
};
const generateName = (type) => {
    const name = range(1, getRandom(5, 40));
    return name.map(() => characters[getRandom(0, characters.length - 1)]).join('') + `.${type}`;
};
const filesMap = new Map();
export const getFilesByFolderId = (id) => {
    if(filesMap.has(id)){
        return filesMap.get(id);
    }
    const files = range(1, getRandom(4, 8)).map(it => {
        return generateFile(id)
    });
    filesMap.set(id,files);
    return files;
};

export const moveFiles = (files,toFolderID,currentId) => {
    const filesId = files.map(it => it.id);
    filesMap.set(currentId,filesMap.get(currentId).filter(it => !filesId.includes(it.id)));
    console.log(filesMap.get(currentId).filter(it => !files.includes(it.id)));
    if(filesMap.has(toFolderID)){
        filesMap.set(toFolderID,[...filesMap.get(toFolderID),...files]);
    }else {
        const toFolderFiles = range(1, getRandom(4, 8)).map(it => {
                return generateFile(toFolderID)
            });
        filesMap.set(toFolderID,[...toFolderFiles,...files]);
    }
};

export const copyFiles = (files,currentId) => {
    const newFiles = files.map(it => {return {...it,id:getUUID()}});
    filesMap.set(currentId,[...filesMap.get(currentId),...newFiles]);
};

export const deleteFiles = (files,currentId) => {
    const filesId = files.map(it => it.id);
    filesMap.set(currentId,filesMap.get(currentId).filter(it => !filesId.includes(it.id)) );
};

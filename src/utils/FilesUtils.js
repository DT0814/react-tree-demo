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

export const getFilesByFolderId = (id) => {
    const files = range(1, getRandom(15, 30));
    const map = files.map((it) => {
        return generateFile(id)
    });
    return map;
};

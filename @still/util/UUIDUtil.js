export class UUIDUtil {

    static newId() {
        const obj = UUIDUtil;
        return `${obj.numberId()}${obj.timeStamp()}`;
    }

    static numberId() {
        return Math.random().toString().split('.')[1];
    }

    static timeStamp() {
        return new Date().getTime();
    }

}

//window.UUIDUtil = UUIDUtil;
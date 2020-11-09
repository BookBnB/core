
export function deletePropertyByDotPath(obj: any, path: string): any {
    const paths = path.split('.')
    let nestedObj = obj
    paths.forEach((attribute: string, n) => {
        if (n === paths.length - 1)
            delete nestedObj[attribute]
        else
            nestedObj = nestedObj[attribute]
    });
    return obj;
}

export function addPropertyByDotPath(obj: object = {}, path: string, value: any): object {
    return path.split('.').reduceRight((acc, currentValue) => {
        return { [currentValue]: acc }
    }, value)
}

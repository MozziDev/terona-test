export const getTypeFileHelper = (base63String: string): string | null => {

    const myRe = new RegExp('(?<=data:)(.*)(?=;base64)');
    const myArray = myRe.exec(base63String);

    // @ts-ignore
    return myArray[0];
}
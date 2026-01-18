import { useEffect } from "react";

export default function Path(props) {
    let temp;
    const theFullPath = [];

    for (let index = 0; index < props.thePath.length; index++) {
        if (props.thePath[index]) {
            temp = props.thePath[index]
            theFullPath.push(temp);
        }
    }

    useEffect(() => {
        if (props.thePath.length !== theFullPath.length) {
            props.setThePath(theFullPath);
        }
    }, [props.thePath, theFullPath.length, props.setThePath]);

    return (
        <>
            {theFullPath}
        </>
    )

}
import fs from "fs"

export function getAllFiles(path: fs.PathLike){
    const files = fs.readdirSync(path)
    let r = []
    for (const file of files){
        if (['.ts', '.js'].some((ex) => file.endsWith(ex))){
            r.push(`${path}/${file}`)
        }else{
            const folder = fs.readdirSync(`${path}/${file}`).filter(file => ['.ts', '.js'].some((ex) => file.endsWith(ex)))
            for (const file2 of folder){
                r.push(`${path}/${file}/${file2}`)
            }
        }
    }
    return r
}
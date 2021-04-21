import Route from '../Bridge/Route'
import { getPath } from './File'

const FileName = 'index.d.ts'
const LocalFile = getPath(FileName)

export default function(route: Route) {
    fetch(FileName)
        .then(response => response.blob())
        .then(blob => blob.text())
        .then(text => {
            route.write(LocalFile, text)
        })
        .catch(errror => console.log(errror))
}

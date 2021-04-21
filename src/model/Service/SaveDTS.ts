import Route from '../Bridge/Route'
import { CGFolder } from './File'

const FileName = 'index.d.ts'
const LocalFile = CGFolder + '/' + FileName

export default function(route: Route) {
    fetch(FileName)
        .then(response => response.blob())
        .then(blob => blob.text())
        .then(text => {
            route.write(LocalFile, text)
        })
        .catch(errror => console.log(errror))
}

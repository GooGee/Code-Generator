import Item from "../Base/Item"
import Contact from "./Contact"
import License from "./License"

export default class Info extends Item {
    contact = new Contact
    description: string = ''
    license = new License
    termsOfService: string = ''
    title: string = 'API'
    version: string = '0.0.0'

    toOAPI() {
        return {
            title: this.title,
            version: this.version,
            description: this.description,
            termsOfService: this.termsOfService,
            contact: this.contact.toOAPI(),
            license: this.license.toOAPI(),
        }
    }
}

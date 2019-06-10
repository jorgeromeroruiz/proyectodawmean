export class Item {
    constructor(_id = '', title='',category='',description='',photo=''){
        this._id=_id;
        this.title=title;
        this.category=category;
        this.description=description;
        this.photo=photo;
    }
    _id: string;
    title: string;
    category: string;
    description: string;
    photo: string;
}

export class Post {

    constructor(pid, uid, name,imageURL,date,caption) {
        this.postID = pid;
        this.userId = uid;
        this.name = name;
        this.imagesURL=imageURL;
        this.date=date;
        this.caption=caption;
    }
    toString() {
        return this.postID + ', ' + this.userId + ', ' +this.name+', '+this.imagesURL+', '+this.date+', '+this.caption;
    }
}
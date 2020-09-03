export default class Singer {
  constructor ({id, name, url}) {
    this.id = id
    this.name = name
    this.avater = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${url}.jpg?max_age=2592000`
  }
}
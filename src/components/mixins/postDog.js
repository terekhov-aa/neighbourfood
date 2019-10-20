import  firebase  from '../../configFirebase.js'
import router from '../../router'
import store from '../../store'

export default (url, comment, author) => {

    let d = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(firebase.db)

    firebase.db.collection('posts').add(
        {
            url,
            comment,
            info: `Posted by ${author != '' ? author : 'Unknow'} on ${days[d.getDay()]}`,
            created_at: new Date().getTime(),
            author: store.getters.getUserId
        }
    ).then(
        router.push({ name: `home` })
    )
}
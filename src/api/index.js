// 这个js文件是专门用来管理请求各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewsong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getArtistsSongs = (data) => Network.get('artists', data)
// export const getHotArtists = () => Network.get('top/artists?offset=0&limit=5')
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=5')
      .then(result => resolve(result.artists))
      .catch(err => reject(err))
  })
}
export const getLetterArtists = letter => {
  return new Promise((resolve, reject) => {
    const letterArtists = []
    Network.all([
      // Network.get(`artist/list?offset=0&limit=5&cat=5001&initial=${letter}`)
      Network.get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`)
      // Network.get(`artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
    ])
      .then(result => {
        // console.log(result)
        result.forEach(item => {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(err => reject(err))
  })
}
export const getAllArtists = letter => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(result => {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 }
      ],
      globalList: [
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'iTunes榜', id: 8 },
        { name: 'Beatport全球电子舞曲榜', id: 21 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// export const getTopListDetail = () => {
//   return new Promise(function (resolve, reject) {
//     const category = {
//       officialList: [
//         { name: '云音乐飙升榜', id: 3 },
//         { name: '云音乐新歌榜', id: 0 },
//         { name: '网易原创歌曲榜', id: 2 },
//         { name: '云音乐热歌榜', id: 1 }
//       ],
//       recList: [
//         { name: '云音乐说唱榜', id: 23 },
//         { name: '云音乐电音榜', id: 25 },
//         { name: '云音乐欧美新歌榜', id: 32 },
//         { name: '抖音排行榜', id: 26 },
//         { name: '云音乐ACG音乐榜', id: 22 },
//         { name: '云音乐古典音乐榜', id: 24 }
//       ],
//       globalList: [
//         { name: '美国Billboard周榜', id: 6 },
//         { name: 'UK排行榜周榜', id: 5 },
//         { name: 'Beatport全球电子舞曲榜', id: 21 },
//         { name: '日本Oricon周榜', id: 10 },
//         { name: 'iTunes榜', id: 8 },
//         { name: '英国Q杂志中文版周榜', id: 29 }
//       ],
//       otherList: [
//         { name: 'KTV唛榜', id: 7 },
//         { name: '法国 NRJ Vos Hits 周榜', id: 19 },
//         { name: '云音乐韩语榜', id: 28 },
//         { name: '云音乐欧美热歌榜', id: 31 }
//       ],
//       titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
//     }
//     Network.get('toplist/detail')
//       .then(function (data) {
//         data.list.forEach(function (obj) {
//           let flag = false
//           for (const key in category) {
//             for (let i = 0; i < category[key].length; i++) {
//               if (category[key][i].name === obj.name) {
//                 category[key][i].rank = obj
//                 flag = true
//                 break
//               }
//             }
//             if (flag) {
//               break
//             }
//           }
//         })
//         resolve(category)
//       })
//       .catch(function (err) {
//         reject(err)
//       })
//   })
// }
export const getOfficialList = () => {
  return new Promise((resolve, reject) => {
    const officialList = []
    Network.all([
      getTopList({ idx: 0 }),
      getTopList({ idx: 1 }),
      getTopList({ idx: 2 }),
      getTopList({ idx: 3 })
    ])
      .then(result => {
        // officialList = result
        // resolve(officialList)
        result.forEach(item => {
          officialList.push(item.playlist)
        })
        resolve(officialList)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
export const getTopList = (data) => Network.get('top/list', data)
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getSearchHot = () => Network.get('search/hot')

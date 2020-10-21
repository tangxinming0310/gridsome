// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// module.exports = function (api) {
//   api.loadSource(({ addCollection }) => {
//     // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
//   })

//   api.createPages(({ createPage }) => {
//     // Use the Pages API here: https://gridsome.org/docs/pages-api/
//   })
// }
const axios = require('axios')
module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const newdata = addCollection('Newlist')
    const social = addCollection('Social')
    const blog = addCollection('Blog')
    const project = addCollection('Project')
    const datalist1 = axios.get("https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=1")
    const datalist2 = axios.get("https://api.github.com/users/GitHub-Laziji/followers?page=1&per_page=9")
    const datalist3 = axios.get("https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=9")
    const datalist4 = axios.get("https://api.github.com/users/GitHub-Laziji/repos?page=1&per_page=9")
    const [{ data: newlist }, { data: dataSocial },{ data: dataBlog },{ data:dataProject }] = await Promise.all([datalist1,datalist2,datalist3,datalist4])
    const title = Object.keys(newlist[0].files)[0] 
    newdata.addNode({
      title,
      createTime: newlist[0].createTime,
      updateTime: newlist[0].updateTime,
      description: newlist[0].description,
      content: newlist[0].content,
      id: newlist[0].id
      })
    for (const item of dataSocial) {
      social.addNode({
        name: item.login,
        avatarUrl: item.avatar_url,
        html_url: item.html_url
      })
    }
    for (const item of dataBlog) {
    const title = Object.keys(item.files)[0] 
      blog.addNode({
        title,
        created_at: item.created_at,
        description: item.description,
        id: item.id,
      })
    }
    for (const item of dataProject) {
      project.addNode({
        name:item.name,
        url:item.url,
        updateTime:item.updateTime,
        created_at: item.created_at,
        description: item.description,
        stargazersCount: item.stargazersCount,
        watchersCount: item.watchersCount,
        forksCount: item.forksCount,
        license: item.license,
        language: item.language
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
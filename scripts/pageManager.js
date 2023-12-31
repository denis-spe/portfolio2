/**
 * Manage page to render with XMLHttpRequest
 * Object
 */
class PageManager {

  // Private variable
  #xmlhttp;
  #jsonFile;

  // Constructor
  /**
   * A constructor of PageManager class
   * @param {String} jsonFile to load the page urls
   */
  constructor(jsonFile) {
    if (window.XMLHttpRequest)
      this.#xmlhttp = new XMLHttpRequest();

    this.#jsonFile = jsonFile
  }

  // Class methods

  /**
   * fetches the data
   * @param {String} url of the content to fetch
   * @param {String} data a function which receives data
   * @param {String} isJson if is set to true the json file
   * will be parse to javascript object either will remain a response
   */
  fetchData(url, data, isJson) {
    this.#xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 &&
        this.status == 200
      ) {
        if (isJson) {
          // Parse to javascript object
          var response = JSON.parse(this.response)
          data(response)
        } else {
          data(this.response)
        }
      }
    }
    
    this.#xmlhttp.open("GET", url)
    this.#xmlhttp.send()
  }

  /**
   * Loads the json file
   * @param {String} pageName of the page to fetch from the json
   * @param {String} url a function which receiving the url 
   */
  #loadPageJson(pageName, url){
    const pageManager = new PageManager(this.#jsonFile)
    pageManager.fetchData(this.#jsonFile, json => {
      url(json[pageName])
    }, true)
  }

  /**
   * Load the page received from the url in the json
   * @param {string} pageName of the page to fetch from the json
   * @param {string} data a function which receiving the data from the url
   */
  loadPage(pageName, data){
    this.#loadPageJson(pageName, url => {
      const pageManager = new PageManager(this.#jsonFile)
      pageManager.fetchData(url, results => {
        data(results)
      })
    })
  }
}


const pageManager = new PageManager("../pages.json")
pageManager.loadPage("home", data => {
    document.getElementsByTagName("main")[0].innerHTML = data
})

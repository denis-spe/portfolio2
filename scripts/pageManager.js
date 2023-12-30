/**
 * Manage page to render with XMLHttpRequest
 * Object
 */
class PageManager {

  // Private variable
  #xmlhttp;

  // Constructor
  constructor() {
    if (window.XMLHttpRequest)
      this.#xmlhttp = new XMLHttpRequest()
  }

  // Class methods
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
}


const pageManager = new PageManager()
pageManager.fetchData("../file.json", (data) => {
  console.log(data)
}, isJson=true)

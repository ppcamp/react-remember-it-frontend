/* eslint-disable no-unreachable, no-unused-vars */

// It implement the basic object that every service must 'extends it'
// Using this approach, it's easier to test the routes and test the retrieving
// information

const NotImplementedYetException = "Not implemented yet. Missing API";

/**
 * Base class that contains the api host
 */
class BaseApi {
  constructor(endpoint = null) {
    const _address = new URL(process.env.REACT_APP_API);
    this.address = _address;
    if (endpoint) {
      this.address = new URL(endpoint, _address).toString();
    }
  }
}

/**
 * Creates a basic Json api.
 *
 * @note This api can fetch or send JSON data
 */
export class ApiJSON extends BaseApi {
  /**
   * Get an element by a query filtering
   * @param {{}} params A JSON containing the filters that I wanna
   * @param {string} suburl Additional path
   */
  async getByQuery(params, suburl = "") {
    let query = new URLSearchParams(params).toString();
    if (!suburl.length) {
      query = [suburl, query].join("/").slice(0, -1);
    }
    const url = new URL(query, this.address);
    console.log(url);
    // await fetch(url, {
    //   method: "GET",
    //   headers: { "Content-type": "application/json" },
    // }).then(res=>res.json());
  }

  /**
   * Get an element by a giving id
   * @param {string} id The id of the element
   * @param {string} suburl Additional path
   */
  async getById(id, suburl = "") {
    const query = [suburl, id].join("/").slice(0, -1);
    return this.getByQuery(null, query);
  }

  /**
   * Create a new element
   * @param {JSON} data A json object containing the values that i wanna send
   * @param {string} suburl Additional path
   */
  async create(data, suburl = "") {
    throw NotImplementedYetException;

    const url = new URL(suburl, this.address);

    await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  /**
   * Edit an element
   * @param {string} id The id of the element that I wanna modify
   * @param {{}} data A json object containing the values that i wanna send
   * @param {string} suburl Additional path
   */
  async edit(id, data, suburl = "") {
    throw NotImplementedYetException;

    const query = [suburl, id].join("/").slice(0, -1);
    const url = new URL(query, this.address);

    await fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
}

/**
 * Creates a basic Multipart api.
 *
 * @note This api can retrieve or send MULTIPART data. Usually \
 *        used to send files.
 */
export class ApiFile extends BaseApi {
  /**
   * Send files to server
   * @param {{}} data Data that will be sent to server
   * @param {string} suburl Additional path
   * @returns {JSON}
   */
  async send(data, suburl = "") {
    throw NotImplementedYetException;

    const url = new URL(suburl, this.address);

    await fetch(url, {
      method: "POST",
      headers: { "Content-type": "multipart/form-data" },
      body: data,
    }).then((res) => res.json());
  }

  /**
   * Download blob to pc
   * @param {Blob} bllob Blob that contains a file that will be downloaded
   * @param {string} suburl Additional path
   */
  async download(blob, filename) {
    // Resolving this promise, the file downloading will be in background (I THINK)
    Promise.resolve();

    const saveBlob = () => {
      // create a hidden hyperlink element
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      // pass download function to it and download it
      return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    };
    saveBlob(blob, filename);
  }

  /**
   * Retrieve files from server and convert it to blob
   * @param {string} id The id of the element that will be retrieve
   * @param {string} suburl Additional path
   * @returns {Blob} A blob variable
   */
  async retrieve(id, suburl = "") {
    throw NotImplementedYetException;
    let url = [suburl, id].join("/").slice(0, -1);
    url = new URL(url, this.address);

    const fileBlob = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => res.blob());
  }

  /**
   * Retrieve the url object for this call
   * @param {string} id The id of the element that will be retrieve
   * @param {string} suburl Additional path
   */
  toString(id, suburl = "") {
    let query = [suburl, id].join("/").slice(0, -1);
    const url = new URL(query, this.address);
    return url.toString();
  }
}

export default ApiJSON;

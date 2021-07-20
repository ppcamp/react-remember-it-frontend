// It implement the basic object that every service must 'extends it'
// Using this approach, it's easier to test the routes and test the retrieving
// information

const NotImplementedYetException = Error("Not implemented yet. Missing API");

/**
 * Base class that contains the api host
 */
class BaseApi {
  protected address: URL;

  constructor(endpoint: string | null = null) {
    if (!process.env.REACT_APP_API)
      throw Error("You must define the endpoint for this API");
    const _address = new URL(process.env.REACT_APP_API);
    this.address = _address;

    if (endpoint) {
      this.address = new URL(endpoint, _address);
    }
  }
}

/**
 * Hold's all possible of API requests
 */
export enum ApiOperation {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const ApiHeaders = {
  JSON: { "Content-type": "application/json" },
  MULTIPART: { "Content-type": "multipart/formdata" },
};

export const object_to_query = (params: {}) => {
  let query: string = "";
  if (params) query = new URLSearchParams(params).toString();
  return query;
};

/**
 * Creates a basic Multipart api.
 *
 * @note This api can retrieve or send MULTIPART data. Usually \
 *        used to send files.
 */
export class ApiFile extends BaseApi {
  /**
   * Send files to server
   * @param data Data that will be sent to server
   * @param suburl Additional path
   * @returns
   */
  async send(data: {}, suburl: string = "") {
    throw NotImplementedYetException;
  }

  /**
   * Download blob to pc
   * @param bllob Blob that contains a file that will be downloaded
   * @param suburl Additional path
   */
  async download(blob: Blob, filename: string) {
    // Resolving this promise, the file downloading will be in background (I THINK)
    Promise.resolve();

    const saveBlob = () => {
      // create a hidden hyperlink element
      var a = document.createElement("a");
      a.setAttribute("display", "none");
      document.body.appendChild(a);

      // pass download function to it and download it
      return function (blob: Blob, fileName: string) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    };

    saveBlob()(blob, filename);
  }

  /**
   * Retrieve files from server and convert it to blob
   * @param id The id of the element that will be retrieve
   * @param suburl Additional path
   * @returns A blob variable
   */
  async retrieve(id: string, suburl: string = "") {
    throw NotImplementedYetException;
  }

  /**
   * Retrieve the url object for this call
   * @param id The id of the element that will be retrieve
   * @param suburl Additional path
   */
  toString(id?: string, suburl: string = "") {
    let query = [suburl, id].join("/").slice(0, -1);
    const url = new URL(query, this.address);
    return url.toString();
  }
}

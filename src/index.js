import React from "react";
import ReactDOM from "react-dom";
import * as httpm from "typed-rest-client/HttpClient";

import "./styles.css";

class App extends React.Component {
  uploadFile = () => {
    let formData = this.createFormData();

    this.uploadUsingTypedRestClient(formData);

    this.uploadUsingXMLHttpRequest(formData);
  };

  uploadUsingTypedRestClient(formData) {
    const httpc = new httpm.HttpClient();
    httpc
      .post("http://foo.com/upload", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err.message));
  }

  uploadUsingXMLHttpRequest(formData) {
    var request = new XMLHttpRequest();
    request.open("POST", "http://foo.com/upload");
    request.send(formData);
  }

  createFormData() {
    let formData = new FormData();

    formData.append("username", "Groucho");
    formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"

    // HTML file input, chosen by user
    formData.append("userfile", this.fileEl.files[0]);

    // JavaScript file-like object
    var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
    var blob = new Blob([content], { type: "text/xml" });

    formData.append("webmasterfile", blob);

    return formData;
  }

  componentDidMount() {
    this.fileEl = document.getElementById("file");
    this.fileEl.addEventListener("change", this.uploadFile);
  }

  componentWillUnmount() {
    this.fileEl.removeEventListener("change", this.uploadFile);
  }

  render() {
    return (
      <div className="App">
        <input id="file" type="file" />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

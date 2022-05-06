import { useRef, useState } from "react";

function Urls() {
  const [urls, setUrls] = useState([]);
  const urlRef = useRef();

  /* Takes long URL as input and create a short URL */
  function createShortUrl() {
    if (urlRef !== null) {
      urls.push({
        id: new Date().getTime().toString(),
        long: urlRef.current.value,
        short: "bayad",
        hits: 10,
      });

      setUrls([...urls]);
    }
  }

  return (
    <div className="container">
      <div className="input-group mb-3 py-5">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a long URL"
          ref={urlRef}
        />
        <button onClick={createShortUrl} className="input-group-text">
          Create Short URL
        </button>
      </div>
      <table className="table table-striped" style={{textAlign: "center"}}>
        <thead>
          <tr>
            <th scope="col">Long URL</th>
            <th scope="col">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            return (
              <tr key={url.id}>
                <td>{url.long}</td>
                <td>{url.short}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Urls;

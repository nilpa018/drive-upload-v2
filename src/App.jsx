import { useState, useEffect } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

function App(props) {
  const FILE_LIMITATION = 2;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: FILE_LIMITATION,
  });
  const [selectedFiles, setSelectedFiles] = useState(acceptedFiles);
  const [folderId, setFolderId] = useState(null);

  const removeFile = (file) => {
    const newFiles = selectedFiles.filter((filter) => filter !== file);
    setSelectedFiles(newFiles);
  };

  const files = selectedFiles.map((file) => (
    <>
      <li key={file.name}>
        {file.path} - {file.size} bytes
        <a className="delete" onClick={() => removeFile(file)}>
          Delete
        </a>
      </li>
    </>
  ));

  const handleChangeFolderId = (e) => {
    setFolderId(e.target.value);
  };

  useEffect(() => {
    setSelectedFiles(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <>
      <h1>Upload Drive V2</h1>
      {folderId && (
        <div className="card">
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                Drag 'n' drop some files here, or click to{" "}
                <span className="upload">select files</span>
              </p>

              {FILE_LIMITATION > 0 && (
                <em>
                  ({FILE_LIMITATION} files are the maximum number of files you
                  can drop here)
                </em>
              )}
            </div>
            {files.length > 0 && (
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
            )}
          </section>
        </div>
      )}
      <div className="card-drive">
        <label for="id-folder">Drive Folder Id</label>
        <input
          className="id-folder"
          type="texte"
          name="id-folder"
          placeholder="11aXroJ5Ze4_olv7BJSyLAAiuXXXXXXXX"
          onChange={(e) => handleChangeFolderId(e)}
        />
      </div>
    </>
  );
}

export default App;

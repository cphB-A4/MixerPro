import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Logo from "../images/mixerProLogo.jpg";
function GifModal({ gifList, changeGifImg, updateGifUrlDb }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-black mt-2" onClick={handleShow}>
        Change your GIF
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select the GIF you want on your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ul>
              {gifList.map((gif) => (
                <li key={gif}>
                  <div
                    onClick={() => {
                      changeGifImg(gif);
                      setShow(false);
                      updateGifUrlDb(gif);
                    }}
                    type="button"
                    className="btn btn-outline-dark "
                  >
                    <img src={gif} alt="gif" height="130" width="130" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-grey" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default GifModal;

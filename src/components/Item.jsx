import React from 'react';
import { Col } from 'reactstrap';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';

export default function Item({ wordAudio, English, Farsi, wordIcon, fav }) {
  return (
    <Col sm={3} xs={6} className="mb-4">
      <div
        onClick={() => {
          const audio = new Audio(wordAudio);
          audio.play();
        }}
        style={{ backgroundColor: getcolorfromword(English) }}
        className="word-item_card"
      >
        <div className="word-img">
          {wordIcon ? (
            <img
              src={wordIcon}
              style={{ width: '100%', height: '100%' }}
              onError={(e) => {
                e.target.src = '/defaultImg.svg';
              }}
            />
          ) : (
            <Defaultwordicon />
          )}
        </div>
        {/* backgroundColor: getcolorfromword(English + 'ex'), */}
        {!fav ? (
          <div style={{ width: '100%' }}>
            <div className="card-item-line"></div>
            <div className="word-english">{English}</div>
            <div className="word-farsi">{Farsi}</div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <div className="card-item-line"></div>
            <div className="word-farsi">{Farsi}</div>
            <div className="word-english">{English}</div>
          </div>
        )}
      </div>
    </Col>
  );
}

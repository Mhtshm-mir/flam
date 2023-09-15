import React, { useState, useRef } from 'react';
import ContentDivs from './ContentDivs';
import '../App.css';

function BottomSheetBar() {
  const [height, setHeight] = useState(200);
  const [startingY, setStartingY] = useState(null);
  const [contentToShow, setContentToShow] = useState({
    isClosed: true,
    isHalfOpen: false,
    isOpen: false,
  });
  const [isRightClickDragging, setIsRightClickDragging] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const bottomSheetRef = useRef(null);

  const MIN_HEIGHT = 200;
  const MAX_HEIGHT = 850;

  const handlePress = (e) => {
    setIsRightClickDragging(true);
    setStartingY(e.clientY);
    setIsTransitionEnabled(false); 
  };

  const handleDrag = (e) => {
    if (isRightClickDragging && height >= MIN_HEIGHT) {
      const deltaY = startingY - e.clientY;
      let newHeight = height + deltaY;

      newHeight = Math.max(Math.min(newHeight, MAX_HEIGHT), MIN_HEIGHT);

      setHeight(newHeight);
      setStartingY(e.clientY);
    }

    if (height < 400) {
      setContentToShow({ isClosed: true, isHalfOpen: false, isOpen: false });
    } else if (height >= 400 && height < 700) {
      setContentToShow({ ...contentToShow, isHalfOpen: true, isOpen: false });
    } else {
      setContentToShow({ ...contentToShow, isHalfOpen: true, isOpen: true });
    }
  };

  const handleRelease = () => {
    setIsRightClickDragging(false);

    const setPointFirstDistance = Math.abs(height - 200);
    const setPointSecondDistance = Math.abs(height - 500);
    const setPointThirdDistance = Math.abs(height - 850);

    const closest = Math.min(setPointFirstDistance, setPointSecondDistance, setPointThirdDistance);

    if (setPointFirstDistance === closest) {
      setHeight(200);
    } else if (setPointSecondDistance === closest) {
      setHeight(500);
    } else {
      setHeight(850);
    }

    setStartingY(null);

   
    setIsTransitionEnabled(true);
  };

  const handleTouchStart = (e) => {
    setIsRightClickDragging(true);
    setStartingY(e.touches[0].clientY);
    setIsTransitionEnabled(false); 
  };

  const handleTouchMove = (e) => {
    if (isRightClickDragging && height >= MIN_HEIGHT) {
      const deltaY = startingY - e.touches[0].clientY;
      let newHeight = height + deltaY;

      newHeight = Math.max(Math.min(newHeight, MAX_HEIGHT), MIN_HEIGHT);

      setHeight(newHeight);
      setStartingY(e.touches[0].clientY);
    }

    if (height < 400) {
      setContentToShow({ isClosed: true, isHalfOpen: false, isOpen: false });
    } else if (height >= 400 && height < 700) {
      setContentToShow({ ...contentToShow, isHalfOpen: true, isOpen: false });
    } else {
      setContentToShow({ ...contentToShow, isHalfOpen: true, isOpen: true });
    }
  };

  const handleTouchEnd = () => {
    setIsRightClickDragging(false);

    const setPointFirstDistance = Math.abs(height - 200);
    const setPointSecondDistance = Math.abs(height - 500);
    const setPointThirdDistance = Math.abs(height - 850);

    const closest = Math.min(setPointFirstDistance, setPointSecondDistance, setPointThirdDistance);

    if (setPointFirstDistance === closest) {
      setHeight(200);
    } else if (setPointSecondDistance === closest) {
      setHeight(500);
    } else {
      setHeight(850);
    }

    setStartingY(null);


    setIsTransitionEnabled(true);
  };

  const setHeightTo = (newHeight) => {

    setIsTransitionEnabled(true);
    setHeight(newHeight);
  };

  return (
    <div
      className="bottom-sheet"
      onMouseDown={handlePress}
      onMouseMove={handleDrag}
      onMouseUp={handleRelease}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={bottomSheetRef}
      style={{
        height: `${height}px`,
        backgroundColor: 'rgba(10, 0, 10, 0.4)',
        width: '50vw',
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        transition: isTransitionEnabled ? 'height 1s ease' : 'none', 
      }}
    >
      <div>
        <svg
          className="svg-icon"
          style={{
            cursor: 'pointer',
            width: '5em',
            height: '2.5em',
            verticalAlign: 'middle',
            fill: 'currentColor',
            overflow: 'hidden',
            marginBottom: '30px',
          }}
          viewBox="0 0 1025 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M585.074876 232.47085h-73.618434 237.427243L511.120686 0.743459 275.188355 232.47085h163.800816v216.122744H218.149858v143.479602h220.839313v216.906175h146.085705V592.073196h219.120563V448.593594h-219.120563V232.47085z m-73.906225 790.04115l219.983936-213.532629H292.91146l218.257191 213.524635zM0.740049 519.478017l217.409809 216.07478V305.113993L0.740049 519.478017z m803.45539-214.364024V735.544803l219.120564-216.07478-219.120564-214.364024z" />
        </svg>
      </div>

      <div
        style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}
        className="height-buttons"
      >
        <button onClick={() => setHeightTo(200)}>Closed View</button>
        <button onClick={() => setHeightTo(500)}>Half View</button>
        <button onClick={() => setHeightTo(850)}>Full View</button>
      </div>

      <ContentDivs
        isClosed={contentToShow.isClosed}
        isHalfOpen={contentToShow.isHalfOpen}
        isOpen={contentToShow.isOpen}
      />
    </div>
  );
}

export default BottomSheetBar;

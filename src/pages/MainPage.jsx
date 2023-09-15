import { useState } from "react";
import BottomSheet from "./BottomSheet";

function MainPage(){

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const openBottomSheet = () => {
      setIsBottomSheetOpen(true);
    };
  
    const closeBottomSheet = () => {
      setIsBottomSheetOpen(false);
    };
  
    return (
      <div>
        {
            !isBottomSheetOpen && <button onClick={openBottomSheet}>Open Bottom Sheet</button>
        }
  
        {isBottomSheetOpen && (
          <div >
            <div >
              <BottomSheet onClose={closeBottomSheet} />
            </div>
          </div>
        )}
      </div>
    );

}

export default MainPage

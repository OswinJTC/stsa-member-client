import React from 'react'
import "./DeletePopOut.css"

const DeletePopOut = ({ tempDeleteData, handleDelete, setShowDeletePop }) => {

  const clickYes= () =>{
    handleDelete(tempDeleteData[0], tempDeleteData[1]);
    setShowDeletePop(false);
  }

  const clickNo= () =>{
    setShowDeletePop(false);
  }

  return (
    <div>
      
   

    <div className='pop-out-overlay'>
      <div className='pop-out-content'>
        <div className='pt-4'></div>
        
        <h3>確認刪除該筆資料？</h3>

        <div className='pt-4'></div>

        <div className='delete-pop-buttons'>
            <button className = "delete-pop-btn" onClick={clickYes}>確定刪除</button>


            <button className = "delete-pop-btn" onClick={clickNo}>取消</button>
          
        </div>
        <div className='pt-4'></div>
        
        
      </div>
    </div>

    

    </div>
    


  )
}

export default DeletePopOut
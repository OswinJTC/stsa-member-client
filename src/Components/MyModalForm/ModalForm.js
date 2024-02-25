import React from 'react';
import './ModalForm.css';

const ModalForm = ({ showModal, closeModal, formData, handleChange, handleSubmit }) => {
  return (
    <>
      {showModal && (
        <div className="modal active">
          <div className="modal-content">
            <div className='pt-4'></div>

            <div>
              <h3>
                新增交易紀錄
              </h3>
            </div>

            <span className="close" onClick={closeModal}>&times;</span>

            <div className='pt-4'></div>

             
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>股票名稱</div>
                  <input type="text" name="stockName"  placeholder="例：APPL" value={formData.stockName} onChange={handleChange} />
                </div>
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>買入價</div>
                  <input type="text" name="buyPrice" placeholder="例：229.50" value={formData.buyPrice} onChange={handleChange} />
                </div>
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>賣出價</div>
                  <input type="text" name="salePrice" placeholder="例：330.17" value={formData.salePrice} onChange={handleChange} />
                </div>
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>平倉</div>
                  <input type="text" name="quantity"  placeholder="例：8.2" value={formData.quantity} onChange={handleChange} />
                </div>
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>買入日期</div>
                  <input type="text" name="buyDate" placeholder="例：2024-02-04" value={formData.buyDate} onChange={handleChange} />
                </div>
                <div className="form-column">
                  <div className="attribute" style={{ fontWeight: 'bold' }}>平倉日期</div>
                  <input type="text" name="saleDate" placeholder="例：2024-02-29" value={formData.saleDate} onChange={handleChange} />
                </div>
              </div>

              
            </form> 

            
            <div className='pt-4'></div>
            <div className='pt-4'></div>
            <div className='buttton'>
            <button type="submit" onClick={handleSubmit}>送出資料</button>
            
            </div>
                  
              <div className='pt-3'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;

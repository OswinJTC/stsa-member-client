import  { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Transaction.css';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../MyModalForm/ModalForm';
import { red } from '@mui/material/colors';
 

const Transaction = () => {
  const currentUser = localStorage?.getItem("loggedInUserName") || "";
  const [allTrades, setAllTrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterButton, setFilteredButton] = useState(false);
  const [renderAllButton, setRenderAllButton] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  let totalProfit = 0;

  console.log("Filtered data: ", filteredData)
  

  


  const handleFilter = () => {

    totalProfit = 0;

    setFilteredButton(true);
    
    // Filter data based on the user-defined date range
    const filtered = allTrades.filter(item => {
      return item?.saleDate >= startDate && item?.saleDate <= endDate;
    });
 

    setFilteredData(filtered);
    setSearchButton(false)
    setRenderAllButton(false);
    

    console.log("Show filtered data.")

  
  };

  const handleRenderAll = () =>{
    totalProfit = 0;

    setRenderAllButton(true);

    setFilteredButton(false);
    setSearchButton(false);

    

    console.log("Show all data.")
  }
 
 
  const sortedTrades = allTrades.sort((a, b) => {
    // Assuming saleDate is in the format 'yyyy-mm-dd'
    const dateA = new Date(a.saleDate);
    const dateB = new Date(b.saleDate);
    return dateB - dateA; // Sort in descending order
  });




  const getTrades = async () => {
    try {
      const response = await api.get('/tradeApi/allTrades');
      setAllTrades(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    stockName: '',
    buyPrice: '',
    salePrice: '',
    quantity: '',
    buyDate: '',
    saleDate: '',
  });

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
  };

  const backHome = () => {
    navigate("/");
  };
 
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.stockName ||
      !formData.buyPrice ||
      !formData.salePrice ||
      !formData.quantity ||
      !formData.buyDate ||
      !formData.saleDate
    ) {
      alert("請輸入每一格！");
      return; // Stop execution if any field is empty
    }

    if (
      typeof formData.stockName !== "string" 
    ) {
      alert("股票名稱錯誤");
      return;
    }

    if (
      isNaN(parseInt(formData.quantity)) 
    ) {
      alert("持倉格式錯誤！");
      return;
    }

    if (
      isNaN(parseFloat(formData.buyPrice)) ||
      isNaN(parseFloat(formData.salePrice))
    ) {
      alert("價格格式錯誤！");
      return;
    }

    if ( 
      !isValidDate(formData.buyDate) ||
      !isValidDate(formData.saleDate)
    ) {
      alert("日期格式錯誤！");
      return;
    }

  
    try {
      const response = await api.post("/tradeApi/addTrade", {
        owner: currentUser,
        stockName: formData.stockName,
        buyPrice: formData.buyPrice,
        salePrice: formData.salePrice,
        quantity: formData.quantity,
        buyDate: formData.buyDate,
        saleDate: formData.saleDate
      });

      getTrades();

      setFormData("");
      
      console.log("Trade added successfully:", response.data);
      
      // Assuming you want to close the modal after successful submission
      closeModal();
      
      // You might want to update the trades list after adding a new trade
      // You can do it by fetching trades again or updating the state accordingly
      
    } catch (error) {
      console.error("Error adding trade:", error);
      // Handle error, show user a message, etc.
    }
  };
  
  const handleSearch = () => {

    totalProfit = 0;
    setSearchButton(true);

    const searched = allTrades.filter(trade =>
      trade?.stockName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchData(searched);


    

    setRenderAllButton(false);
    setFilteredButton(false);

    

    console.log("Searched data: ", searchData)
  };

  useEffect(() => {
    getTrades();
  }, []);

 
  console.log("Filtered data", filteredData);

 

  return (
    <div className="transaction-background">
      <div className="transaction-container">
        
        <div className='pt-5'></div>
        <div className='pt-3'></div>
        
        <h1 className="transaction-heading" style={{ fontFamily: 'serif',fontWeight: 'bold', color: 'black' }}>歷史交易紀錄</h1>
        
<div className='pt-3'></div>
        <div className="add-record-button">
          <button onClick={openModal}>新增紀錄</button>
        </div>

          <div className='pt-5'></div>
        
        <div className='pt-5'></div>

        <div className='main-container'>

    <div className="container">

      
      <div className="row justify-content-center">
        
      <div className="col-md-4" style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', padding: '20px', borderRadius: '5px' }}>
        <div className='pt-3'></div>
          <div>
            <div style={{ display: 'inline', fontSize: '24px', color: 'black' }}>開始時間：</div>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>

          <div>
          <div style={{ display: 'inline', fontSize: '24px', color: 'black' }}>結束時間：</div>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        
          <div className='pt-3'></div>

          <div style={{ fontSize: '30px' }}>
            <button onClick={handleFilter}>開始篩選</button>
          </div>

          <div className='pt-3'></div>

          <div style={{ display: 'inline', fontSize: '20px', color: 'black' }}>或</div>
          <div className='pt-3'></div>
          <div style={{ fontSize: '16px' }}>
            <button onClick={handleRenderAll}>顯示全部資料</button>
          </div>

     
          <div className='pt-1'></div>
        </div>
      </div>

    </div>
      

        <div className='pt-5'></div>

        

<div className='pt-3'></div>



        <div className='pt-3'></div>

        
        {showModal && (
  <div className="modal active">
    <div className="modal-content">
      <div className='pt-4'></div>

      <div>
        <h3>
          新增交易紀錄
        </h3>
      </div>

      

      <div className='pt-4'></div>

      

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


  
  <div  >
    <div className="input-container" >
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="請輸入股票名稱"
        className="input-box"
        style={{ marginRight: '10px' }}
      />
      <button
        onClick={handleSearch}
        className="search-button"
        style={{ width: "100px" }}
      >
        搜索
      </button>
    </div>
  </div>
 
  <div className='pt-3'></div>

        <div className="rolling-container">

        


<div className= "pt-3"></div>
        
          {/* Header row */}
          <div className="header-row">
            <div className="attribute" style={{ fontWeight: 'bold' }}>平倉日期</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>買入日期</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>股票名稱</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>買入價</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>賣出價</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>平倉</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>獲利</div>
            <div className="attribute" style={{ fontWeight: 'bold' }}>%</div>
          </div>

          {filterButton && (
  filteredData.map((trade, index) => {
    // Check if the owner is the current user
    if (trade.owner === currentUser) {
      totalProfit += trade.profit || 0; // Increment total profit with trade's profit
      return (
        <div key={index} className="trade-item">
          <div className="data">{trade?.saleDate?.substring(0, 10)}</div>
          <div className="data">{trade?.buyDate?.substring(0, 10)}</div>
          <div className={`data ${trade.profit > 0 ? 'red-text' : 'green-text'}`}>{trade?.stockName}</div>
          <div className="data">{trade?.buyPrice.toFixed(2)}</div>
          <div className="data">{trade?.salePrice.toFixed(2)}</div>
          <div className="data">{trade?.quantity.toFixed(1)}</div>
          <div className="data">{trade?.profit?.toFixed(2)}</div>
          <div className="data">{trade?.percentAmount.toFixed(2)}%</div>
          {/* Render more trade details as needed */}
        </div>
      );
    } else {
      return null; // If the owner is not the current user, don't render this trade
    }
  })
)}

{searchButton && (
  searchData.map((trade, index) => {
    // Check if the owner is the current user
    if (trade.owner === currentUser) {
      totalProfit += trade.profit || 0; // Increment total profit with trade's profit
      return (
        <div key={index} className="trade-item">
          <div className="data">{trade?.saleDate?.substring(0, 10)}</div>
          <div className="data">{trade?.buyDate?.substring(0, 10)}</div>
          <div className={`data ${trade.profit > 0 ? 'red-text' : 'green-text'}`}>{trade?.stockName}</div>
          <div className="data">{trade?.buyPrice.toFixed(2)}</div>
          <div className="data">{trade?.salePrice.toFixed(2)}</div>
          <div className="data">{trade?.quantity.toFixed(1)}</div>
          <div className="data">{trade?.profit?.toFixed(2)}</div>
          <div className="data">{trade?.percentAmount.toFixed(2)}%</div>
          {/* Render more trade details as needed */}
        </div>
      );
    } else {
      return null; // If the owner is not the current user, don't render this trade
    }
  })
)}




{renderAllButton && (
  sortedTrades
    .filter(trade => trade?.owner === currentUser)
    .map((trade, index) => {
     
      totalProfit += trade.profit || 0; // Increment total profit with trade's profit
      return (
        <div key={index} className="trade-item">
          <div className="data">{trade?.saleDate?.substring(0, 10)}</div>
          <div className="data">{trade?.buyDate?.substring(0, 10)}</div>
          <div className={`data ${trade.profit > 0 ? 'red-text' : 'green-text'}`}>{trade?.stockName}</div>
          <div className="data">{trade?.buyPrice.toFixed(2)}</div>
          <div className="data">{trade?.salePrice.toFixed(2)}</div>
          <div className="data">{trade?.quantity.toFixed(1)}</div>
          <div className="data">{trade?.profit?.toFixed(2)}</div>
          <div className="data">{trade?.percentAmount.toFixed(2)}%</div>
          {/* Render more trade details as needed */}
        </div>
      );
    })
)}




{!filterButton && !renderAllButton && !searchButton  && (
  sortedTrades
    .filter(trade => trade?.owner === currentUser)
    .map((trade, index) => {
      
      totalProfit += trade.profit || 0; // Increment total profit with trade's profit
      return (
        <div key={index} className="trade-item">
          <div className="data">{trade?.saleDate?.substring(0, 10)}</div>
          <div className="data">{trade?.buyDate?.substring(0, 10)}</div>
          <div className={`data ${trade.profit > 0 ? 'red-text' : 'green-text'}`}>{trade?.stockName}</div>
          <div className="data">{trade?.buyPrice.toFixed(2)}</div>
          <div className="data">{trade?.salePrice.toFixed(2)}</div>
          <div className="data">{trade?.quantity.toFixed(1)}</div>
          <div className="data">{trade?.profit?.toFixed(2)}</div>
          <div className="data">{trade?.percentAmount.toFixed(2)}%</div>
          {/* Render more trade details as needed */}
        </div>
      );
    })
)}


        </div>

        <div className='pt-3'></div>

        <div  >
    <div className='pt-3'></div>

<div className='responsive-text-container'>
    <h5 className='responsive-text'>
    {totalProfit > 0 
  ? "本階段共獲利 $" + totalProfit.toFixed(2) + " , 請保持!!!" 
  : totalProfit < 0 
    ? "本階段共損失 $" + totalProfit.toFixed(2) + " ，請加油!!!" 
    : "本階段獲利 $" + totalProfit.toFixed(2) + " ，這麼剛好!!!" 
}

    </h5>
</div>

</div>



        

       

        <div className='pt-5'></div>
        <div>
          <button type="button" onClick={backHome}>返回首頁</button>
        </div>

        </div>


        <div className='pt-5'></div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>
      </div>
    </div>
  );
};

export default Transaction;

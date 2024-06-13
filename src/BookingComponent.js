
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingComponent.css'; // For styling

const BookingComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  



  const pricePerNight = 20000;
  const extraGuestCharge = 1000;
  
  const maxGuests = 8;

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const extraGuests = Math.max(0, pets+adults + children - maxGuests);
    
    return (pricePerNight * numberOfNights) + (extraGuests * extraGuestCharge * numberOfNights) ;
  };

  const handleReserveNow = () => {
    alert(`Total price: ₹${calculateTotalPrice()}`);
  };

  return (
    <div className="booking-component">
      <div className="price-info">
        <h2>₹{pricePerNight}/night</h2>
        <p>max {maxGuests} guests, extra guests will cost ₹{extraGuestCharge} per head</p>
        
      </div>
      <div className="date-picker">
        <label>Check-in Check-out dates:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          placeholderText="Check-in"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Check-out"
        />
      </div>
      <div className="guests">
        <label>Guests:</label>
        <div>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
          /> adults
        </div>
        <div>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
          /> children
        </div>
        <div>
          <input
            type="number"
            min="0"
            value={pets}
            onChange={(e) => setPets(parseInt(e.target.value))}
          /> Pets
        </div>
        
      </div>
      <button onClick={handleReserveNow} className="reserve-now-button">
        Reserve Now
      </button>
      <div className="total-price">
        <p>Total: ₹{calculateTotalPrice()}</p>
      </div>
    </div>
  );
};

export default BookingComponent;

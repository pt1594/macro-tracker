import React, { useState } from 'react';
import './MacroTracker.css';

const MacroTracker = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const calculateCalories = (protein, carbs, fat) => {
    return (protein * 4) + (carbs * 4) + (fat * 9);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleAddItem = () => {
    if (currentItem.name) {
      const calories = calculateCalories(
        currentItem.protein,
        currentItem.carbs,
        currentItem.fat
      );
      
      setFoodItems(prev => [...prev, { ...currentItem, calories }]);
      setCurrentItem({ name: '', protein: 0, carbs: 0, fat: 0 });
    }
  };

  const getTotals = () => {
    return foodItems.reduce((acc, item) => ({
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      calories: acc.calories + item.calories
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  return (
    <div className="macro-tracker">
      <h1>Macro Tracker</h1>
      
      <div className="input-container">
        <input
          type="text"
          name="name"
          placeholder="Food name"
          value={currentItem.name}
          onChange={handleInputChange}
        />
        <div className="macro-inputs">
          <div className="macro-input">
            <label>Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={currentItem.protein}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="macro-input">
            <label>Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              value={currentItem.carbs}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="macro-input">
            <label>Fat (g)</label>
            <input
              type="number"
              name="fat"
              value={currentItem.fat}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>
        <button onClick={handleAddItem}>Add Food Item</button>
      </div>

      <div className="food-items">
        {foodItems.map((item, index) => (
          <div key={index} className="food-item">
            <h3>{item.name}</h3>
            <div className="macro-details">
              <span>Protein: {item.protein}g</span>
              <span>Carbs: {item.carbs}g</span>
              <span>Fat: {item.fat}g</span>
              <span>Calories: {item.calories}</span>
            </div>
          </div>
        ))}
      </div>

      {foodItems.length > 0 && (
        <div className="totals">
          <h2>Daily Totals</h2>
          <div className="totals-details">
            <span>Total Protein: {getTotals().protein}g</span>
            <span>Total Carbs: {getTotals().carbs}g</span>
            <span>Total Fat: {getTotals().fat}g</span>
            <span>Total Calories: {getTotals().calories}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacroTracker; 
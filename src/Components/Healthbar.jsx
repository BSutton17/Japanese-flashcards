import React, { useState, useEffect } from 'react';
import '../App.css'

function HealthBar({ currentHealth, maxHealth }) {
    const healthPercentage = (currentHealth / maxHealth) * 100;
  
    return (
      <div className="health-bar-container">
        <div className="health-bar">
          <div className="health-bar-fill" style={{ width: `${healthPercentage}%` }}></div>
        </div>
      </div>
    );
  }
  
  export default HealthBar;
  
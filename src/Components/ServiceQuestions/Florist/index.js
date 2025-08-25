import React from "react";

const Florist = ({ setFormData, formData }) => {
  const handleBudgetChange = (e) => {
    const selectedValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      florist_budget: selectedValue,
    }));
  };
  return (
    <>
      <select className="form-select form-control"
        onChange={handleBudgetChange}
            value={formData?.florist_budget}
      id="florist">
        <option value="" selected disabled>
          Select Florist Budget
        </option>
        <option value="Budget $500–$1,500 (Small bouquets, basic centerpieces, minimal)">
          Budget $500–$1,500 (Small bouquets, basic centerpieces, minimal)
        </option>
        <option value="Mid Range $1,500–$4,500 (Full bouquets, aisle, altar & reception
          pieces)">
          Mid Range $1,500–$4,500 (Full bouquets, aisle, altar & reception
          pieces)
        </option>
        <option value="igh End $4,500–$10,000 (Large installations, luxury stems, full
          reception)">
          High End $4,500–$10,000 (Large installations, luxury stems, full
          reception)
        </option>
        <option value="Luxury $10,000–$30,000 (Custom designs, floral chandeliers & walls,
          rentals)">
          Luxury $10,000–$30,000 (Custom designs, floral chandeliers & walls,
          rentals)
        </option>
      </select>
    </>
  );
};

export default Florist;

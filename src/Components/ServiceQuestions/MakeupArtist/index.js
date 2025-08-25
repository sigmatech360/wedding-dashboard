import React from "react";

const MakeupArtist = ({ setFormData, formData }) => {
  const handleBudgetChange = (e) => {
    const selectedValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      makeupartist_budget: selectedValue,
    }));
  };
  return (
    <>
      <select
        className="form-select form-control"
        onChange={handleBudgetChange}
        value={formData?.makeupartist_budget}
        id="makeupArtist"
      >
        <option value="" selected disabled>
          Select Budget
        </option>
        <option value="150">$150</option>
        <option value="300">$150-$300</option>
        <option value="600">$300-$600</option>
        <option value="1000">$600-$1000</option>
        <option value="1000+">$1000+</option>
      </select>
    </>
  );
};

export default MakeupArtist;

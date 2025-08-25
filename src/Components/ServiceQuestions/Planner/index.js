import React from "react";

const Planner = ({ setFormData, formData }) => {
  const handleCheckboxChange = (e, key) => {
    const { checked, id } = e.target;

    setFormData((prevData) => {
      const updatedCheckboxes = checked
        ? [...(prevData[key] || []), id]
        : prevData[key]?.filter((item) => item !== id);

      return {
        ...prevData,
        [key]: updatedCheckboxes,
      };
    });
  };
  const handleBudgetChange = (e) => {
    const selectedValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      planner_budget: selectedValue,
    }));
  };
  return (
    <>
      <select
        className="form-select form-control"
        id="planner"
        onChange={handleBudgetChange}
        value={formData?.planner_budget}
      >
        <option value="" selected disabled>
          Select An Option
        </option>
        <option value="Full Service: $5k-$15k (Start to Finish, design, timelines, day of)">
          Full Service: $5k-$15k (Start to Finish, design, timelines, day of)
        </option>
        <option value="Partial: $2.5k-$5k (Guidance partway, day of)">
          Partial: $2.5k-$5k (Guidance partway, day of)
        </option>
        <option value="Month of: $1.5k-$2.5k (timeline, day of)">
          Month of: $1.5k-$2.5k (timeline, day of)
        </option>
        <option value="Day of: $800-$1800 (rehearsal & wedding day only)">
          Day of: $800-$1800 (rehearsal & wedding day only)
        </option>
        <option value="Design only $1.5k-$3k (aesthetic elements & mood boards)">
          Design only $1.5k-$3k (aesthetic elements & mood boards)
        </option>
      </select>
      <div className="weddingForm_subDropdown wedding-checkboxes">
        {["Bilingual or Multicultural Background", "Design Forward"].map(
          (label, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                value={label}
                id={label}
                checked={formData?.planner_type?.includes(label)}
                onChange={(e) => handleCheckboxChange(e, "planner_type")}
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Planner;

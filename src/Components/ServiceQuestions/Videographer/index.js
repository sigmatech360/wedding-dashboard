import React from "react";

const Videographer = ({ setFormData, formData }) => {
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

  const handleSelectChange = (e, key) => {
    const selectedValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [key]: selectedValue,
    }));
  };
  return (
    <>
      <div className="weddingForm_subDropdown">
        <div className="mt-2  wedding-checkboxes ">
          {["Drone coverage", "Raw Footage"].map((label, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                id={label}
                value={label}
                checked={formData?.videography_type?.includes(label)}
                onChange={(e) => handleCheckboxChange(e, "videography_type")}
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="weddingForm_subDropdown">
        <select
          className="mt-3  form-select form-control"
          onChange={(e) => handleSelectChange(e, "videography_categories")}
          value={formData?.videography_categories}
          id="videography"
        >
          <option value="Cinematic (Story, emotional, artistic)">
            Cinematic (Story, emotional, artistic)
          </option>
          <option value="Documentary">Documentary</option>
        </select>
      </div>
      <div className="weddingForm_subDropdown">
        {/* <label className="form-label">Budget:</label> */}
        <select
          className="form-select form-control"
          onChange={(e) => handleSelectChange(e, "videography_budget")}
          value={formData?.videography_budget}
          id="wholeWeddingBudget"
        >
          <option value="" disabled selected>
            Videography Budget
          </option>
          <option value="Budget: Under $2,500 (Up to 6 Hours – Highlights Only)">
            Budget: Under $2,500 (Up to 6 Hours – Highlights Only)
          </option>

          <option value="Mid: $2,500–$4,500 (6–10 Hours – Highlights + Add-ons Possible)">
            Mid: $2,500–$4,500 (6–10 Hours – Highlights + Add-ons Possible)
          </option>

          <option value="High End: $4,500–$8,000 (Full Day – Highlights, Full Doc Edit, Story
            Driven, Drone)">
            High End: $4,500–$8,000 (Full Day – Highlights, Full Doc Edit, Story
            Driven, Drone)
          </option>

          <option value="Luxury: $8,000–$20,000 (Editorial Style, Multi-Day Coverage, All
            Films Included)">
            Luxury: $8,000–$20,000 (Editorial Style, Multi-Day Coverage, All
            Films Included)
          </option>
        </select>
      </div>
    </>
  );
};

export default Videographer;

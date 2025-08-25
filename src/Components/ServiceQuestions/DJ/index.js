import React from "react";

const DJ = ({ setFormData, formData }) => {
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
      dj_budget: selectedValue,
    }));
  };
  return (
    <>
      <div className="wedding-checkboxes">
        {[
          "MC",
          "Speaks Other Languages",
          "Live Music Add-on (Sax, Violin, Drums, etc)",
          "Live Singer Add-on",
          "Uplighting Add-on",
          "Dance Floor Lighting Add-on",
        ].map((label, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              name={label}
              id={label}
              checked={formData?.dj_type?.includes(label)}
              onChange={(e) => handleCheckboxChange(e, "dj_type")}
            />
            <label className="form-check-label" htmlFor={label}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="weddingForm_subDropdown">
        {/* <label className="form-label">Budget:</label> */}
        <select
          className="form-select form-control"
          onChange={handleBudgetChange}
          value={formData?.dj_budget}
        >
          <option value="" selected disabled>
            Select DJ Budget
          </option>
          <option value="Budget $500–$1,200 (3–5 Hours, basic system, limited MC skills)">
            Budget $500–$1,200 (3–5 Hours, basic system, limited MC skills)
          </option>
          <option value="Mid Range $1,200–$2,500 (4–6 Hours, solid MC, custom playlists)">
            Mid Range $1,200–$2,500 (4–6 Hours, solid MC, custom playlists)
          </option>
          <option value="High End $2,500–$5,000 (Full Day, pro sound & lighting, full MC,
            custom mixing)">
            High End $2,500–$5,000 (Full Day, pro sound & lighting, full MC,
            custom mixing)
          </option>
          <option value="Luxury $5,000–$15,000 (Well known names, club style, full production
            setup)">
            Luxury $5,000–$15,000 (Well known names, club style, full production
            setup)
          </option>
        </select>
      </div>
    </>
  );
};

export default DJ;

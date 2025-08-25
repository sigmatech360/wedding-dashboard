import React from "react";

const Photographers = ({ setFormData, formData }) => {
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
      photographer_budget: selectedValue,
    }));
  };
  return (
    <>
      {/* Editing style  */}
      <div className="mb-2">
        {/* <label className="form-label sub-label">Editing style</label> */}
        <p className="wedding-form-group-p ">
          <span>Editing Style</span> ( Check all that apply )
        </p>
        <div className="wedding-checkboxes weddingForm_subDropdown">
          {[
            "Light & Airy",
            "Classic True to Color",
            "Dark and Moody",
            "Warm",
          ].map((label, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                id={label}
                value={label}
                checked={formData?.photographer_editing_style?.includes(label)}
                onChange={(e) =>
                  handleCheckboxChange(e, "photographer_editing_style")
                }
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Shooting Style  */}
      <div className="mb-2">
        {/* <label className="form-label">Shooting Style</label> */}
        <p className="wedding-form-group-p">
          <span>Shooting Style</span> ( Check all that apply )
        </p>
        <div className="wedding-checkboxes weddingForm_subDropdown">
          {[
            "Photojournalistic (little to no posing)",
            "Editorial (posed, intentional, dramatic lighting)",
            "Classic (Posed family, standard couple, ceremony, safe, expected)",
            "Fine Art (soft, dreamy, intentional compositions)",
            "Film Photography (can be mix of film & digital)",
          ].map((label, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                id={label}
                value={label}
                checked={formData?.photographer_shooting_style?.includes(label)}
                onChange={(e) =>
                  handleCheckboxChange(e, "photographer_shooting_style")
                }
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>

        <div className="weddingForm_subDropdown">
          {/* <label className="form-label">Budget:</label> */}
          <select
            className="form-select form-control"
            onChange={handleBudgetChange}
            value={formData?.photographer_budget}
          >
            <option value="" selected disabled>
              Photographer Budget
            </option>
            <option value="$2,000 (Newer photographers, limited hours)">
              $2,000 (Newer photographers, limited hours)
            </option>
            <option value="$2,000–$4,500 (Typically wedding day coverage)">
              $2,000–$4,500 (Typically wedding day coverage)
            </option>
            <option value="$4,500–$8,000 (Full coverage, 2nd shooters, albums, sessions, etc)">
              $4,500–$8,000 (Full coverage, 2nd shooters, albums, sessions, etc)
            </option>
            <option value="$8,000–$15,000 (Top-tier talent, film photography)">
              $8,000–$15,000 (Top-tier talent, film photography)
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Photographers;

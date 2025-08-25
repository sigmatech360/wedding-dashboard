import React from "react";

const EditingStyle = () => {
  return (
    <>
      <div className="mb-2">
        {/* <label className="form-label sub-label">Editing style</label> */}
        <p className="wedding-form-group-p 0">
          <span className="text-dark">Editing Style</span> ( Check all that
          apply )
        </p>
        <div className="wedding-checkboxes">
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
                name="djBandOrBoth"
                value={label}
                onChange={(e) => handleCheckboxChange(e, "djBandOrBoth")}
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditingStyle;

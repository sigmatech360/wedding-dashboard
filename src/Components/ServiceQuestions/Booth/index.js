import React from "react";

const Booth = ({ setFormData, formData }) => {
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
  return (
    <>
      <div className="wedding-checkboxes">
        {["Photo Booth", "Video Guest Booth (Guests Leave Video Messages)"].map(
          (label, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                value={label}
                id={label}
                checked={formData?.photo_booth_type?.includes(label)}
                onChange={(e) => handleCheckboxChange(e, "photo_booth_type")}
              />
              <label className="form-check-label" htmlFor={label}>{label}</label>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Booth;

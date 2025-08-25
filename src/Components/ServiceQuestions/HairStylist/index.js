import React from "react";

const HairStylist = ({ setFormData, formData }) => {
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
        {[
          "Specializes in textured hair",
          "Hijab styling",
          "Hollywood Waves",
        ].map((label, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              name={label}
              value={label}
              id={label}
              checked={formData?.hairstylist_type?.includes(label)}
              onChange={(e) => handleCheckboxChange(e, "hairstylist_type")}
            />
            <label className="form-check-label" htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default HairStylist;

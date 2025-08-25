import React from "react";

const Catering = ({ setFormData, formData }) => {
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
      <p className="wedding-form-group-p">Catering Type</p>
      <div className="weddingForm_subDropdown wedding-checkboxes mb-3">
        {[
          "Plated",
          "Buffet",
          "Family Style",
          "Food Stations",
          "Passed Hour d’Oeuvres",
          "Food Trucks",
          "Carving Stations",
          "Charcuterie Displays",
        ].map((label, index) => {
          

          return (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                name={label}
                value={label}
                id={label}
                checked={formData?.catering_type?.includes(label)}
                onChange={(e) => handleCheckboxChange(e, "catering_type")}
              />
              <label className="form-check-label" htmlFor={label}>
                {label}
              </label>
            </div>
          );
        })}

       
      </div>

      <p className="wedding-form-group-p">Food Types</p>
      <div className="weddingForm_subDropdown wedding-checkboxes">
        {[
          "American",
          "Italian",
          "Mexican / Tex-Mex",
          "Chinese / Pan-Asian",
          "Japanese",
          "Indian",
          "Greek / Mediterranean",
          "French",
          "Middle Eastern",
          "Thai",
          "Korean",
          "Vietnamese",
          "African",
          "Caribbean",
          "Brazilian / South American",
          "Cajun / Creole",
          "Fusion / Global",
          "BBQ",
          "Comfort Food",
          "Vegan / Vegetarian",
          "Gluten-Free",
          "Farm-to-Table",
          "Seafood (if applicable)",
          "Brunch / Breakfast",
          "Street Food",
          "Tapas / Small Plates",
          "Southern Soul Food",
          "Charcuterie / Grazing Tables",
          "Fast-Casual (Sliders, Tacos, Wings)",
          "Gourmet / Fine Dining",
          "Dessert-Only",
          "Late-Night Snacks",
          "Kids’ Meals",
          "Organic / All-Natural",
        ].map((label, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              name={label}
              value={label}
              id={label}
              checked={formData?.food_type?.includes(label)}
              onChange={(e) => handleCheckboxChange(e, "food_type")}
            />
            <label className="form-check-label" htmlFor={label}>
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Catering;

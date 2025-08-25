import React from "react";

const Venue = ({ setFormData, formData, viewOnly=false }) => {
  const handleVenueChange = (e) => {
    const { checked, id } = e.target;

    setFormData((prevData) => {
      const updatedVenueTypes = checked
        ? [...(prevData?.venue_type || []), id]
        : prevData?.venue_type?.filter((item) => item !== id);

      return {
        ...prevData,
        venue_type: updatedVenueTypes,
      };
    });
  };

  const handleBudgetChange = (e) => {
    const selectedValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      venue_budget: selectedValue,
    }));
  };
  if(viewOnly){
    return(
      <>
      
      <ul className=" mb-0">
        {formData?.venue_type?.map((venue, index) => (
          <li key={index}>{venue}</li>
        ))}
      </ul>
      
        {formData?.venue_budget && <p>Budget: Under {formData?.venue_budget}k</p>}
      
      </>
    )
  }
  return (
    <>
      <div className={`wedding-checkboxes`}>
        {[
          "Ballrooms",
          "Banquet Halls",
          "Country Clubs",
          "Hotels & Resorts",
          "Churches / Chapels",
          "Cathedrals",
          "Barns / Ranches",
          "Farms",
          "Gardens",
          "Vineyards / Wineries",
          "Orchards",
          "Greenhouses",
          "Industrial Lofts / Warehouses",
          "Art Galleries",
          "Rooftop Terraces",
          "Modern Event Spaces",
          "Skyscraper / City View Venues",
          "Libraries / Museums",
          "Airbnbs / VRBOs",
          "Private Estates",
          "Boutique Inns",
          "Historic Homes / Mansions",
          "Tiny Chapels / Micro-Wedding Spaces",
          "Theaters / Cinemas",
          "Camps / Retreat Centers",
          "Aquariums / Zoos",
          "Boats / Yachts",
          "Sports Arenas / Stadiums",
          "Amusement Parks",
          "Breweries / Distilleries",
        ].map((title, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={title}
              name={title}
              checked={formData?.venue_type?.includes(title)}
              onChange={handleVenueChange}
            />
            <label className="form-check-label" htmlFor={title}>
              {title}
            </label>
          </div>
        ))}
      </div>
      <div className={`weddingForm_subDropdown `}>
        <label className="form-label">Budget:</label>
        <select
          className="form-select form-control"
          onChange={handleBudgetChange}
          value={formData?.venue_budget}
          id="venueBudget"
        >
          <option value="" selected disabled>
            Venue Budget
          </option>
          <option value="5">Under 5k</option>
          <option value="10">Under 10k</option>
          <option value="15">Under 15k</option>
          <option value="20">Under 20k</option>
          <option value="30">Under 30k</option>
          <option value="40">Under 40k</option>
          <option value="50">Under 50k</option>
        </select>
      </div>
    </>
  );
};

export default Venue;

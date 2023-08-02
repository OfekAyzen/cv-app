import React, { useState } from 'react';

const FilterComponent = ({ data }) => {
  const [filters, setFilters] = useState({
    education: '',
    experience: '',
    skills: '',
    gender: '',
    location: '',
  });

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = data.filter((item) => {
    console.log("data : ",item)
    return (
      item.education.toLowerCase().includes(filters.education.toLowerCase()) &&
      item.experience.toLowerCase().includes(filters.experience.toLowerCase()) &&
      item.skills.toLowerCase().includes(filters.skills.toLowerCase()) &&
      item.gender.toLowerCase().includes(filters.gender.toLowerCase()) &&
      item.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Filter Component</h2>
      
    </div>
  );
};

export default FilterComponent;

/**
 *       <input
        type="text"
        name="education"
        placeholder="Education"
        value={filters.education}
        onChange={handleFilter}
      />
      <input
        type="text"
        name="experience"
        placeholder="Experience"
        value={filters.experience}
        onChange={handleFilter}
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills"
        value={filters.skills}
        onChange={handleFilter}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={filters.gender}
        onChange={handleFilter}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleFilter}
      />

      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
 */
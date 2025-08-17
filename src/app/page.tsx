"use client"

import { Select } from "@once-ui-system/core";
import { useState } from "react";

export default function Home() {

  const [selectedCountry, setSelectedCountry] = useState("");


  return (
    <div>
      
      <Select
        style={{ zIndex: "30 !important" }}
        id="basic-select"
        label="Choose a country"
        value={selectedCountry}
        options={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
            { label: "Australia", value: "au" }
        ]}
        onSelect={country => setSelectedCountry(country)}
    />

    </div>
  );
}

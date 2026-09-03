import React from "react";
import CustomDropdown from "./CustomDropdown";

/**
 * Legacy wrapper forwarding to universal CustomDropdown
 */
export default function SearchableSelect(props) {
  return <CustomDropdown searchable={true} variant="form" {...props} />;
}

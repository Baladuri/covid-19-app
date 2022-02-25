import React, { useEffect, useState } from "react";
import axios from "axios";

export const CurrentCountryContext = React.createContext();

// export function CountryContext() {

//   return (
//     <CurrentCountryContext.Provider
//       value={{ currentCountry, setCurrentCountry }}
//     ></CurrentCountryContext.Provider>
//   );
// }

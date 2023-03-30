import React from "react";
import Card from "./Card";
const CardList = ({ coaches }) => {
  return (
    <div className="container-card">
      {coaches.map((user, i) => {
        return (
          <Card
            key={i}
            id={coaches[i].id}
            name={coaches[i].name}
            mobileNumber={coaches[i].mobileNumber}
            speciality={coaches[i].speciality}
          />
        );
      })}
    </div>
  );
};
export default CardList;

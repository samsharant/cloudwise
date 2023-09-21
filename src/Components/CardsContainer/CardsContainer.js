import React from "react";
import "./CardsContainer.css";

function CardsContainer(props) {
  const { cards } = props;
  return (
    <div className="cards-container">
      {cards?.map((card) => (
        <div key={card.title} className="card">
          <div className="card-title-div">{card.title}</div>
          <div className="card-data-wrapper">
            <div className="icon-div">{card.icon}</div>
            <div className="card-data-div">{card.dataDivElement}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsContainer;

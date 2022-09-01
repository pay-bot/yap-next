import { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card } from "./Card";

import { fetchSections } from "../../../hooks/useSectionsData";

const style = { width: 400 };
export default function Container() {
  const { pageId } = useParams();
  const { data: section } = useQuery(["sections", { pageId }], fetchSections);

  const sectionIdSort = [];
  section?.data?.model?.sections?.map((data) => {
    return sectionIdSort.push(data);
  });

  const sortedCols = _.sortBy(sectionIdSort, "list_order");

  const [cards, setCards] = useState(sortedCols);
  useEffect(() => {
    setCards(sortedCols);
  }, [section]);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  console.log("c", cards);
  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.name}
        moveCard={moveCard}
      />
    );
  }, []);
  return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;
}


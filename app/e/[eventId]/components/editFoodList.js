"use client";

import AddFoodButton from "@/app/create-event/components/addFoodButton";
import OneFood from "@/app/create-event/components/oneFood";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function EditFoodList({ foodList, setFoodList }) {
  const setFoodListHandler = (e) => {
    const i = foodList.findIndex((ele) => String(ele.id) === e.target.id);
    const copyFoodList = [...foodList];
    copyFoodList[i].name = e.target.value;
    setFoodList(copyFoodList);
  };

  const removeFoodHandler = (id) => {
    const i = foodList.findIndex((ele) => ele.id === id);
    const copyFoodList = [...foodList];
    copyFoodList.splice(i, 1);
    setFoodList(copyFoodList);
  };

  const handleOnDragEnd = (result) => {
    const draggedIndex = foodList.findIndex(
      (ele) => String(ele.id) === result.draggableId
    );

    const copyFoodList = [...foodList];
    const draggedEle = copyFoodList.splice(draggedIndex, 1)[0];
    copyFoodList.splice(result.destination.index, 0, draggedEle);
    setFoodList(copyFoodList);
  };

  const addFoodHandler = () => {
    setFoodList((old) => [
      ...old,
      { id: "new" + new Date().getTime(), name: "" },
    ]);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="foodList">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {foodList.map((food, index) => (
                <Draggable
                  key={food.id}
                  draggableId={food.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <>
                      <OneFood
                        food={food.name}
                        id={food.id}
                        innerRef={provided.innerRef}
                        provided={provided}
                        setValue={setFoodListHandler}
                        removeValue={removeFoodHandler}
                      />
                    </>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      <AddFoodButton addFoodHandler={addFoodHandler} />
    </>
  );
}

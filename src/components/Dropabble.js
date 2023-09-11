import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import Container from "../Container";
function Dropabble(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "blue" : undefined,
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [FirstDiv, setFirstDiv] = useState([]);
  const handleDragEnd = (e) => {
    console.log("handleDragEND called", e);
    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "first" || !newItem) return;
    const temp = [...FirstDiv];
    temp.push(newItem);
    setFirstDiv(temp);
    props.setCartItems(
      props.children.filter((item) => item !== e.active.data.current?.title)
    );
  };
  const [SecondDiv, setSecondDiv] = useState([]);
  const newDragHandle = e => {
    console.log("handleDragEND called", e);
    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "second" || !newItem) return;
    const temp = [...SecondDiv];
    temp.push(newItem);
    setSecondDiv(temp);
    props.setCartItems(
      props.children.filter((item) => item !== e.active.data.current?.title)
    );
  } 

  const onDragEndHandler = (e) => {
    switch(e.over?.id){
      case "first":
        handleDragEnd(e)
        break;
      case "second":
        newDragHandle(e)
        break;
      default:
        break
    }
  }

  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHandler}
    >
      <div
        className="flex flex-col p-20 m-10 border-2 border-teal-600 rounded-2xl"
        ref={setNodeRef}
        style={style}
      >
        {/* <SortableContext
          items={props.children}
          strategy={horizontalListSortingStrategy}
        > */}
        <div className="flex space-x-4">
          {props.children.map((item) => (
            <Draggable key={item}>{item}</Draggable>
          ))}
        </div>
        <div className="flex mt-8 space-x-6">
          <Container data={FirstDiv} setDiv={setFirstDiv} handleDragEnd={handleDragEnd} id="first" />
          <Container data={SecondDiv} setDiv={setSecondDiv} handleDragEnd={newDragHandle} id="second" />
        </div>
        {/* </SortableContext> */}
      </div>
    </DndContext>
  );
}

export default Dropabble;

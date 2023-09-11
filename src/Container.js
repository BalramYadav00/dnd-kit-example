import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./components/Draggable";
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
import { SortableItem } from "./components/SortableItem";

function Container({ setDiv, id, data }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div
      className="flex flex-col p-20 m-10 space-y-6 border-2 border-teal-600 rounded-2xl"
      ref={setNodeRef}
      // style={style}
    >
      <SortableContext items={data} strategy={horizontalListSortingStrategy}>
        {data.map((item) => (
          <SortableItem item={item} id={item} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Container;

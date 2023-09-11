import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.children,
    data: { title: props.children },
  });


  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const move = useRef(style);
  // console.log(move);
  useEffect(() => {
    if (style !== undefined) {
      console.log(style)
      move.current = style;
    }
  }, [style]);

  return (
    <div
      className=" p-2 rounded-3xl w-48 border-teal-600 border-2"
      ref={setNodeRef}
      style={move.current}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}

export default Draggable;

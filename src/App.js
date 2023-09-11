import "./App.css";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./components/Draggable";
import Dropabble from "./components/Dropabble";

function App() {
  const [vegetables, setVegetables] = useState([
    "Lady finger",
    "Onion",
    "Tomato",
  ]);
  const [cartItems, setCartItems] = useState([]);

  const addItemsToCart = (e) => {
    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "droppable" || !newItem) return;
    const temp = [...cartItems];
    temp.push(newItem);
    setCartItems(temp);
    setVegetables(
      vegetables.filter((item) => item !== e.active.data.current?.title)
    );
  };

  // console.log(cartItems);
  return (
    <DndContext onDragEnd={addItemsToCart}>
      <div className="App">
        <div className="flex flex-col">
          <h1>Vegetables List</h1>
          <ul className=" space-x-6 flex flex-row self-center pt-6">
            {vegetables.map((vegies) => (
              <Draggable key={vegies}>{vegies}</Draggable>
            ))}
          </ul>
        </div>
        {/* <div className=" felx flex-col space-y-6 p-6">
          <p>Drop below</p>
          <Dropabble setCartItems={setCartItems}>{cartItems}</Dropabble>
        </div> */}
      </div>
      {/* <DraggableDiv/> */}
    </DndContext>
  );
}

export default App;

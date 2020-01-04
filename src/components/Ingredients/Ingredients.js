import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-b3c78.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(i => i.id.toString() !== id.toString())
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;

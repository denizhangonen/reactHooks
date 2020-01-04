import React, { useState, useEffect, useCallback } from "react";

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
    fetch(`https://react-hooks-b3c78.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(i => i.id.toString() !== id.toString())
      );
    });
  };

  const filteredIngredientsHandler = useCallback(ingredients => {
    setUserIngredients(ingredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;

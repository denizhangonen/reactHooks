import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch("https://react-hooks-b3c78.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(`https://react-hooks-b3c78.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setIsLoading(false);
        setUserIngredients(prevIngredients =>
          prevIngredients.filter(i => i.id.toString() !== id.toString())
        );
      })
      .catch(error => {
        setError("Something Went Wrong: " + error.message);
        setIsLoading(false);
      });
  };

  const filteredIngredientsHandler = useCallback(ingredients => {
    setUserIngredients(ingredients);
  }, []);

  const removeError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={removeError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

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

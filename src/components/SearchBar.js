import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [radioId, setRadioId] = useState('');
  const { setFilteredRecipes } = useContext(MyContext);
  const maxRecipes = 12;
  const { title } = useContext(MyContext);
  const firstLetter = 'First Letter';
  const history = useHistory();

  const verificaData = (data) => {
    if (data.length === 1 && title === 'foods') {
      history.push(`/foods/${data[0].idMeal}`);
    }
    if (data.length === 1 && title === 'drinks') {
      history.push(`/drinks/${data[0].idDrink}`);
    }
  };

  const noFoods = () => {
    alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const searchFoods = async () => {
    if (radioId === 'ingredient') {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.meals.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
    if (radioId === 'name') {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.meals.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
    if (radioId === firstLetter && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
    if (radioId === firstLetter && searchInput.length === 1) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.meals.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
  };
  const searchDrinks = async () => {
    if (radioId === 'ingredient') {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.drinks.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
    if (radioId === 'name') {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.drinks.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
    if (radioId === firstLetter && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
    if (radioId === firstLetter && searchInput.length === 1) {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const data = await response.json();
        const dataFiltered = data.drinks.slice(0, maxRecipes);
        setFilteredRecipes(dataFiltered);
        verificaData(dataFiltered);
      } catch (error) {
        noFoods();
      }
    }
  };

  const SearchItems = () => {
    if (title === 'foods') {
      searchFoods();
    } else if (title === 'drinks') {
      searchDrinks();
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => setSearchInput(e.target.value) }
        value={ searchInput }
      />
      <label htmlFor="ingredient">
        ingredient
        <input
          id="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio"
          onClick={ (e) => setRadioId(e.target.id) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="radio"
          data-testid="name-search-radio"
          name="radio"
          onClick={ (e) => setRadioId(e.target.id) }
        />
      </label>
      <label htmlFor={ firstLetter }>
        First Letter
        <input
          id={ firstLetter }
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio"
          onClick={ (e) => setRadioId(e.target.id) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ SearchItems }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

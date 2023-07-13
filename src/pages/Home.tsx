import { useState } from 'react';
import RecipeList from '../components/RecipeList';
import { useRecipeStore } from '../store/recipeStore';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const addRecipe = useRecipeStore((state) => state.add);
  const removeRecipes = useRecipeStore((state) => state.remove);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);

  const handleToggleSelect = (id: number) => {
    if (selectedRecipes.some((recipe) => recipe === id)) {
      return setSelectedRecipes((prev) => prev.filter((recipe) => recipe !== id));
    }

    setSelectedRecipes((prev) => [...prev, id]);
  };

  const handleDelete = () => {
    removeRecipes(selectedRecipes);
    setSelectedRecipes([]);
  };

  return (
    <>
      {selectedRecipes.length > 0 && (
        <button onClick={handleDelete} className={styles['delete-button']}>
          Delete
        </button>
      )}
      <RecipeList recipes={recipes} addRecipe={addRecipe} selectedRecipes={selectedRecipes} onToggleSelect={handleToggleSelect} />
    </>
  );
};

export default Home;

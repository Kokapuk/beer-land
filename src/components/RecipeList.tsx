import { useEffect, useState } from 'react';
import RecipeItem from '../components/Recipe';
import { Recipe } from '../store/recipeStore';
import styles from '../styles/RecipeList.module.scss';
import api from '../utils/api';

interface Props {
  recipes: Recipe[];
  addRecipes(recipe: Recipe[]): void;
  selectedRecipes: number[];
  onToggleSelect(id: number): void;
}

const RecipeList = ({ recipes, addRecipes, selectedRecipes, onToggleSelect }: Props) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [recipesToRender, setRecipesToRender] = useState<Recipe[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchRecipes = async () => {
    if (!fetching) {
      return;
    }

    try {
      const recipes = await api.getMany(page);
      setPage((prev) => prev + 1);
      addRecipes(recipes);
      setRecipesToRender(recipes.slice(skip, 15 + skip));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetching]);

  const handleScroll = () => {
    if (fetching) {
      return;
    }

    if (document.documentElement.scrollTop < 300) {
      setSkip((prev) => {
        if (prev === 0) {
          return 0;
        }

        return prev - 5;
      });
    } else if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 300) {
      setSkip((prev) => {
        if (recipes.length - prev <= 15) {
          setFetching(true);
          return prev;
        }

        return prev + 5;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetching]);

  useEffect(() => {
    if (recipes.length === 0) {
      return;
    }

    if (recipes.length - skip <= 15) {
      return setFetching(true);
    }

    setRecipesToRender(recipes.slice(skip, 15 + skip));
  }, [skip, recipes]);

  return (
    <div className={styles.list}>
      {recipesToRender.map((recipe) => (
        <RecipeItem
          selected={selectedRecipes.includes(recipe.id)}
          onRightClick={() => onToggleSelect(recipe.id)}
          key={recipe.id}
          recipe={recipe}
        />
      ))}
      {fetching && <p>Loading...</p>}
    </div>
  );
};

export default RecipeList;

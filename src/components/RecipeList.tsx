import { useEffect, useState } from 'react';
import RecipeItem from '../components/Recipe';
import { Recipe } from '../store/recipeStore';
import styles from '../styles/RecipeList.module.scss';
import api from '../utils/api';

interface Props {
  recipes: Recipe[];
  addRecipe(recipe: Recipe[]): void;
  selectedRecipes: number[];
  onToggleSelect(id: number): void;
}

const RecipeList = ({ recipes, addRecipe, selectedRecipes, onToggleSelect }: Props) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [recipesToRender, setRecipesToRender] = useState<Recipe[]>([]);
  const [fetching, setFetching] = useState(true);

  const fetchRecipes = async () => {
    setFetching(true);

    try {
      const recipe = await api.getMany(page);
      addRecipe(recipe);
      setRecipesToRender(recipe.slice(skip, 15 + skip));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const handleScroll = () => {
    if (fetching) {
      return;
    }

    if (document.documentElement.scrollTop < 100) {
      setSkip((prev) => {
        if (prev === 0) {
          return 0;
        }

        return prev - 5;
      });
    } else if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 300) {
      setSkip((prev) => {
        if (prev >= recipes.length) {
          return prev;
        }

        setPage((prev) => prev + 1);
        return prev + 5;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetching, skip, page]);

  useEffect(() => {
    if (recipes.length < 15) {
      return setPage((prev) => prev + 1);
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
    </div>
  );
};

export default RecipeList;

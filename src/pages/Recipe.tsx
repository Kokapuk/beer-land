import { Link, useParams } from 'react-router-dom';
import { Recipe as RecipeType } from '../store/recipeStore';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import styles from '../styles/RecipePage.module.scss';

const Recipe = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState<{ data: RecipeType | null; loading: boolean }>({ data: null, loading: true });

  useEffect(() => {
    (async () => {
      try {
        const recipe = await api.getOne(params.id!);
        setRecipe((prev) => ({ ...prev, data: recipe }));
      } finally {
        setRecipe((prev) => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  return (
    <div>
      {recipe.loading ? (
        <p>Loading...</p>
      ) : !recipe.data ? (
        <p>Something went wrong loading recipe</p>
      ) : (
        <>
          <Link to='/'>Back to list</Link>
          <img className={styles.image} src={recipe.data.image_url} />
          <header className={styles.header}>
            <h1>{recipe.data.name}</h1>
            <h3>{recipe.data.tagline}</h3>
          </header>
          <p className={styles.description}>{recipe.data.description}</p>
          <p>
            Volume:{' '}
            <b>
              {recipe.data.volume.value} {recipe.data.volume.unit}
            </b>
          </p>
          <p>
            Boil Volume:{' '}
            <b>
              {recipe.data.boil_volume.value} {recipe.data.boil_volume.unit}
            </b>
          </p>

          <h2 className={styles.title}>Malt</h2>
          {recipe.data.ingredients.malt.map((item) => (
            <p key={item.name}>
              {item.name}:{' '}
              <b>
                {item.amount.value} {item.amount.unit}
              </b>
            </p>
          ))}

          <h2 className={styles.title}>Yeast</h2>
          <p>
            <b>{recipe.data.ingredients.yeast}</b>
          </p>

          <h2 className={styles.title}>Food pairing</h2>
          {recipe.data.food_pairing.map((item) => (
            <p key={item}>{item}</p>
          ))}

          <h2 className={styles.title}>Brewers tip</h2>
          <p>{recipe.data.brewers_tips}</p>

          <h4 className={styles.title}>Contributed by</h4>
          <p>{recipe.data.contributed_by}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;

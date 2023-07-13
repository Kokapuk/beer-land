import classNames from 'classnames';
import { Recipe as RecipeType } from '../store/recipeStore';
import styles from '../styles/Recipe.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  recipe: RecipeType;
  selected?: boolean;
  onRightClick?(): void;
}

const Recipe = ({ recipe, selected, onRightClick }: Props) => {
  const navigate = useNavigate();

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onRightClick?.();
  };

  return (
    <button
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      onContextMenu={handleContextMenu}
      className={classNames(styles.button, selected && styles.button_selected)}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img loading='lazy' className={styles.image} src={recipe.image_url} />
          <div>
            <h2>{recipe.name}</h2>
            <h4>{recipe.tagline}</h4>
          </div>
        </header>
        <p className={styles.description}>{recipe.description}</p>
        <p>
          First brewed <b>{recipe.first_brewed}</b>
        </p>
        <p>
          ABV: <b>{recipe.abv}</b>
        </p>
        <p>
          SRM: <b>{recipe.srm}</b>
        </p>
        <p>
          pH: <b>{recipe.ph}</b>
        </p>
      </div>
    </button>
  );
};

export default Recipe;

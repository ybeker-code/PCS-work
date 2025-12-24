import AddRecipeButton from "./addRecipeButton";
export default function Header(props) {
  return (
    <>
      <header>
        <h1>PCS Recipes</h1>
      </header>
      <AddRecipeButton addRecipe={props.addRecipe} />
      <hr />
    </>
  );
}

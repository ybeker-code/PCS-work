import './addRecipeButton.css';
import { useState } from 'react';

export default function AddRecipeButton(props) {
    const [formShowing, toggleFormShow] = useState(false);

    const [components, setRecipe] = useState({});
    const { id, name, pic, ingredients, directions } = components

    function handleInput(e) {
        setRecipe({ ...components, [e.target.id]: e.target.value.split(',') })
    }

    function submitRecipe(e) {
        e.preventDefault();
        console.log('submit');
        props.addRecipe(components);
        toggleFormShow(!formShowing);
    };

    const inputForm = <form action="" onSubmit={submitRecipe}>
        <label htmlFor="id">Id</label>
        <input type="text" id="id" name="id" value={id} onChange={e => { handleInput(e) }} required />
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={e => { handleInput(e) }} required />
        <label htmlFor="pic">Picture</label>
        <input type="text" id="pic" name="pic" value={pic} onChange={e => { handleInput(e) }} />
        <label htmlFor="ingredients">Ingredients</label>
        <div id='comma'>(separate with comma)</div>
        <input type="text" id="ingredients" name="ingredients" value={ingredients} onChange={e => { handleInput(e) }} />
        <label htmlFor="directions">Directions</label>
        <div id='comma'>(separate with comma)</div>
        <input type="text" id="directions" name="directions" value={directions} onChange={e => { handleInput(e) }} />
        <button type='submit'>submit</button>
    </form>
    return (
        <>
            <div id='add'>
                <button onClick={() => (toggleFormShow(!formShowing))}>Add Recipe</button>
                {formShowing && inputForm}
            </div>

        </>
    );
}
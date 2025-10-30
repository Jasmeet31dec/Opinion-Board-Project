import { useActionState, useContext } from "react";
import { OpinionsContext } from '../store/opinions-context.jsx';
import Submit from './Submit.jsx';
import { UserContext } from "../store/userContext.jsx";

const mockCategories = ["Technology", "Lifestyle", "Food", "Politics", "Sports", "Mental Health"];

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);
  const { user } = useContext(UserContext);

  function handleSubmission(prevFormSate, formData) {

    const enteredUserName = formData.get('userName');
    const enteredTitle = formData.get('title');
    const enteredBody = formData.get('body');
    const enteredCategory = formData.get('category');

    let errors = [];

    if (!enteredUserName.trim()) {
      errors.push('Please enter your name.');
    }

    if (enteredTitle.trim().length < 6) {
      errors.push("Please enter a title having more than 6 characters.");
    }

    if (enteredBody.trim().length < 10 || enteredBody.trim().length > 300) {
      errors.push("Please enter your opinion greater than 10 and less than 300 characters..");
    }

    if (errors.length > 0) {
      return {
        error: errors,
        enteredValues: {
          name: enteredUserName,
          title: enteredTitle,
          opinion: enteredBody,
          category: enteredCategory
        }
      }
    }

    addOpinion({
      name: enteredUserName,
      email: user.email,
      title: enteredTitle,
      opinion: enteredBody,
      category: enteredCategory,
      votes: 0  
    });

    return {
      error: null
    }
  }

  const [formState, formAction] = useActionState(handleSubmission, { error: null });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>

          <p className="control">
            <label htmlFor="category">Category</label>
            <select className="control"
              id="category"
              name="category"
              defaultValue={formState.enteredValues? formState.enteredValues.category : " "}
              required
              autoComplete="off"
            >
              <option value=" " disabled>Select a Category</option>
              {mockCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.error !== null && <ul className="errors">
          {formState.error.map(error => <li key={error}>{error}</li>)}
        </ul>}

        <Submit />
      </form>
    </div>
  );
}

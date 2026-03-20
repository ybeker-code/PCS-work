import './Login.css';
import useForm from './useForm';

export default function Login(props) {
  const { setUserName } = props;

  const [formData, setFormData] = useForm({
    userName: '',
    password: ''
  })

  async function login(e) {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('login failed');
      } else if (response.status === 204) {
        setUserName(formData.userName);
      }
    } catch (error) {
      console.error(error);
    }

    //setUserName(formData.userName);
  }

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: { 'content-type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('login failed');
      }
    } catch (error) {
      console.error(error);
    }
    setUserName(formData.userName);
  }

  return (
    <form id="login" onSubmit={login}>
      <label>name:
        <input name="userName" required value={formData.userName} onChange={setFormData} />
      </label>

      <label>password:
        <input type="password" name="password" required value={formData.password} onChange={setFormData} />
      </label>

      <button>login</button>

      <button type="button" onClick={register}>register</button>
    </form>
  )
}

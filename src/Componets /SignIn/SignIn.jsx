import './signin.scss'

const SignInForm = () => {
    <div className="sign-in">
      <h2>Sign In</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      
    </div>
};

export default SignInForm;
import React from 'react';

class Login extends React.Component {

  constructor(){
    super();

    this.state = {
        action: 'login',
        email: "",
        password: ""
    }
  }

  EmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  PasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  Submit = (action) => {
      if (this.state.email != "" && this.state.password != ""){
        if (action == 'login'){
            this.props.login(this.state.email, this.state.password);
        } else {
            this.props.register(this.state.email, this.state.password)
        }
      } else {
          alert("Please fill out all fields.");
      }
  }
  
  render (){

    let toptext = <div class="text-center">
        <h1 class="my-3 text-4xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
        <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
    </div>

    let switchButton = <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a onClick={()=>this.setState({action: 'register'})} class="text-green-400 focus:outline-none focus:underline focus:text-green-500 dark:focus:border-green-800 cursor-pointer">Register</a>.</p>

    let loginRegisterButton = <button onClick={()=>this.Submit('login')} type="button" class="w-full px-3 py-4 text-black border-2 border-gray-800 focus:bg-gray-50 rounded-xl focus:outline-none font-bold">Login</button>

    if (this.state.action == 'register'){
        toptext = <div class="text-center">
            <h1 class="my-3 text-4xl font-semibold text-gray-700 dark:text-gray-200">Register</h1>
            <p class="text-gray-500 dark:text-gray-400">Create an account to manage your plants</p>
        </div>

        switchButton = <p class="text-sm text-center text-gray-400">Alreadt have an account? <a onClick={()=>this.setState({action: 'login'})} class="text-green-400 focus:outline-none focus:underline focus:text-green-500 dark:focus:border-green-800 cursor-pointer">Signin</a>.</p>

        loginRegisterButton = <button onClick={()=>this.Submit('register')} type="button" class="w-full px-3 py-4 text-black border-2 border-gray-800 focus:bg-gray-50 rounded-xl focus:outline-none font-bold">Register</button>
    }

    return (
        <div class="flex items-center mt-20 bg-white dark:bg-gray-900">
            <div class="container mx-auto">
                <div class="max-w-md mx-auto my-10">
                    {toptext}
                    <div class="m-7">
                        <form action="">
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                <input onChange={this.EmailChange} value={this.state.email} type="email" name="email" id="email" placeholder="you@company.com" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div class="mb-6">
                                <div class="flex justify-between mb-2">
                                    <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    {/* <a href="#!" class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a> */}
                                </div>
                                <input onChange={this.PasswordChange} value={this.state.password} type="password" name="password" id="password" placeholder="Your Password" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div class="mb-6">
                                {loginRegisterButton}
                            </div>
                            {switchButton}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
import React from 'react';

class Register extends React.Component {

  constructor(){
    super();
  }
  
  render (){
    return (
        <div class="flex items-center mt-20 bg-white dark:bg-gray-900">
            <div class="container mx-auto">
                <div class="max-w-md mx-auto my-10">
                    <div class="text-center">
                        <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Register</h1>
                        <p class="text-gray-500 dark:text-gray-400">Create an account to use Watermango</p>
                    </div>
                    <div class="m-7">
                        <form action="">
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="you@company.com" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div class="mb-6">
                                <div class="flex justify-between mb-2">
                                    <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <a href="#!" class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                                </div>
                                <input type="password" name="password" id="password" placeholder="Your Password" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                            </div>
                            <div class="mb-6">
                                <button type="button" class="w-full px-3 py-4 text-black border-2 border-gray-800 focus:bg-gray-50 rounded-xl focus:outline-none font-bold">Log in</button>
                            </div>
                            <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#!" class="text-green-400 focus:outline-none focus:underline focus:text-green-500 dark:focus:border-green-800">Sign up</a>.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Register;
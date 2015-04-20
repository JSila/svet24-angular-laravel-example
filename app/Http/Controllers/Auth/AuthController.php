<?php 

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Controllers\Controller;
use App\User;
use Auth;

class AuthController extends Controller
{
	public function postLogin(LoginRequest $request)
	{
		if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember))
		{
    		return Auth::user();
		}

		return response()->json([
			'message' => 'Wrong credentials.'
		], 401);
	}

	public function getLogout()
	{
	    Auth::logout();

		return response()->json([
			'message' => 'User logged out.'
		], 200);

	}

	public function getUser()
	{
		$user = Auth::user();
		$data = [];

		if ($user) {
			return $user;
		}

	    return response()->json([
			'message' => 'No user logged in.'
		], 404);
	}

	public function postRegister(RegisterRequest $request)
	{
	    User::create($request->all());

		return response()->json([
			'message' => 'User registered.'
		], 201);

	}
}

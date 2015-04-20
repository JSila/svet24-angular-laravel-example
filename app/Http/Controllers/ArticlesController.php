<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\NewArticleRequest;
use App\Http\Requests\DeleteArticleRequest;

use Illuminate\Contracts\Auth\Guard;

class ArticlesController extends Controller
{

    protected $auth;

    public function __construct(Guard $auth)
    {
        $this->middleware('auth');
        $this->auth = $auth;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return $this->auth->user()->articles;
	}

    /**
     * Store a newly created resource in storage.
     *
     * @param NewArticleRequest $request
     * @return Response
     */
	public function store(NewArticleRequest $request)
	{
        $data = $request->only(['title', 'section_name', 'image']);

		$article = new Article($data);

        $this->auth->user()->articles()->save($article);

        return ['status' => 'OK'];
	}

    /**
     * Remove the specified resource from storage.
     *
     * @param DeleteArticleRequest $request
     * @param Article $article
     * @return Response
     */
    public function destroy(DeleteArticleRequest $request, Article $article)
    {
        $id = $request->get('id');

        $article->destroy($id);

        return ['status' => 'OK'];
    }

}

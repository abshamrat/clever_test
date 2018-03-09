<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
use faker;
use Image;


class UserController extends Controller
{
    public function test(Request $request)
    {
    	return genView("test",array('data' => "values"))->with("data","test");
    }
    public function link_test(Request $request)
    {
    	return genView("test",array('data' => "values"));
    }
   
}

<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Session;
use App\Models\plans;
use App\Models\members;
use App\Models\trainers;
use App\Models\users;



class adminController extends Controller
{
    //

   public function home(){

        return view('index');
    }


    public function login(){

        return view('login');
    }

      public function logout() {
      Session::forget('user_id');
    return view('login');
}


     public function add_members(){

        return view('pages.add_members');
    }


public function adduser(Request $data){
   
    $name=$data->name;
    $email=$data->email;
    $password=$data->password;
    
      
      $datas=array();
      $datas['name']=$name;
      $datas['email']=$email;
      $datas['password']=$password;
     
    DB::table('users')->insert($datas);


     return redirect()->back();

    }

    public function addplan(Request $data){
   $package=$data->name;
    $plan=$data->plan;
    $amount=$data->amount;
   
      
      $datas=array();
      $datas['months']=$plan;
      $datas['amount']=$amount;
      $datas['package']=$package;
    
    DB::table('plans')->insert($datas);

     return redirect()->back();

    }

     public function editplan(Request $data){
   
     $package=$data->name;
    $plan=$data->plan;
    $amount=$data->amount;
   $id=$data->id;
      
      $datas=array();
      $datas['months']=$plan;
      $datas['amount']=$amount;
      $datas['package']=$package;
     
    DB::table('plans')->where('id', $id)->update($datas);


     return redirect()->back();

    }


 public function addtrain(Request $data){
   $name=$data->name;
    $email=$data->email;
    $contact=$data->contact;
    $rate=$data->rate;
   
      
      $datas=array();
      $datas['name']=$name;
      $datas['email']=$email;
      $datas['contact']=$contact;
      $datas['rate']=$rate;
    
    DB::table('trainers')->insert($datas);

     return redirect()->back();

    }

public function edittrain(Request $data){
   $name=$data->name;
    $email=$data->email;
    $contact=$data->contact;
    $rate=$data->rate;
      $id=$data->id;
   
      
      $datas=array();
      $datas['name']=$name;
      $datas['email']=$email;
      $datas['contact']=$contact;
      $datas['rate']=$rate;
    
     DB::table('trainers')->where('id', $id)->update($datas);

     return redirect()->back();

    }
     

     public function add_member_db(Request $data){
    $name=$data->name;
    $email=$data->email;
    $member_id=$data->member_id;
    $plan_id=$data->plan_id;
    $address=$data->address;
    $gender=$data->gender;
    $contact=$data->contact;
   
    
      
      $datas=array();
      $datas['firstname']=$name;
      $datas['email']=$email;
      $datas['member_id']=$member_id;
        $datas['plan_id']=$plan_id;
          $datas['address']=$address;
            $datas['gender']=$gender;
              $datas['contact']=$contact;
     
    DB::table('members')->insert($datas);


     return redirect()->back();

    }

     public function edit_members(Request $data){
    $name=$data->name;
    $email=$data->email;
    $member_id=$data->member_id;
    $plan_id=$data->plan_id;
    $address=$data->address;
    $gender=$data->gender;
    $contact=$data->contact;
   
    $id=$data->id;
      
      $datas=array();
      $datas['firstname']=$name;
      
      $datas['member_id']=$member_id;
        $datas['plan_id']=$plan_id;
          $datas['address']=$address;
            $datas['gender']=$gender;
              $datas['contact']=$contact;
     
    DB::table('members')->where('id', $id)->update($datas);


     return redirect()->back();

    }



     public function see_members(){

         $members = members::get();

        return view('pages.see_members', compact('members') );
    }

     public function plans(){

        $plan = plans::get();

        return view('pages.plans', compact('plan') );
    }

     public function users(){

         $users = users::get();

        return view('pages.users', compact('users') );
    }

     public function trainers(){

          $trainers = trainers::get();

        return view('pages.trainer', compact('trainers') );
    }



public function adminLogin(Request $formData){
$email = $formData->email;
$password = $formData->password;

$user= DB::table('users')->where('email', $email)->get(); 
$check_user=json_decode($user);

//print_r($check_user); echo $check_user[0]->password; exit;

if($user->count() >0 ) {
$db_password=$check_user[0]->password;

if($password==$db_password) { Session::put('user_id', $email); return redirect('home');  }
else echo "Password wrong!";


}
    else { echo "user don't exist"; }

        
    }


  public function delmem($id){

          $del = DB::table('members')->where('id',$id)->delete();

         return redirect()->back();
    }

public function delplan($id){

          $del = DB::table('plans')->where('id',$id)->delete();

         return redirect()->back();
    }


    public function deltrain($id){

          $del = DB::table('trainers')->where('id',$id)->delete();

         return redirect()->back();
    }


}

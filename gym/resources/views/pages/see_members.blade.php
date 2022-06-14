@extends('layouts.master')

@section('content')


<div class="container-fluid">
<style>
  input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(1.5); /* IE */
  -moz-transform: scale(1.5); /* FF */
  -webkit-transform: scale(1.5); /* Safari and Chrome */
  -o-transform: scale(1.5); /* Opera */
  transform: scale(1.5);
  padding: 10px;
}
</style>
  <div class="col-lg-12">
    <div class="row mb-4 mt-4">
      <div class="col-md-12">

      </div>
    </div>






    <div class="row">
      <!-- FORM Panel -->

      <!-- Table Panel -->
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <b>Active Member List</b>
            <span class="">

              <button class="btn btn-success btn-block btn-sm col-sm-2 float-right" type="button" id="new_member">
          </button>
        </span>
          </div>
          <div class="card-body">

            <table class="table table-bordered table-condensed table-hover">
              <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="10%">
              </colgroup>
              <thead>
                <tr>

                  <th class="">Member ID</th>
                  <th class="">Name</th>
                  <th class="">Plan</th>
                  <th class="">Contact</th>
                   <th class="">Address</th>


                  <th class="text-center">Action</th>
                </tr>
              </thead>

                @foreach($members as $m)
              <tbody>

                <tr>

                  <td class="text-center">{{$m->member_id}}</td>
                  <td class="">
                     <p><b>{{$m->firstname}}</b></p>

                  </td>

                  @php $plan = DB::table('plans')->where('id',$m->plan_id)->get();  @endphp

                  <td class="">
                     <p><b>@foreach($plan as $p){{$p->package}} ( {{$p->months}} month/s) @endforeach</b></p>

                  </td>
                  <td class="">
                     <p><b>{{$m->contact}}</b></p>
                  </td>
                  <td class="">
                     <p><b>{{$m->address}}</b></p>

                  </td>

                  <td class="text-center">
                    <a  data-toggle="modal" data-target="#currency{{$m->id}}" class="currency_link d-inline dropdown mb-2 text-mute btn btn-info">Edit</a>
                    <a href="{{route('delmem',$m->id)}} " class="btn btn-sm btn-outline-danger delete_member" type="button" data-id="">Delete</a>
                  </td>
                </tr>

              </tbody>



{{-- Modal --}} @php $row=DB::table('members')->where('id',$m->id)->get(); @endphp

  <div  class="modal fade" id="currency{{$m->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
     @foreach ($row as $r)
  <form method="POST" action="{{ route('edit_members') }}">
                        @csrf

<div class="form-group ">

  <label class="d-inline small text-dark mb-1 ml-1" for="inputEmailAddress">Name</label>

                                            <input type="number" hidden name="id" value="{{$m->id}}">
                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="name" name="name" id="inputEmailAddress"
                                           autocomplete="email" autofocus value="{{$r->firstname}}"  /></div>

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">member_id</label>

                                            <input class=" d-inline w-50 form-control ml-4 px-2 my-2" type="number" name="member_id" id="inputEmailAddress"
                                             autocomplete="email" autofocus value="{{$r->member_id}}" /></div>

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">plan_id</label>

                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="number" name="plan_id"  id="inputEmailAddress"
                                           autocomplete="email" autofocus value="{{$r->plan_id}}"  /></div>

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Address</label>

                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="text" name="address"  id="inputEmailAddress"
                                            autocomplete="email" autofocus value="{{$r->address}}"  /></div>

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Gender</label>

                                           <select class="ml-5" name="gender">
                                             <option value="male">Male</option>
                                             <option value="female">Female</option>

                                           </select>
                                           </div>

                                            <div class="form-group ">

  <label class="d-inline small text-dark mb-1" for="inputEmailAddress">Contact</label>

                                            <input class=" d-inline w-50 form-control ml-5 px-2 my-2" type="number" name="contact"  id="inputEmailAddress"
                                            autocomplete="email" autofocus  value="{{$r->contact}}"  /></div>






                                          @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                           @enderror


                                            <div class="form-group d-flex align-items-center justify-content-between mt-5 mb-0">
                                            @if (Route::has('forgetPass'))
                                            <a href="{{ route('password.request') }}" class="text">Forgot password ?</a> @endif

                                            <input style="margin-left: 100px;background: aliceblue;border-radius: 20px; " type="submit"class=" w-25 btn btn-info text-dark d-block font-weight-bold " href="" name="add" value="Update" /></div>
                    </form> @endforeach


      </div>


      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>
  {{-- Modal --}}




              @endforeach
            </table>
          </div>
        </div>
      </div>
      <!-- Table Panel -->
    </div>
  </div>

</div>



<style>

  td{
    vertical-align: middle !important;
  }
  td p{
    margin: unset
  }
  img{
    max-width:100px;
    max-height: :150px;
  }
</style>
<script>
  $(document).ready(function(){
    $('table').dataTable()
  })
  $('#new_member').click(function(){
    uni_modal("<i class='fa fa-plus'></i> New Membership Plan","manage_membership.php",'')
  })
  $('.view_member').click(function(){
    uni_modal("<i class='fa fa-address-card'></i> Member Plan Details","view_pdetails.php?id="+$(this).attr('data-id'),'')

  })
  $('.edit_member').click(function(){
    uni_modal("<i class='fa fa-edit'></i> Manage Member Details","manage_member.php?id="+$(this).attr('data-id'),'mid-large')

  })
  $('.delete_member').click(function(){
    _conf("Are you sure to delete this topic?","delete_member",[$(this).attr('data-id')],'mid-large')
  })

  function delete_member($id){
    start_load()
    $.ajax({
      url:'ajax.php?action=delete_member',
      method:'POST',
      data:{id:$id},
      success:function(resp){
        if(resp==1){
          alert_toast("Data successfully deleted",'success')
          setTimeout(function(){
            location.reload()
          },1500)

        }
      }
    })
  }
</script>

@endsection

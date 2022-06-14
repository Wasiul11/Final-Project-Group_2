@extends('layouts.master')

@section('content')

<div class="container-fluid">
	
	<div class="col-lg-12">
		<div class="row">
			<!-- FORM Panel -->
			<div class="col-md-4">
			<form action="{{ route('addplan') }}" method="post" > @csrf
				<div class="card">
					<div class="card-header">
						    Plan Form
				  	</div>
					<div class="card-body">
							<input type="hidden" name="id">

							<div class="form-group">
								<label class="control-label">Package Name</label>
								<input type="text" class="form-control" min="1" name="name" >
							</div>

							<div class="form-group">
								<label class="control-label">Plan (months)</label>
								<input type="number" class="form-control" min="1" name="plan" >
							</div>
							<div class="form-group">
								<label class="control-label">Amount</label>
								<input type="number" class="form-control" step="any" name="amount">
							</div>
							
					</div>
							
					<div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-md btn-success col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-md btn-secondary col-sm-3" type="button" onclick="_reset()"> Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			</div>
			<!-- FORM Panel -->

			<!-- Table Panel -->
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<b>Plan List</b>
					</div>
					<div class="card-body">
						<table class="table table-bordered table-hover">
							<colgroup>
								<col width="5%">
								<col width="55%">
								<col width="20%">
								<col width="20%">
							</colgroup>
							<thead>
								<tr>
									<th class="text-center">#</th>
									<th class="text-center">Plan</th>
									<th class="text-center">Amount</th>
									<th class="text-center">Action</th>
								</tr>
							</thead>

						@foreach($plan as $p)		
							<tbody>
								
								<tr>
									<td class="text-center">{{$p->package}}</td>
									<td class="text-center">
										<p><b></b>{{$p->months}} month/s</p>
									</td>
									<td class="text-right">
										<b>{{$p->amount}}</b>
									</td>
									<td class="text-center">
										 <a  data-toggle="modal" data-target="#currency{{$p->id}}" class="currency_link d-inline dropdown mb-2 text-mute btn btn-info">Edit</a>
										<a href="{{route('delplan',$p->id)}}" class="btn btn-md btn-outline-danger delete_plan" type="button" data-id="">Delete</a>
									</td>
								</tr>
								
							</tbody>




{{-- Modal --}} @php $row=DB::table('plans')->where('id',$p->id)->get(); @endphp 
  
  <div  class="modal fade" id="currency{{$p->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
    
      <div class="modal-body">
     @foreach ($row as $r)  
     <form action="{{ route('editplan') }}" method="post" > @csrf
				<div class="card">
					<div class="card-header">
						    Plan Form
				  	</div>
					<div class="card-body">
							<input type="hidden" name="id" name="id" value="{{$p->id}}">

							<div class="form-group">
								<label class="control-label">Package Name</label>
								<input type="text" class="form-control" value="{{$r->package}}" min="1" name="name" >
							</div>

							<div class="form-group">
								<label class="control-label">Plan (months)</label>
								<input type="number" class="form-control"value="{{$r->months}}" min="1" name="plan" >
							</div>
							<div class="form-group">
								<label class="control-label">Amount</label>
								<input type="float" class="form-control" value="{{$r->amount}} " name="amount">
							</div>
							
					</div>
							
					<div class="card-footer">
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-md btn-success col-sm-3 offset-md-3"> Save</button>
								<button class="btn btn-md btn-secondary col-sm-3" type="button" onclick="_reset()"> Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>  
  @endforeach

    
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
</style>
<script>
	function _reset(){
		$('#manage-plan').get(0).reset()
		$('#manage-plan input,#manage-plan textarea').val('')
	}
	$('#manage-plan').submit(function(e){
		e.preventDefault()
		start_load()
		$.ajax({
			url:'ajax.php?action=save_plan',
			data: new FormData($(this)[0]),
		    cache: false,
		    contentType: false,
		    processData: false,
		    method: 'POST',
		    type: 'POST',
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully added",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
				else if(resp==2){
					alert_toast("Data successfully updated",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	})
	$('.edit_plan').click(function(){
		start_load()
		var cat = $('#manage-plan')
		cat.get(0).reset()
		cat.find("[name='id']").val($(this).attr('data-id'))
		cat.find("[name='plan']").val($(this).attr('data-plan'))
		cat.find("[name='amount']").val($(this).attr('data-amount'))
		end_load()
	})
	$('.delete_plan').click(function(){
		_conf("Are you sure to delete this plan?","delete_plan",[$(this).attr('data-id')])
	})
	function delete_plan($id){
		start_load()
		$.ajax({
			url:'ajax.php?action=delete_plan',
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
	$('table').dataTable()
</script>

@endsection
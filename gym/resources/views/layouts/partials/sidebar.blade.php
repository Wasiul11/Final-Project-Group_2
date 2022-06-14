<div class="left main-sidebar bg-success">

  <div class="sidebar-inner leftscroll">

    <div id="sidebar-menu" class=" show">

      <ul class=" show bg-info">

        {{--<li class="submenu">
          <a class="" href="{{ route('admin.home') }}"><i class="fa fa-fw fa-dashboard"></i><span> {{ __('admin.dashboard') }} </span> </a>
        </li> --}}
{{--
        @php
          // retrieve all menus for authenticated user
          $role_wise_menus = \App\Models\Role::where('role', Auth()->guard('admin')->user()->admin_role)->first();
          // decode menus and submenus
          $role_menus = json_decode($role_wise_menus->menu);
          $role_sub_menus = json_decode($role_wise_menus->sub_menu);
        @endphp
        @php
            // retrieve row for the menu_id
            $menus = \App\Models\Menu::whereNull('parent_id')->orderBy('order')->get();
            $menu_statuses = \App\Models\MenuStatus::all()->keyBy('menu_id')->toArray();
            $menu_statuses = (!empty($menu_statuses) ? array_map(function($item) { return $item['status']; }, $menu_statuses) : array());
        @endphp
        @if(!$menus->isEmpty())
            @foreach($menus as $menu)
				@if(in_array($menu->id,$role_menus)) 
					if it is the menu (not submenu)
					@if(is_null($menu->parent_id)) --}}
						
				
        <li class="submenu open text-dark">
          <a href="#" class="text-dark font-weight-bold"><i class="fa fa-fw fa-bars"></i> <span> {{ "Menu" }} </span> <span class="menu-arrow"></span></a>
          <ul class="list-unstyled">
          	<li><a href="{{route('home') }}" class=" text-dark font-weight-bold">{{ 'Home' }}</a></li>
            <li><a href="{{route('add_members') }}" class=" text-dark font-weight-bold">{{ 'Add Member' }} </a></li>
            <li><a href="{{route('see_members') }}" class=" text-dark font-weight-bold">{{ 'Members' }}</a></li>
            <li><a href="{{route('plans') }}" class=" text-dark font-weight-bold">{{ 'Plans/Packages' }}</a></li>
            <li><a href="{{route('trainers') }}" class=" text-dark font-weight-bold">{{ 'Trainers' }}</a></li>
            <li><a href="{{route('users') }}" class=" text-dark font-weight-bold" >{{ 'Users' }}</a></li>
          </ul>
        </li>
       

      </ul>

      <div class="clearfix"></div>

    </div>

    <div class="clearfix"></div>

  </div>

</div>

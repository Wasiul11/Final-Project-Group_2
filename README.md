#### Group Members
- Wasiul Islam 1822615
- Asfi Ahmed 1822729
- Abdullah Sami 1822735



# Fitness Training Center

## Introduction 

 It is a simple Fitness Training Center Management application for administrative usage. At first, the Admin has to log in to the application using the authentication feature. Admin can Add, Modify, or Delete Members, Premium packages, Trainers, New Admins etc.


## Objectives
 The objectives of the web application are to Manage and control Memberships, Trainers,  Plans, and Packages of the training centre.

## Features and Functions :
1. Authentication
2. Create/Modify Members using Model and Controller
3. Show Members info using the MVC pattern
4. Create/Add Membership Packages using Model and Controller
5. Show Packages  info using MVC pattern
6. Create/Add Trainers using Model and Controller
7. Show  Trainers info Packages using MVC pattern
8. Adding new Admins

## List of Views, Controllers, Models and routes of the system :

- Views
  - dashboard.blade.php
  - welcome.blade.php
 
- Controllers
  - adminController.php
  - Controller.php

- Routes
  - web.php
  - api.php

- Models
  - Admins.php
  - Members.php
  - User.php
  - plans.php
  - trainers.php

 

## Diagrams
 - ER Diagram
 ![ERD](https://user-images.githubusercontent.com/100213178/171048064-dbb50ee9-8d51-4502-ba58-d2b7fd833519.png)
 </br>

  - Sequence Diagram 
  ![sequence](https://user-images.githubusercontent.com/100213178/171048086-3cab3668-15bc-45a7-b6d4-7f95f1bce855.jpeg)

 ## Code Implementation
 - index
  ![image](https://user-images.githubusercontent.com/100213178/173566863-91ebcf87-83ba-424e-a18c-e630d22219d8.png)

 - Admin Controller
  ![image](https://user-images.githubusercontent.com/100213178/173563465-e74d0691-a2f1-4f6d-b9f9-c96de03044e9.png)

 - Add Member
  ![image](https://user-images.githubusercontent.com/100213178/173563547-6b9447c6-8b2c-42d3-a194-a3d1783de25a.png)



## Database
For the MySQL-based database, We utilised the Xampp programme. Actually, XAMPP assists a local host or server in testing its website and consumers on PCs and laptops prior to releasing it to the main server. It is a platform that provides an adequate environment for testing and checking the functionality of projects that rely on Apache, Perl, MySQL, and PHP via the host's system.

- Database Tables
  <img width="1280" alt="image" src="https://user-images.githubusercontent.com/100213178/173560298-19c56985-a3ae-47ae-ae2d-2c4e3a925328.png">
- Users Table
  ![image](https://user-images.githubusercontent.com/100213178/173560578-1dbeb468-00d1-47b0-8854-a73cb9d87ee1.png)
- Members Table
![image](https://user-images.githubusercontent.com/100213178/173560667-51e79ff9-8b79-4258-9384-ec4c5be61623.png)
- Trainers Table
![image](https://user-images.githubusercontent.com/100213178/173560762-f2c4dd90-8471-4968-afbc-845a7d64d0bf.png)


## How to run the system
1. Download gym folder and gym_db.sql
2. Put downloaded files into htdocs of xxamp installation folder (if using windows operating system).
3. Open xxamp control panel and start Apache and MySql.
4. Open browser and type "localhost/gym/public/" in the search bar.
5. Open new tab and type "localhost/phpmyadmin' in the search bar and create database using gym_db.sql.
6. Go back to "localhost/gym/public/" and refresh.
7. Use the system.

## Final Output

- Admin Login Page
![image](https://user-images.githubusercontent.com/100213178/173564191-4f967e25-77ee-4e7c-ba66-922b632cf086.png)

- Home page
![image](https://user-images.githubusercontent.com/100213178/173564281-4e27514e-df11-4309-95f6-d7a0904d9de6.png)

- Add Member page
![image](https://user-images.githubusercontent.com/100213178/173566587-67293012-0def-4113-958b-56db65468fd5.png)

- Member List page
![image](https://user-images.githubusercontent.com/100213178/173564451-91d4d57c-786d-4177-9946-1bbe02377610.png)

- Trainer Page
![image](https://user-images.githubusercontent.com/100213178/173564519-8c17fcf3-a354-4ef3-99ae-104603b31d4f.png)

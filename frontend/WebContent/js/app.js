/**
 * Angular Module
 */
var app=angular.module("app",['ngRoute','ngCookies'])
app.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'views/registrationform.html',
		controller:'UserController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'UserController'
	})
	
	.when('/update',{
		templateUrl:'views/updateform.html',
		controller:'UserController'
	})
	.when('/getnotification/:id',{
		templateUrl:'views/NotificationDetails.html',
		controller:'NotificationController'
	})
	.when('/suggestedusers',{
		templateUrl:'views/suggestedusers.html',
		controller:'FriendCtrl'
	})
	.when('/pendingrequests',{
		templateUrl:'views/pendingrequests.html',
		controller:'FriendCtrl'
	})
	.when('/friends',{
		templateUrl:'views/friendslist.html',
		controller:'FriendCtrl'
	})
	.when('/chat',{
		templateUrl:'views/chat.html',
		controller:'ChatCtrl'
	})


	.when('/home',{
		templateUrl:'views/home.html',
		controller:'NotificationController'
	})
	.when('/addjob',{  //V to C
		templateUrl:'views/jobform.html',//ng-model
		controller:'JobController' //$scope.job
	})
	.when('/getalljobs',{//C to V
		templateUrl:'views/jobslist.html',  //ng-repeat
		controller:'JobController'// $scope.jobs
	})
	.when('/getjob/:id',{// C to V
		templateUrl:'views/jobdetail.html',
		controller:'JobController'//$scope.job=response.data
	})
	.when('/addblogpost',{
		templateUrl:'views/blogform.html',
		controller:'BlogController'
	})
	.when('/getblogs',{
		templateUrl:'views/bloglist.html',
		controller:'BlogController'
	})
	.when('/getblog/:id',{
		templateUrl:'views/blogpostdetail.html',
		controller:'BlogPostDetailController'
	})
	.when('/getapprovalform/:id',{ //for blogs waiting for approval
		templateUrl:'views/approvalform.html',
		controller:'BlogPostDetailController'
	})
	.when('/uploadprofilepic',{
		templateUrl:'views/profilepicture.html'
	})
	.otherwise({
		templateUrl:'views/login.html',
		controller:'UserController'
		
	})
})
app.run(function($rootScope,$cookieStore,UserService,$location){
	if($rootScope.loggedInUser==undefined)
		$rootScope.loggedInUser=$cookieStore.get('loggedInUser')
		
		$rootScope.logout=function(){
		UserService.logout().then(function(response){
			    $rootScope.successMessage="LoggedOut Successfully.."
			    delete $rootScope.loggedInUser
			    $cookieStore.remove("loggedInUser")
				$location.path('/login')
		},function(response){
			$rootScope.errorMessage="Please login.."
				$location.path('/login')
		})
	}
	
})

<?php

//$registerquery = mysql_query("INSERT INTO users (Username, Password, EmailAddress) VALUES('".$username."', '".$password."', '".$email."')");

include($_SERVER['DOCUMENT_ROOT'] . '/php/membership.php');
include($_SERVER['DOCUMENT_ROOT'] . '/databases/accounts.php');
// create login class?

// USER AUTHENTICATION
// check if any values are empty
// on login display confirmation

register();

function register()
{
	session_start();
	
	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$emailAddress = $_POST['emailAddress'];
	
	$connection = connect();
	
	// check username does not already exist	
	$sql = "SELECT * FROM users WHERE username = :username";
	$statement = $connection->prepare($sql);
	try
	{
		$statement->bindValue(':username', $username, PDO::PARAM_STR);
		$statement->execute();
	}
	catch(PDOException $e)
	{
		disconnect($connection);
		echo 'Query failed: ' . $e->getMessage();
	}
	
	if($statement->rowCount() == 1)
	{
		echo "<p>Sorry, that username is already taken, please try again";
	}
	else
	{
		$sql = "INSERT INTO users(username, password, emailAddress) VALUES(:username, :password, :emailAddress)";
		$statement = $connection->prepare($sql);
		try
		{
			$statement->bindValue(':username', $username, PDO::PARAM_STR);
			$statement->bindValue(':password', $password, PDO::PARAM_STR);
			$statement->bindValue(':emailAddress', $emailAddress, PDO::PARAM_STR);
			
			if($statement->execute())
			{
				echo "<p>Success</p>";
			}
		}
		catch(PDOException $e)
		{
			disconnect($connection);
			echo 'Query failed: ' . $e->getMessage();
		}
	
		//echo "<p>Registration successful!</p>";
	}
	

	
	disconnect($connection);

	
	// if element not found or user no longer exists
	// show regular page
	
	// else if
	
	// profile view
}

?>
